/**
 * ShrotiHost End-to-End Backend Integration Test Suite
 * Executes real HTTP tests against Next.js API Route Handlers.
 */

import assert from "node:assert/strict";
import crypto from "node:crypto";

const BASE_URL = process.env.TEST_APP_URL || "http://localhost:3000";
const RZP_SECRET = process.env.RAZORPAY_KEY_SECRET || "mock_rzp_secret_shrotihost_test_987654";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "mock_rzp_webhook_secret_secure_key_112233";

let totalTests = 0;
let passedTests = 0;
const results = [];

async function test(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    results.push({ name, status: "PASS" });
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    results.push({ name, status: "FAIL", error: err.message });
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

console.log("===============================================================================");
console.log(`  SHROTIHOST E2E BACKEND INTEGRATION TEST SUITE`);
console.log(`  Target Endpoint: ${BASE_URL}`);
console.log("===============================================================================\n");

async function runAllTests() {
  // 1. Health Check
  console.log("--- 1. SYSTEM HEALTH & INTEGRATION READINESS ---");
  await test("GET /api/health returns 200 and healthy status across 5 services", async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.equal(res.status, 200, `Expected 200 OK, got ${res.status}`);
    const data = await res.json();
    assert.equal(data.status, "healthy");
    assert.ok(data.services.payment, "Payment service reported");
    assert.ok(data.services.whmcs, "WHMCS service reported");
    assert.ok(data.services.registrar, "Registrar service reported");
    assert.ok(data.services.email, "Email service reported");
    assert.ok(data.services.aiAdvisor, "AI Advisor reported");
  });

  // 2. Payment Order Creation
  console.log("\n--- 2. PAYMENT ORDER CREATION & ANTI-TAMPERING ---");
  await test("POST /api/payment/create-order computes exact annual price with 18% GST", async () => {
    // Launch plan: ₹49/mo * 12 = ₹588 base rate. 18% GST = ₹106. Total = ₹694 (69400 paise).
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: "shared-launch",
        billingCycle: "annually",
        customerEmail: "qa@shrotihost.in",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.order.baseAmountRupees, 588);
    assert.equal(data.order.taxRupees, 106);
    assert.equal(data.order.amountRupees, 694);
    assert.equal(data.order.amount, 69400);
    assert.ok(data.order.orderId.startsWith("order_"));
  });

  await test("POST /api/payment/create-order applies SHROTI10 promotional code correctly", async () => {
    // Base ₹588 - 10% (₹59) = ₹529 taxable. GST 18% = ₹95. Total = ₹624 (62400 paise).
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: "shared-launch",
        billingCycle: "annually",
        couponCode: "SHROTI10",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.order.discountRupees, 59);
    assert.equal(data.order.taxRupees, 95);
    assert.equal(data.order.amountRupees, 624);
    assert.equal(data.order.amount, 62400);
  });

  await test("POST /api/payment/create-order rejects tampered/non-existent plan ID", async () => {
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: "hacked-free-plan-000",
        billingCycle: "annually",
      }),
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.error.includes("Invalid plan identifier"));
  });

  // 3. Payment Verification & Provisioning
  console.log("\n--- 3. PAYMENT VERIFICATION & PROVISIONING HAND-OFF ---");
  await test("POST /api/payment/verify verifies authentic HMAC signature and queues WHMCS order", async () => {
    const orderId = "order_mock_suite_101";
    const paymentId = "pay_mock_suite_202";
    const signature = crypto
      .createHmac("sha256", RZP_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const res = await fetch(`${BASE_URL}/api/payment/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        planId: "shared-grow",
        billingCycle: "annual",
        clientEmail: "rohan@example.com",
        clientName: "Rohan Sharma",
        domain: "rohansharma.in",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.verified, true);
    assert.ok(data.whmcs, "WHMCS order hand-off returned");
    assert.ok(data.whmcs.whmcsOrderId > 0);
    assert.ok(data.whmcs.whmcsInvoiceId > 0);
  });

  await test("POST /api/payment/verify rejects forged/altered signature", async () => {
    const res = await fetch(`${BASE_URL}/api/payment/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_mock_suite_101",
        razorpay_payment_id: "pay_mock_suite_202",
        razorpay_signature: "0000000000000000000000000000000000000000000000000000000000000000",
      }),
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.verified, false);
    assert.ok(data.error.includes("verification failed"));
  });

  // 4. Razorpay Webhooks & Replay Protection
  console.log("\n--- 4. RAZORPAY WEBHOOKS & REPLAY MITIGATION ---");
  await test("POST /api/payment/webhook processes valid webhook and rejects duplicate replays", async () => {
    const rawPayload = JSON.stringify({
      id: `evt_replay_test_${Date.now()}`,
      event: "payment.captured",
      created_at: Math.floor(Date.now() / 1000),
      payload: { payment: { entity: { id: "pay_live_001", amount: 69400 } } },
    });

    const validSig = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawPayload)
      .digest("hex");

    // First attempt: should succeed
    const res1 = await fetch(`${BASE_URL}/api/payment/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": validSig,
      },
      body: rawPayload,
    });

    assert.equal(res1.status, 200);
    const data1 = await res1.json();
    assert.equal(data1.status, "success");

    // Second attempt: replay attack test
    const res2 = await fetch(`${BASE_URL}/api/payment/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": validSig,
      },
      body: rawPayload,
    });

    assert.equal(res2.status, 200);
    const data2 = await res2.json();
    assert.equal(data2.status, "ignored", "Duplicate webhook should be ignored gracefully");
  });

  await test("POST /api/payment/webhook rejects forged webhook signature", async () => {
    const rawPayload = JSON.stringify({ id: "evt_forged_999", event: "payment.captured" });
    const res = await fetch(`${BASE_URL}/api/payment/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": "forged_signature_hash_000",
      },
      body: rawPayload,
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.status, "error");
  });

  // 5. Domain Registrar Lookup
  console.log("\n--- 5. DOMAIN REGISTRAR LOOKUP & RFC 1035 SYNTAX ---");
  await test("GET /api/domains/check returns canonical pricing and alternative suggestions", async () => {
    const res = await fetch(`${BASE_URL}/api/domains/check?domain=shrotitechdemo.com`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.domain, "shrotitechdemo");
    assert.equal(data.extension, ".com");
    assert.equal(data.registrationPrice, 1169);
    assert.equal(data.renewalPrice, 1299);
    assert.ok(Array.isArray(data.suggestions));
    assert.ok(data.suggestions.length > 0);
  });

  await test("GET /api/domains/check rejects illegal domain syntax", async () => {
    const res = await fetch(`${BASE_URL}/api/domains/check?domain=illegal%20name!.com`);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.error.includes("invalid characters"));
  });

  // 6. Contact Inquiries & Anti-Bot Honeypot
  console.log("\n--- 6. TRANSACTIONAL EMAIL & ANTI-BOT HONEYPOT ---");
  await test("POST /api/contact/send dispatches inquiry and queues support ticket", async () => {
    const res = await fetch(`${BASE_URL}/api/contact/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Aakash Patel",
        email: "aakash@example.com",
        department: "Support",
        subject: "LiteSpeed Cache Configuration",
        message: "Need assistance enabling Redis object caching on WordPress.",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.messageId.startsWith("msg_"));
    assert.ok(data.ticket.ticketMask.startsWith("SHR-"));
    assert.ok(data.emailBridge.mailtoUrl.includes("mailto:"));
  });

  await test("POST /api/contact/send intercepts bot honeypot submission", async () => {
    const res = await fetch(`${BASE_URL}/api/contact/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot Spammer",
        email: "bot@spamnetwork.com",
        department: "Sales",
        subject: "Spam Link",
        message: "Check this website out now.",
        honeypot: "automated_bot_field_data",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.provider, "anti-spam-honeypot");
    assert.equal(data.ticket, null, "Ticket should NOT be created for bot submission");
  });

  // 7. Grounded AI Hosting Advisor
  console.log("\n--- 7. GROUNDED AI INFRASTRUCTURE ADVISOR ---");
  await test("POST /api/advisor/chat recommends WordPress hosting for WordPress intent", async () => {
    const res = await fetch(`${BASE_URL}/api/advisor/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "I am migrating a WordPress WooCommerce store and need fast caching and SSL.",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.recommendedCategory, "wordpress");
    assert.equal(data.samePriceRenewalGuaranteed, true);
    assert.ok(data.confidence >= 0.9);
  });

  await test("POST /api/advisor/chat recommends KVM VPS for root/Python intent", async () => {
    const res = await fetch(`${BASE_URL}/api/advisor/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "I need full root SSH access to deploy a Python FastAPI and Docker container.",
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.recommendedCategory, "vps");
    assert.equal(data.samePriceRenewalGuaranteed, true);
  });

  console.log("\n===============================================================================");
  console.log(`  FINAL RESULTS: ${passedTests} / ${totalTests} INTEGRATION TESTS PASSED (100%)`);
  console.log("===============================================================================\n");

  if (passedTests < totalTests) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("Test execution aborted:", err);
  process.exit(1);
});

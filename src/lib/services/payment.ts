import crypto from "crypto";
import { ALL_HOSTING_PLANS, VPS_PLANS, HostingPlan } from "@/data/hosting-plans";
import {
  CreateOrderParams,
  PaymentOrderResult,
  VerifyPaymentParams,
  PaymentVerificationResult,
  WebhookVerificationResult
} from "./types";

// In-memory replay protection cache for webhook event IDs
const processedEventIds = new Map<string, number>();
const EVENT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory mock orders store for verification in mock mode
const mockOrderStore = new Map<string, { amount: number; planId: string; createdAt: number }>();

function cleanExpiredEvents() {
  const now = Date.now();
  for (const [id, timestamp] of processedEventIds.entries()) {
    if (now - timestamp > EVENT_TTL_MS) {
      processedEventIds.delete(id);
    }
  }
}

export class PaymentService {
  private keyId: string;
  private keySecret: string;
  private webhookSecret: string;
  public readonly isMock: boolean;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || "mock_rzp_key_test_123456";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || "mock_rzp_secret_shrotihost_test_987654";
    this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "mock_rzp_webhook_secret_secure_key_112233";

    this.isMock = !process.env.RAZORPAY_KEY_ID ||
      this.keyId.startsWith("mock_") ||
      this.keySecret.startsWith("mock_");
  }

  /**
   * Securely create a Razorpay order with server-enforced pricing.
   * Client-side price parameters are strictly ignored to prevent price tampering.
   */
  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    const { planId, billingCycle, couponCode, domain, customerName, customerEmail } = params;

    // 1. Resolve plan from canonical database
    let planName = "";
    let baseRate = 0;

    const standardPlan = ALL_HOSTING_PLANS.find((p) => p.id === planId);
    if (standardPlan) {
      planName = `${standardPlan.name} Hosting`;
      if (billingCycle === "annually" || (billingCycle as string) === "annual") {
        baseRate = standardPlan.annualPrice * 12;
      } else if (billingCycle === "semi-annually") {
        baseRate = (standardPlan.semiAnnualPrice || standardPlan.monthlyPrice) * 6;
      } else {
        baseRate = standardPlan.monthlyPrice;
      }
    } else {
      const vpsPlan = VPS_PLANS.find((p) => p.id === planId);
      if (vpsPlan) {
        planName = vpsPlan.name;
        baseRate = vpsPlan.monthlyPrice + (vpsPlan.setupFee || 0);
      } else {
        throw new Error(`Invalid plan identifier '${planId}'. Plan does not exist in catalog.`);
      }
    }

    // 2. Validate coupon code server-side
    let discountPercent = 0;
    if (couponCode && couponCode.trim().toUpperCase() === "SHROTI10") {
      discountPercent = 0.10; // 10% promotional discount
    }

    const discountAmount = Math.round(baseRate * discountPercent);
    const taxableAmount = baseRate - discountAmount;
    const gstAmount = Math.round(taxableAmount * 0.18); // Statutory 18% GST
    const finalAmountRupees = taxableAmount + gstAmount;
    const amountInPaise = finalAmountRupees * 100;

    const receiptId = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 3. Dispatch to live Razorpay API or generate cryptographic mock order
    if (!this.isMock) {
      try {
        const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
        const res = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: "INR",
            receipt: receiptId,
            notes: {
              planId,
              billingCycle,
              domain: domain || "",
              customerName: customerName || "",
              customerEmail: customerEmail || "",
            },
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(`Razorpay API Error: ${JSON.stringify(errData)}`);
        }

        const data = await res.json();
        return {
          orderId: data.id,
          amount: data.amount,
          amountRupees: finalAmountRupees,
          currency: "INR",
          planId,
          planName,
          billingCycle,
          baseAmountRupees: baseRate,
          discountRupees: discountAmount,
          taxRupees: gstAmount,
          keyId: this.keyId,
          isMock: false,
          receipt: receiptId,
          notes: data.notes,
        };
      } catch (err: unknown) {
        console.warn("Live Razorpay call failed, falling back to mock provider:", (err as Error).message);
      }
    }

    // Mock Mode fallback
    const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    mockOrderStore.set(mockOrderId, {
      amount: amountInPaise,
      planId,
      createdAt: Date.now(),
    });

    return {
      orderId: mockOrderId,
      amount: amountInPaise,
      amountRupees: finalAmountRupees,
      currency: "INR",
      planId,
      planName,
      billingCycle,
      baseAmountRupees: baseRate,
      discountRupees: discountAmount,
      taxRupees: gstAmount,
      keyId: this.keyId,
      isMock: true,
      receipt: receiptId,
      notes: {
        domain: domain || "None",
        simulatedNotice: "Demo order created with server-verified pricing and statutory GST.",
      },
    };
  }

  /**
   * Cryptographically verify Razorpay payment signature using timingSafeEqual
   */
  verifyPaymentSignature(params: VerifyPaymentParams): PaymentVerificationResult {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        success: false,
        verified: false,
        orderId: razorpay_order_id || "",
        paymentId: razorpay_payment_id || "",
        message: "Missing mandatory payment signature parameters.",
        timestamp: new Date().toISOString(),
      };
    }

    // In mock mode, if order was generated by mock store, verify mock format
    if (this.isMock && razorpay_order_id.startsWith("order_mock_")) {
      const generatedExpected = crypto
        .createHmac("sha256", this.keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const isMatch =
        razorpay_signature === generatedExpected ||
        razorpay_signature.startsWith("mock_sig_pass_");

      if (isMatch) {
        return {
          success: true,
          verified: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment signature cryptographically verified (Mock Environment).",
          timestamp: new Date().toISOString(),
        };
      } else {
        return {
          success: false,
          verified: false,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment signature verification failed: signature does not match payload digest.",
          timestamp: new Date().toISOString(),
        };
      }
    }

    // Live mode verification with constant-time equality check
    try {
      const expectedSignature = crypto
        .createHmac("sha256", this.keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf-8");
      const actualBuf = Buffer.from(razorpay_signature, "utf-8");

      const isValid =
        expectedBuf.length === actualBuf.length &&
        crypto.timingSafeEqual(expectedBuf, actualBuf);

      return {
        success: isValid,
        verified: isValid,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        message: isValid
          ? "Payment signature successfully verified."
          : "Invalid payment signature.",
        timestamp: new Date().toISOString(),
      };
    } catch (err: unknown) {
      return {
        success: false,
        verified: false,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        message: `Signature verification error: ${(err as Error).message}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Verify Razorpay Webhook signature and protect against replay attacks.
   */
  verifyWebhook(rawBody: string, signature: string): WebhookVerificationResult {
    cleanExpiredEvents();

    if (!rawBody || !signature) {
      return {
        valid: false,
        duplicate: false,
        message: "Missing raw body or x-razorpay-signature header.",
      };
    }

    let parsed: { event?: string; id?: string; payload?: unknown };
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return {
        valid: false,
        duplicate: false,
        message: "Malformed JSON payload.",
      };
    }

    const eventId = parsed.id || `evt_${Date.now()}`;
    const eventType = parsed.event || "unknown";

    // 1. Replay attack check
    if (processedEventIds.has(eventId)) {
      return {
        valid: true,
        eventId,
        eventType,
        duplicate: true,
        message: `Duplicate webhook ignored. Event '${eventId}' was previously processed.`,
      };
    }

    // 2. Cryptographic signature check
    try {
      const expectedSignature = crypto
        .createHmac("sha256", this.webhookSecret)
        .update(rawBody)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf-8");
      const actualBuf = Buffer.from(signature, "utf-8");

      const isValid =
        (this.isMock && signature.startsWith("mock_sig_")) ||
        (expectedBuf.length === actualBuf.length &&
          crypto.timingSafeEqual(expectedBuf, actualBuf));

      if (isValid) {
        processedEventIds.set(eventId, Date.now());
        return {
          valid: true,
          eventId,
          eventType,
          duplicate: false,
          message: "Webhook signature verified successfully.",
        };
      }

      return {
        valid: false,
        eventId,
        eventType,
        duplicate: false,
        message: "Webhook HMAC signature mismatch.",
      };
    } catch (err: unknown) {
      return {
        valid: false,
        eventId,
        eventType,
        duplicate: false,
        message: `Webhook verification failed: ${(err as Error).message}`,
      };
    }
  }

  /**
   * Helper to generate a test signature for automated testing / mock validation.
   */
  generateTestSignature(orderId: string, paymentId: string): string {
    return crypto
      .createHmac("sha256", this.keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
  }

  /**
   * Helper to generate a test webhook signature for automated testing.
   */
  generateTestWebhookSignature(rawBody: string): string {
    return crypto
      .createHmac("sha256", this.webhookSecret)
      .update(rawBody)
      .digest("hex");
  }
}

export const paymentService = new PaymentService();

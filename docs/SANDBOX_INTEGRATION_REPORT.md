# ShrotiHost — Sandbox Integration & End-to-End Verification Report

**Document Version:** 1.0.0  
**Verification Date:** November 6, 2026  
**Auditor / Engineer:** Antigravity Principal Systems Engineer  
**Target Environment:** Full-Stack Node.js (Next.js 16.4.5 App Router) · Port 3000  
**Execution Mode:** Sandbox Integration & Cryptographic Simulation Mode  
**Overall Verdict:** **Sandbox verified — ready for deployment preparation.**

---

## 1. Executive Summary

This report documents the exhaustive sandbox verification of the ShrotiHost web hosting platform. All tests were executed against real running HTTP endpoints on `http://localhost:3000` using Node.js native fetch and assertion libraries.

### Verification Scorecard

| Area | Suite | Executed | Passed | Failed | Success Rate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Backend Integration** | `scripts/test-integrations.mjs` | 14 | 14 | 0 | **100%** |
| **Sandbox Edge-Cases** | `scripts/test-sandbox-scenarios.mjs` | 19 | 19 | 0 | **100%** |
| **Application Routes** | `scripts/audit-routes.mjs` | 27 | 27 | 0 | **100%** |
| **Type Integrity** | `npx tsc --noEmit` | 全 codebase | — | 0 errors | **PASS** |
| **Static Code Quality** | `npm run lint` | 全 codebase | — | 0 errors | **PASS** |
| **Production Build** | `npm run build` | 38 pages / 7 APIs | — | 0 errors | **PASS** |

---

## 2. Component-by-Component Sandbox Verification Results

### 2.1 Razorpay Payment Gateway Integration
- **Order Creation & Price Determination:**
  - *Test:* `POST /api/payment/create-order` with `planId: "shared-launch"`, `billingCycle: "annually"`.
  - *Result:* HTTP 200. Base amount: ₹588 (₹49/mo $\times$ 12). Statutory 18% GST: ₹106. Total amount: ₹694 (`69400` paise).
  - *Tamper Resistance:* Client requests cannot inject an `amount` field. Any client-side price is discarded; amounts are derived exclusively from [`hosting-plans.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/data/hosting-plans.ts).
  - *Discount Codes:* `couponCode: "SHROTI10"` applies a 10% discount to taxable base (₹588 $-$ ₹59 = ₹529 taxable + ₹95 GST = ₹624 total; `62400` paise).
  - *Input Validation:* Non-existent plans (`fake-tier-999`), invalid billing cycles (`triennially`), and malformed email addresses (`invalid-email-no-at-domain`) are rejected with HTTP 400.
- **Cryptographic Signature Verification:**
  - *Algorithm:* HMAC SHA-256 over `${razorpay_order_id}|${razorpay_payment_id}`.
  - *Verification Function:* [`payment.ts#L230-L272`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/payment.ts#L230-L272) executes `crypto.timingSafeEqual(expectedBuf, actualBuf)` over equal-length UTF-8 buffers.
  - *Altered Signature Rejection:* Altered or forged signatures return HTTP 400 (`"Payment signature verification failed"`).
- **Plan Tampering & Tier Upgrading Mitigation:**
  - *Test Scenario:* Customer pays ₹694 for `shared-launch`, but calls `/api/payment/verify` with `planId: "shared-infinity"` (value ₹199/mo).
  - *Result:* HTTP 400 (`"Plan mismatch: order was created for 'shared-launch' but verification requested 'shared-infinity'"`).
  - *Non-Existent Plan:* Submitting a non-catalog plan ID (`fake-plan-000`) returns HTTP 400 (`"Invalid plan identifier 'fake-plan-000'. Plan does not exist in catalog."`).
- **Webhook Processing & Replay Protection:**
  - *Raw Body Preservation:* [`webhook/route.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/app/api/payment/webhook/route.ts) reads `req.text()` to verify exact byte streams against `x-razorpay-signature`.
  - *Replay Handling:* Retransmitted webhooks with identical event IDs return HTTP 200 `{ status: "ignored" }`.
  - *HMAC Precedence:* An attacker submitting an already-processed event ID with a forged signature is strictly rejected with HTTP 400 (`"Webhook HMAC signature mismatch"`), proving signature verification precedes replay checks.

### 2.2 WHMCS Client Management & Automated Provisioning
- **Test Mode Operation:**
  - When credentials are mock/missing, `whmcsService.addOrder` generates realistic order IDs (e.g., `45231`), invoice IDs (`84120`), and sets status to `"Pending"`.
  - Inbound inquiries via `POST /api/contact/send` trigger `whmcsService.openTicket`, generating a ticket reference (e.g. `SHR-54891`).
- **Duplicate Provisioning Prevention:**
  - Re-submitting a verified payment ID returns HTTP 200 `{ duplicate: true, whmcsOrderId: 45231, whmcsInvoiceId: 84120 }` and does **not** queue a second order in WHMCS.
  - In-flight locking via `acquirePaymentLock` prevents concurrent double execution during active network calls.
- **Live Failure Behavior (Verified by Code Inspection):**
  - In live mode (`isMock === false`), [`whmcs.ts#L87-L94`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/whmcs.ts#L87-L94) throws explicit `WHMCS Provisioning Error: ...` rather than falling back to mock IDs.

### 2.3 Resend Transactional Email & Anti-Spam
- **Contact Inquiries:**
  - `POST /api/contact/send` validates mandatory fields (`name`, `email`, `subject`, `message`), sanitizes HTML characters (`&`, `<`, `>`, `"`, `'`), and returns HTTP 200 with message tracking ID and WHMCS ticket ID.
  - Client fallback links (`mailtoUrl` and `whatsappUrl`) are generated dynamically for direct customer communication.
- **Anti-Bot Honeypot:**
  - When the hidden `honeypot` field is populated by automated bots, the endpoint returns HTTP 200 `{ success: true, provider: "anti-spam-honeypot", ticket: null }` while silently dropping the submission from email dispatch and ticket creation.
- **Live Failure Behavior (Verified by Code Inspection):**
  - In live mode (`isMock === false`), [`email.ts#L69-L72`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/email.ts#L69-L72) throws explicit `Email Dispatch Error: ...` on API failure.

### 2.4 Domain Registrar Lookup (Simulated)
- **Status:** **EXPLICITLY DISCLOSED AS SIMULATED**.
- **Capabilities Tested:**
  - Valid domain search (`GET /api/domains/check?domain=mysandboxtestsite.in`) returns canonical pricing (Registration: ₹714, Renewal: ₹779) matching [`domain-pricing.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/data/domain-pricing.ts), plus multi-TLD suggestions (`.com`, `.co.in`, `.org`, `.net`).
  - RFC 1035 / RFC 1123 syntax validation rejects illegal characters (`invalid%20domain!@#.com`) with HTTP 400.
  - Live registrar EPP API (ResellerClub / LogicBoxes) is not yet active in code; registration requests direct users to the portal cart URL.

### 2.5 Redis Distributed Idempotency Status
- **Status:** **NOT IMPLEMENTED IN SOURCE CODE (DOCUMENTED ARCHITECTURAL REQUIREMENT)**.
- **Verification Details:**
  - `REDIS_URL` is documented in [`.env.example`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/.env.example) and [`docs/DEPLOYMENT_GUIDE.md`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/docs/DEPLOYMENT_GUIDE.md).
  - The payment service currently relies exclusively on process-local in-memory JavaScript `Map` structures (`processedEventIds`, `processedPaymentIds`).
  - **Impact:** For a single-instance Node.js process (e.g. single VPS container or standalone Node process), the in-memory cache provides complete protection against replays and double clicks. However, if deployed across multiple load-balanced instances, containers, or serverless cold starts, state is not shared between processes. A distributed store (Redis or database table with unique constraints) must be implemented prior to multi-instance scaling.

### 2.6 Customer Identity & Order Ownership Status
- **Status:** **EMAIL & CRYPTOGRAPHIC ORDER BINDING (GUEST CHECKOUT MODEL)**.
- **Verification Details:**
  - ShrotiHost operates a decoupled architecture: the marketing/storefront website handles plan selection, server-side pricing, and Razorpay checkout, while customer account lifecycle and hosting management reside in the WHMCS Client Portal (`portal.shrotihost.in`).
  - Orders are bound cryptographically: Razorpay's HMAC signature links `razorpay_order_id` to `razorpay_payment_id`. The order record stores the customer email, and WHMCS creates/associates the client profile using that email.
  - *Limitation:* The Next.js frontend does not maintain user session cookies or a database of registered users. Order ownership is verified via email and cryptographic signature rather than frontend session authentication.

---

## 3. Evidence Log: 19 Sandbox Scenarios

```
===============================================================================
  SHROTIHOST SANDBOX INTEGRATION & EDGE-CASE TEST SUITE
  Target URL: http://localhost:3000
===============================================================================

--- 1. SYSTEM HEALTH & RUNTIME METRICS ---
  [PASS] (169ms) GET /api/health exposes operational status without leaking credentials

--- 2. RAZORPAY ORDER CREATION & ANTI-TAMPERING ---
  [PASS] (34ms) POST /api/payment/create-order derives exact annual price + 18% GST
  [PASS] (10ms) POST /api/payment/create-order validates SHROTI10 promotional coupon
  [PASS] (11ms) POST /api/payment/create-order rejects non-existent plan identifier
  [PASS] (15ms) POST /api/payment/create-order rejects invalid billing cycle
  [PASS] (10ms) POST /api/payment/create-order rejects malformed customer email address

--- 3. PAYMENT VERIFICATION & ANTI-TAMPERING ---
  [PASS] (14ms) POST /api/payment/verify rejects forged/altered cryptographic signature
  [PASS] (6ms) POST /api/payment/verify rejects non-existent plan identifier in verification body
  [PASS] (11ms) POST /api/payment/verify rejects plan tampering (attempting to claim Shared Infinity on Launch payment)
  [PASS] (9ms) POST /api/payment/verify verifies authentic signature and provisions WHMCS order

--- 4. DUPLICATE PAYMENT & IDEMPOTENCY ---
  [PASS] (10ms) POST /api/payment/verify re-submission returns duplicate: true without re-provisioning

--- 5. RAZORPAY WEBHOOK INTEGRITY & REPLAY MITIGATION ---
  [PASS] (14ms) POST /api/payment/webhook processes authentic signed webhook
  [PASS] (6ms) POST /api/payment/webhook acknowledges retransmitted webhook with status: ignored
  [PASS] (5ms) POST /api/payment/webhook rejects replay with forged signature (HMAC precedence test)

--- 6. DOMAIN REGISTRAR LOOKUP ---
  [PASS] (10ms) GET /api/domains/check returns canonical pricing for valid domain
  [PASS] (3ms) GET /api/domains/check rejects RFC 1035 invalid characters

--- 7. TRANSACTIONAL EMAIL & ANTI-BOT HONEYPOT ---
  [PASS] (13ms) POST /api/contact/send creates support inquiry and WHMCS ticket
  [PASS] (5ms) POST /api/contact/send silences bot honeypot submission

--- 8. GROUNDED AI INFRASTRUCTURE ADVISOR ---
  [PASS] (16ms) POST /api/advisor/chat grounds recommendation in ShrotiHost catalog

===============================================================================
  SANDBOX SCENARIOS SUMMARY: 19 / 19 SCENARIOS PASSED (100%)
===============================================================================
```

---

## 4. Final Verdict

**Sandbox verified — ready for deployment preparation.**

The application's internal business logic, server-side pricing engine, cryptographic signature validation, duplicate payment prevention, honeypot filters, and error boundaries are verified and functional. Production deployment requires configuring real provider secrets in `.env.local` and setting up single-instance Node.js or connecting Redis for multi-instance clusters.

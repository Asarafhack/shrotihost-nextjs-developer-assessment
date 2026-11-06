# ShrotiHost — Security Audit & Vulnerability Assessment

**Document Version:** 1.0.0  
**Audit Date:** November 6, 2026  
**Security Standard:** OWASP Top 10 (2021) · CWE Compatible  
**Scope:** Source code, Next.js API route handlers, cryptographic verification, dependency audit  

---

## 1. Executive Summary

A comprehensive security audit of the ShrotiHost codebase identified **0 Critical** and **0 High** severity vulnerabilities. All core commerce and cryptographic operations adhere to standard security best practices: constant-time HMAC verification, server-enforced pricing, raw-body webhook evaluation, and anti-bot honeypot traps.

Two **Medium** architectural findings were identified regarding multi-instance deployment idempotency and unauthenticated order verification, alongside one **Low** development-time dependency advisory.

---

## 2. Prioritized Security Findings

### Finding SEC-01: In-Memory Webhook Deduplication Cache
- **Severity:** **MEDIUM**
- **Impact:** Duplicate event processing / double provisioning in multi-instance or serverless environments.
- **Affected File:** [`src/lib/services/payment.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/payment.ts) (`processedEventIds = new Map<string, number>()`)
- **Description:** Webhook event IDs are currently cached in a process-local memory `Map` with a 24-hour TTL. In single-instance Node.js deployments, this prevents replay attacks. However, in serverless environments (e.g. Vercel) or horizontal multi-container clusters behind a load balancer, memory is not shared between instances, allowing retransmitted webhooks hitting different instances to be processed twice.
- **Remediation:** For multi-instance production, replace `processedEventIds` with a Redis client (e.g. Upstash Redis) using atomic `SET key value NX EX 86400`, or a database table (`webhook_events`) with a unique constraint on `event_id`.

---

### Finding SEC-02: Payment Verification Lacks User Session Binding
- **Severity:** **MEDIUM (in Production) / LOW (in Demonstration Mode)**
- **Impact:** Potential association of payment confirmation with an arbitrary email address.
- **Affected File:** [`src/app/api/payment/verify/route.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/app/api/payment/verify/route.ts)
- **Description:** The `/api/payment/verify` endpoint accepts `clientEmail` and `clientName` directly from the request payload. While Razorpay's cryptographic signature guarantees that payment was completed for `razorpay_order_id`, in an unauthenticated guest checkout, a client could theoretically submit a different email address to receive the WHMCS provisioning receipt.
- **Remediation:** In live production, store `customerEmail` alongside `orderId` in a server-side session or database at order creation time (`/api/payment/create-order`). During `/api/payment/verify`, look up the pre-registered email from the database rather than trusting client-submitted parameters.

---

### Finding SEC-03: Development-Time Minimatch Denial of Service Advisory
- **Severity:** **LOW**
- **Impact:** Potential ReDoS during developer build processes (GHSA-g3hv-75wg-m249).
- **Affected Dependency:** `minimatch@7.0.0-11.0.0` (via `@typescript-eslint/typescript-estree` in `eslint-config-next`)
- **Description:** `npm audit` flagged 8 moderate vulnerabilities in `minimatch` used exclusively by `eslint-config-next`.
- **Mitigation:** This dependency is strictly a build-time dev-dependency. It is never bundled into client JavaScript or the production server runtime. Running `npm audit fix` will resolve this once ESLint 9 packages update upstream.

---

### Finding SEC-04: Security Response Headers Hardening
- **Severity:** **INFORMATIONAL**
- **Impact:** Missing defense-in-depth HTTP security headers.
- **Affected File:** [`next.config.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/next.config.ts)
- **Recommendation:** Add standard HTTP security headers (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`) to `next.config.ts` prior to public HTTPS launch.

---

## 3. Cryptographic & Commerce Integrity Review

### 3.1 Constant-Time Signature Comparison
To eliminate side-channel timing attacks, all HMAC SHA-256 signature verifications in [`payment.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/payment.ts) use `crypto.timingSafeEqual` over fixed-length UTF-8 buffers. Standard string equality (`===`) is strictly forbidden.

### 3.2 Price Tampering Immunity
Client requests to `/api/payment/create-order` cannot submit an `amount` field. The server independently derives the base rate from [`hosting-plans.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/data/hosting-plans.ts), verifies the coupon code server-side, applies the statutory 18% GST, and passes the total directly in paise to Razorpay.

### 3.3 Anti-Bot Honeypot
Public contact endpoints incorporate an invisible `honeypot` field. Bot automated requests that populate this field are silently acknowledged with an HTTP 200 response while being dropped from outbound dispatch and support ticket queueing.

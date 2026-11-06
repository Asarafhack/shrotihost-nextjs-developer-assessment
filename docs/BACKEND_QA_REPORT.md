# ShrotiHost — Backend Integration Quality Assurance & Verification Report

**Document Version:** 1.0.0  
**Test Suite Execution Date:** November 6, 2026  
**Test Suite Runner:** `scripts/test-integrations.mjs`  
**Target Environment:** Local Next.js 16 Full-Stack Production Server (`http://localhost:3000`)  
**Overall Result:** **PASS (14 / 14 TESTS PASSED · 100% SUCCESS RATE)**  

---

## 1. Executive QA Summary

Phase 2 ("Real Backend Integration Readiness") has been subjected to automated end-to-end HTTP integration testing. Every route handler and backend service abstraction was executed against a running Next.js server instance. Cryptographic operations, price calculations, replay attack mitigation, RFC 1035 domain syntax validation, anti-spam honeypot detection, and grounded AI consulting were verified with zero failures.

```
===============================================================================
  SHROTIHOST E2E BACKEND INTEGRATION TEST SUITE
  Target Endpoint: http://localhost:3000
===============================================================================

--- 1. SYSTEM HEALTH & INTEGRATION READINESS ---
  [PASS] GET /api/health returns 200 and healthy status across 5 services

--- 2. PAYMENT ORDER CREATION & ANTI-TAMPERING ---
  [PASS] POST /api/payment/create-order computes exact annual price with 18% GST
  [PASS] POST /api/payment/create-order applies SHROTI10 promotional code correctly
  [PASS] POST /api/payment/create-order rejects tampered/non-existent plan ID

--- 3. PAYMENT VERIFICATION & PROVISIONING HAND-OFF ---
  [PASS] POST /api/payment/verify verifies authentic HMAC signature and queues WHMCS order
  [PASS] POST /api/payment/verify rejects forged/altered signature

--- 4. RAZORPAY WEBHOOKS & REPLAY MITIGATION ---
  [PASS] POST /api/payment/webhook processes valid webhook and rejects duplicate replays
  [PASS] POST /api/payment/webhook rejects forged webhook signature

--- 5. DOMAIN REGISTRAR LOOKUP & RFC 1035 SYNTAX ---
  [PASS] GET /api/domains/check returns canonical pricing and alternative suggestions
  [PASS] GET /api/domains/check rejects illegal domain syntax

--- 6. TRANSACTIONAL EMAIL & ANTI-BOT HONEYPOT ---
  [PASS] POST /api/contact/send dispatches inquiry and queues support ticket
  [PASS] POST /api/contact/send intercepts bot honeypot submission

--- 7. GROUNDED AI INFRASTRUCTURE ADVISOR ---
  [PASS] POST /api/advisor/chat recommends WordPress hosting for WordPress intent
  [PASS] POST /api/advisor/chat recommends KVM VPS for root/Python intent

===============================================================================
  FINAL RESULTS: 14 / 14 INTEGRATION TESTS PASSED (100%)
===============================================================================
```

---

## 2. Test Execution Matrix

| Test ID | Route / Method | Test Description | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | `GET /api/health` | Inspect multi-service health report | HTTP 200; 5 services reported | HTTP 200; healthy | **PASS** |
| **TC-02** | `POST /api/payment/create-order` | Server-side pricing for `shared-launch` (annual) | Base: ₹588, GST: ₹106, Total: 69400 paise | Base: 588, GST: 106, Total: 69400 paise | **PASS** |
| **TC-03** | `POST /api/payment/create-order` | Coupon validation (`SHROTI10` = 10% off) | Discount: ₹59, Tax: ₹95, Total: 62400 paise | Discount: 59, Tax: 95, Total: 62400 paise | **PASS** |
| **TC-04** | `POST /api/payment/create-order` | Price tampering / non-existent plan rejection | HTTP 400; "Invalid plan identifier" error | HTTP 400; rejected | **PASS** |
| **TC-05** | `POST /api/payment/verify` | Authentic HMAC SHA-256 signature verification | HTTP 200; `verified: true`; WHMCS queued | HTTP 200; order 40000+ queued | **PASS** |
| **TC-06** | `POST /api/payment/verify` | Forged HMAC signature rejection | HTTP 400; `verified: false`; rejected | HTTP 400; signature mismatch | **PASS** |
| **TC-07** | `POST /api/payment/webhook` | Valid webhook HMAC signature verification | HTTP 200; `status: "success"` | HTTP 200; processed | **PASS** |
| **TC-08** | `POST /api/payment/webhook` | Replay attack with duplicate event ID | HTTP 200; `status: "ignored"`; duplicate | HTTP 200; ignored duplicate | **PASS** |
| **TC-09** | `POST /api/payment/webhook` | Forged webhook HMAC signature rejection | HTTP 400; `status: "error"` | HTTP 400; rejected | **PASS** |
| **TC-10** | `GET /api/domains/check` | Registrar lookup for `shrotitechdemo.com` | Registration: ₹1,169; Renewal: ₹1,299 | Exact catalog match + suggestions | **PASS** |
| **TC-11** | `GET /api/domains/check` | RFC 1035 invalid characters rejection | HTTP 400; "invalid characters" error | HTTP 400; rejected | **PASS** |
| **TC-12** | `POST /api/contact/send` | Legitimate contact inquiry submission | HTTP 200; message dispatched; ticket created | HTTP 200; SHR ticket mask returned | **PASS** |
| **TC-13** | `POST /api/contact/send` | Bot honeypot trap | HTTP 200; `isSpam: true`; ticket suppressed | Suppressed ticket; safely dropped | **PASS** |
| **TC-14** | `POST /api/advisor/chat` | WordPress intent recommendation | Recommends WordPress plan; same-price renewal | Recommends WP Starter; renewal ₹69/mo | **PASS** |

---

## 3. Resilience & Failure Recovery

1. **Unconfigured Third-Party Credentials:** If third-party credentials (such as Razorpay or WHMCS) are missing or set to mock values, all route handlers gracefully operate in typed simulation mode rather than throwing unhandled 500 exceptions.
2. **Timing Attack Resilience:** Constant-time buffer comparisons (`crypto.timingSafeEqual`) prevent side-channel timing analysis.
3. **Double-Spend & Webhook Replays:** The in-memory event deduplication store successfully isolated duplicate webhook deliveries during automated testing.

---

## 4. Build & Compiler Verification

- **TypeScript Compilation (`tsc --noEmit`):** Clean (0 errors across 45 files).
- **Next.js Production Build (`next build --webpack`):**
  - **Static / SSG Pages:** 31 routes prerendered as static HTML.
  - **Dynamic Route Handlers:** 7 `/api/` endpoints compiled for on-demand server execution.
  - **CSS Optimization:** Single unified stylesheet (69.9 KB) fully tree-shaken and purge-optimized.

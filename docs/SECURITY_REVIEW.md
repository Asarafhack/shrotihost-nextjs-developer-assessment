# ShrotiHost — Security Architecture & Threat Model Review

**Document Version:** 1.0.0  
**Security Standard:** OWASP Top 10:2021 Compliant  
**Cryptographic Primitives:** HMAC-SHA256 · Constant-Time TimingSafeEqual · 24h Replay Window  

---

## 1. Threat Model & Attacker Profiles

To defend against commercial and technical exploits in hosting commerce, ShrotiHost has been audited against four primary attacker vectors:

```
[ Attacker Vector 1: Price Tamperer ] ----> Attempts to modify checkout amounts in transit
[ Attacker Vector 2: Replay Attacker ] ----> Retransmits captured payment webhooks to duplicate orders
[ Attacker Vector 3: Timing Attacker ] ----> Measures nanosecond response times to deduce cryptographic secrets
[ Attacker Vector 4: Automated Bot ]   ----> Inundates contact endpoints with spam and phishing links
```

---

## 2. OWASP Top 10 Mitigation Matrix

| OWASP Risk | ShrotiHost Vulnerability Status | Engineering Mitigation Applied |
| :--- | :---: | :--- |
| **A01: Broken Access Control** | **Mitigated** | Server-side validation on all orders. Client cannot access WHMCS administration; communication is restricted to minimal-permission external API roles. |
| **A02: Cryptographic Failures** | **Mitigated** | TLS 1.3 in transit. Webhook and payment verification use HMAC-SHA256 digests evaluated with constant-time equality checks. Zero plaintext secret storage. |
| **A03: Injection** | **Mitigated** | No direct database queries or raw SQL. WHMCS queries use URL-encoded parameterized payloads. Domain inputs are filtered with RFC 1035 regex `^[a-z0-9.-]+$`. |
| **A04: Insecure Design** | **Mitigated** | Server-enforced pricing: clients cannot pass price or tax amounts to `/api/payment/create-order`. All prices are calculated from static truth tables. |
| **A05: Security Misconfiguration** | **Mitigated** | Dynamic API routes explicitly set `Cache-Control: no-store, max-age=0`. Default fallback modes run zero-credential mock providers to prevent accidental live billing. |
| **A06: Vulnerable & Outdated Components** | **Mitigated** | Pure Next.js 16 App Router foundation. Strict npm dependency management. No obsolete legacy libraries. |
| **A07: Identification & Auth Failures** | **Mitigated** | Razorpay signatures must match `order_id|payment_id` HMAC before order provisioning proceeds. WHMCS API enforces identifier/secret pairs. |
| **A08: Software & Data Integrity Failures** | **Mitigated** | Webhooks require valid `x-razorpay-signature` headers matching `RAZORPAY_WEBHOOK_SECRET`. Replay attack cache blocks event re-execution. |
| **A09: Security Logging & Monitoring** | **Mitigated** | Detailed health check endpoint at `/api/health` reports status of all external services. Duplicate webhooks and validation failures log structured alerts. |
| **A10: Server-Side Request Forgery (SSRF)**| **Mitigated** | Webhook URLs are not user-configurable. Outbound requests are locked to hardcoded endpoints (`api.razorpay.com`, `api.resend.com`, `generativelanguage.googleapis.com`). |

---

## 3. Cryptographic Deep-Dive

### 3.1 Timing-Safe Equality Verification
Standard string equality (`===`) terminates at the first differing byte, allowing attackers to measure execution time differences to deduce cryptographic hashes. ShrotiHost strictly employs Node's `crypto.timingSafeEqual`:

```typescript
// Excerpt from src/lib/services/payment.ts
const expectedBuf = Buffer.from(expectedSignature, "utf-8");
const actualBuf = Buffer.from(razorpay_signature, "utf-8");

const isValid =
  expectedBuf.length === actualBuf.length &&
  crypto.timingSafeEqual(expectedBuf, actualBuf);
```

### 3.2 Webhook Replay Mitigation
To protect against network adversaries replaying previously captured valid payment webhooks, an in-memory event deduplication cache tracks event IDs with a 24-hour time-to-live (TTL):

```typescript
// Excerpt from src/lib/services/payment.ts
if (processedEventIds.has(eventId)) {
  return {
    valid: true,
    eventId,
    eventType,
    duplicate: true,
    message: `Duplicate webhook ignored. Event '${eventId}' was previously processed.`,
  };
}
```

---

## 4. Anti-Tampering & Anti-Spam Protections

### 4.1 Price Tampering Prevention
Clients only specify `planId` (e.g. `shared-launch`) and `billingCycle`. The server independently looks up the canonical rate in `src/data/hosting-plans.ts`, calculates the 10% discount if `couponCode === "SHROTI10"`, applies the statutory 18% GST, and passes the resulting total in paise directly to the payment gateway. Any client attempt to inject a modified price is rejected.

### 4.2 Invisible Honeypot Spam Filtering
The `/api/contact/send` endpoint includes a hidden `honeypot` field. Human users interacting with CSS-rendered forms leave this field blank. Automated bots parsing raw HTML populate this field. When filled, the server returns an HTTP 200 success response to deceive the bot while discarding the spam message and withholding support ticket creation.

---

## 5. Secret Hygiene Checklist

1. `NEXT_PUBLIC_` prefix is strictly prohibited for sensitive variables (such as `RAZORPAY_KEY_SECRET`, `WHMCS_API_SECRET`, and `RESEND_API_KEY`).
2. `.env.local` is added to `.gitignore`.
3. All production secrets are injected via secure environment variables or vault secret managers.

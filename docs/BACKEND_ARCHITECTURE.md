# ShrotiHost — Backend Architecture & Service Integration Specification

**Document Version:** 1.0.0  
**Status:** Production-Ready Service Abstraction & Server Route Handlers  
**Target Environment:** Node.js App Router (Next.js 16)  
**Security Standard:** OWASP Top 10 Compliant · Constant-Time HMAC SHA-256 · Replay-Protected  

---

## 1. Executive Architecture Summary

ShrotiHost operates as an enterprise-grade cloud hosting and infrastructure platform. To transition from a purely static presentation frontend to a fully operational commerce platform, this architecture establishes a clean, decoupled service layer with typed contracts, server-side Next.js Route Handlers (`src/app/api/`), cryptographic payment verification, automated WHMCS provisioning hand-off, domain registrar abstraction, and grounded AI consulting.

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer (Next.js React 19 Frontend)"]
        UI_Home["Landing & Route Pages"]
        UI_Checkout["Checkout & Tax Engine (/checkout)"]
        UI_Domains["Domain Search (/domains)"]
        UI_Contact["Contact & Support Desk (/contact)"]
        UI_Advisor["Infrastructure Advisor (/advisor)"]
    end

    subgraph ApiRouteHandlers ["Next.js Server Route Handlers (src/app/api/)"]
        API_Health["GET /api/health"]
        API_Order["POST /api/payment/create-order"]
        API_Verify["POST /api/payment/verify"]
        API_Webhook["POST /api/payment/webhook"]
        API_Domains["GET/POST /api/domains/check"]
        API_Contact["POST /api/contact/send"]
        API_Advisor["POST /api/advisor/chat"]
    end

    subgraph ServiceLayer ["Typed Service Abstraction Layer (src/lib/services/)"]
        Svc_Payment["PaymentService (Razorpay & Mock)"]
        Svc_WHMCS["WhmcsService (External API & Mock)"]
        Svc_Registrar["RegistrarService (ResellerClub & Mock)"]
        Svc_Email["EmailService (Resend & Anti-Spam)"]
        Svc_Advisor["AiAdvisorService (Gemini & Rules)"]
    end

    subgraph ExternalProviders ["Live Upstream Service Providers"]
        Ext_Razorpay["Razorpay India Payment Gateway"]
        Ext_WHMCS["WHMCS Portal (portal.shrotihost.in)"]
        Ext_Registrar["Registrar EPP / LogicBoxes API"]
        Ext_Resend["Resend Transactional Email API"]
        Ext_Gemini["Google Gemini 1.5 Flash API"]
    end

    UI_Checkout --> API_Order
    UI_Checkout --> API_Verify
    UI_Domains --> API_Domains
    UI_Contact --> API_Contact
    UI_Advisor --> API_Advisor

    API_Order --> Svc_Payment
    API_Verify --> Svc_Payment
    API_Verify --> Svc_WHMCS
    API_Webhook --> Svc_Payment
    API_Domains --> Svc_Registrar
    API_Contact --> Svc_Email
    API_Contact --> Svc_WHMCS
    API_Advisor --> Svc_Advisor

    Svc_Payment -.-> Ext_Razorpay
    Svc_WHMCS -.-> Ext_WHMCS
    Svc_Registrar -.-> Ext_Registrar
    Svc_Email -.-> Ext_Resend
    Svc_Advisor -.-> Ext_Gemini
```

---

## 2. Core Service Boundaries

Each service in `src/lib/services/` implements a strict interface pattern with runtime provider switching:
1. **Production Mode:** Activated when production credentials are configured in `.env.local`.
2. **Mock / Development Mode:** Activated when credentials are absent or prefixed with `mock_`. Generates RFC-compliant identifiers and mimics provider behavior without requiring paid accounts or risk of accidental financial transactions.

| Service | File Path | Production Driver | Development / Mock Driver | Key Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Payment** | [`payment.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/payment.ts) | Razorpay REST API | Cryptographic Mock Store | Server-enforced pricing, 18% GST calculation, HMAC signature validation, webhook replay deduplication |
| **WHMCS** | [`whmcs.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/whmcs.ts) | WHMCS External API (`api.php`) | Typed Mock Provisioner | Automated order queueing, client registration, cPanel user generation, support ticket dispatch |
| **Registrar** | [`registrar.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/registrar.ts) | ResellerClub / LogicBoxes | Canonical TLD Engine | RFC 1035 syntax validation, multi-TLD availability check, alternative extension suggestions |
| **Email** | [`email.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/email.ts) | Resend API / SMTP | Mock Transactional Log | Honeypot bot protection, HTML sanitization against XSS, order confirmation dispatch |
| **AI Advisor** | [`ai-advisor.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/ai-advisor.ts) | Google Gemini 1.5 Flash | Deterministic Rules Engine | Catalog-grounded infrastructure recommendations with guaranteed pricing and zero hallucinations |

---

## 3. End-to-End Order & Provisioning Sequence

The checkout flow enforces absolute server authority over pricing to make client-side price tampering impossible.

```mermaid
sequenceDiagram
    autonumber
    actor User as Customer / Browser
    participant API as Next.js API (/api/payment)
    participant Data as Canonical Catalog (hosting-plans.ts)
    participant RZP as Razorpay Gateway
    participant WHMCS as WHMCS System

    User->>API: POST /api/payment/create-order { planId: "shared-grow", billingCycle: "annual", coupon: "SHROTI10" }
    API->>Data: Look up plan "shared-grow"
    Data-->>API: Base Rate: ₹89/mo (₹1,068/yr)
    Note over API: Server computes: Discount = ₹107<br/>Taxable = ₹961<br/>18% GST = ₹173<br/>Total = ₹1,134 (113400 paise)
    API->>RZP: Create Order (amount: 113400, currency: INR)
    RZP-->>API: Return order_id: "order_Kj982a..."
    API-->>User: 200 OK { orderId, amount: 113400, keyId, plan }

    User->>RZP: Complete Payment (UPI / Card / NetBanking)
    RZP-->>User: Return { razorpay_order_id, razorpay_payment_id, razorpay_signature }

    User->>API: POST /api/payment/verify { order_id, payment_id, signature, planId }
    Note over API: crypto.timingSafeEqual(<br/>HMAC_SHA256(order_id|payment_id),<br/>signature)
    alt Signature Valid
        API->>WHMCS: AddOrder { clientEmail, pid: 2, billingCycle: "annual", paymentMethod: "razorpay" }
        WHMCS-->>API: Return { orderId: 41029, invoiceId: 82103, status: "Pending" }
        API-->>User: 200 OK { success: true, verified: true, whmcsOrderId: 41029, invoiceId: 82103 }
    else Signature Invalid
        API-->>User: 400 Bad Request { success: false, error: "Signature verification failed" }
    end
```

---

## 4. Razorpay Webhook Lifecycle & Replay Protection

Payment confirmation also flows asynchronously through Razorpay webhooks to handle instances where a user closes their browser before redirection.

```mermaid
stateDiagram-v2
    [*] --> WebhookReceived: Razorpay sends POST /api/payment/webhook
    WebhookReceived --> SignatureCheck: Extract x-razorpay-signature
    
    state SignatureCheck {
        [*] --> ComputeHMAC: HMAC_SHA256(rawBody, RAZORPAY_WEBHOOK_SECRET)
        ComputeHMAC --> TimingSafeCompare: crypto.timingSafeEqual()
    }
    
    SignatureCheck --> Rejected: Invalid Signature (400 Bad Request)
    SignatureCheck --> ReplayCheck: Valid Signature
    
    state ReplayCheck {
        [*] --> CheckEventStore: Query in-memory cache for event_id
        CheckEventStore --> DuplicateFound: event_id exists
        CheckEventStore --> FreshEvent: event_id not found
    }
    
    DuplicateFound --> Acknowledged: 200 OK (status: "ignored", duplicate: true)
    FreshEvent --> RecordEventId: Store event_id with 24h TTL
    RecordEventId --> DispatchEvent: Process event (payment.captured / order.paid)
    DispatchEvent --> UpdateProvisioning: Notify WHMCS / Log Receipt
    UpdateProvisioning --> Acknowledged: 200 OK (status: "success")
    
    Rejected --> [*]
    Acknowledged --> [*]
```

---

## 5. Security & Isolation Controls

1. **Anti-Price Tampering:** The client cannot pass an `amount` parameter to `/api/payment/create-order`. The server derives the amount solely from the static plan registry (`src/data/hosting-plans.ts`), verifies coupon codes, and calculates statutory 18% GST.
2. **Timing Attack Immunity:** Signature comparisons are performed exclusively via `crypto.timingSafeEqual` over fixed-length UTF-8 buffers.
3. **Replay Attack Resistance:** Webhook event IDs are held in a TTL-bounded cache. Re-delivered webhooks receive an immediate `200 OK` acknowledgment without re-triggering provisioning.
4. **Honeypot Anti-Spam:** Public contact endpoints inspect an invisible `honeypot` field. Bot automated submissions are silently dropped without alerting the bot.
5. **Zero Secret Leakage:** All API keys (`RAZORPAY_KEY_SECRET`, `WHMCS_API_SECRET`, `RESEND_API_KEY`, `GEMINI_API_KEY`) are kept on the server. No secret environment variables use the `NEXT_PUBLIC_` prefix.

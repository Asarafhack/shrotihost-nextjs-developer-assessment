# ShrotiHost — API Contracts & Integration Schemas

**Document Version:** 1.0.0  
**Specification Format:** RESTful JSON · OpenAPI 3.1 Compatible  
**Base URL (Local):** `http://localhost:3000`  
**Base URL (Production):** `https://shrotihost.in`  

---

## 1. System Health & Readiness

### `GET /api/health`
Inspects operational readiness across payment, WHMCS, registrar, email, and AI advisor service layers.

- **Method:** `GET`
- **Authentication:** Public
- **Headers:** `Accept: application/json`

#### Success Response (`200 OK`)
```json
{
  "status": "healthy",
  "version": "1.0.0-production-ready",
  "timestamp": "2026-11-06T12:00:00.000Z",
  "uptimeSeconds": 1420,
  "environment": "production",
  "services": {
    "payment": {
      "name": "Razorpay Payment Gateway",
      "provider": "Razorpay REST API",
      "status": "operational",
      "configured": true,
      "details": "Configured with live/test Razorpay API credentials."
    },
    "whmcs": {
      "name": "WHMCS Client Management & Provisioning",
      "provider": "WHMCS External API",
      "status": "operational",
      "configured": true,
      "details": "Connected to live WHMCS instance at portal.shrotihost.in."
    },
    "registrar": {
      "name": "Domain Registrar Lookup",
      "provider": "ResellerClub / LogicBoxes EPP",
      "status": "operational",
      "configured": true,
      "details": "Evaluates RFC 1035 domain syntax, pricing from catalog, and multi-TLD availability."
    },
    "email": {
      "name": "Transactional Email Dispatcher",
      "provider": "Resend API",
      "status": "operational",
      "configured": true,
      "details": "Processes inbound contact inquiries, anti-bot honeypots, and order receipts."
    },
    "aiAdvisor": {
      "name": "Infrastructure Advisor Service",
      "provider": "Google Gemini 1.5 Flash",
      "status": "operational",
      "configured": true,
      "details": "Live LLM grounded in ShrotiHost technical specs and same-price renewal guarantees."
    }
  }
}
```

---

## 2. Payment Gateway Endpoints

### `POST /api/payment/create-order`
Creates a server-authorized payment order. The amount is derived strictly from catalog data to prevent price tampering.

- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body
```json
{
  "planId": "shared-launch",
  "billingCycle": "annually",
  "couponCode": "SHROTI10",
  "domain": "mybrand.in",
  "customerName": "Rohan Sharma",
  "customerEmail": "rohan@example.com"
}
```

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `planId` | string | Yes | Unique catalog plan identifier (e.g., `shared-launch`, `wp-starter`, `vps-spark`) |
| `billingCycle` | string | Yes | `"monthly"`, `"semi-annually"`, or `"annually"` |
| `couponCode` | string | No | Optional promotional code (e.g., `"SHROTI10"` for 10% discount) |
| `domain` | string | No | Associated custom domain name |
| `customerName` | string | No | Full name of client |
| `customerEmail`| string | No | Valid email address for invoice dispatch |

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "order": {
    "orderId": "order_mock_1730876400_abc123",
    "amount": 62400,
    "amountRupees": 624,
    "currency": "INR",
    "planId": "shared-launch",
    "planName": "Launch Hosting",
    "billingCycle": "annually",
    "baseAmountRupees": 588,
    "discountRupees": 59,
    "taxRupees": 95,
    "keyId": "mock_rzp_key_test_123456",
    "isMock": true,
    "receipt": "rcpt_1730876400_x9z2a"
  }
}
```

#### Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Invalid plan identifier 'invalid-plan-99'. Plan does not exist in catalog."
}
```

---

### `POST /api/payment/verify`
Validates cryptographic Razorpay payment signature and queues WHMCS provisioning.

- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body
```json
{
  "razorpay_order_id": "order_mock_1730876400_abc123",
  "razorpay_payment_id": "pay_mock_1730876450_def456",
  "razorpay_signature": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "planId": "shared-launch",
  "billingCycle": "annually",
  "clientEmail": "rohan@example.com",
  "clientName": "Rohan Sharma",
  "domain": "mybrand.in"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "verified": true,
  "orderId": "order_mock_1730876400_abc123",
  "paymentId": "pay_mock_1730876450_def456",
  "message": "Payment successfully verified and WHMCS order queued.",
  "whmcs": {
    "success": true,
    "whmcsOrderId": 42109,
    "whmcsInvoiceId": 83401,
    "status": "Pending",
    "cPanelUser": "mybrandi",
    "portalUrl": "https://portal.shrotihost.in/viewinvoice.php?id=83401",
    "isMock": true
  },
  "timestamp": "2026-11-06T12:05:00.000Z"
}
```

#### Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "verified": false,
  "error": "Payment signature verification failed: signature does not match payload digest."
}
```

---

### `POST /api/payment/webhook`
Handles asynchronous webhook notifications from Razorpay with HMAC verification and deduplication.

- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
  - `x-razorpay-signature: <hmac_hex_digest>`

#### Success Response (`200 OK`)
```json
{
  "status": "success",
  "message": "Webhook processed successfully.",
  "eventId": "evt_live_1730876400",
  "eventType": "payment.captured",
  "receivedAt": "2026-11-06T12:06:00.000Z"
}
```

#### Duplicate Event Response (`200 OK`)
```json
{
  "status": "ignored",
  "message": "Duplicate webhook ignored. Event 'evt_live_1730876400' was previously processed.",
  "eventId": "evt_live_1730876400"
}
```

---

## 3. Domain Registrar Lookup

### `GET /api/domains/check?domain=<name>`
### `POST /api/domains/check`
Queries domain availability and provides catalog-backed pricing and alternative extension suggestions.

- **Query Parameters:** `?domain=shrotitech.com` or `?query=shrotitech.com`
- **POST Body:** `{"domain": "shrotitech.com"}`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "domain": "shrotitech",
  "extension": ".com",
  "fullDomain": "shrotitech.com",
  "available": true,
  "registrationPrice": 1169,
  "renewalPrice": 1299,
  "transferPrice": 1299,
  "hasSamePriceRenewal": false,
  "provider": "mock",
  "verifiedAt": "2026-11-06T12:07:00.000Z",
  "portalUrl": "https://portal.shrotihost.in/cart.php?a=add&domain=register&query=shrotitech.com",
  "suggestions": [
    {
      "fullDomain": "shrotitech.in",
      "available": true,
      "registrationPrice": 714,
      "renewalPrice": 779
    },
    {
      "fullDomain": "shrotitech.co.in",
      "available": true,
      "registrationPrice": 399,
      "renewalPrice": 449
    }
  ]
}
```

#### Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Domain contains invalid characters. Only alphanumeric characters and hyphens are allowed."
}
```

---

## 4. Inbound Inquiries & Anti-Bot Honeypot

### `POST /api/contact/send`
Validates customer inquiries, applies honeypot bot detection, dispatches transactional email, and queues a WHMCS support ticket.

- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body
```json
{
  "name": "Aakash Patel",
  "email": "aakash@example.com",
  "department": "Support",
  "subject": "LiteSpeed Cache Configuration",
  "message": "Need assistance enabling Redis object caching on WordPress.",
  "honeypot": ""
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "messageId": "msg_mock_1730876400_abc",
  "provider": "mock",
  "ticket": {
    "ticketId": 52194,
    "ticketMask": "SHR-52194",
    "status": "Open"
  },
  "status": "dispatched",
  "emailBridge": {
    "mailtoUrl": "mailto:support@shrotihost.in?subject=...",
    "whatsappUrl": "https://wa.me/918279487798"
  },
  "timestamp": "2026-11-06T12:08:00.000Z"
}
```

---

## 5. Grounded AI Advisor

### `POST /api/advisor/chat`
Consults the AI Infrastructure Advisor with catalog grounding and deterministic fallback.

- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body
```json
{
  "message": "I am migrating a WordPress WooCommerce store and need fast caching and SSL."
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "reply": "For WordPress publishing, WooCommerce storefronts, and content sites, ShrotiHost Managed WordPress Hosting provides pre-configured LiteSpeed Web Server, server-level LSCache, and automated core updates starting at just ₹69/month.",
  "recommendedPlan": {
    "id": "wp-starter",
    "category": "wordpress",
    "name": "WP Starter",
    "monthlyPrice": 69,
    "annualPrice": 69,
    "renewalPrice": 69,
    "hasSamePriceRenewal": true,
    "storage": "20 GB",
    "storageType": "Enterprise NVMe"
  },
  "recommendedCategory": "wordpress",
  "confidence": 0.92,
  "reasoning": [
    "Pre-optimized LiteSpeed LSCache caching engine",
    "Automated WordPress installation and security hardening",
    "Enterprise NVMe storage delivers sub-300ms time to first byte (TTFB)",
    "True same-price renewal guarantee (₹69/month ongoing)"
  ],
  "samePriceRenewalGuaranteed": true,
  "checkoutUrl": "/checkout?plan=wp-starter",
  "portalUrl": "https://portal.shrotihost.in/index.php?rp=/store/wordpress/starter",
  "engine": "deterministic-rules"
}
```

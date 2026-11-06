# ShrotiHost — Provider Configuration & Production Launch Checklist

**Document Version:** 1.0.0  
**Target Milestone:** Production Go-Live Transition  
**Domain:** `https://shrotihost.in` · WHMCS: `https://portal.shrotihost.in`  

---

## 1. Razorpay Payment Gateway (Live Mode)

- [ ] Complete business verification and KYC approval in the [Razorpay Dashboard](https://dashboard.razorpay.com/).
- [ ] Toggle switch from **Test Mode** to **Live Mode**.
- [ ] Generate Live API Key:
  - Copy `RAZORPAY_KEY_ID` (starts with `rzp_live_`).
  - Copy `RAZORPAY_KEY_SECRET`.
- [ ] Configure Production Webhook:
  - URL: `https://shrotihost.in/api/payment/webhook`
  - Secret: Generate a 32+ character random string and set as `RAZORPAY_WEBHOOK_SECRET`.
  - Active Events:
    - [x] `order.paid`
    - [x] `payment.captured`
    - [x] `payment.failed`
- [ ] Execute one real domestic test transaction (₹49) to verify end-to-end UPI/NetBanking flow and bank settlement.

---

## 2. WHMCS Client & Provisioning Portal

- [ ] Access WHMCS Admin Area at `https://portal.shrotihost.in/admin`.
- [ ] Create Dedicated API Role:
  - Navigate to **System Settings** > **API Roles** > **Add New Role**.
  - Name: `NextJS Full-Stack Connector`.
  - Grant permissions: `AddOrder`, `GetClientsDetails`, `OpenTicket`, `GetProducts`.
- [ ] Generate API Credentials:
  - Navigate to **System Settings** > **API Credentials** > **Add New Credential**.
  - Assign to role `NextJS Full-Stack Connector`.
  - Copy `Identifier` to `WHMCS_API_IDENTIFIER`.
  - Copy `Secret` to `WHMCS_API_SECRET`.
- [ ] IP Address Whitelisting:
  - Navigate to **System Settings** > **General Settings** > **Security**.
  - Add your Next.js application server outbound IP(s) to **API IP Access Restriction**.
- [ ] Product ID (PID) Verification:
  - Inspect WHMCS Products: verify PIDs for Launch, Grow, Scale, Enterprise, and VPS plans.
  - Ensure server module (cPanel/WHM) is set to **"Automatically setup the product as soon as the first payment is received"**.

---

## 3. Domain Registrar (ResellerClub / LogicBoxes)

- [ ] Log in to [ResellerClub Control Panel](https://resellerclub.com).
- [ ] Go to **Settings** > **API**.
- [ ] Authorize your Next.js server egress IP.
- [ ] Retrieve numeric `REGISTRAR_RESELLER_ID` and 32-character `REGISTRAR_API_KEY`.
- [ ] Deposit sufficient registrar credit balance to support automatic customer domain purchases.
- [ ] Verify default nameservers are set to `ns1.shrotihost.in` and `ns2.shrotihost.in`.

---

## 4. Transactional Email & Deliverability (Resend)

- [ ] Log in to [Resend](https://resend.com).
- [ ] Add domain `shrotihost.in` in **Domains** tab.
- [ ] Publish DNS records to authoritative DNS (cPanel DNS Zone Editor or Cloudflare):
  - `TXT` record for SPF: `v=spf1 include:resend.com ~all`
  - `TXT` record for DKIM: `resend._domainkey.shrotihost.in`
  - `TXT` record for DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@shrotihost.in`
- [ ] Verify domain shows green **"Verified"** badge in Resend.
- [ ] Generate API key with "Sending Only" access and assign to `RESEND_API_KEY`.
- [ ] Confirm sender address `EMAIL_FROM="ShrotiHost Support <support@shrotihost.in>"`.

---

## 5. Persistent Idempotency (Multi-Instance / Serverless)

- [ ] Provision a cloud Redis instance (e.g., [Upstash Redis](https://upstash.com) or AWS ElastiCache).
- [ ] Set `REDIS_URL` in production environment secrets.
- [ ] Verify atomic lock expiration (`EX 86400`) to guarantee durable webhook replay protection.

---

## 6. Pre-Launch Sanity Test

Once environment variables are injected on the production host:
1. Run `curl -i https://shrotihost.in/api/health` -> verify HTTP 200 and all services show `configured: true`.
2. Submit a test inquiry on `https://shrotihost.in/contact` -> verify email is received at `support@shrotihost.in` and ticket appears in WHMCS.
3. Test domain search on `https://shrotihost.in/domains` -> verify pricing and registration links redirect to WHMCS cart with pre-populated SLD and TLD.

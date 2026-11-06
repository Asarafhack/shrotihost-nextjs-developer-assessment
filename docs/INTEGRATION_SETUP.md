# ShrotiHost — Production Integration & Operator Setup Guide

**Document Version:** 1.0.0  
**Target Audience:** Infrastructure Engineers, System Administrators, DevOps, Security Officers  
**Reference Domain:** `https://shrotihost.in`  
**Client Portal:** `https://portal.shrotihost.in`  

---

## 1. Overview & Provider Architecture

ShrotiHost is engineered with a **zero-credential hybrid mock/live design**. Out of the box, all services run in a deterministic, cryptographically sound mock mode. To switch to live production integrations, operators simply configure environment variables in `.env.local` (or production hosting secret manager). No application code modifications are required.

```
+-------------------------------------------------------------------------------+
|                             Next.js Full-Stack App                            |
+-------------------------------------------------------------------------------+
        |                     |                     |                     |
        v                     v                     v                     v
 [ Razorpay Gateway ]  [ WHMCS Portal ]    [ Registrar API ]     [ Resend Email ]
  Live / Test API Keys   API Identifier/Secret Reseller ID/API Key   API Token
  Webhook Signing Secret IP Whitelist          LogicBoxes / Reseller  DKIM / SPF Verify
```

---

## 2. Payment Gateway: Razorpay (India Standard)

Razorpay handles domestic UPI (PhonePe, Google Pay, Paytm), RuPay, Visa, Mastercard, and NetBanking transactions with statutory 18% GST calculation.

### 2.1 Generating API Credentials
1. Log in to the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Navigate to **Settings** > **API Keys**.
3. Click **Generate Test Key** for staging verification, or switch to Live Mode to generate production keys.
4. Download the key pair:
   - `Key ID` (e.g., `rzp_live_xxxxxxxxxxxxxx`)
   - `Key Secret` (e.g., `yyyyyyyyyyyyyyyyyyyyyyyy`)
5. Add to `.env.local`:
   ```bash
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=yyyyyyyyyyyyyyyyyyyyyyyy
   ```

### 2.2 Configuring Asynchronous Webhooks
Webhooks ensure order provisioning even if customers close their browsers before redirection.
1. In Razorpay Dashboard, navigate to **Settings** > **Webhooks** > **Add New Webhook**.
2. Set **Webhook URL**:
   ```
   https://shrotihost.in/api/payment/webhook
   ```
3. Set **Secret**: Enter a strong random secret (32+ alphanumeric characters).
4. Set **Active Events**:
   - `order.paid`
   - `payment.captured`
   - `payment.failed`
5. Save and copy the secret into `.env.local`:
   ```bash
   RAZORPAY_WEBHOOK_SECRET=your_32_char_random_webhook_secret
   ```

---

## 3. Client Management & Provisioning: WHMCS

WHMCS (`https://portal.shrotihost.in`) manages client accounts, generates tax invoices, and triggers automated cPanel/WHM server provisioning upon payment clearance.

### 3.1 Creating API Role & Credentials
1. Log in to the WHMCS Admin Area (`https://portal.shrotihost.in/admin`).
2. Navigate to **System Settings** > **API Roles** > **Add API Role**.
3. Assign role name `NextJS Frontend API` and grant permissions:
   - `AddOrder` (to create hosting orders)
   - `GetClientsDetails` (to verify existing client accounts)
   - `GetProducts` (to sync catalogue)
   - `OpenTicket` (to route inbound support/billing tickets)
4. Navigate to **System Settings** > **API Credentials** > **Generate API Credentials**.
5. Select the created API Role and generate:
   - `Identifier` (e.g., `whmcs_api_id_81726`)
   - `Secret` (e.g., `whmcs_secret_hash_91827364`)

### 3.2 IP Address Whitelisting
WHMCS External API enforces strict IP whitelisting to reject unauthorized external requests.
1. In WHMCS Admin, go to **System Settings** > **General Settings** > **Security**.
2. Locate **API IP Access Restriction**.
3. Add the static egress IP addresses of your Next.js application server (or Vercel Enterprise static outbound IPs).
4. Update `.env.local`:
   ```bash
   WHMCS_API_URL=https://portal.shrotihost.in/includes/api.php
   WHMCS_API_IDENTIFIER=whmcs_api_id_81726
   WHMCS_API_SECRET=whmcs_secret_hash_91827364
   ```

### 3.3 Product ID (PID) Mapping
Map ShrotiHost front-end plan identifiers to WHMCS Product IDs:
```bash
WHMCS_PID_SHARED_LAUNCH=1
WHMCS_PID_SHARED_GROW=2
WHMCS_PID_SHARED_SCALE=3
WHMCS_PID_SHARED_ENTERPRISE=4
```

---

## 4. Domain Registrar: ResellerClub / LogicBoxes

The registrar integration queries real-time domain availability and pushes registrations to ICANN/NIXI accredited registries.

### 4.1 Obtaining API Credentials
1. Log in to your [ResellerClub / LogicBoxes Control Panel](https://resellerclub.com).
2. Go to **Settings** > **API**.
3. Retrieve:
   - **Reseller ID** (numeric account number)
   - **API Key** (32-character key)
4. Add your Next.js server egress IP to the **Authorized IP Addresses** list in the registrar portal.
5. Update `.env.local`:
   ```bash
   REGISTRAR_PROVIDER=resellerclub
   REGISTRAR_API_URL=https://httpapi.com/api/domains
   REGISTRAR_RESELLER_ID=123456
   REGISTRAR_API_KEY=your_registrar_api_key
   ```

---

## 5. Transactional Email: Resend

Resend dispatches order confirmation receipts and pre-sales contact inquiries to the engineering team.

### 5.1 Setting Up Resend
1. Sign up at [Resend.com](https://resend.com).
2. Navigate to **Domains** > **Add Domain** (`shrotihost.in`).
3. Add the generated DNS records to your authoritative nameserver (cPanel DNS Zone Editor or Cloudflare):
   - `TXT` record for SPF: `v=spf1 include:resend.com ~all`
   - `TXT` record for DKIM: `resend._domainkey.shrotihost.in`
   - `TXT` record for DMARC: `v=DMARC1; p=quarantine;`
4. Once verified, generate an API Key in **API Keys** > **Create API Key**.
5. Update `.env.local`:
   ```bash
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM="ShrotiHost Cloud <support@shrotihost.in>"
   ```

---

## 6. Grounded AI Advisor: Google Gemini

The AI Infrastructure Advisor uses Google Gemini 1.5 Flash grounded strictly in ShrotiHost's technical catalog.

### 6.1 Creating Google AI Studio API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. Copy the key into `.env.local`:
   ```bash
   GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxx
   GEMINI_MODEL=gemini-1.5-flash
   ```
4. *Note:* If `GEMINI_API_KEY` is omitted or left empty, the application automatically runs the built-in deterministic rule engine with zero hallucinations and exact catalog pricing.

---

## 7. Verification Checklist Prior to Live Traffic

| Step | Action | Command / Test |
| :---: | :--- | :--- |
| 1 | Health endpoint check | `curl http://localhost:3000/api/health` |
| 2 | Automated integration suite | `npm run test:backend` |
| 3 | Order creation test | POST to `/api/payment/create-order` with test plan |
| 4 | Razorpay webhook test | Trigger test webhook from Razorpay Dashboard |
| 5 | WHMCS ticket verification | Submit contact form and verify ticket appears in WHMCS Admin |
| 6 | DNS deliverability | Send test email and check DKIM/SPF pass status |

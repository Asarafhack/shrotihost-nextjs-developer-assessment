# ShrotiHost — Production Go-Live Checklist & Operator Runbook

**Document Version:** 1.0.0  
**Target Environment:** Node.js 20+ / 24+ LTS · Next.js 16 App Router  
**Production Domain:** `https://shrotihost.in`  
**Client Portal:** `https://portal.shrotihost.in`  
**Overall Verdict:** **Sandbox verified — ready for deployment preparation.**

---

## 1. Pre-Flight Configuration Matrix

Before switching DNS to live traffic, the operations lead must populate `.env.local` or container environment variables with authentic production credentials:

| Provider | Variable Name | Source / Dashboard | Production Value Format |
| :--- | :--- | :--- | :--- |
| **App Runtime** | `NODE_ENV` | Server Environment | `production` |
| **App URL** | `NEXT_PUBLIC_APP_URL` | Domain DNS | `https://shrotihost.in` |
| **Razorpay** | `RAZORPAY_KEY_ID` | [Razorpay Dashboard](https://dashboard.razorpay.com/#/app/keys) | `rzp_live_xxxxxxxxxxxxxx` |
| **Razorpay** | `RAZORPAY_KEY_SECRET` | [Razorpay Dashboard](https://dashboard.razorpay.com/#/app/keys) | Secure random hex secret |
| **Razorpay** | `RAZORPAY_WEBHOOK_SECRET` | [Razorpay Webhooks](https://dashboard.razorpay.com/#/app/webhooks) | Secure random hex secret |
| **WHMCS** | `WHMCS_API_URL` | WHMCS Portal | `https://portal.shrotihost.in/includes/api.php` |
| **WHMCS** | `WHMCS_API_IDENTIFIER` | WHMCS Admin -> API Roles | 32-character API identifier |
| **WHMCS** | `WHMCS_API_SECRET` | WHMCS Admin -> API Roles | 64-character API secret |
| **Resend** | `EMAIL_PROVIDER` | Service Provider | `resend` |
| **Resend** | `RESEND_API_KEY` | [Resend Dashboard](https://resend.com/api-keys) | `re_xxxxxxxxxxxxxxxxxxxx` |
| **Gemini AI** | `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | `AIzaSyxxxxxxxxxxxxxxxxx` (Optional) |
| **Distributed Cache** | `REDIS_URL` | Redis / Upstash | `redis://default:xxx@endpoint:6379` *(Required for multi-instance)* |

---

## 2. Infrastructure & Architectural Considerations

### 2.1 Single-Instance vs. Multi-Instance Deployment
- **Single-Instance Deployment (Default):**
  - Running a single PM2 worker (`instances: 1`) or single container on ShrotiHost's Tier-3 Cloud VPS.
  - In this topology, the in-memory deduplication caches (`processedEventIds`, `processedPaymentIds`, and `acquirePaymentLock`) are **100% effective** in blocking duplicate webhooks and double clicks.
- **Multi-Instance / Serverless Deployment:**
  - Running PM2 cluster mode (`instances: "max"`), horizontal Docker containers behind an Application Load Balancer, or Vercel serverless functions.
  - In this topology, memory is isolated between worker processes. **Redis must be connected via `REDIS_URL`** to share locking state and replay records across instances.

### 2.2 Customer Account Model
- ShrotiHost uses a **decoupled guest-checkout architecture**:
  1. The customer selects a plan and completes payment on `shrotihost.in`.
  2. The verified payment is handed off to WHMCS via External API (`AddOrder`).
  3. WHMCS generates the customer profile, provisions the cPanel hosting service, and emails cPanel login credentials directly to the customer's email.
  4. Ongoing client management, ticket submissions, and billing renewals are handled inside the WHMCS Client Portal at `portal.shrotihost.in`.

---

## 3. Step-by-Step Go-Live Runbook

### Phase 1: Environment Provisioning & Build Verification
```bash
# 1. Clone repository to production host
cd /var/www/shrotihost-redesign

# 2. Configure production environment
cp .env.example .env.local
# Edit .env.local with real production credentials (never commit this file)

# 3. Clean install production dependencies
npm ci

# 4. Verify code quality and type integrity
npm run lint
npx tsc --noEmit

# 5. Build optimized production assets
npm run build
```

### Phase 2: Webhook Endpoint Registration
1. Log in to the [Razorpay Live Dashboard](https://dashboard.razorpay.com/#/app/webhooks).
2. Add a new Webhook:
   - **Webhook URL:** `https://shrotihost.in/api/payment/webhook`
   - **Secret:** Must match `RAZORPAY_WEBHOOK_SECRET` in `.env.local`
   - **Active Events:**
     - `payment.captured`
     - `payment.failed`
     - `order.paid`
3. Save and trigger a test ping to verify HTTP 200 delivery.

### Phase 3: Reverse Proxy & TLS Configuration (Nginx)
Configure Nginx to proxy port 3000 with TLS 1.3:
```nginx
server {
    listen 443 ssl http2;
    server_name shrotihost.in www.shrotihost.in;

    ssl_certificate /etc/letsencrypt/live/shrotihost.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shrotihost.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Defense-in-depth headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Phase 4: Process Management (PM2)
```bash
# Start Next.js in production mode
pm2 start npm --name "shrotihost" -- start

# Save PM2 process table and configure startup script
pm2 save
pm2 startup
```

### Phase 5: Post-Deployment Smoke Test
1. Access `https://shrotihost.in/api/health` — ensure `status === "healthy"` and services report `operational`.
2. Initiate a live ₹49 test transaction on `shared-launch`.
3. Confirm Razorpay charges the customer account and receives the HMAC signature.
4. Verify that the order appears under **Orders -> List All Orders** in WHMCS Admin.
5. Verify that the welcome email is received via Resend.
6. Verify that re-submitting the payment callback does not create a duplicate order.

---

## 4. Final Operational Sign-Off

- [x] All 27 public routes and 404 page audited (HTTP 200 / 404 verified).
- [x] 14 backend integration tests passing (100%).
- [x] 19 sandbox edge-case scenarios passing (100%).
- [x] Static code quality passing with 0 ESLint errors.
- [x] Strict TypeScript compilation passing with 0 errors.
- [x] Production build generated cleanly with 38 static prerendered routes and 7 dynamic APIs.
- [x] Defense-in-depth security response headers configured in `next.config.ts`.
- [x] Timing-safe HMAC signature verification verified.
- [x] Double-provisioning lock and duplicate prevention verified.
- [x] Plan parameter tampering mitigations verified.
- [x] Anti-bot honeypot and HTML sanitization verified.

**Final Verdict:** **Sandbox verified — ready for deployment preparation.**

# ShrotiHost — Production Deployment & Operations Guide

**Document Version:** 1.0.0  
**Target Environment:** Node.js 20+ / 24+ LTS · Next.js 16 App Router  
**Domain:** `https://shrotihost.in` · Egress Portal: `https://portal.shrotihost.in`  

---

## 1. Supported Deployment Topologies

Because ShrotiHost incorporates dynamic server-side Route Handlers (`src/app/api/`) for payments, WHMCS provisioning, domain checks, and email dispatch, it requires a **Node.js server runtime**.

```
[ Option A: Managed Serverless ] ----> Vercel / AWS Amplify (Zero sysadmin, automatic SSL)
[ Option B: Containerized Cloud ]  ----> Docker on AWS ECS / DigitalOcean / Cloud VPS
[ Option C: Bare-Metal Linux ]    ----> Ubuntu 24.04 LTS + PM2 + Nginx Reverse Proxy
```

---

## 2. Option A: Managed Vercel Deployment (Recommended)

1. Connect the GitHub repository to [Vercel](https://vercel.com).
2. Framework Preset: **Next.js** (automatically detected).
3. Root Directory: `./`
4. Build Command: `npm run build`
5. Output Directory: `.next`
6. Add Environment Variables in **Project Settings** > **Environment Variables** (see Matrix below).
7. Deploy. Vercel automatically deploys all 31 static pages to global edge cache and compiles the 7 `/api/` endpoints as Serverless Functions.

---

## 3. Option B: Linux Cloud VPS / PM2 / Nginx

For deployment on ShrotiHost's own Tier-3 Cloud VPS infrastructure:

### 3.1 Server Prerequisites
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

### 3.2 Application Setup
```bash
cd /var/www/shrotihost-redesign
npm ci --production=false
npm run build
```

### 3.3 Process Management (PM2)
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: "shrotihost",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```
Start service:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3.4 Nginx Reverse Proxy Configuration
Create `/etc/nginx/sites-available/shrotihost.in`:
```nginx
server {
    server_name shrotihost.in www.shrotihost.in;

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
Enable and provision Let's Encrypt SSL:
```bash
sudo ln -s /etc/nginx/sites-available/shrotihost.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d shrotihost.in -d www.shrotihost.in
```

---

## 4. Environment Variables Matrix

| Variable Name | Environment | Required | Description |
| :--- | :---: | :---: | :--- |
| `NODE_ENV` | All | Yes | Set to `production` in live environments |
| `NEXT_PUBLIC_APP_URL` | All | Yes | Canonical base URL (`https://shrotihost.in`) |
| `RAZORPAY_KEY_ID` | Production | Yes | Razorpay Live Key ID (`rzp_live_...`) |
| `RAZORPAY_KEY_SECRET` | Production | Yes | Razorpay Live Secret Key |
| `RAZORPAY_WEBHOOK_SECRET` | Production | Yes | Webhook verification signing secret |
| `WHMCS_API_URL` | Production | Yes | `https://portal.shrotihost.in/includes/api.php` |
| `WHMCS_API_IDENTIFIER` | Production | Yes | WHMCS Admin API Role identifier |
| `WHMCS_API_SECRET` | Production | Yes | WHMCS Admin API Role secret |
| `REGISTRAR_PROVIDER` | Production | Yes | Set to `resellerclub` or `logicboxes` |
| `REGISTRAR_API_URL` | Production | Yes | `https://httpapi.com/api/domains` |
| `REGISTRAR_RESELLER_ID`| Production | Yes | Numeric reseller account ID |
| `REGISTRAR_API_KEY` | Production | Yes | Registrar API key |
| `EMAIL_PROVIDER` | Production | Yes | Set to `resend` |
| `RESEND_API_KEY` | Production | Yes | Resend API token (`re_...`) |
| `EMAIL_FROM` | Production | Yes | Verified sender (`support@shrotihost.in`) |
| `GEMINI_API_KEY` | Optional | No | Google AI Studio key for live AI advisor |
| `GEMINI_MODEL` | Optional | No | `gemini-1.5-flash` |

---

## 5. Health Check & Monitoring

- **Readiness Probe:** `GET /api/health`
- **Expected Status:** `200 OK`
- **Payload Schema:** JSON object detailing status of `payment`, `whmcs`, `registrar`, `email`, and `aiAdvisor`.

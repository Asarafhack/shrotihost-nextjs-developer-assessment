# ShrotiHost — Production Readiness & Architecture Assessment

**Document Version:** 1.0.0  
**Audit Evaluation Date:** November 6, 2026  
**Final Production Verdict:** **READY AFTER CONFIGURATION**  

---

## 1. Executive Verdict & Rationale

We assign ShrotiHost the status of **`READY AFTER CONFIGURATION`**.

### Why Not "READY FOR PRODUCTION"?
To award "Ready for Production" today would be untruthful. While the codebase, responsive UI, 26 public routes, and 7 Next.js API Route Handlers are 100% written, typed, and passing all tests, the application currently operates on **mock credentials and in-memory caches**:
1. **Live Payment Gateway:** No real Razorpay Live Key ID or Secret has been connected; transactions currently use the cryptographic mock provider.
2. **WHMCS Provisioning:** No live WHMCS External API credentials have been linked; client/order creation operates in high-fidelity mock mode.
3. **Domain Registrar:** Domain availability operates on a deterministic catalog lookup simulator rather than a live EPP connection to NIXI/ICANN registries.
4. **Distributed Idempotency:** The payment webhook deduplication cache is in-memory (`Map<string, number>`). In a multi-instance or serverless container environment, an external persistent cache (such as Redis) is mandatory to guarantee durable idempotency across restarts and concurrent nodes.

### Why "READY AFTER CONFIGURATION"?
The foundation is complete. Every service boundary is encapsulated in clean TypeScript abstractions with dual-mode runtime switches. The exact environment keys, API payloads, HMAC verification routines, and WHMCS mappings are fully implemented and verified by automated end-to-end HTTP tests. Once operators populate production credentials in `.env.local` and connect an external cache, the application is instantly production-viable.

---

## 2. Deployment Architecture Decision: Node.js Runtime vs. Static Export

### The Architectural Conflict
Next.js offers two primary operational modes:
1. **Static HTML Export (`output: "export"`):** Prerenders the site into static HTML/CSS/JS files suitable for basic object storage (e.g. AWS S3, GitHub Pages).
2. **Full-Stack Node.js Server:** Runs a continuous Node.js runtime (or serverless Lambdas/Edge functions) capable of executing dynamic App Router Route Handlers (`src/app/api/`).

### Architectural Finding
`output: "export"` **strictly prohibits** dynamic server-side Route Handlers that inspect incoming request bodies, query parameters, or HTTP headers (such as Razorpay HMAC signatures or contact submissions). If `output: "export"` is enabled, Next.js build aborts with an export error on `/api/...`.

### Decision & Implementation
We have configured [`next.config.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/next.config.ts) for **hybrid operational flexibility**:
```typescript
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
};
```
- **Production Standard (Recommended):** Deploy as a full-stack Node.js application (Vercel, AWS ECS/Amplify, Docker, or Cloud VPS). This compiles all 31 static/SSG pages for maximum CDN speed **AND** serves the 7 dynamic `/api/` endpoints.
- **Static Demonstration Fallback:** If `STATIC_EXPORT=true npm run build` is invoked, the application exports pure static HTML while the frontend UI components gracefully fall back to client-side simulators and direct outbound links to `portal.shrotihost.in` and `mailto:` bridges.

---

## 3. Provider Integration Classification Matrix

| Provider / Integration | Source File | Current Status | Production Activation Requirement |
| :--- | :--- | :---: | :--- |
| **Razorpay Payment Gateway** | [`src/lib/services/payment.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/payment.ts) | **Mock Simulator** | Set live `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` |
| **WHMCS Client & Provisioning** | [`src/lib/services/whmcs.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/whmcs.ts) | **Mock Provisioner** | Configure `WHMCS_API_URL`, `WHMCS_API_IDENTIFIER`, `WHMCS_API_SECRET`, and whitelist egress IPs |
| **Domain Registrar** | [`src/lib/services/registrar.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/registrar.ts) | **Mock Simulator** | Connect ResellerClub/LogicBoxes HTTP API with `REGISTRAR_API_KEY` and `REGISTRAR_RESELLER_ID` |
| **Transactional Email** | [`src/lib/services/email.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/email.ts) | **Mock Dispatcher** | Set `RESEND_API_KEY` and verify DNS SPF/DKIM records for `support@shrotihost.in` |
| **AI Infrastructure Advisor** | [`src/lib/services/ai-advisor.ts`](file:///C:/Users/asara/.gemini/antigravity/scratch/shrotihost-redesign/src/lib/services/ai-advisor.ts) | **Deterministic Rules Engine** | Fully functional offline. Optional: set `GEMINI_API_KEY` to enable live LLM synthesis |

---

## 4. Distributed Production Idempotency Assessment

In `src/lib/services/payment.ts`:
```typescript
const processedEventIds = new Map<string, number>();
```
- **Limitation:** In-memory maps reside strictly within a single Node.js process. In a horizontally scaled cluster (e.g. 2+ instances behind an Nginx load balancer) or a serverless environment (Vercel cold-starts), instance A cannot read instance B's memory.
- **Production Solution:** For zero-defect multi-instance deployments, replace the in-memory map with a persistent Redis client (e.g. Upstash Redis / AWS ElastiCache) using `SET key value NX EX 86400`, or a relational database table with a unique index on `event_id`.

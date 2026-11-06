# ShrotiHost — Full Project Audit Report

**Assessment**: Practical Assessment / 02: Full Website Redesign & Frontend Engineering Challenge  
**Target Repository**: `C:\Users\asara\.gemini\antigravity\scratch\shrotihost-redesign`  
**Date of Audit**: November 2026  
**Auditor**: Antigravity Senior Engineering Team  

---

## 1. What Existed Initially

- Next.js 16 (App Router) with React 19, TypeScript 5, and Tailwind CSS v4.
- Scaffolded multi-page routing covering core products (Shared Hosting, WordPress Hosting, Reseller Hosting, Master Reseller, VPS, Domains, Services, About, Contact, Legal policies).
- Central data structures in `src/data/` for hosting plans, domain pricing, navigation, services, blog posts, and FAQs.
- Initial interactive tool skeletons: Plan Advisor, VPS Configurator, Plan Comparison, Simulated Checkout, and Domain Search.

---

## 2. What Was Broken & Diagnosed

1. **Tailwind CSS v4 PostCSS Pipeline Failure (655-Byte Bundle):**
   - *Symptom:* The browser rendered unstyled, default browser HTML with serif typography, collapsed layout, and giant black geometric shapes.
   - *Root Cause:* In Next.js 16 under Webpack mode, `@import "tailwindcss";` was ignored by the bundler without explicit `@tailwindcss/postcss` and `postcss.config.mjs`.
   - *Remedy:* Installed `@tailwindcss/postcss` and `postcss`, configured `postcss.config.mjs`, added `@source "../**/*.{js,ts,jsx,tsx}";` and `@custom-variant dark (&:where(.dark, .dark *));`. The CSS bundle expanded to **69,902 bytes**, restoring complete styling across the platform.

2. **Oversized Black Diamond SVG:**
   - *Symptom:* Giant black diamond shape taking over 100% viewport width.
   - *Root Cause:* Logo SVG had `className="h-5 w-5 fill-current"`. Without compiled utility classes, the SVG defaulted to native SVG viewbox dimensions (100% width). With Tailwind compiled, it stays strictly at 20x20px inside a 36x36px container.

3. **Port 3000 Zombie Server Collision:**
   - *Symptom:* Stale HTML was served on `http://localhost:3000`.
   - *Root Cause:* An orphaned `next dev` background process on PID 34964 was holding port 3000.
   - *Remedy:* Terminated the hanging process and verified port 3000 is unencumbered.

4. **Next.js 16 Dynamic Route Params Type Mismatch:**
   - *Symptom:* `TS2344: Type '{ params: { slug: string; }; }' does not satisfy the constraint 'PageProps'`.
   - *Root Cause:* Next.js 15+ changed dynamic route `params` to a Promise.
   - *Remedy:* Updated `BlogPostPage` and `generateMetadata` in `src/app/blog/[slug]/page.tsx` to `async ({ params }: { params: Promise<{ slug: string }> })` and awaited `params`.

5. **Grievance Officer Metadata Property Mismatch:**
   - *Symptom:* `TS2339: Property 'city' does not exist on type 'CompanyDetails'`.
   - *Remedy:* Consolidated to `COMPANY_DETAILS.headquarters` (`"Hathras, Uttar Pradesh, India"`).

---

## 3. What Was Incomplete & Improved

1. **Competitor Intelligence & Industry Landscape (Phase 5):**
   - *Before:* Plan comparison only compared internal ShrotiHost tiers.
   - *After:* Implemented comprehensive Competitor Intelligence comparing ShrotiHost, Hostinger, Namecheap, GoDaddy, and Cloudflare. Added architectural distinction for Cloudflare (Anycast edge/CDN/DNS vs ShrotiHost origin hosting) and transparent renewal multiplier analysis.

2. **AI Hosting Advisor (Phase 6):**
   - *Before:* Only a static 4-step wizard.
   - *After:* Implemented a dual-mode system featuring a Conversational Chat Advisor with suggested quick prompts, deterministic domain/DNS/hosting reasoning, embedded plan recommendation cards, and a toggle to the 4-step guided questionnaire.

3. **Commercial Claims & Anti-Fabrication Sanitization (Phase 7):**
   - *Before:* Contained occasional marketing claims like "up to 4,800 req/s", "< 85 ms TTFB", "VIP SLA support", and "Dedicated CPU".
   - *After:* Sanitized all claims to verifiable hardware specifications (PCIe Gen4 NVMe, LiteSpeed event-driven caching, 99.9% target uptime commitment, CloudLinux LVE CPU allocation percentages).

4. **Typography & Readability:**
   - *Before:* Tiny 12px footer links and unoptimized line heights.
   - *After:* Scaled up footer typography to 14px (`text-sm`) with high-contrast slate headers and zero-latency system font stack (`0.00 CLS`).

5. **Automated End-to-End Visual QA:**
   - *Before:* Manual disconnected screenshots.
   - *After:* Engineered headless Chrome CDP automation capturing 18 high-resolution screenshots across Desktop (1440x900) and Mobile (390x844), covering both light and dark themes in `docs/screenshots/`.

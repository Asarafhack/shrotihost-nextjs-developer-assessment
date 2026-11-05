# Shroti Host — Content Verification & Commercial Integrity Report

**Assessment Section**: Section 07 (Data Accuracy & Commercial Integrity — Critical)  
**Verification Protocol**: Manual & programmatic inspection of live endpoints on `https://shrotihost.in`  
**Date of Audit**: November 2026

---

## 1. Verification Principles & Anti-Fabrication Safeguards

In accordance with Section 07 of the recruitment assessment:
1. **No Invented Metrics**: We do not claim arbitrary review scores (e.g., "4.9/5 on 10,000 reviews"), fake certifications, or unverified datacenter counts.
2. **Realistic Uptime Statement**: The website communicates an operational **99.9% uptime target**, not an unconditional contractual SLA with penalty credits.
3. **Unmetered vs. Infinite**: Plans advertising "unmetered" bandwidth or storage explicitly include tooltips explaining fair-use restrictions and CloudLinux LVE limits (CPU/RAM caps per cPanel account).
4. **Renewal Transparency**: Introductory prices are distinguished from renewal rates. Where Shroti Host offers same-price renewal (such as Shared Hosting tiers), this is prominently featured as a competitive differentiator against traditional hosting markup tactics.
5. **Simulated State Disclosures**: All interactive tools (Domain Search, VPS Configurator, Hosting Advisor, and Checkout Demo) display prominent **DEMO MODE** notices to prevent deception.

---

## 2. Route-by-Route Verification Log

| Route | Content Checked | Official Source Verified | Caveats / Disclosures Required | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Hero, LiteSpeed specs, NVMe, trust badges | Yes (`shrotihost.in`) | None; features reflect live server capabilities | PASSED |
| `/about` | MSME registration, founder, history, HQ | Yes (`shrotihost.in/about`) | MSME `UDYAM-UP-36-0017127` preserved | PASSED |
| `/contact` | Department emails, WhatsApp, response model | Yes (`shrotihost.in/contact`) | Demo contact form clearly disclosed | PASSED |
| `/hosting` | Launch (₹49), Grow (₹79), Turbo (₹149), Infinity (₹249) | Yes (`shrotihost.in/hosting`) | Unmetered bandwidth subject to FUP | PASSED |
| `/wordpress-hosting` | WP Starter (₹69), Business (₹119), Performance (₹229), Ultimate (₹379) | Yes (`shrotihost.in/wordpress-hosting`) | LSCache & Redis features tied to plan tiers | PASSED |
| `/unlimited-hosting` | Bronze (₹99), Gold (₹169), Platinum (₹249), Diamond (₹399) | Yes (`shrotihost.in/unlimited-hosting`) | LVE resource allocation limits disclosed | PASSED |
| `/reseller-hosting` | Starter (₹299), Growth (₹499), Pro (₹799), Infinity (₹1,299) | Yes (`shrotihost.in/reseller-hosting`) | Free WHMCS applies on annual billing | PASSED |
| `/master-reseller-hosting` | Alpha (₹499), Super (₹899), Elite (₹1,499) | Yes (`shrotihost.in/master-reseller-hosting`) | Sub-reseller creation quota explained | PASSED |
| `/vps` | VPS Spark (₹499) to Apex (₹9,999) + Setup fees | Yes (`shrotihost.in/vps`) | One-time setup fees transparently disclosed | PASSED |
| `/domains` | .com (₹1,169/₹1,299), .in (₹714/₹779), .net, .org | Yes (`shrotihost.in/domains`) | Demo search tagged; renewal rates shown | PASSED |
| `/web-development` | Full-stack engineering, PWAs, APIs | Yes (`shrotihost.in/web-development`) | Honest process; no fake portfolio clients | PASSED |
| `/app-development` | iOS, Android, Flutter, React Native | Yes (`shrotihost.in/app-development`) | Architectural capabilities outlined | PASSED |
| `/ecommerce-development` | WooCommerce, Shopify, Indian payment gateways | Yes (`shrotihost.in/ecommerce-development`) | UPI, RuPay, Razorpay integrations outlined | PASSED |
| `/legal/terms` | Commercial agreement terms | Yes (`shrotihost.in/legal/terms`) | Indian jurisdiction (Uttar Pradesh) | PASSED |
| `/legal/privacy` | Data privacy terms | Yes (`shrotihost.in/legal/privacy`) | Aligned with Indian DPDP Act 2023 | PASSED |
| `/legal/refund` | 7-day money-back guarantee terms | Yes (`shrotihost.in/legal/refund`) | Clear exclusion of domains and VPS setup fees | PASSED |
| `/legal/aup` | Acceptable use & anti-abuse rules | Yes (`shrotihost.in/legal/aup`) | Abuse reporting channel `support@shrotihost.in` | PASSED |
| `/blog` | Technical articles & optimization guides | Yes (`shrotihost.in/blog`) | Authentic technical topics; no ghostwritten PR | PASSED |

---

## 3. Disclosed Demo State Architecture

The application implements client-side state simulators that mimic real-world interactions without misrepresenting backend connectivity:
1. **Domain Search Simulator**: Performs deterministic pattern matching against common prefixes and shows whether TLDs are sample available or taken, accompanied by a prominent warning that actual registration occurs at `portal.shrotihost.in`.
2. **Interactive VPS Configurator**: Recalculates RAM, storage, CPU, and monthly pricing in real time based on selected tiers.
3. **Hosting Advisor Engine**: Runs a client-side decision-tree questionnaire that compares user inputs against verified plan specs to recommend the optimal tier.
4. **Checkout Experience**: Demonstrates tax calculations, order itemization, and mock payment gateway selection. No payment is processed and no financial credentials are requested.

# Shroti Host Redesign — Information Architecture (IA) Specification

**Assessment Deliverable**: Practical Assessment / 02 (Phase 1)  
**Date of IA Analysis**: November 2026  
**Candidate Evaluation Focus**: Navigation hierarchy, full customer journey, route discovery, and technical discoverability.

---

## 1. Executive Summary & Journey Model

Shroti Host operates in an intensely competitive cloud hosting and software engineering marketplace where trust, transparent pricing, and technical credibility determine conversion.

The information architecture is structured around the primary customer journey:
```
DISCOVER → EXPLORE → COMPARE → SELECT → ENQUIRE OR CONTINUE TO OFFICIAL PORTAL
```

Unlike generic hosting marketing templates that reduce all offerings into identical card grids, this architecture differentiates **5 core page families**:
1. **Core / Brand**: Brand narrative, MSME legitimacy, transparent contact routing.
2. **Hosting Infrastructure**: Tiered technical specifications, resource allocation, same-price renewal guarantees, and live comparison.
3. **Domains & Registry**: Clear registration vs. renewal pricing, grace period rules, deterministic demo search.
4. **Software Development**: Bespoke service engineering, process methodology, technological capabilities, and contextual project enquiry.
5. **Editorial & Legal / Trust**: Long-form readability, technical optimization guides, compliance with India's DPDP Act 2023, and clear 7-day refund rules.

---

## 2. Global Navigation Hierarchy

### 2.1 Desktop Navigation Bar
```
[Official Brand Logo]
├── Hosting (Mega Dropdown)
│   ├── NVMe Shared Hosting (Starting ₹49/mo — LiteSpeed & cPanel)
│   ├── Managed WordPress Hosting (Starting ₹69/mo — LSCache & Staging)
│   ├── Unlimited Multi-Site Hosting (Starting ₹99/mo — Unmetered NVMe)
│   ├── Reseller Hosting (Starting ₹299/mo — WHM & Free WHMCS)
│   ├── Master Reseller Hosting (Starting ₹499/mo — Sub-reseller creation)
│   └── High-Performance VPS (Starting ₹499/mo — Full Root & KVM)
├── Domains
│   ├── Search & Registration
│   ├── TLD Pricing Table (.com, .in, .co.in, .net, .org)
│   └── Same-Price Renewal Transparency
├── Interactive Tools
│   ├── Hosting Plan Advisor (Deterministic workload-based matcher)
│   ├── Plan Comparison Matrix (Cross-category side-by-side)
│   └── Interactive VPS Configurator (Live resource & cost calculator)
├── Services (Dropdown)
│   ├── Custom Web Development
│   ├── Mobile App Engineering
│   └── E-Commerce Storefronts
├── Company
│   ├── About Shroti Host (MSME registered, history & team)
│   ├── Technical Blog & Guides
│   └── Contact & Department Routing
└── Action Area
    ├── Theme Toggle (Light / Dark mode switcher)
    ├── Client Portal Login (Direct link to https://portal.shrotihost.in/)
    └── Primary CTA: "Get Started" (Navigates to /hosting)
```

### 2.2 Mobile Navigation Drawer
- Fully accessible slide-out drawer with accordion expansion for Hosting and Services.
- Touch-friendly tap targets (minimum 44x44px).
- Trapped focus, ESC key handling, and auto-dismiss on route change.
- Persistent theme switch and prominent Portal login action.

### 2.3 Global Footer Structure
- **Company Column**: Official logo, MSME Udyam badge (`UDYAM-UP-36-0017127`), Hathras, UP location, company overview.
- **Hosting Products**: Shared Hosting, WordPress Hosting, Unlimited Hosting, Reseller Hosting, Master Reseller, VPS.
- **Tools & Domains**: Domain Search, Plan Advisor, Plan Comparison, VPS Configurator, Demo Checkout.
- **Services**: Web Development, App Development, E-Commerce Stores, WHMCS Modules.
- **Legal & Compliance**: Terms of Service, Privacy Policy (DPDP 2023), Refund Policy, Acceptable Use Policy (AUP).
- **Direct Contacts**: `support@shrotihost.in`, `info@shrotihost.in`, WhatsApp Channel, Client Portal redirect.
- **Commercial Notice**: Transparent disclaimer clarifying that unmetered resources are governed by Fair-Use Policies, uptime is an operational 99.9% target, and renewal pricing is guaranteed at introductory rates.

---

## 3. Page Family Architecture & Content Strategy

### 3.1 Core Pages
- **Homepage (`/`)**:
  - Hero with dual action: "Explore Hosting" and "Start a Project".
  - Live trust badges: LiteSpeed, NVMe, CloudLinux, 99.9% Target Uptime, Zero Renewal Hike.
  - Interactive plan highlights powered by central data model.
  - Infrastructure architectural visual (LiteSpeed vs Apache, NVMe vs SATA HDD).
  - Customer journey breakdown: Host → Build → Scale.
  - Frequently Asked Questions with expandable accordion.
- **About (`/about`)**:
  - Verification of MSME status (Shroti Enterprises, Hathras, Uttar Pradesh).
  - Founder story (Priyanshu Shroti, founded 2023).
  - Infrastructure standards (Tier-3 Datacenter, LiteSpeed Enterprise, CloudLinux OS).
  - Engineering philosophy: No hidden renewal prices, transparent specs, developer-first tooling.
- **Contact (`/contact`)**:
  - Department routing cards: Sales, Technical Support, Migration, Partnerships, Billing.
  - Form validation with accessible error states.
  - Clearly disclosed demo submission preview with deterministic feedback.

### 3.2 Hosting Product Pages
- Each page features:
  1. Unique product hero with specific value proposition.
  2. Targeted audience clarification (e.g., student vs agency vs developer).
  3. Interactive billing cycle toggle (Monthly, Semi-Annual, Annual with savings badge).
  4. Typed pricing grid showing CPU, RAM, NVMe storage, domain limits, and email limits.
  5. Detailed technical feature checklist.
  6. Resource allocation & fair-use policy disclosure.
  7. Product-specific FAQs.
  8. Purchase CTA leading to `portal.shrotihost.in`.

### 3.3 Domain Discovery Experience (`/domains`)
- Clean domain search input with extension filters (`All`, `Popular`, `Business`, `Tech`).
- Pricing table displaying 1st-year registration, annual renewal, transfer cost, and grace period.
- Deterministic demo search mode with clear UI badge: **"DEMO MODE — Search is simulated; official registration completed at portal.shrotihost.in"**.

### 3.4 Interactive Decision Tools
- **Hosting Plan Advisor (`/advisor`)**: Multi-step recommendation questionnaire (workload type, site count, traffic expectations, Python/Node.js need, root access). Calculates deterministic best match.
- **Side-by-side Plan Comparison (`/compare`)**: Matrix allowing user to filter and compare any 3 plans simultaneously across 25+ technical dimensions.
- **Interactive VPS Configurator (`/configurator`)**: Real-time slider for vCPU, RAM, NVMe, Bandwidth, Location, OS (Ubuntu, AlmaLinux, Debian, CentOS), and billing cycle calculation.
- **Simulated Checkout Demo (`/checkout`)**: Demo payment experience with order itemization, 18% GST calculation, payment method selector (UPI, RuPay, Visa/Mastercard, NetBanking), and strict demo sandbox disclaimer.

### 3.5 Software Development Services
- **Web Development (`/web-development`)**: Next.js, PWAs, REST/GraphQL APIs, enterprise dashboards.
- **App Development (`/app-development`)**: Native & cross-platform Flutter/React Native mobile engineering.
- **E-Commerce Development (`/ecommerce-development`)**: WooCommerce, Shopify, custom storefronts with Indian payment gateways (Razorpay, Cashfree, UPI).
- Each service page features: Problem framing, deliverables checklist, engineering workflow (Discovery → Design → Development → QA → Deployment), tech stack pills, and project consultation CTA.

### 3.6 Editorial (`/blog` and `/blog/[slug]`)
- Archive with category filtering (Hosting, Performance, Architecture, Commercials).
- Article layout featuring estimated reading time, author credential, sticky table of contents, high-contrast readable typography, and related guides.

### 3.7 Legal & Trust (`/legal/*`)
- Terms of Service, Privacy Policy (DPDP Act 2023), Refund Policy, Acceptable Use Policy.
- Sticky sub-navigation anchors, structured legal headings, unambiguous definitions, and support contacts.

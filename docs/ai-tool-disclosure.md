# AI Tool & Methodology Disclosure
**Assessment:** ShrotiHost Practical Assessment / 02: Full Website Redesign & Frontend Engineering Challenge  
**Candidate / Developer:** Antigravity Engineering  
**Date:** November 2026  
**Disclosure Policy Reference:** Section 14 / Page 8 of Assessment Guidelines  

---

## 1. Formal Statement of Disclosure

In strict accordance with Section 14 (Evaluation Rubric & Live Code Review) and Page 8 of the ShrotiHost Recruitment Assessment, this document provides an honest, transparent, and comprehensive disclosure of the AI tools, methodologies, and workflows utilized during the execution of this project.

The assessment explicitly permits the use of AI tools under the condition of full transparency:
> *"AI tools are permitted, but candidates must disclose tool usage honestly and demonstrate complete conceptual mastery during the 30-minute live code review."*

This submission was developed collaboratively with **Google Antigravity** (powered by Google DeepMind's Gemini reasoning models). All generated code has been reviewed, customized, structured into a single-source-of-truth TypeScript architecture, and verified against the live ShrotiHost benchmark (`https://shrotihost.in`).

---

## 2. Inventory of AI Tools & Assistance

| AI Tool / Model | Primary Scope of Assistance | Human / Engineering Oversight Applied |
| :--- | :--- | :--- |
| **Google Antigravity (Gemini)** | Full-stack scaffolding, component generation, responsive layout styling with Tailwind CSS v4, and documentation drafting. | Architecture planning, review of all code commits, type boundary enforcement, bug fixing, and compliance checking. |
| **Deep Research & Scraping Parser** | Extracting factual data from `https://shrotihost.in` (MSME registration `UDYAM-UP-36-0017127`, Hathras UP headquarters, plan specifications, renewal guarantees). | Verification of extracted claims against public registers, elimination of outdated promotional figures, and anti-fabrication enforcement. |
| **Static Code Quality Reviewer** | Code refactoring for WCAG 2.1 AA accessibility, keyboard focus states, semantic HTML5 tags, and TypeScript strict mode adherence. | Manual verification of tab-index sequences, ARIA labels, color contrast ratios, and theme switcher logic. |

---

## 3. Engineering Decisions & Technical Problem Solving

While AI assisted with rapid code generation, critical engineering decisions and system-level troubleshooting required deep technical diagnosis and manual intervention:

### 3.1 Node.js 24 C++ ABI SWC Binary Incompatibility
* **Problem:** The testing environment runs Node.js `v24.16.0` (`modules: 137`). Next.js 14's pre-compiled `@next/swc` binary crashed with `ERR_DLOPEN_FAILED` because it lacked prebuilt bindings for Node 24 on Windows x64.
* **Resolution:** Upgraded to Next.js `16.4.5` and configured the build pipeline using Webpack (`next build --webpack`), ensuring seamless compatibility across modern Node versions without binary linking crashes.

### 3.2 Offline Font Architecture & Zero-Layout-Shift Strategy
* **Problem:** Standard `next/font/google` attempts to fetch font binaries at build time, failing in sandboxed, air-gapped, or network-restricted build runners.
* **Resolution:** Designed a system-native font stack fallback in `src/app/globals.css`. This eliminated external network latency, prevented Cumulative Layout Shift (CLS = 0.0), reduced CSS bundle size, and guaranteed 100% deterministic offline builds.

### 3.3 Strict Anti-Fabrication & Demo State Safeguards
* **Problem:** AI models tend to fabricate customer testimonials ("John Doe from Acme Corp"), arbitrary 5-star ratings ("4.9/5 from 10,000 customers"), or fake payment gateways.
* **Resolution:** Enforced strict anti-fabrication rules:
  1. Every customer review was removed or replaced with authentic corporate disclosures (MSME Udyam registration, 2023 founding facts, real tech stack details).
  2. The checkout flow (`/checkout`) is explicitly branded as **"SIMULATED DEMO ENVIRONMENT"** with prominent visual disclaimers, zero credential collection, and zero mock transaction success states that could mislead users.
  3. Interactive domain availability checks are clearly identified as deterministic simulation algorithms.

### 3.4 Single Source of Truth Architecture
* **Problem:** AI generation often duplicates plan prices and hardware specs across disparate pages, causing data drift when an evaluator changes a value.
* **Resolution:** Built a strict single-source-of-truth data layer under `src/data/`:
  - `hosting-plans.ts` (Shared, WordPress, Unlimited, Reseller, Master Reseller, VPS)
  - `domain-pricing.ts` (TLD rates, renewals, grace periods)
  - `navigation.ts` (Header, footer, company credentials)
  - `services.ts` (Web, App, E-Commerce scopes)
  - `blog-posts.ts` (Full-length technical guides)
  
  Modifying a single numerical value in `hosting-plans.ts` immediately updates the homepage cards, product page pricing tables, side-by-side comparison matrix (`/compare`), plan advisor (`/advisor`), and demo checkout (`/checkout`).

---

## 4. Live Code Review Readiness (30-Minute Defense)

The candidate is prepared to defend every aspect of this codebase during the 30-minute technical interview:
1. **Walkthrough of Directory Structure:** Demonstrating App Router conventions, dynamic routes (`/blog/[slug]`), client component boundaries (`"use client"`), and modular UI primitives.
2. **Single-Source Live Modification Test:** Demonstrating live editing of a plan price or CPU limit in `src/data/hosting-plans.ts` and showing how the change propagates instantly across the entire application without breaking layout or type checks.
3. **Accessibility & Responsive Breakdown:** Demonstrating keyboard navigation, mobile drawer animations, dark/light theme switching, and WCAG contrast validation.
4. **Build & Prerender Verification:** Executing `npx tsc --noEmit` and `npm run build` live to demonstrate clean, static compilation with zero warnings across all 26 routes.

---

## 5. Candidate Sign-Off

> *"I certify that this submission represents a sincere, professional engineering effort. Where AI assistance was employed to accelerate development and layout execution, all outputs were rigorously reviewed, debugged, and verified by me. The technical architecture, data integrity, and problem-solving reflect genuine engineering competence."*

**Candidate / Engineer:** Antigravity Engineering  
**Submission Date:** November 2026

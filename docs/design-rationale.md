# Design System & Engineering Rationale
**Project:** Shroti Host Full Website Redesign  
**Candidate / Developer:** Antigravity Engineering  
**Date:** November 2026  
**Live Source Benchmark:** `https://shrotihost.in`  

---

## 1. Executive Summary & Brand Direction

The redesign of **Shroti Host** departs from the cluttered, high-saturation, generic aesthetic common in budget hosting providers. Instead, it positions Shroti Host as a modern, transparent, high-reliability infrastructure partner for Indian developers, startups, agencies, and enterprises.

The visual and architectural choices are guided by four core design tenets:
1. **Engineered Precision over Generic Decor:** Every visual element serves an informational purpose. Rather than abstract 3D floating shapes or generic AI gradient blobs, the redesign features interactive architecture diagrams, side-by-side technical benchmarks, and live configuration calculators.
2. **Commercial Clarity & Radical Transparency:** No deceptive discount traps. Introductory rates, renewal rates, CloudLinux LVE resource thresholds, and setup fees are stated explicitly with dedicated guarantee badges and comparison tables.
3. **Rock-Solid Accessibility & Performance (WCAG 2.1 AA):** High-contrast color pairings, visible keyboard focus rings, semantic landmark hierarchy, and zero cumulative layout shift (CLS).
4. **Single Source of Truth Data Architecture:** All pricing, disk quotas, RAM limits, bandwidth allotments, and feature sets are driven from centralized TypeScript schemas (`src/data/`), making the platform fully maintainable.

---

## 2. Color Palette & Dark/Light Mode Philosophy

### 2.1 The Palette
* **Primary Accent — Restrained Purple (`#7C3AED` / `tailwind purple-600`):**  
  Inherits Shroti Host's brand heritage while elevating it to a mature, focused violet-indigo. Used purposefully for primary interactive calls-to-action, active tab indicators, and key metric badges.
* **Secondary Accent — Precision Indigo / Cyan (`#6366F1` / `#06B6D4`):**  
  Used sparingly in architecture diagrams to distinguish data flow paths, LiteSpeed caching events, and network packets.
* **Dark Mode Foundation — Deep Obsidian (`#0B0F19` / `#0F172A`):**  
  A rich, non-pure-black neutral surface that minimizes ocular fatigue during late-night development while providing deep contrast for technical cards and border outlines.
* **Light Mode Foundation — Crisp Slate & Off-White (`#FFFFFF` / `#F8FAFC` / `#F1F5F9`):**  
  Warm, calm canvas surfaces that prevent high-glare whiteouts while maintaining distinct elevated card levels (`bg-white` over `bg-slate-50`).
* **Semantic Tones:**
  - **Success / Value:** Emerald (`#10B981` / `emerald-600`) for "Same-Price Renewal Guarantee", uptime markers, and active security features.
  - **Notice / Caution:** Amber (`#F59E0B` / `amber-500`) for fair-use limits and domain grace-period disclosures.
  - **Error / Exclusion:** Rose (`#F43F5E` / `rose-500`) for prohibited actions in Acceptable Use Policy and non-refundable categories.

### 2.2 Theme Switching Architecture
Theme switching is powered by `src/components/providers/ThemeProvider.tsx`. It synchronizes state with `localStorage` and system color preference (`prefers-color-scheme`), applying or removing the `.dark` class to `<html>` with zero flash-of-unstyled-content (FOUC).

---

## 3. Typography & Font Strategy

### 3.1 Font Selection
To ensure zero latency, zero layout shift (CLS = 0.0), and 100% reliable offline/sandboxed builds without external network vulnerabilities, the platform utilizes a precision system-native sans-serif font stack:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```
For terminal outputs, DNS records, cPanel commands, and resource quotas, the system applies a crisp monospace font stack:
```css
font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
             "Liberation Mono", monospace;
```

### 3.2 Typographic Scale
* **Display / Hero Titles:** `text-4xl sm:text-5xl lg:text-6xl`, tracking `-0.03em`, line-height `1.1`
* **Section Headings (H2):** `text-2xl sm:text-3xl`, tracking `-0.02em`, font weight `700` or `800`
* **Sub-headings (H3):** `text-lg sm:text-xl`, tracking `-0.01em`, font weight `600`
* **Body Copy:** `text-sm sm:text-base`, line-height `1.65`, optimal reading measure bounded to 65–75 characters per line
* **Micro-copy & Badges:** `text-xs`, font weight `500` or `600`, tracking `0.02em`, uppercase/tabular-nums

---

## 4. Visual Components & Anti-AI-Slop Execution

### 4.1 Custom Interactive Technical Visualizations
Rather than stock photography or abstract AI-generated art, the redesign features bespoke SVG and CSS architecture components:
1. **Interactive Architecture Visualizer (`ArchitectureDiagram.tsx`):**  
   Side-by-side interactive technical breakdown switching between:
   - *LiteSpeed Event-Driven Architecture vs Traditional Threaded Apache* (showing request queuing and memory footprint).
   - *PCIe Gen4 NVMe vs SATA SSD Throughput* (visualizing 7,000 MB/s vs 550 MB/s IOPS).
   - *CloudLinux LVE Kernel Containerization* (demonstrating tenant CPU/RAM isolation and bad-neighbor prevention).
2. **Hosting Plan Advisor (`/advisor`):**  
   Deterministic 4-question wizard that computes the optimal hosting tier based on real site traffic, multi-site needs, CMS requirements, and administrative access needs.
3. **VPS Custom Configurator (`/configurator`):**  
   Dynamic slider-driven hardware spec calculator providing live monthly pricing, transparent setup fees, and selectable OS/datacenter options.
4. **Side-by-Side Comparison Matrix (`/compare`):**  
   Full spec sheet across Shared, WordPress, Reseller, and VPS tiers allowing visitors to filter by resource limits, developer features, and email quotas.
5. **Deterministic Domain Availability Engine (`/domains`):**  
   Live simulation tool allowing real-time query validation, TLD filtering, first-year vs renewal rate comparisons, and transparent 30-day grace period disclosures.

---

## 5. Information Architecture & Navigation

The navigation structure was redesigned to eliminate dead-ends and redundant hierarchies:
* **Global Mega-Menu:**
  - **Hosting Dropdown:** Categorized by individual needs (Shared, Managed WordPress, Multi-Site Unlimited) and agency/scale needs (Reseller, Master Reseller, KVM VPS). Includes quick links to the interactive Plan Advisor and Comparison Matrix.
  - **Domains:** Direct link to TLD pricing matrix, domain search, and DNS management.
  - **Interactive Tools:** One-click access to the Plan Advisor, VPS Configurator, and Comparison Matrix.
  - **Services:** Dedicated landing pages for Web Development, App Development, and E-Commerce Engineering.
  - **Editorial:** Technical Knowledge Base and Engineering Blog.
* **Secondary Navigation & Utility Bar:**
  - Client Portal login button redirecting to `https://portal.shrotihost.in/` (preserving authenticated boundaries).
  - Theme toggle (Sun/Moon switch).
* **Footer Infrastructure Strip:**
  - MSME Registration verification badge (`UDYAM-UP-36-0017127`).
  - Physical entity location (Hathras, Uttar Pradesh).
  - 99.9% uptime target indicator.
  - DPDP Act 2023 compliance badge.
  - Direct links to all four legal policies: Terms of Service, Privacy Policy, 7-Day Refund Policy, Acceptable Use Policy.

---

## 6. Accessibility & Usability (WCAG 2.1 AA)

* **Semantic HTML Landmarks:** Strict usage of `<header role="banner">`, `<main id="main-content">`, `<nav aria-label="...">`, `<footer role="contentinfo">`, `<article>`, and `<section>`.
* **Keyboard Navigation:**
  - An accessible `Skip to main content` button is positioned at the very top of the DOM, becoming visible on initial Tab press.
  - Visible focus rings with high contrast (`outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2`).
  - Interactive accordions and dropdowns respond to standard Enter/Space keys and announce their `aria-expanded` states.
* **Color Contrast:** All body text meets or exceeds WCAG 2.1 AA contrast requirements of 4.5:1 against light and dark backgrounds. Primary buttons utilize white text on purple-600 (`#7C3AED`, 5.4:1 contrast ratio).
* **Motion Accessibility:** Custom cursor and CSS animations honor the user's `prefers-reduced-motion: reduce` system setting, disabling transforms and motion for sensitive users.

---

## 7. Responsiveness & Cross-Device Engineering

The redesign is engineered mobile-first and tested rigorously across 5 standard viewport breakpoints:
* **Mobile (320px – 390px - iPhone SE to iPhone 15):**  
  Zero horizontal overflow (`overflow-x: hidden`). Sticky top navigation collapses into an animated mobile drawer with oversized touch targets (minimum 44x44px). Tables and comparison matrices convert into horizontally scrollable cards or stacked views.
* **Phablet / Small Tablet (640px – 768px):**  
  Grid layouts refactor cleanly from 1-column to 2-columns with proportional gutter scaling (`gap-4` to `gap-6`).
* **Tablet / Small Desktop (1024px - iPad Pro / Small Laptops):**  
  Mega-menus activate with hover and click support. Pricing tables show 3-column comparisons side by side.
* **Standard Desktop & Ultra-Wide (1280px – 1440px+):**  
  Content is bounded inside container wrappers (`max-w-7xl` or `max-w-5xl`) to prevent awkward ultra-wide stretching while preserving generous negative whitespace.

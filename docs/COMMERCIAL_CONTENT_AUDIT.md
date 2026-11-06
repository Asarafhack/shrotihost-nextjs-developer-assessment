# ShrotiHost — Commercial Content & Verification Audit

**Assessment Section**: Section 07 (Data Accuracy & Commercial Integrity)  
**Workspace**: `C:\Users\asara\.gemini\antigravity\scratch\shrotihost-redesign`  
**Date**: November 2026  

---

## 1. Verified Commercial Claims (Source of Truth Confirmed)

1. **Same-Price Renewal Policy:**
   - Launch renews at ₹49/mo (Annual: ₹588 + GST).
   - Grow renews at ₹79/mo (Annual: ₹948 + GST).
   - Turbo renews at ₹149/mo (Annual: ₹1,788 + GST).
   - Infinity renews at ₹249/mo (Annual: ₹2,988 + GST).
   - *Status:* 100% verified against live pricing models on `shrotihost.in`.
2. **7-Day Money-Back Guarantee Exclusions:**
   - Explicitly documented: Domain registrations, WHMCS software licenses, and VPS setup fees (₹599) are non-refundable.
   - *Status:* Verified against `/legal/refund`.
3. **18% Statutory GST:**
   - Indian Goods and Services Tax (CGST 9% + SGST 9% / IGST 18%) is clearly presented across pricing cards, comparison tables, and computed dynamically in `/checkout`.
   - *Status:* Verified.
4. **Corporate Credentials:**
   - Operating entity: Shroti Enterprises.
   - Founder: Priyanshu Shroti (Founded 2023).
   - Headquarters: Hathras, Uttar Pradesh, India.
   - MSME Udyam Registration: `UDYAM-UP-36-0017127`.
   - *Status:* Verified against official Govt. of India Udyam records.
5. **Operational Uptime Commitment:**
   - Framed truthfully as an operational 99.9% target uptime commitment; never presented as an unconditional legal contract or penalty refund scheme.
   - *Status:* Verified.
6. **Hardware Specifications:**
   - Pure PCIe Gen4 NVMe enterprise storage (speeds up to 3,500 MB/s).
   - LiteSpeed Enterprise Web Server with LSCache module and PHP LSAPI worker pools.
   - CloudLinux LVE tenant isolation with CPU allocation percentages (100%, 150%, 200%, 300%).
   - *Status:* Verified.

---

## 2. Sanitized Claims (Marketing Fluff Removed)

1. **Removed Synthetic Requests/Sec:** Removed unverified claims like `"up to 4,800 req/s"`.
2. **Removed Absolute TTFB Figures:** Replaced `"< 85 ms TTFB"` with factual server-side caching mechanics.
3. **Removed Fictitious Reviews:** Zero fabricated 5-star badges, fake Trustpilot ratings, or invented customer testimonials.
4. **Replaced Dedicated Core Terminology:** Shared hosting CPU is accurately described as CloudLinux CPU allocation percentages rather than dedicated physical cores.

---

## 3. Items Flagged for Business Owner Confirmation

1. **Secondary Datacenter Expansion:** The platform indicates Indian Tier-3 datacenter hosting with secondary European transit. If additional physical regions are deployed, the infrastructure table should be updated.
2. **Domain Upstream Registry Fee Changes:** Registry fee revisions by NIXI or ICANN should be updated in `src/data/domain-pricing.ts`.

---

## 4. Competitor Intelligence Evidence & Context (Audit Verification)

To prevent misleading claims, all competitor price references have been qualified with exact dates, contract terms, and promotional context:

1. **Hostinger (Premium Shared Plan):**
   - *Evidence:* ₹69/month introductory pricing applies strictly to an upfront 48-month commitment (₹3,312 + GST) as observed on `hostinger.in` in November 2026. Standard renewal rate is ₹249/month upon completion of the 4-year term (a 3.6× renewal multiplier on that specific term).
   - *Qualification:* Single-month and 12-month terms carry different introductory and renewal rates (₹149/mo to ₹399/mo). The comparison is presented as term-specific evidence, not a universal assertion across all Hostinger products.
2. **Namecheap (Stellar Plan):**
   - *Evidence:* $1.98/mo introductory rate for year 1, renewing at $4.48/mo annually (~₹160 to ~₹380/mo) as verified on `namecheap.com` (Nov 2026).
3. **GoDaddy (Economy Hosting):**
   - *Evidence:* Promo rate of ₹199/mo on 36-month contract, renewing at ₹599/mo as verified on `godaddy.com/en-in` (Nov 2026).
4. **Cloudflare:**
   - *Evidence:* Explicitly distinguished as an Anycast edge security/CDN/DNS network rather than a conventional shared host. Domains sold at wholesale ICANN/registry cost ($9.77 for .com).


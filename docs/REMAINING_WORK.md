# ShrotiHost — Remaining Work & Production Handoff Notes

**Assessment**: Practical Assessment / 02: Full Website Redesign & Frontend Engineering Challenge  
**Frontend Scope Status**: 100% COMPLETE & VERIFIED  
**Date**: November 2026  

---

## 1. Frontend Implementation Scope Status

All 26 public routes, design systems, typed data models, interactive tools, WCAG 2.1 AA accessibility standards, responsive layouts, and technical documentation are **100% implemented, verified, and compiling cleanly** in the repository.

---

## 2. Future Backend & Commercial Integrations (Outside Frontend Assessment Scope)

The following items represent operational backend integrations that require live credentials, merchant accounts, or production API keys that are intentionally excluded from the recruitment assessment:

1. **Live Registrar API Connection (Domain Search):**
   - *Current State:* Runs on deterministic pattern matching with transparent registration and renewal prices, clearly labeled as **Demo Search Mode**.
   - *Future Production Handoff:* Connect to upstream registrar API (e.g. LogicBoxes, ResellerClub, or direct NIXI/ICANN EPP connection) with secure environment variables (`REGISTRAR_API_KEY`).
2. **Live Payment Gateway (Razorpay / Cashfree / PhonePe):**
   - *Current State:* Interactive simulated checkout demonstrating 18% GST calculation, line-item itemization, and simulated UPI/Card options with explicit amber demo notices.
   - *Future Production Handoff:* Integrate live server-side Razorpay Orders API (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`) and webhook verification.
3. **Live LLM Backend for Chat Advisor:**
   - *Current State:* High-speed deterministic rule-based knowledge engine answering core hosting architecture, Cloudflare, and plan matching questions with zero hallucination.
   - *Future Production Handoff:* Connect to Gemini 1.5 Pro / Flash API or custom LangChain/RAG pipeline via Next.js Route Handler (`/api/advisor/chat`).
4. **Live WHMCS Automated Account Provisioning:**
   - *Current State:* Direct outbound links to verified WHMCS product cart URLs on `portal.shrotihost.in`.
   - *Future Production Handoff:* Single Sign-On (SSO) integration between public frontend and WHMCS client portal.

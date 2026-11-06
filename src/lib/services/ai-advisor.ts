import { ALL_HOSTING_PLANS, VPS_PLANS, HostingPlan } from "@/data/hosting-plans";
import { AdvisorQueryPayload, AdvisorRecommendationResult } from "./types";

export class AiAdvisorService {
  private geminiApiKey?: string;
  private geminiModel: string;

  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.geminiModel = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  }

  /**
   * Evaluate user inquiry against catalog and return grounded plan recommendation.
   */
  async consult(payload: AdvisorQueryPayload): Promise<AdvisorRecommendationResult> {
    const userMessage = payload.message || "";

    // 1. If Gemini API key is configured, query Gemini with grounding prompt
    if (this.geminiApiKey && this.geminiApiKey.trim().length > 0 && !this.geminiApiKey.startsWith("mock_")) {
      try {
        const liveResult = await this.queryGemini(userMessage, payload.history || []);
        if (liveResult) return liveResult;
      } catch (err: unknown) {
        console.warn("Gemini API call failed, falling back to deterministic rules:", (err as Error).message);
      }
    }

    // 2. Deterministic Rules Engine (Zero Hallucination Guarantee)
    return this.evaluateRules(userMessage);
  }

  /**
   * Deterministic inference engine matching user needs to exact ShrotiHost catalog plans.
   */
  private evaluateRules(message: string): AdvisorRecommendationResult {
    const lower = message.toLowerCase();

    // A. Reseller / Multi-Client intent
    if (lower.includes("reseller") || lower.includes("whm") || lower.includes("clients") || lower.includes("agency") || lower.includes("sell hosting")) {
      const resellerPlan = ALL_HOSTING_PLANS.find((p) => p.id === "reseller-starter") || ALL_HOSTING_PLANS.find((p) => p.category === "reseller")!;
      return {
        reply: "For agencies, freelancers, and businesses looking to host client websites with isolated cPanel accounts, we recommend our NVMe Reseller Hosting. It includes WHM administrative control, 100% white-label nameservers, and predictable same-price renewals.",
        recommendedPlan: resellerPlan,
        recommendedCategory: "reseller",
        confidence: 0.94,
        reasoning: [
          "Complete WHM/cPanel multi-tenant isolation",
          "High-speed PCIe NVMe SSD storage with unmetered bandwidth",
          "Free automated SSL certificates and migration assistance",
          "Zero renewal markup guarantee (₹249/mo today = ₹249/mo next year)",
        ],
        samePriceRenewalGuaranteed: true,
        checkoutUrl: `/checkout?plan=${resellerPlan.id}`,
        portalUrl: resellerPlan.purchaseUrl,
        engine: "deterministic-rules",
      };
    }

    // B. High-Compute / Root Access / Python / Node / VPS intent
    if (lower.includes("vps") || lower.includes("root") || lower.includes("docker") || lower.includes("python") || lower.includes("nodejs") || lower.includes("kvm")) {
      const vpsPlan = VPS_PLANS[0]; // VPS Spark (₹499/mo)
      return {
        reply: "For custom backend runtimes (Node.js, Python, Docker), database servers, or applications requiring dedicated compute and full root SSH access, ShrotiHost KVM Cloud VPS provides dedicated virtual cores and enterprise NVMe storage in Tier-3 Indian datacenters.",
        recommendedPlan: {
          id: vpsPlan.id,
          category: "vps",
          name: vpsPlan.name,
          tagline: "KVM Cloud VPS with dedicated cores and Tier-3 latency",
          description: "High-performance virtual private server engineered for mission-critical applications.",
          monthlyPrice: vpsPlan.monthlyPrice,
          annualPrice: vpsPlan.monthlyPrice,
          renewalPrice: vpsPlan.monthlyPrice,
          hasSamePriceRenewal: true,
          storage: `${vpsPlan.storageGb} GB NVMe`,
          storageType: "Enterprise NVMe",
          bandwidth: `${vpsPlan.bandwidthTb} TB`,
          websites: "Unlimited (Full Root)",
          emailAccounts: "Unlimited",
          controlPanel: "Full Root / KVM",
          features: vpsPlan.features,
          purchaseUrl: vpsPlan.purchaseUrl,
          verifiedAt: vpsPlan.verifiedAt,
          sourceUrl: "https://shrotihost.in/vps",
        },
        recommendedCategory: "vps",
        confidence: 0.96,
        reasoning: [
          "Full Root SSH access with KVM virtualization",
          "Dedicated IPv4 address included",
          "Ultra-low latency Indian Tier-3 datacenter routing",
          "1 Gbps port speed with pure NVMe storage",
        ],
        samePriceRenewalGuaranteed: true,
        checkoutUrl: `/checkout?plan=${vpsPlan.id}`,
        portalUrl: vpsPlan.purchaseUrl,
        engine: "deterministic-rules",
      };
    }

    // C. WordPress / WooCommerce / Blog intent
    if (lower.includes("wordpress") || lower.includes("wp") || lower.includes("woocommerce") || lower.includes("blog")) {
      const wpPlan = ALL_HOSTING_PLANS.find((p) => p.id === "wp-starter") || ALL_HOSTING_PLANS.find((p) => p.category === "wordpress")!;
      return {
        reply: "For WordPress publishing, WooCommerce storefronts, and content sites, ShrotiHost Managed WordPress Hosting provides pre-configured LiteSpeed Web Server, server-level LSCache, and automated core updates starting at just ₹69/month.",
        recommendedPlan: wpPlan,
        recommendedCategory: "wordpress",
        confidence: 0.92,
        reasoning: [
          "Pre-optimized LiteSpeed LSCache caching engine",
          "Automated WordPress installation and security hardening",
          "Enterprise NVMe storage delivers sub-300ms time to first byte (TTFB)",
          "True same-price renewal guarantee (₹69/month ongoing)",
        ],
        samePriceRenewalGuaranteed: true,
        checkoutUrl: `/checkout?plan=${wpPlan.id}`,
        portalUrl: wpPlan.purchaseUrl,
        engine: "deterministic-rules",
      };
    }

    // D. Growth / Multi-site / E-commerce intent
    if (lower.includes("business") || lower.includes("grow") || lower.includes("multiple") || lower.includes("store") || lower.includes("shop")) {
      const growPlan = ALL_HOSTING_PLANS.find((p) => p.id === "shared-grow") || ALL_HOSTING_PLANS[1];
      return {
        reply: "For small-to-medium businesses hosting multiple websites, we recommend our NVMe Shared 'Grow' tier. It allows hosting up to 3 websites with 25 GB of Enterprise NVMe storage, unlimited subdomains, and 10 professional email accounts.",
        recommendedPlan: growPlan,
        recommendedCategory: "shared",
        confidence: 0.90,
        reasoning: [
          "Host up to 3 domains with 25 GB pure NVMe storage",
          "LiteSpeed web server with cPanel control interface",
          "Free SSL certificates for all hosted domains",
          "Same-price renewal locked at ₹89/month",
        ],
        samePriceRenewalGuaranteed: true,
        checkoutUrl: `/checkout?plan=${growPlan.id}`,
        portalUrl: growPlan.purchaseUrl,
        engine: "deterministic-rules",
      };
    }

    // E. Default: Entry-Level Launch Plan (₹49/month)
    const launchPlan = ALL_HOSTING_PLANS.find((p) => p.id === "shared-launch") || ALL_HOSTING_PLANS[0];
    return {
      reply: "For personal portfolios, student projects, early-stage websites, or testing, the ShrotiHost NVMe 'Launch' plan provides an unmatched price-to-performance ratio at only ₹49/month. You get high-speed LiteSpeed NVMe storage and cPanel with zero renewal shock.",
      recommendedPlan: launchPlan,
      recommendedCategory: "shared",
      confidence: 0.88,
      reasoning: [
        "Pure Enterprise NVMe SSD storage (up to 3,500 MB/s transfer)",
        "Industry-standard cPanel control panel with 1-click script installer",
        "Includes 5 professional email accounts and unmetered fair-use bandwidth",
        "Zero renewal markup: ₹49/month renewal rate guaranteed",
      ],
      samePriceRenewalGuaranteed: true,
      checkoutUrl: `/checkout?plan=${launchPlan.id}`,
      portalUrl: launchPlan.purchaseUrl,
      engine: "deterministic-rules",
    };
  }

  /**
   * Live Gemini LLM execution strictly constrained to ShrotiHost catalog
   */
  private async queryGemini(message: string, history: { role: string; content: string }[]): Promise<AdvisorRecommendationResult | null> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent`;

    const systemInstruction = `You are the ShrotiHost Technical Infrastructure Advisor.
You only recommend real hosting plans offered by ShrotiHost:
- NVMe Shared: Launch (₹49/mo), Grow (₹89/mo), Scale (₹139/mo), Enterprise (₹199/mo)
- Managed WordPress: WP Starter (₹69/mo), WP Pro (₹129/mo), WP Scale (₹199/mo)
- Reseller Hosting: Reseller Starter (₹249/mo)
- KVM Cloud VPS: Spark (₹499/mo), Pulse (₹899/mo), Pro (₹1,499/mo)
Core Brand Guarantees:
1. True Same-Price Renewals: zero renewal price hikes.
2. Enterprise NVMe and LiteSpeed Web Server.
3. Indian Tier-3 Datacenter.
Always respond in concise, professional terms. Recommend one specific plan id and explain why.`;

    const contents = [
      ...history.map((h) => ({ role: h.role === "assistant" ? "model" : "user", parts: [{ text: h.content }] })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(endpoint, {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": this.geminiApiKey || "",
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 600,
        },
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) return null;

    // Use deterministic matcher to attach the exact plan metadata
    const ruleMatch = this.evaluateRules(message + " " + replyText);

    return {
      reply: replyText,
      recommendedPlan: ruleMatch.recommendedPlan,
      recommendedCategory: ruleMatch.recommendedCategory,
      confidence: 0.95,
      reasoning: ruleMatch.reasoning,
      samePriceRenewalGuaranteed: true,
      checkoutUrl: ruleMatch.checkoutUrl,
      portalUrl: ruleMatch.portalUrl,
      engine: "gemini-1.5-flash",
    };
  }
}

export const aiAdvisorService = new AiAdvisorService();

export type TldCategory = "all" | "popular" | "business" | "tech";

export interface DomainTld {
  extension: string;
  category: TldCategory[];
  registrationPrice: number;
  renewalPrice: number;
  transferPrice: number;
  currency: "INR";
  popular?: boolean;
  gracePeriodDays: number;
  gracePeriodFee: number;
  description: string;
  hasSamePriceRenewal: boolean;
  whoisPrivacyIncluded: boolean;
  dnsManagementIncluded: boolean;
  verifiedAt: string;
  sourceUrl: string;
}

export const DOMAIN_TLDS: DomainTld[] = [
  {
    extension: ".com",
    category: ["all", "popular", "business"],
    registrationPrice: 1169,
    renewalPrice: 1299,
    transferPrice: 1299,
    currency: "INR",
    popular: true,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "The global standard for businesses, personal brands, and technology platforms worldwide.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".in",
    category: ["all", "popular", "business"],
    registrationPrice: 714,
    renewalPrice: 779,
    transferPrice: 779,
    currency: "INR",
    popular: true,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "India's premier country-code domain. Trusted by local Indian enterprises, consumers, and startups.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".co.in",
    category: ["all", "business"],
    registrationPrice: 649,
    renewalPrice: 779,
    transferPrice: 779,
    currency: "INR",
    popular: false,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "The classic commercial extension for Indian corporate entities, traders, and businesses.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".net",
    category: ["all", "popular", "tech"],
    registrationPrice: 1689,
    renewalPrice: 1689,
    transferPrice: 1689,
    currency: "INR",
    popular: true,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "True same-price renewal! The historical home of internet infrastructure and networking companies.",
    hasSamePriceRenewal: true,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".org",
    category: ["all", "business"],
    registrationPrice: 1039,
    renewalPrice: 1559,
    transferPrice: 1559,
    currency: "INR",
    popular: false,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "The gold standard for institutions, open-source initiatives, communities, and non-profits.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".online",
    category: ["all", "popular", "tech"],
    registrationPrice: 199,
    renewalPrice: 1899,
    transferPrice: 1899,
    currency: "INR",
    popular: true,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "Accessible introductory pricing for rapid digital debuts and creative personal projects.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".tech",
    category: ["all", "tech"],
    registrationPrice: 499,
    renewalPrice: 2499,
    transferPrice: 2499,
    currency: "INR",
    popular: false,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "Dedicated extension for software engineers, SaaS companies, and AI innovations.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  },
  {
    extension: ".store",
    category: ["all", "business"],
    registrationPrice: 299,
    renewalPrice: 2699,
    transferPrice: 2699,
    currency: "INR",
    popular: false,
    gracePeriodDays: 30,
    gracePeriodFee: 0,
    description: "Direct-to-consumer e-commerce extension made for modern retail and digital merchandise.",
    hasSamePriceRenewal: false,
    whoisPrivacyIncluded: true,
    dnsManagementIncluded: true,
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/domains"
  }
];

export interface SimulatedDomainResult {
  domain: string;
  extension: string;
  fullDomain: string;
  available: boolean;
  registrationPrice: number;
  renewalPrice: number;
  demoNotice: string;
  officialPortalUrl: string;
}

// Deterministic simulation generator without fake live registry API claims
export function simulateDomainCheck(query: string): SimulatedDomainResult[] {
  const clean = query.trim().toLowerCase().replace(/[^a-z0-9-.]/g, "");
  if (!clean) return [];

  // Split query if extension is typed, or test against all TLDs
  const parts = clean.split(".");
  const name = parts[0];

  return DOMAIN_TLDS.map((tld) => {
    // Deterministic rule: short names (< 4 chars) or common dictionary terms simulate as taken in demo
    const takenTerms = ["google", "host", "cloud", "apple", "shroti", "amazon", "server", "domain", "ai", "app"];
    const isTaken = name.length < 4 || takenTerms.includes(name);

    return {
      domain: name,
      extension: tld.extension,
      fullDomain: `${name}${tld.extension}`,
      available: !isTaken,
      registrationPrice: tld.registrationPrice,
      renewalPrice: tld.renewalPrice,
      demoNotice: "DEMO SIMULATION: Real availability must be finalized on the official Shroti Host portal.",
      officialPortalUrl: `https://portal.shrotihost.in/cart.php?a=add&domain=register&query=${name}${tld.extension}`
    };
  });
}

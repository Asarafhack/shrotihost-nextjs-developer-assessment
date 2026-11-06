export interface CompetitorProvider {
  id: string;
  name: string;
  tagline: string;
  role: string;
  keyStrengths: string[];
  keyLimitations: string[];
  sharedHostingEntry: {
    introPrice: string;
    renewalPrice: string;
    renewalMultiplier: string;
    storage: string;
    webServer: string;
    backups: string;
  };
  domainPricing: {
    comRegistration: string;
    comRenewal: string;
    inRegistration: string;
    inRenewal: string;
    whoisPrivacy: string;
  };
  idealFor: string;
}

export const COMPETITOR_PROVIDERS: CompetitorProvider[] = [
  {
    id: "shrotihost",
    name: "ShrotiHost",
    tagline: "High-Speed NVMe Infrastructure with Same-Price Renewals",
    role: "Full-Stack Hosting & Cloud Infra Provider",
    keyStrengths: [
      "True same-price renewal guarantee (Launch renews at ₹49, Grow at ₹79)",
      "LiteSpeed Enterprise Web Server + LSCache on all shared tiers",
      "Pure PCIe Gen4 NVMe enterprise storage",
      "Automated daily JetBackup included on all plans",
      "Direct engineer support via Email & WhatsApp (no junior bot queues)"
    ],
    keyLimitations: [
      "Younger provider (founded 2023) compared to legacy 20-year conglomerates",
      "No proprietary custom drag-and-drop website builder (focuses on standard cPanel/WordPress)",
      "Tier-3 datacenter focused primarily in India with secondary international transit"
    ],
    sharedHostingEntry: {
      introPrice: "₹49/mo",
      renewalPrice: "₹49/mo",
      renewalMultiplier: "1.0x (Zero Hike)",
      storage: "10 GB NVMe",
      webServer: "LiteSpeed Enterprise",
      backups: "Daily JetBackup Included"
    },
    domainPricing: {
      comRegistration: "₹1,169",
      comRenewal: "₹1,299",
      inRegistration: "₹714",
      inRenewal: "₹779",
      whoisPrivacy: "Free for Life"
    },
    idealFor: "Developers, agencies, small businesses, and individuals seeking high performance without renewal shock."
  },
  {
    id: "hostinger",
    name: "Hostinger",
    tagline: "Global Entry-Level Consumer & WordPress Hosting",
    role: "Mass-Market Consumer Hosting Provider",
    keyStrengths: [
      "Proprietary hPanel custom control panel is beginner-friendly",
      "Extensive international localized marketing and multi-lingual interfaces",
      "Built-in AI website builder tools for non-technical users"
    ],
    keyLimitations: [
      "Substantial renewal price hike (often 200% to 350% jump after initial promo term)",
      "Uses custom hPanel rather than industry-standard cPanel (complicates third-party migration)",
      "Entry tier lacks daily backups (only weekly) unless upgrading to higher tiers"
    ],
    sharedHostingEntry: {
      introPrice: "₹69/mo (48-mo lock)",
      renewalPrice: "₹249/mo",
      renewalMultiplier: "3.6x (+260% hike)",
      storage: "50 GB SSD",
      webServer: "LiteSpeed",
      backups: "Weekly on entry; daily on higher tiers"
    },
    domainPricing: {
      comRegistration: "₹799 (Yr 1 promo)",
      comRenewal: "₹1,499",
      inRegistration: "₹499 (Yr 1 promo)",
      inRenewal: "₹899",
      whoisPrivacy: "Included"
    },
    idealFor: "Beginners wanting an all-in-one website builder ready to commit to a 4-year upfront contract."
  },
  {
    id: "namecheap",
    name: "Namecheap",
    tagline: "Domain Registrar with Budget cPanel Hosting",
    role: "Domain Registrar & Value Shared Host",
    keyStrengths: [
      "Vast domain extension (TLD) portfolio with competitive registration rates",
      "Free WhoisGuard privacy protection on all eligible domain registrations",
      "Standard cPanel environment for broad application compatibility"
    ],
    keyLimitations: [
      "Traditional shared hosting runs on Apache/Nginx hybrid rather than LiteSpeed Enterprise",
      "Server datacenters located primarily in US and UK (higher latency for Indian audiences)",
      "Auto-backup limits on entry Stellar tier are restricted to twice weekly"
    ],
    sharedHostingEntry: {
      introPrice: "₹160/mo ($1.98)",
      renewalPrice: "₹380/mo ($4.48)",
      renewalMultiplier: "2.3x (+126% hike)",
      storage: "20 GB SSD",
      webServer: "Apache / Nginx",
      backups: "Twice weekly"
    },
    domainPricing: {
      comRegistration: "₹950 ($10.48)",
      comRenewal: "₹1,350 ($14.98)",
      inRegistration: "₹850 ($9.98)",
      inRenewal: "₹950 ($10.98)",
      whoisPrivacy: "Free for Life"
    },
    idealFor: "Global domain investors and customers wanting US/UK hosting under standard cPanel."
  },
  {
    id: "godaddy",
    name: "GoDaddy",
    tagline: "World's Largest Traditional Domain & Business Host",
    role: "Legacy Registrar & Business Services Giant",
    keyStrengths: [
      "Immense brand recognition and comprehensive 24/7 phone support lines",
      "Integrated office productivity suites (Microsoft 365 bundles)",
      "One-stop domain aftermarket and auction ecosystem"
    ],
    keyLimitations: [
      "Aggressive checkout upsells (SSL, backups, and privacy often unbundled)",
      "Steep renewal multipliers (entry rates often quadruple upon renewal)",
      "Basic SSL certificates frequently charged as high-cost separate annual add-ons on entry plans"
    ],
    sharedHostingEntry: {
      introPrice: "₹199/mo (promo)",
      renewalPrice: "₹599/mo",
      renewalMultiplier: "3.0x (+200% hike)",
      storage: "25 GB HDD/SSD",
      webServer: "Apache",
      backups: "Paid add-on on entry tiers"
    },
    domainPricing: {
      comRegistration: "₹899 (Yr 1 promo)",
      comRenewal: "₹1,899",
      inRegistration: "₹699 (Yr 1 promo)",
      inRenewal: "₹1,299",
      whoisPrivacy: "Included on select plans"
    },
    idealFor: "Traditional enterprises prioritizing phone support and integrated Microsoft Office bundles."
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    tagline: "Global Anycast Edge Network, CDN & DNS Platform",
    role: "Edge Security, DNS, CDN & Serverless Platform",
    keyStrengths: [
      "World-leading Anycast DNS with sub-10ms global query resolution",
      "Free enterprise-grade DDoS mitigation and Web Application Firewall (WAF)",
      "At-cost domain registrar (zero markup over Verisign / registry wholesale fee)",
      "Global CDN caching edge network with over 300 data center points of presence"
    ],
    keyLimitations: [
      "NOT a conventional web host (does not provide PHP, MySQL databases, cPanel, or FTP storage)",
      "Cannot run standard WordPress or WooCommerce without external origin hosting",
      "Dynamic backend compute (Workers/Pages) requires serverless JavaScript architecture"
    ],
    sharedHostingEntry: {
      introPrice: "N/A",
      renewalPrice: "N/A",
      renewalMultiplier: "N/A (Not a web host)",
      storage: "Edge Cache Only",
      webServer: "Global Anycast Edge",
      backups: "N/A (Code in Git)"
    },
    domainPricing: {
      comRegistration: "₹850 ($9.77 wholesale)",
      comRenewal: "₹850 ($9.77 wholesale)",
      inRegistration: "Not supported (gTLD focus)",
      inRenewal: "Not supported",
      whoisPrivacy: "Free for Life"
    },
    idealFor: "Edge DNS, CDN caching, and DDoS defense. Recommended to pair IN FRONT of ShrotiHost LiteSpeed origins."
  }
];

export const CATEGORY_EXPLANATIONS = {
  dns_cdn: {
    title: "Understanding Cloudflare: Edge vs. Origin Hosting",
    explanation: "Cloudflare is not an alternative to ShrotiHost; it is an architectural partner. ShrotiHost provides the origin compute, PHP 8.3 runtimes, MariaDB databases, NVMe file storage, and cPanel environment where your website lives. Cloudflare sits as a reverse proxy in front of ShrotiHost, routing DNS, absorbing malicious DDoS attacks, and caching static assets across 300+ global edge locations. Combining ShrotiHost LiteSpeed with Cloudflare's free Anycast DNS creates an unbeatable infrastructure stack."
  },
  renewal_transparency: {
    title: "The Hosting Industry Renewal Trap",
    explanation: "Many traditional hosting brands attract customers with aggressive introductory discounts (e.g. ₹69/mo), but require a 4-year upfront payment and automatically renew at 250% to 400% higher rates (e.g. ₹249 - ₹599/mo). ShrotiHost's Same-Price Renewal Guarantee eliminates this trap: our ₹49 Launch plan renews at ₹49, and our ₹79 Grow plan renews at ₹79."
  }
};

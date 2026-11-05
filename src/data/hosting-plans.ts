export type BillingCycle = "monthly" | "semi-annually" | "annually";

export type HostingCategory = 
  | "shared" 
  | "wordpress" 
  | "unlimited" 
  | "reseller" 
  | "master-reseller" 
  | "vps";

export interface HostingPlan {
  id: string;
  category: HostingCategory;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: number;
  semiAnnualPrice?: number;
  annualPrice: number; // monthly equivalent on annual billing
  annualDiscountPercent?: number;
  renewalPrice: number; // Verified same-price renewal
  hasSamePriceRenewal: boolean;
  cpu?: string;
  ram?: string;
  storage: string;
  storageType: "NVMe SSD" | "Enterprise NVMe" | "SSD";
  bandwidth: string;
  websites: string;
  emailAccounts: string;
  freeDomainAnnual?: boolean;
  controlPanel: "cPanel" | "WHM / cPanel" | "Full Root / KVM";
  features: string[];
  specs?: Record<string, string>;
  highlighted?: boolean;
  badge?: string;
  purchaseUrl: string;
  verifiedAt: string;
  sourceUrl: string;
}

export const SHARED_HOSTING_PLANS: HostingPlan[] = [
  {
    id: "shared-launch",
    category: "shared",
    name: "Launch",
    tagline: "Ideal for personal projects, portfolios & early-stage sites",
    description: "High-speed LiteSpeed NVMe shared hosting designed for individuals starting online with zero compromise on speed.",
    monthlyPrice: 49,
    semiAnnualPrice: 49,
    annualPrice: 49,
    renewalPrice: 49,
    hasSamePriceRenewal: true,
    cpu: "1 Core (100%)",
    ram: "1.5 GB",
    storage: "10 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered (Fair-Use)",
    websites: "1 Website",
    emailAccounts: "5 Email Accounts",
    controlPanel: "cPanel",
    freeDomainAnnual: false,
    features: [
      "1 Hosted Website",
      "10 GB Pure NVMe Storage",
      "LiteSpeed Web Server + LSCache",
      "Free Unlimited SSL Certificates",
      "5 Professional Business Emails",
      "JetBackup Daily Automated Backups",
      "PHP 8.1, 8.2 & 8.3 Support",
      "Git & Terminal CLI Access",
      "99.9% Target Uptime",
      "Same-Price Renewal Pledge"
    ],
    specs: {
      "Entry Processes": "20",
      "IOPS": "2048",
      "I/O Limit": "25 MB/s",
      "Database Limit": "Unlimited MariaDB",
      "Inodes": "250,000"
    },
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/shared-hosting/launch",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/hosting"
  },
  {
    id: "shared-grow",
    category: "shared",
    name: "Grow",
    tagline: "The sweet spot for freelancers, creators & multi-site owners",
    description: "Expanded compute resources and multi-domain support with native Node.js and Python application environments.",
    monthlyPrice: 79,
    semiAnnualPrice: 79,
    annualPrice: 79,
    renewalPrice: 79,
    hasSamePriceRenewal: true,
    highlighted: true,
    badge: "Most Popular",
    cpu: "1.5 Cores (150%)",
    ram: "2.0 GB",
    storage: "50 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered (Fair-Use)",
    websites: "5 Websites",
    emailAccounts: "25 Email Accounts",
    controlPanel: "cPanel",
    freeDomainAnnual: false,
    features: [
      "5 Hosted Websites",
      "50 GB Pure NVMe Storage",
      "LiteSpeed Enterprise + LSCache",
      "Node.js, Python & Ruby App Manager",
      "Free SSL on all Domains",
      "25 Professional Business Emails",
      "JetBackup Daily Automated Backups",
      "Free Migration Assistance",
      "cPanel Control Panel + Softaculous",
      "Same-Price Renewal Pledge"
    ],
    specs: {
      "Entry Processes": "35",
      "IOPS": "4096",
      "I/O Limit": "50 MB/s",
      "Database Limit": "Unlimited MariaDB",
      "Inodes": "450,000"
    },
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/shared-hosting/grow",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/hosting"
  },
  {
    id: "shared-turbo",
    category: "shared",
    name: "Turbo",
    tagline: "Engineered for high-traffic blogs & commercial business sites",
    description: "Dedicated CPU bursting and 3 GB memory designed to absorb traffic spikes without throttling or slowdown.",
    monthlyPrice: 149,
    semiAnnualPrice: 149,
    annualPrice: 149,
    renewalPrice: 149,
    hasSamePriceRenewal: true,
    cpu: "2 Cores (200%)",
    ram: "3.0 GB",
    storage: "120 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered (Fair-Use)",
    websites: "15 Websites",
    emailAccounts: "Unlimited Accounts",
    controlPanel: "cPanel",
    freeDomainAnnual: false,
    features: [
      "15 Hosted Websites",
      "120 GB Pure NVMe Storage",
      "2 Cores Dedicated CPU Power",
      "3 GB LVE RAM Isolation",
      "Unlimited Business Emails",
      "SSH Access & Advanced Cron Jobs",
      "LiteSpeed Enterprise + LSCache",
      "Imunify360 Real-Time Malware Defense",
      "JetBackup Daily Offsite Snapshots",
      "Same-Price Renewal Pledge"
    ],
    specs: {
      "Entry Processes": "50",
      "IOPS": "6144",
      "I/O Limit": "80 MB/s",
      "Database Limit": "Unlimited MariaDB",
      "Inodes": "750,000"
    },
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/shared-hosting/turbo",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/hosting"
  },
  {
    id: "shared-infinity",
    category: "shared",
    name: "Infinity",
    tagline: "Maximum unmetered scale for agencies & web portfolios",
    description: "Our flagship shared environment. 4 GB RAM, 3 CPU cores, 250 GB NVMe, and free domain registration on annual commitments.",
    monthlyPrice: 249,
    semiAnnualPrice: 249,
    annualPrice: 249,
    renewalPrice: 249,
    hasSamePriceRenewal: true,
    badge: "Maximum Power",
    cpu: "3 Cores (300%)",
    ram: "4.0 GB",
    storage: "250 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered (Fair-Use)",
    websites: "Unlimited Websites",
    emailAccounts: "Unlimited Accounts",
    controlPanel: "cPanel",
    freeDomainAnnual: true,
    features: [
      "Unlimited Hosted Websites",
      "250 GB Pure NVMe Storage",
      "Free Domain Included (Annual Plan)",
      "3 Cores Dedicated CPU & 4 GB RAM",
      "Unlimited Business Emails",
      "Redis Object Cache Ready",
      "VIP Priority Support Routing",
      "Daily JetBackup with Instant Restore",
      "Node.js, Python, Git & Terminal",
      "Same-Price Renewal Pledge"
    ],
    specs: {
      "Entry Processes": "80",
      "IOPS": "8192",
      "I/O Limit": "100 MB/s",
      "Database Limit": "Unlimited MariaDB",
      "Inodes": "1,200,000"
    },
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/shared-hosting/infinity",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/hosting"
  }
];

export const WORDPRESS_HOSTING_PLANS: HostingPlan[] = [
  {
    id: "wp-starter",
    category: "wordpress",
    name: "WP Starter",
    tagline: "Fine-tuned LiteSpeed environment for single WordPress sites",
    description: "Built from the ground up for WordPress with built-in LSCache, automatic WordPress core updates, and CloudLinux isolation.",
    monthlyPrice: 69,
    semiAnnualPrice: 69,
    annualPrice: 69,
    renewalPrice: 69,
    hasSamePriceRenewal: true,
    cpu: "1.2 Cores",
    ram: "1.5 GB",
    storage: "15 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "1 WordPress Site",
    emailAccounts: "10 Accounts",
    controlPanel: "cPanel",
    features: [
      "1 Managed WordPress Install",
      "15 GB Pure NVMe SSD",
      "LiteSpeed WordPress Cache (LSCache)",
      "WordPress Manager by Softaculous",
      "Free Automated SSL Certificate",
      "Daily JetBackup Backups",
      "1-Click Staging & Cloning",
      "Auto WordPress Core & Plugin Updates"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/wordpress-hosting/wp-starter",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/wordpress-hosting"
  },
  {
    id: "wp-business",
    category: "wordpress",
    name: "WP Business",
    tagline: "Optimized for commercial businesses & WooCommerce shops",
    description: "Higher PHP memory allocations (512M) and database performance tailored to WooCommerce transaction throughput.",
    monthlyPrice: 119,
    semiAnnualPrice: 119,
    annualPrice: 119,
    renewalPrice: 119,
    hasSamePriceRenewal: true,
    highlighted: true,
    badge: "Recommended for Woo",
    cpu: "2 Cores",
    ram: "2.5 GB",
    storage: "45 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "3 WordPress Sites",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    features: [
      "3 Managed WordPress Installs",
      "45 GB Pure NVMe SSD",
      "WooCommerce Performance Tuning",
      "PHP Memory Limit up to 512MB",
      "1-Click Staging Environment",
      "Imunify360 Malware Scanning",
      "Free Migration by Engineers",
      "LiteSpeed Cache with ESI Support"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/wordpress-hosting/wp-business",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/wordpress-hosting"
  },
  {
    id: "wp-performance",
    category: "wordpress",
    name: "WP Performance",
    tagline: "Sub-second TTFB for agencies, magazines & busy stores",
    description: "Equipped with Redis object caching to speed up dynamic database queries and eliminate cart lag.",
    monthlyPrice: 229,
    semiAnnualPrice: 229,
    annualPrice: 229,
    renewalPrice: 229,
    hasSamePriceRenewal: true,
    cpu: "3 Cores",
    ram: "4.0 GB",
    storage: "100 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "10 WordPress Sites",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    features: [
      "10 Managed WordPress Installs",
      "100 GB NVMe Storage",
      "Redis Object Cache Integration",
      "HTTP/3 & QUIC Protocol Support",
      "Dedicated WP Database Threading",
      "Advanced Staging & Git Deployments",
      "Daily Automated JetBackup",
      "Priority WhatsApp & Ticket Support"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/wordpress-hosting/wp-performance",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/wordpress-hosting"
  },
  {
    id: "wp-ultimate",
    category: "wordpress",
    name: "WP Ultimate",
    tagline: "Enterprise-grade WordPress scale with VIP SLA support",
    description: "Uncapped WordPress hosting power with 6 GB memory, 200 GB NVMe storage, and dedicated technical assistance.",
    monthlyPrice: 379,
    semiAnnualPrice: 379,
    annualPrice: 379,
    renewalPrice: 379,
    hasSamePriceRenewal: true,
    cpu: "4 Cores",
    ram: "6.0 GB",
    storage: "200 GB",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "Unlimited Sites",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    freeDomainAnnual: true,
    features: [
      "Unlimited WordPress Installs",
      "200 GB Enterprise NVMe Storage",
      "Free Domain on Annual Plan",
      "Redis Object Caching Built-in",
      "VIP Priority Ticket & Chat Escalation",
      "Daily Offsite Backups + Snapshot Restores",
      "Unlimited Free Professional Migrations",
      "Full SSH & WP-CLI Access"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/wordpress-hosting/wp-ultimate",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/wordpress-hosting"
  }
];

export const UNLIMITED_HOSTING_PLANS: HostingPlan[] = [
  {
    id: "unlimited-bronze",
    category: "unlimited",
    name: "Unlimited Bronze",
    tagline: "Unmetered NVMe storage for a single growing domain",
    description: "Enjoy unmetered storage and transfer without worrying about gigabyte tiers for your primary website.",
    monthlyPrice: 99,
    annualPrice: 99,
    renewalPrice: 99,
    hasSamePriceRenewal: true,
    storage: "Unmetered NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "1 Website",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    features: [
      "1 Website",
      "Unmetered Pure NVMe Storage",
      "Unmetered Monthly Bandwidth",
      "LiteSpeed Web Server",
      "cPanel + Softaculous 1-Click Installer",
      "Free AutoSSL Certificates",
      "Python, Node.js & Ruby Support",
      "Fair-Use Resource Governance"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/unlimited-hosting/bronze",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/unlimited-hosting"
  },
  {
    id: "unlimited-gold",
    category: "unlimited",
    name: "Unlimited Gold",
    tagline: "Host up to 3 separate websites with unmetered storage",
    description: "Multi-site unmetered hosting for growing portfolios, small agencies, or client projects.",
    monthlyPrice: 169,
    annualPrice: 169,
    renewalPrice: 169,
    hasSamePriceRenewal: true,
    highlighted: true,
    badge: "Popular Value",
    storage: "Unmetered NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "3 Websites",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    features: [
      "3 Hosted Websites",
      "Unmetered Pure NVMe Storage",
      "Unmetered Monthly Bandwidth",
      "LiteSpeed Enterprise + LSCache",
      "SSH & Terminal Access",
      "Git Integration",
      "Imunify360 Security",
      "Daily Automated JetBackup"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/unlimited-hosting/gold",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/unlimited-hosting"
  },
  {
    id: "unlimited-platinum",
    category: "unlimited",
    name: "Unlimited Platinum",
    tagline: "Scale up to 5 production domains with complete freedom",
    description: "High performance for expanding agencies managing multiple active production websites.",
    monthlyPrice: 249,
    annualPrice: 249,
    renewalPrice: 249,
    hasSamePriceRenewal: true,
    storage: "Unmetered NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "5 Websites",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    features: [
      "5 Hosted Websites",
      "Unmetered Pure NVMe Storage",
      "Unmetered Bandwidth",
      "Enhanced CPU & RAM Allocation",
      "Unlimited MariaDB Databases",
      "Free SSL on All Domains",
      "Developer CLI & Node.js 20.x",
      "Daily JetBackup Backups"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/unlimited-hosting/platinum",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/unlimited-hosting"
  },
  {
    id: "unlimited-diamond",
    category: "unlimited",
    name: "Unlimited Diamond",
    tagline: "No limits on websites, NVMe storage or bandwidth",
    description: "Our unrestricted multi-site tier for power users hosting arbitrary domain counts under fair-use guidelines.",
    monthlyPrice: 399,
    annualPrice: 399,
    renewalPrice: 399,
    hasSamePriceRenewal: true,
    badge: "Unlimited Domains",
    storage: "Unmetered NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "Unlimited Websites",
    emailAccounts: "Unlimited",
    controlPanel: "cPanel",
    freeDomainAnnual: true,
    features: [
      "Unlimited Hosted Websites",
      "Unmetered Pure NVMe Storage",
      "Unmetered Monthly Bandwidth",
      "Free Domain on Annual Plan",
      "Highest Shared LVE CPU/RAM Limits",
      "Priority Customer Support",
      "Full Cron, SSH, Git & Node.js",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/unlimited-hosting/diamond",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/unlimited-hosting"
  }
];

export const RESELLER_HOSTING_PLANS: HostingPlan[] = [
  {
    id: "reseller-starter",
    category: "reseller",
    name: "Reseller Starter",
    tagline: "Kickstart your own web hosting business with 25 cPanels",
    description: "Full Web Host Manager (WHM) access allowing you to create, manage, and bill your own client accounts with 100% white-label branding.",
    monthlyPrice: 299,
    annualPrice: 299,
    renewalPrice: 299,
    hasSamePriceRenewal: true,
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "25 cPanel Accounts",
    emailAccounts: "Unlimited per account",
    controlPanel: "WHM / cPanel",
    features: [
      "25 Separate cPanel Accounts",
      "Unlimited NVMe SSD Storage",
      "Full WHM Control Panel Access",
      "100% White-Label (Private Nameservers)",
      "LiteSpeed Web Server Included",
      "Free SSL for All Client Sites",
      "Automated Daily JetBackup",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/reseller-hosting/starter",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/reseller-hosting"
  },
  {
    id: "reseller-growth",
    category: "reseller",
    name: "Reseller Growth",
    tagline: "Expand to 50 active client accounts with free WHMCS billing",
    description: "Includes free WHMCS billing automation license on annual billing cycles, taking care of client invoicing, provisioning, and suspensions automatically.",
    monthlyPrice: 499,
    annualPrice: 499,
    renewalPrice: 499,
    hasSamePriceRenewal: true,
    highlighted: true,
    badge: "Best for Agencies",
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "50 cPanel Accounts",
    emailAccounts: "Unlimited per account",
    controlPanel: "WHM / cPanel",
    features: [
      "50 Separate cPanel Accounts",
      "Unlimited Pure NVMe Storage",
      "Free WHMCS License (Annual Plan)",
      "Full WHM (Web Host Manager)",
      "Custom Brandable Nameservers",
      "Softaculous Script Auto-Installer",
      "CloudLinux Account Isolation",
      "Priority Reseller Support Routing"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/reseller-hosting/growth",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/reseller-hosting"
  },
  {
    id: "reseller-pro",
    category: "reseller",
    name: "Reseller Pro",
    tagline: "For established digital agencies hosting up to 100 clients",
    description: "Scale your recurring hosting revenue with 100 isolated cPanel environments and generous resource allocations.",
    monthlyPrice: 799,
    annualPrice: 799,
    renewalPrice: 799,
    hasSamePriceRenewal: true,
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "100 cPanel Accounts",
    emailAccounts: "Unlimited per account",
    controlPanel: "WHM / cPanel",
    features: [
      "100 Separate cPanel Accounts",
      "Unlimited NVMe Storage",
      "Free WHMCS License (Annual Plan)",
      "Overselling Enabled in WHM",
      "Dedicated Reseller IP Available",
      "Imunify360 Security Suite",
      "JetBackup Daily Automation",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/reseller-hosting/pro",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/reseller-hosting"
  },
  {
    id: "reseller-infinity",
    category: "reseller",
    name: "Reseller Infinity",
    tagline: "Uncapped cPanel accounts for high-volume hosting providers",
    description: "Create as many individual client cPanel accounts as you need without artificial tier limitations.",
    monthlyPrice: 1299,
    annualPrice: 1299,
    renewalPrice: 1299,
    hasSamePriceRenewal: true,
    badge: "Unlimited Clients",
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "Unlimited cPanel Accounts",
    emailAccounts: "Unlimited per account",
    controlPanel: "WHM / cPanel",
    features: [
      "Unlimited cPanel Accounts",
      "Unlimited NVMe Storage",
      "Free WHMCS License (Annual Plan)",
      "Uncapped Client Provisioning",
      "White-Label WHM Branding",
      "LiteSpeed + LSCache for All Clients",
      "VIP Reseller Escalation Support",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/reseller-hosting/infinity",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/reseller-hosting"
  }
];

export const MASTER_RESELLER_PLANS: HostingPlan[] = [
  {
    id: "master-alpha",
    category: "master-reseller",
    name: "Alpha Master",
    tagline: "Create both WHM Reseller accounts and end-user cPanels",
    description: "Take hosting business ownership to the next tier by provisioning subordinate WHM reseller accounts under your own brand.",
    monthlyPrice: 499,
    annualPrice: 499,
    renewalPrice: 499,
    hasSamePriceRenewal: true,
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "10 Resellers / 50 cPanels",
    emailAccounts: "Unlimited",
    controlPanel: "WHM / cPanel",
    features: [
      "Create up to 10 WHM Resellers",
      "Create up to 50 cPanel Accounts",
      "Full Master Reseller WHM Control",
      "Unlimited NVMe SSD Storage",
      "Custom Private Nameservers",
      "LiteSpeed Web Server Included",
      "JetBackup Daily Backups",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/master-reseller/alpha",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/master-reseller-hosting"
  },
  {
    id: "master-super",
    category: "master-reseller",
    name: "Super Master",
    tagline: "Scale a network of 30 resellers and 150 cPanel clients",
    description: "Expanded master quotas with automated provisioning hooks and white-label branding across all child accounts.",
    monthlyPrice: 899,
    annualPrice: 899,
    renewalPrice: 899,
    hasSamePriceRenewal: true,
    highlighted: true,
    badge: "Most Popular Master",
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "30 Resellers / 150 cPanels",
    emailAccounts: "Unlimited",
    controlPanel: "WHM / cPanel",
    features: [
      "Create up to 30 WHM Resellers",
      "Create up to 150 cPanel Accounts",
      "Free WHMCS License (Annual Plan)",
      "Unlimited NVMe Storage",
      "Overselling Enabled at Master Level",
      "LiteSpeed Enterprise + LSCache",
      "Imunify360 Protection",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/master-reseller/super",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/master-reseller-hosting"
  },
  {
    id: "master-elite",
    category: "master-reseller",
    name: "Master Elite",
    tagline: "Unrestricted master reseller creation with zero limits",
    description: "For web hosting entrepreneurs building a multi-tier reseller hosting company with unlimited child accounts.",
    monthlyPrice: 1499,
    annualPrice: 1499,
    renewalPrice: 1499,
    hasSamePriceRenewal: true,
    badge: "Unlimited Resellers",
    storage: "Unlimited NVMe",
    storageType: "Enterprise NVMe",
    bandwidth: "Unmetered",
    websites: "Unlimited Resellers & cPanels",
    emailAccounts: "Unlimited",
    controlPanel: "WHM / cPanel",
    features: [
      "Unlimited WHM Reseller Accounts",
      "Unlimited cPanel Accounts",
      "Free WHMCS License (Annual Plan)",
      "Unlimited NVMe Enterprise Storage",
      "Highest Compute Priority in Cluster",
      "Direct Priority Engineer Support",
      "Daily Automated JetBackup",
      "Same-Price Renewal Pledge"
    ],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/master-reseller/elite",
    verifiedAt: "2026-11-05",
    sourceUrl: "https://shrotihost.in/master-reseller-hosting"
  }
];

export interface VPSPlan {
  id: string;
  name: string;
  vCpu: number;
  ramGb: number;
  storageGb: number;
  bandwidthTb: number;
  monthlyPrice: number;
  setupFee: number;
  portSpeed: string;
  datacenter: string;
  virtualization: "KVM";
  features: string[];
  purchaseUrl: string;
  verifiedAt: string;
}

export const VPS_PLANS: VPSPlan[] = [
  {
    id: "vps-spark",
    name: "VPS Spark",
    vCpu: 1,
    ramGb: 0.5,
    storageGb: 5,
    bandwidthTb: 0.5,
    monthlyPrice: 499,
    setupFee: 249,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["1 vCPU Core", "512 MB RAM", "5 GB NVMe Storage", "500 GB Bandwidth", "Full Root SSH Access", "1 Dedicated IPv4", "Weekly Offsite Backups"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/spark",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-pulse",
    name: "VPS Pulse",
    vCpu: 1,
    ramGb: 1,
    storageGb: 10,
    bandwidthTb: 0.75,
    monthlyPrice: 899,
    setupFee: 449,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["1 vCPU Core", "1 GB RAM", "10 GB NVMe Storage", "750 GB Bandwidth", "Full Root SSH Access", "1 Dedicated IPv4", "Custom OS Reinstall"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/pulse",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-core",
    name: "VPS Core",
    vCpu: 2,
    ramGb: 2,
    storageGb: 20,
    bandwidthTb: 1.5,
    monthlyPrice: 1199,
    setupFee: 599,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["2 vCPU Cores", "2 GB RAM", "20 GB NVMe Storage", "1.5 TB Bandwidth", "Full Root SSH Access", "1 Dedicated IPv4", "Automated Console Access"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/core",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-power",
    name: "VPS Power",
    vCpu: 2,
    ramGb: 4,
    storageGb: 30,
    bandwidthTb: 2.0,
    monthlyPrice: 2199,
    setupFee: 1099,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["2 vCPU Cores", "4 GB RAM", "30 GB NVMe Storage", "2 TB Bandwidth", "Full Root SSH Access", "1 Dedicated IPv4", "Production Ready"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/power",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-forge",
    name: "VPS Forge",
    vCpu: 4,
    ramGb: 8,
    storageGb: 60,
    bandwidthTb: 4.0,
    monthlyPrice: 3499,
    setupFee: 0,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["4 vCPU Cores", "8 GB RAM", "60 GB NVMe Storage", "4 TB Bandwidth", "Zero Setup Fee", "1 Dedicated IPv4", "Dedicated Resources"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/forge",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-surge",
    name: "VPS Surge",
    vCpu: 6,
    ramGb: 12,
    storageGb: 100,
    bandwidthTb: 6.0,
    monthlyPrice: 4999,
    setupFee: 0,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["6 vCPU Cores", "12 GB RAM", "100 GB NVMe Storage", "6 TB Bandwidth", "Zero Setup Fee", "1 Dedicated IPv4", "High IOPS Allocation"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/surge",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-titan",
    name: "VPS Titan",
    vCpu: 8,
    ramGb: 16,
    storageGb: 160,
    bandwidthTb: 8.0,
    monthlyPrice: 6999,
    setupFee: 0,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["8 vCPU Cores", "16 GB RAM", "160 GB NVMe Storage", "8 TB Bandwidth", "Zero Setup Fee", "1 Dedicated IPv4", "Enterprise Workloads"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/titan",
    verifiedAt: "2026-11-05"
  },
  {
    id: "vps-apex",
    name: "VPS Apex",
    vCpu: 12,
    ramGb: 32,
    storageGb: 300,
    bandwidthTb: 10.0,
    monthlyPrice: 9999,
    setupFee: 0,
    portSpeed: "1 Gbps Port",
    datacenter: "India (Tier-3 Datacenter)",
    virtualization: "KVM",
    features: ["12 vCPU Cores", "32 GB RAM", "300 GB NVMe Storage", "10 TB Bandwidth", "Zero Setup Fee", "1 Dedicated IPv4", "Mission Critical Speed"],
    purchaseUrl: "https://portal.shrotihost.in/index.php?rp=/store/vps/apex",
    verifiedAt: "2026-11-05"
  }
];

export const ALL_HOSTING_PLANS: HostingPlan[] = [
  ...SHARED_HOSTING_PLANS,
  ...WORDPRESS_HOSTING_PLANS,
  ...UNLIMITED_HOSTING_PLANS,
  ...RESELLER_HOSTING_PLANS,
  ...MASTER_RESELLER_PLANS
];

export function getPlanById(id: string): HostingPlan | undefined {
  return ALL_HOSTING_PLANS.find((plan) => plan.id === id);
}

export function getPlansByCategory(category: HostingCategory): HostingPlan[] {
  return ALL_HOSTING_PLANS.filter((plan) => plan.category === category);
}

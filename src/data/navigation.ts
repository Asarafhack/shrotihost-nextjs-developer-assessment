export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  iconName?: string;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export const MAIN_NAVIGATION = {
  hosting: [
    {
      label: "Shared Hosting",
      href: "/hosting",
      description: "Fast LiteSpeed NVMe hosting from ₹49/month with same-price renewal.",
      badge: "From ₹49/mo",
      iconName: "Server"
    },
    {
      label: "Managed WordPress",
      href: "/wordpress-hosting",
      description: "Optimized LSCache, Redis, 1-click staging, and automated updates.",
      badge: "Optimized",
      iconName: "Wordpress"
    },
    {
      label: "Unlimited Multi-Site",
      href: "/unlimited-hosting",
      description: "Unmetered NVMe storage and bandwidth for growing domain portfolios.",
      badge: "Unmetered",
      iconName: "Infinity"
    },
    {
      label: "Reseller Hosting",
      href: "/reseller-hosting",
      description: "Full WHM access, 100% white-label cPanels, and free WHMCS billing.",
      badge: "100% White-Label",
      iconName: "Briefcase"
    },
    {
      label: "Master Reseller",
      href: "/master-reseller-hosting",
      description: "Create both reseller accounts and client cPanels under your brand.",
      badge: "Sub-Resellers",
      iconName: "Layers"
    },
    {
      label: "Virtual Private Servers",
      href: "/vps",
      description: "Dedicated KVM compute, root SSH access, and 1 Gbps uplink speed.",
      badge: "Root Access",
      iconName: "Cpu"
    }
  ],
  tools: [
    {
      label: "Hosting Plan Advisor",
      href: "/advisor",
      description: "Answer 4 questions to receive an instant, deterministic plan match.",
      badge: "Interactive",
      iconName: "HelpCircle"
    },
    {
      label: "Plan Comparison Matrix",
      href: "/compare",
      description: "Compare technical specifications and resource limits side-by-side.",
      badge: "Deep Specs",
      iconName: "GitCompare"
    },
    {
      label: "VPS Configurator",
      href: "/configurator",
      description: "Customize vCPU, RAM, storage, OS, and calculate live monthly costs.",
      badge: "Live Calculator",
      iconName: "Sliders"
    },
    {
      label: "Simulated Checkout Demo",
      href: "/checkout",
      description: "Preview our transparent checkout experience with GST breakdown.",
      badge: "Demo Sandbox",
      iconName: "ShoppingCart"
    }
  ],
  services: [
    {
      label: "Web Application Engineering",
      href: "/web-development",
      description: "Bespoke Next.js, PWAs, and APIs directly integrated with cloud hosting.",
      badge: "Next.js & React",
      iconName: "Globe"
    },
    {
      label: "Mobile App Development",
      href: "/app-development",
      description: "Native & cross-platform Flutter and React Native mobile applications.",
      badge: "iOS & Android",
      iconName: "Smartphone"
    },
    {
      label: "E-Commerce Storefronts",
      href: "/ecommerce-development",
      description: "Fast WooCommerce and custom storefronts with Indian UPI checkout.",
      badge: "UPI & Cards",
      iconName: "ShoppingBag"
    }
  ],
  company: [
    { label: "About Shroti Host", href: "/about", description: "Our MSME registration, founder story, and infrastructure standards." },
    { label: "Technical Blog & Guides", href: "/blog", description: "Articles on LiteSpeed optimization, VPS migration, and transparent pricing." },
    { label: "Contact & Support", href: "/contact", description: "Direct routing for sales, support, migration, billing, and technical help." }
  ],
  legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy (DPDP Act)", href: "/legal/privacy" },
    { label: "7-Day Refund Policy", href: "/legal/refund" },
    { label: "Acceptable Use Policy", href: "/legal/aup" }
  ]
};

export const COMPANY_DETAILS = {
  brandName: "Shroti Host",
  legalEntity: "Shroti Enterprises (MSME Registered)",
  udyamRegistration: "UDYAM-UP-36-0017127",
  foundingYear: "2023",
  founder: "Priyanshu Shroti",
  headquarters: "Hathras, Uttar Pradesh, India",
  supportEmail: "support@shrotihost.in",
  infoEmail: "info@shrotihost.in",
  portalUrl: "https://portal.shrotihost.in/",
  uptimeTarget: "99.9% Operational Target"
};

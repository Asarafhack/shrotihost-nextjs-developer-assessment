export interface FAQItem {
  id: string;
  category: "general" | "hosting" | "wordpress" | "reseller" | "vps" | "billing" | "domains";
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-renewal-policy",
    category: "billing",
    question: "Do your hosting plans increase in price upon renewal?",
    answer: "No. Unlike legacy web hosts that lure customers with heavy first-year discounts and then inflate renewal prices by 300%, Shroti Host provides a same-price renewal guarantee on our hosting tiers. Your baseline subscription rate remains steady upon renewal."
  },
  {
    id: "faq-uptime-target",
    category: "hosting",
    question: "What is your server uptime guarantee?",
    answer: "We communicate an operational 99.9% uptime target across our infrastructure. Our servers are monitored 24/7/365 with redundant network uplinks, CloudLinux process isolation, and automated failover. We prioritize transparent operational health over marketing hyperbole."
  },
  {
    id: "faq-refund-policy",
    category: "billing",
    question: "How does the 7-day money-back guarantee work?",
    answer: "If you are dissatisfied with our eligible Shared or Reseller Hosting services within the first 7 calendar days of your order, you can request a full refund via our support desk. Note that domain registration/transfer fees, third-party software licenses, and VPS setup fees are non-refundable as third-party costs are incurred immediately."
  },
  {
    id: "faq-free-migration",
    category: "hosting",
    question: "Do you offer free website migration from my existing host?",
    answer: "Yes! Our technical team provides complimentary cPanel-to-cPanel and manual WordPress migrations with zero downtime. Simply submit a migration ticket with your previous provider's credentials after ordering."
  },
  {
    id: "faq-unmetered-storage",
    category: "hosting",
    question: "What does 'unmetered' NVMe storage actually mean?",
    answer: "'Unmetered' means there are no fixed gigabyte quotas restricting your website files, media, and databases. However, to maintain cluster stability for all tenants, usage remains governed by standard Fair-Use Policies (FUP) and CloudLinux inode/file-count thresholds. It cannot be used as an offsite file storage drive or backup dump."
  },
  {
    id: "faq-control-panel",
    category: "hosting",
    question: "Which control panel do you provide?",
    answer: "All Shared, WordPress, and Unlimited hosting accounts feature authentic industry-standard cPanel equipped with Softaculous 1-click script installer. Reseller accounts receive Web Host Manager (WHM) for provisioning individual client cPanels."
  },
  {
    id: "faq-support-channels",
    category: "general",
    question: "How do I contact customer support when I need help?",
    answer: "We offer direct technical assistance through WhatsApp and our secure client ticketing portal (portal.shrotihost.in), with email routing via support@shrotihost.in. We prioritize direct access to experienced engineers over automated phone IVR menus."
  },
  {
    id: "faq-msme-verification",
    category: "general",
    question: "Is Shroti Host an officially registered Indian business?",
    answer: "Yes. Shroti Host is a registered trading brand of Shroti Enterprises, a certified micro-enterprise under the Government of India's Ministry of Micro, Small & Medium Enterprises (MSME Udyam Registration: UDYAM-UP-36-0017127), headquartered in Hathras, Uttar Pradesh."
  }
];

export function getFaqsByCategory(category: FAQItem["category"]): FAQItem[] {
  return FAQ_ITEMS.filter((item) => item.category === category || item.category === "general");
}

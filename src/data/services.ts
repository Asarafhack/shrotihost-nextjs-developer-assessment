export interface ServiceOffering {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  businessProblem: string;
  solutionOverview: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  techStack: string[];
  infrastructureSynergy: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  enquiryDepartment: "Sales" | "Technical" | "Custom Development";
}

export const SERVICES: ServiceOffering[] = [
  {
    id: "service-web-development",
    slug: "web-development",
    title: "Full-Stack Web Application Development",
    shortTitle: "Web Development",
    tagline: "High-performance web apps built for conversion and scale",
    heroHeadline: "Bespoke Web Engineering on Dedicated Hosting Infrastructure",
    heroSubheadline: "From enterprise portals and PWAs to headless web applications, we engineer ultra-fast web experiences optimized directly for NVMe server stacks.",
    description: "Custom frontend and backend web engineering designed around maintainability, accessibility, core web vitals, and tight hosting integration.",
    businessProblem: "Generic off-the-shelf templates and unoptimized WordPress themes suffer from code bloat, fragile plugin dependencies, sluggish database queries, and frequent security vulnerabilities.",
    solutionOverview: "We architect clean, bespoke web systems using modern frameworks (Next.js, React, Node.js) designed to deliver low-latency page delivery and responsive performance directly on our LiteSpeed and NVMe clusters.",
    deliverables: [
      {
        title: "Modern Jamstack & Next.js Architecture",
        description: "Static Site Generation (SSG) and Server-Side Rendering (SSR) for flawless SEO and instantaneous page loads."
      },
      {
        title: "Responsive & Accessible UI/UX",
        description: "Fully responsive layouts adhering strictly to WCAG 2.2 AA accessibility guidelines and consistent brand token systems."
      },
      {
        title: "RESTful & GraphQL API Integration",
        description: "Robust backends and microservices with clean data models, rate limiting, and JWT/OAuth security."
      },
      {
        title: "Direct Hosting & CI/CD Deployment",
        description: "Automated git-based deployment pipelines connected with Cloudflare edge caching and NVMe database clusters."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Technical Discovery & Scope",
        description: "We map information architecture, user journeys, data schemas, and hosting resource requirements."
      },
      {
        step: "02",
        title: "System Architecture & Prototyping",
        description: "Component hierarchy, design tokens, and database modeling before a single line of production code is written."
      },
      {
        step: "03",
        title: "Agile Frontend & Backend Sprints",
        description: "Strict TypeScript implementation with automated unit tests, responsive testing, and code reviews."
      },
      {
        step: "04",
        title: "Hardened Deployment & Handover",
        description: "Production launch onto Shroti Host NVMe infrastructure with SSL, DNS hardening, monitoring, and full documentation."
      }
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL / MariaDB", "Redis", "Docker"],
    infrastructureSynergy: "Web applications deployed on Shroti Host enjoy optimized HTTP/3 routing, isolated CloudLinux resources, and zero cross-tenant interference.",
    faqs: [
      {
        question: "Do you build custom websites or use page builders?",
        answer: "We engineer bespoke codebases using Next.js, React, and clean semantic HTML/Tailwind CSS. This guarantees maximum page speed, zero security vulnerabilities from abandoned plugins, and complete code ownership."
      },
      {
        question: "Can I host the finished website on my own servers?",
        answer: "Yes. You receive 100% full source code ownership and git repository access. You can deploy it on Shroti Host or any standard cloud provider."
      },
      {
        question: "How long does a typical web development engagement take?",
        answer: "A focused corporate web portal or custom application typically takes 2 to 5 weeks from technical discovery to production deployment."
      }
    ],
    enquiryDepartment: "Sales"
  },
  {
    id: "service-app-development",
    slug: "app-development",
    title: "Mobile Application Engineering (iOS & Android)",
    shortTitle: "App Development",
    tagline: "Native and cross-platform apps that scale with your users",
    heroHeadline: "Scalable Mobile Applications Powered by Resilient Cloud Backends",
    heroSubheadline: "Deliver seamless mobile experiences across iOS and Android with battle-tested cross-platform frameworks and dedicated server APIs.",
    description: "End-to-end mobile engineering from UX interaction design and API architecture to App Store and Google Play store deployment.",
    businessProblem: "Many mobile apps suffer from poor offline resilience, sluggish UI frame rates, and fragile backend connections that crash during traffic surges.",
    solutionOverview: "We build intuitive, fluid mobile applications utilizing Flutter and React Native, paired with high-availability RESTful backend microservices running on Shroti Host VPS infrastructure.",
    deliverables: [
      {
        title: "Cross-Platform Codebase (iOS & Android)",
        description: "Single unified codebase ensuring identical business logic, rapid updates, and cost-efficient maintenance."
      },
      {
        title: "Offline-First Data Synchronization",
        description: "Local caching and optimistic UI updates that keep apps functional even with spotty cellular connectivity."
      },
      {
        title: "Push Notification & Messaging Engines",
        description: "Real-time notification infrastructure via Firebase Cloud Messaging and custom transactional triggers."
      },
      {
        title: "App Store Publishing & Compliance",
        description: "Guaranteed passage through Apple App Store review guidelines and Google Play Console policies."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "User Flow & Wireframing",
        description: "Interactive UX prototyping and tactile component mapping for touch viewports."
      },
      {
        step: "02",
        title: "API & Data Contract Design",
        description: "OpenAPI specifications defining secure payloads, authentication, and state management."
      },
      {
        step: "03",
        title: "Core Mobile Engineering",
        description: "Sprint-based feature building with bi-weekly TestFlight and APK test builds."
      },
      {
        step: "04",
        title: "Store Submission & Launch Support",
        description: "Production signing, metadata optimization, privacy disclosures, and continuous post-launch monitoring."
      }
    ],
    techStack: ["Flutter", "Dart", "React Native", "TypeScript", "Node.js", "Firebase", "SQLite", "KVM VPS Backends"],
    infrastructureSynergy: "App backends hosted on Shroti Host VPS benefit from 1 Gbps port connectivity, low-latency Indian peering, and dedicated resource isolation.",
    faqs: [
      {
        question: "Do you build for both iPhone and Android?",
        answer: "Yes. Using Flutter or React Native, we compile native binaries for both platforms simultaneously, drastically reducing development overhead while maintaining native 60fps performance."
      },
      {
        question: "How is backend data hosted and managed?",
        answer: "We deploy dedicated API endpoints and database clusters on Shroti Host KVM VPS or custom dedicated servers, protected by SSL certificates and automated daily JetBackup snapshots."
      }
    ],
    enquiryDepartment: "Custom Development"
  },
  {
    id: "service-ecommerce-development",
    slug: "ecommerce-development",
    title: "High-Converting E-Commerce Engineering",
    shortTitle: "E-Commerce",
    tagline: "Fast storefronts engineered for Indian checkout conversion",
    heroHeadline: "Turn Browsers into Buyers with Lightning-Fast Storefronts",
    heroSubheadline: "Custom WooCommerce and headless commerce setups integrated with native Indian payment gateways: UPI, RuPay, NetBanking, and automated shipping APIs.",
    description: "Tailor-made e-commerce storefronts engineered for fast checkout speeds, high concurrency sales events, and frictionless mobile transactions.",
    businessProblem: "Over 70% of e-commerce shoppers abandon carts due to checkout lag, slow catalog loading, or confusing payment gateway redirects.",
    solutionOverview: "We build streamlined online storefronts equipped with server-side Redis object caching, optimized product database queries, and seamless 1-click UPI and card checkout experiences.",
    deliverables: [
      {
        title: "High-Concurrency Catalog Architecture",
        description: "Fast multi-facet product filtering, instant live search, and optimized media compression."
      },
      {
        title: "Indian Payment Gateway Integration",
        description: "Seamless integration with Razorpay, Cashfree, PhonePe, and PayU supporting QR UPI, RuPay, and credit cards."
      },
      {
        title: "Automated Shipping & Logistics Sync",
        description: "Real-time courier rate calculation, pincode serviceability checks, and Shiprocket/Delhivery tracking."
      },
      {
        title: "Cart Abandonment & Retention Automations",
        description: "Automated WhatsApp and email notifications for abandoned checkouts and order status updates."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Catalog Modeling & Journey Mapping",
        description: "Designing product taxonomy, variable SKU hierarchies, and streamlined mobile checkout paths."
      },
      {
        step: "02",
        title: "Performance Storefront Construction",
        description: "Implementing LiteSpeed WooCommerce caching, Redis object caching, and headless or cPanel-tuned setups."
      },
      {
        step: "03",
        title: "Payment & Logistics Integration",
        description: "Rigorous sandbox and live webhook testing with Indian payment gateways and courier tracking APIs."
      },
      {
        step: "04",
        title: "Stress Testing & Go-Live",
        description: "Simulating high-traffic concurrent checkout loads before opening the store to public traffic."
      }
    ],
    techStack: ["WooCommerce", "WordPress", "LiteSpeed Cache", "Redis", "Razorpay / Cashfree", "Node.js", "Tailwind CSS"],
    infrastructureSynergy: "Our Managed WordPress & WooCommerce hosting tiers provide dedicated Redis object caching, 4+ GB RAM allocations, and PHP 8.3 OPcache tuning.",
    faqs: [
      {
        question: "Which payment gateways do you support?",
        answer: "We integrate Razorpay, Cashfree, PhonePe, PayU, and Stripe. We specialize in friction-free UPI Intent flows that allow customers to pay directly inside GPay, PhonePe, or Paytm."
      },
      {
        question: "Can your stores handle flash sales?",
        answer: "Yes. By pairing optimized database indexing with LiteSpeed ESI page caching and Redis, our e-commerce configurations absorb sudden traffic spikes without crashing."
      }
    ],
    enquiryDepartment: "Sales"
  }
];

export function getServiceBySlug(slug: string): ServiceOffering | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

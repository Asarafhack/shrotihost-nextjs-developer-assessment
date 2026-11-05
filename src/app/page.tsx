import React from "react";
import Link from "next/link";
import {
  Server,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  GitCompare,
  Code2,
  Smartphone,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Layers,
  Lock,
  Headphones
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { HomeDomainSearch } from "@/components/home/HomeDomainSearch";
import { HostingHighlights } from "@/components/home/HostingHighlights";
import { FAQ_ITEMS } from "@/data/faqs";
import { formatINR } from "@/lib/utils";

export default function HomePage() {
  const homeFaqs = FAQ_ITEMS.slice(0, 6).map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        {/* Subtle radial ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <Container className="relative z-10 text-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200/80 bg-purple-50/80 dark:border-purple-800/60 dark:bg-purple-950/40 text-xs text-purple-700 dark:text-purple-300 mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-semibold">True Same-Price Renewal Guarantee</span>
            <span className="text-purple-400 dark:text-purple-600">&bull;</span>
            <span className="hidden sm:inline">No 300% renewal shocks</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            High-Speed Cloud Hosting.{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent">
              Transparent Pricing.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Enterprise NVMe storage and LiteSpeed servers from{" "}
            <strong className="text-purple-600 dark:text-purple-400 font-semibold">₹49/month</strong>.
            Tailored for developers, growing brands, agencies, and bespoke software projects.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button href="/hosting" size="lg" variant="primary" className="w-full sm:w-auto shadow-lg shadow-purple-500/20">
              <span>Explore Hosting Plans</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Button href="/contact" size="lg" variant="outline" className="w-full sm:w-auto">
              <span>Start a Custom Project</span>
            </Button>
            <Button href="/advisor" size="lg" variant="ghost" className="w-full sm:w-auto text-xs text-slate-600 dark:text-slate-400">
              <HelpCircle className="h-4 w-4 mr-1 text-purple-500" />
              <span>Need help choosing?</span>
            </Button>
          </div>

          {/* Trust Matrix Strip */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Storage</span>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">Pure PCIe NVMe</p>
              <p className="text-[11px] text-slate-500">Up to 3,500 MB/s speed</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Web Server</span>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">LiteSpeed + LSCache</p>
              <p className="text-[11px] text-slate-500">Event-driven caching</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Reliability</span>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">99.9% Target Uptime</p>
              <p className="text-[11px] text-slate-500">Operational commitment</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Commercial</span>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">Same-Price Renewal</p>
              <p className="text-[11px] text-slate-500">Zero price inflation</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Hosting Highlights */}
      <section className="scroll-mt-24" id="hosting-overview">
        <Container>
          <SectionHeading
            eyebrow="Transparent Hosting Tiers"
            title="Engineered for Performance. Priced for Growth."
            subtitle="Switch between Shared and WordPress hosting. What you see is exactly what you pay on renewal."
          />
          <HostingHighlights />
        </Container>
      </section>

      {/* 3. Product Family Category Cards */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Complete Infrastructure Suite"
            title="Scalable Hosting for Every Stage of Development"
            subtitle="From single portfolio domains to multi-client white-label reseller ecosystems and dedicated KVM servers."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Unlimited Multi-site */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-purple-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    <Server className="h-5 w-5" />
                  </div>
                  <Badge variant="purple" size="sm">From ₹99/mo</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Unlimited Multi-Site Hosting
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Unmetered NVMe storage and bandwidth tailored for multi-domain developers running Python, Node.js, and WordPress.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                    <span>Unmetered NVMe storage (Fair Use)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                    <span>Node.js, Python & Ruby App Manager</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                    <span>Free AutoSSL & Imunify360</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button href="/unlimited-hosting" variant="outline" size="sm" className="w-full">
                  Explore Unlimited &rarr;
                </Button>
              </div>
            </div>

            {/* Reseller Hosting */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-purple-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <Layers className="h-5 w-5" />
                  </div>
                  <Badge variant="blue" size="sm">From ₹299/mo</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  White-Label Reseller Hosting
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Start your own profitable web hosting business. Create isolated client cPanel accounts with custom nameservers.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                    <span>25 to Unlimited cPanel Accounts</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                    <span>Free WHMCS Billing on Annual Plans</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                    <span>100% White-Label Private DNS</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button href="/reseller-hosting" variant="outline" size="sm" className="w-full">
                  Explore Reseller &rarr;
                </Button>
              </div>
            </div>

            {/* High Performance VPS */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-purple-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Zap className="h-5 w-5" />
                  </div>
                  <Badge variant="green" size="sm">From ₹499/mo</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  High-Performance KVM VPS
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Dedicated virtual private servers with unrestricted root SSH access, 1 Gbps network port, and weekly offsite backups.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Dedicated vCPU Cores & RAM</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>1 Gbps Low-Latency Network Port</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Selectable OS (Ubuntu, Alma, Debian)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button href="/vps" variant="outline" size="sm" className="w-full">
                  Explore VPS Servers &rarr;
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Domain Discovery Experience */}
      <section>
        <Container>
          <HomeDomainSearch />
        </Container>
      </section>

      {/* 5. Infrastructure Architecture Diagram */}
      <section>
        <Container>
          <SectionHeading
            eyebrow="Inside the Engine Room"
            title="Architected for Uncompromised Server Velocity"
            subtitle="Why our LiteSpeed Enterprise and NVMe infrastructure consistently beats conventional Apache shared hosting."
          />
          <ArchitectureDiagram />
        </Container>
      </section>

      {/* 6. Honest Comparison: Shroti Host vs. Legacy Providers */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Industry Comparison"
            title="The Real Difference: Transparency vs Industry Traps"
            subtitle="How our engineering principles protect your production uptime and annual hosting budget."
          />

          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm text-xs sm:text-sm">
            <div className="grid grid-cols-3 p-4 bg-slate-100 dark:bg-slate-800/70 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <span>Dimension</span>
              <span className="text-purple-600 dark:text-purple-400">Shroti Host</span>
              <span className="text-slate-500">Legacy Mass Hosts</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-medium text-slate-900 dark:text-slate-100">Renewal Pricing</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Same-price renewal guaranteed
                </span>
                <span className="text-slate-500">300% to 500% renewal markup</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-medium text-slate-900 dark:text-slate-100">Storage Drives</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Pure PCIe Gen4 NVMe SSDs
                </span>
                <span className="text-slate-500">Legacy SATA SSDs or spinning HDDs</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-medium text-slate-900 dark:text-slate-100">Web Server Software</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  LiteSpeed Enterprise + LSCache
                </span>
                <span className="text-slate-500">Uncached Apache / NGINX reverse proxy</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-medium text-slate-900 dark:text-slate-100">Customer Support</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  WhatsApp & direct sysadmin tickets
                </span>
                <span className="text-slate-500">Automated IVR bots & outsourced L1</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-medium text-slate-900 dark:text-slate-100">Tenant Isolation</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  CloudLinux OS CageFS sandboxing
                </span>
                <span className="text-slate-500">Shared OS, prone to noisy neighbors</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Software Development Services Spotlight */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                Software & App Engineering
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Beyond Hosting: Full-Cycle Digital Engineering
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                Deploy your digital ideas on the same infrastructure that hosts them. End-to-end development from discovery to launch.
              </p>
            </div>
            <Button href="/contact" variant="primary" size="md" className="mt-4 md:mt-0 self-start md:self-auto">
              Request Project Consultation &rarr;
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/web-development"
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-500/50 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-4 group-hover:scale-105 transition-transform">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Web Application Engineering
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Next.js, React, and TypeScript web applications engineered for sub-second page loads and seamless cloud deployment.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 mt-4">
                Learn more &rarr;
              </span>
            </Link>

            <Link
              href="/app-development"
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-500/50 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mb-4 group-hover:scale-105 transition-transform">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Mobile App Engineering
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                iOS and Android applications built with Flutter and React Native, powered by low-latency VPS API microservices.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 mt-4">
                Learn more &rarr;
              </span>
            </Link>

            <Link
              href="/ecommerce-development"
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-500/50 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-4 group-hover:scale-105 transition-transform">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                E-Commerce Storefronts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                High-converting online shops with native Indian payment gateways (UPI, RuPay, NetBanking) and Redis object caching.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 mt-4">
                Learn more &rarr;
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 8. Customer Journey: Host -> Build -> Scale */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="The Customer Journey"
            title="From Initial Launch to Enterprise Scale"
            subtitle="A cohesive ecosystem supporting your technical expansion without disruptive platform migrations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Host & Launch</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Secure your domain, deploy via 1-click cPanel scripts, and launch on LiteSpeed NVMe servers in under 5 minutes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Build & Optimize</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Leverage Git deployments, Node.js/Python managers, Redis object caching, and custom app engineering to expand functionality.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Scale & Resell</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Graduate smoothly to dedicated KVM VPS or launch your own hosting company using white-label WHM Reseller and Master Reseller accounts.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Site-wide FAQ Accordion */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Common Inquiries"
            title="Frequently Asked Questions"
            subtitle="Straightforward answers about our infrastructure, billing policies, and migration support."
          />
          <Accordion items={homeFaqs} />
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Have a specialized question?{" "}
              <Link href="/contact" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                Contact our engineering team directly &rarr;
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* 10. Bottom Action Banner */}
      <section>
        <Container>
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/60 via-slate-900 to-indigo-950/80 p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="purple" size="sm" className="mb-4">
                Ready to Deploy?
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Switch to High-Speed Hosting with Same-Price Renewals
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Get started today on our LiteSpeed NVMe cluster. Free cPanel migrations, 24/7 monitoring, and our 7-day money-back guarantee.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button href="/hosting" size="lg" variant="primary" className="w-full sm:w-auto shadow-lg shadow-purple-500/30">
                  <span>Get Started from ₹49/month</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
                <Button href="/contact" size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                  <span>Contact Sales & Support</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

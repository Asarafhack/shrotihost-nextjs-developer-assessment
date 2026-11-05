"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Server,
  Zap,
  ShieldCheck,
  Check,
  HelpCircle,
  ArrowRight,
  HardDrive,
  Cpu,
  Layers,
  Sparkles,
  Info
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PricingCard } from "@/components/pricing/PricingCard";
import { BillingCycleSelector } from "@/components/pricing/BillingCycleSelector";
import { SHARED_HOSTING_PLANS, BillingCycle } from "@/data/hosting-plans";
import { getFaqsByCategory } from "@/data/faqs";
import { formatINR } from "@/lib/utils";

export default function SharedHostingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");
  const hostingFaqs = getFaqsByCategory("hosting").map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Hosting", href: "/hosting" }, { label: "NVMe Shared Hosting" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Zap className="h-3.5 w-3.5 text-purple-600" />
              <span>LiteSpeed Enterprise + Pure NVMe SSDs</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              High-Speed NVMe Shared Hosting
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Experience lightning-fast page loading powered by LiteSpeed web servers, cPanel control, and automated daily JetBackup. Backed by our guaranteed{" "}
              <strong className="text-purple-600 dark:text-purple-400 font-semibold">
                Same-Price Renewal Policy
              </strong>.
            </p>

            {/* Target Audience Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Perfect for:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Personal Portfolios</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">WordPress Blogs</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Freelancer Clients</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Early Startups</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Grid */}
      <section>
        <Container>
          <BillingCycleSelector currentCycle={billingCycle} onChange={setBillingCycle} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHARED_HOSTING_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
              />
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>
              All plans include our 7-day money-back guarantee, free cPanel migration, and SSL certificates.
            </span>
          </div>
        </Container>
      </section>

      {/* Deep Specification & Resource Allocation Matrix */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Hardware Transparency"
            title="LVE Resource Allocation & Technical Limits"
            subtitle="We never hide resource thresholds behind vague marketing slogans. Here are the exact CloudLinux limits allocated to each account."
          />

          <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-slate-100">
                  <th className="p-4">Technical Parameter</th>
                  <th className="p-4">Launch (₹49)</th>
                  <th className="p-4 text-purple-600 dark:text-purple-400">Grow (₹79)</th>
                  <th className="p-4">Turbo (₹149)</th>
                  <th className="p-4">Infinity (₹249)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-mono">
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    CPU Core Allocation
                  </td>
                  <td className="p-4">1.0 Core (100%)</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">1.5 Cores (150%)</td>
                  <td className="p-4">2.0 Cores (200%)</td>
                  <td className="p-4">3.0 Cores (300%)</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Physical Memory (RAM)
                  </td>
                  <td className="p-4">1.5 GB</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">2.0 GB</td>
                  <td className="p-4">3.0 GB</td>
                  <td className="p-4">4.0 GB</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Pure NVMe PCIe Gen4 Storage
                  </td>
                  <td className="p-4">10 GB</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">50 GB</td>
                  <td className="p-4">120 GB</td>
                  <td className="p-4">250 GB</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Concurrent Entry Processes (EP)
                  </td>
                  <td className="p-4">20</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">35</td>
                  <td className="p-4">50</td>
                  <td className="p-4">80</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Disk I/O Throughput Limit
                  </td>
                  <td className="p-4">25 MB/s</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">50 MB/s</td>
                  <td className="p-4">80 MB/s</td>
                  <td className="p-4">100 MB/s</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Random IOPS Limit
                  </td>
                  <td className="p-4">2,048</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">4,096</td>
                  <td className="p-4">6,144</td>
                  <td className="p-4">8,192</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Maximum Inode File Count
                  </td>
                  <td className="p-4">250,000</td>
                  <td className="p-4 font-bold text-purple-600 dark:text-purple-400">450,000</td>
                  <td className="p-4">750,000</td>
                  <td className="p-4">1,200,000</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                    Node.js & Python Support
                  </td>
                  <td className="p-4 text-slate-400">Basic</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">Yes (cPanel App Mgr)</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">Yes + SSH Access</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">Yes + SSH + Redis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Feature Comparison Checklist */}
      <section>
        <Container>
          <SectionHeading
            eyebrow="Included with Every Plan"
            title="Standard Features Across All Shared Tiers"
            subtitle="Regardless of the plan you choose, these core enterprise hosting capabilities come standard."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-100">
                <Check className="h-4 w-4 text-purple-600" />
                <span>LiteSpeed + LSCache</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Drop-in Apache replacement that serves cached requests event-driven at kernel level for sub-100ms TTFB.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-100">
                <Check className="h-4 w-4 text-purple-600" />
                <span>Free Automated SSL</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                AutoSSL provisions and renews 256-bit Let&apos;s Encrypt / Sectigo certificates for your primary and all addon domains automatically.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-100">
                <Check className="h-4 w-4 text-purple-600" />
                <span>JetBackup Daily Offsite</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automated daily offsite backups with 1-click restoration for entire accounts, individual files, databases, or email inboxes.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-100">
                <Check className="h-4 w-4 text-purple-600" />
                <span>CloudLinux OS Isolation</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                CageFS virtualized filesystem and LVE resource governance prevents noisy neighbors from degrading your site&apos;s responsiveness.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-100">
                <Check className="h-4 w-4 text-purple-600" />
                <span>Softaculous 1-Click Installer</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Install WordPress, Laravel, Joomla, PrestaShop, and 400+ applications in seconds with automatic update hooks.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-100">
                <Check className="h-4 w-4 text-purple-600" />
                <span>Free Migration Assistance</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our support engineers will transfer your cPanel account or WordPress database with zero downtime, totally free of charge.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Product FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Shared Hosting Details"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our NVMe shared plans, renewals, and limits."
          />
          <Accordion items={hostingFaqs} />
        </Container>
      </section>

      {/* Related Products Bar */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-12 border-t border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Looking for different hosting capabilities?
              </h4>
              <p className="text-xs text-slate-500">
                Explore specialized environments designed for WooCommerce, multi-site resale, or root-level VPS control.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button href="/wordpress-hosting" variant="outline" size="sm">
                Managed WordPress &rarr;
              </Button>
              <Button href="/reseller-hosting" variant="outline" size="sm">
                Reseller WHM &rarr;
              </Button>
              <Button href="/vps" variant="outline" size="sm">
                KVM VPS &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

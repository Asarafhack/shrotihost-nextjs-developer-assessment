"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Zap,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Database,
  Rocket,
  RefreshCw,
  Lock
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PricingCard } from "@/components/pricing/PricingCard";
import { BillingCycleSelector } from "@/components/pricing/BillingCycleSelector";
import { WORDPRESS_HOSTING_PLANS, BillingCycle } from "@/data/hosting-plans";
import { getFaqsByCategory } from "@/data/faqs";

export default function WordPressHostingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");
  const wpFaqs = getFaqsByCategory("wordpress").map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Hosting", href: "/hosting" }, { label: "Managed WordPress" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Zap className="h-3.5 w-3.5 text-purple-600" />
              <span>LiteSpeed Cache + Redis Object Caching</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Managed WordPress & WooCommerce Hosting
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Fine-tuned server architecture purpose-built for WordPress performance. Sub-second TTFB, automated core updates, 1-click staging, and guaranteed{" "}
              <strong className="text-purple-600 dark:text-purple-400 font-semibold">
                Same-Price Renewals
              </strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Optimized for:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">WooCommerce Stores</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">High-Traffic Blogs</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Elementor & Divi Sites</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Digital Agencies</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Grid */}
      <section>
        <Container>
          <BillingCycleSelector currentCycle={billingCycle} onChange={setBillingCycle} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORDPRESS_HOSTING_PLANS.map((plan) => (
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
              All WordPress tiers feature automatic JetBackup daily snapshots and free migration assistance.
            </span>
          </div>
        </Container>
      </section>

      {/* WordPress Architectural Highlights */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="WordPress Stack"
            title="Engineered Specifically for WordPress Execution"
            subtitle="How our native server stack eliminates plugin bloat, reduces database queries, and accelerates checkout transactions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit mb-4">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                LiteSpeed Cache (LSCache)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Server-level page caching that delivers static HTML directly from RAM. Bypasses PHP execution completely for up to 4,800 requests per second.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit mb-4">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Redis Object Caching
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Stores complex MySQL query results directly in memory. Drastically reduces database load times for WooCommerce carts, filters, and searches.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit mb-4">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                1-Click Staging & Auto-Updates
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Clone your live site to a private staging environment with one click. Test new plugins and themes safely before pushing live.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Product FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="WordPress Hosting FAQs"
            title="Common Questions About Managed WordPress"
            subtitle="Straightforward answers regarding our caching layers, staging environments, and migrations."
          />
          <Accordion items={wpFaqs} />
        </Container>
      </section>
    </div>
  );
}

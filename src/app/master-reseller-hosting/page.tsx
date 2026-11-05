"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Zap,
  ShieldCheck,
  Check,
  Users,
  Settings,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PricingCard } from "@/components/pricing/PricingCard";
import { BillingCycleSelector } from "@/components/pricing/BillingCycleSelector";
import { MASTER_RESELLER_PLANS, BillingCycle } from "@/data/hosting-plans";
import { getFaqsByCategory } from "@/data/faqs";

export default function MasterResellerHostingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");
  const faqs = getFaqsByCategory("reseller").map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Hosting", href: "/hosting" }, { label: "Master Reseller" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Layers className="h-3.5 w-3.5 text-purple-600" />
              <span>Multi-Tier Hosting Hierarchy & Sub-Reseller Provisioning</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Master Reseller Hosting Solutions
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Step up to multi-tier hosting entrepreneurship. Create and sell full WHM reseller accounts to others, or provision direct cPanels, with guaranteed{" "}
              <strong className="text-purple-600 dark:text-purple-400 font-semibold">
                Same-Price Renewals
              </strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Hierarchy:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">You (Master WHM)</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">&rarr; Your Resellers (WHM)</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">&rarr; End Clients (cPanel)</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Grid */}
      <section>
        <Container>
          <BillingCycleSelector currentCycle={billingCycle} onChange={setBillingCycle} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {MASTER_RESELLER_PLANS.map((plan) => (
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
              All master reseller packages run on LiteSpeed Enterprise clusters with automated daily JetBackup snapshots.
            </span>
          </div>
        </Container>
      </section>

      {/* Architectural Hierarchy Explanation */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Architectural Breakdown"
            title="How Master Reseller Hosting Works"
            subtitle="The difference between standard reseller hosting and master reseller capability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                1. Master WHM Control
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                You receive high-level Master WHM access that includes the Master Reseller plugin suite, letting you allocate sub-reseller quotas and WHM permissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                2. Sub-Reseller Accounts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Sell complete reseller packages to web designers and marketing agencies, who can in turn manage their own private cPanel client roster under their own domain.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                3. Higher Revenue Margin
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                By serving both end clients and resellers, your monthly recurring revenue scales substantially faster while our infrastructure manages backend patching.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Product FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Master Reseller FAQs"
            title="Questions About Master Reseller Capabilities"
            subtitle="Understand permission trees, nameserver delegation, and backup isolation."
          />
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}

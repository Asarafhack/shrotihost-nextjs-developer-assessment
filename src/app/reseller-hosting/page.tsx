"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Zap,
  ShieldCheck,
  Check,
  Layers,
  Users,
  Settings,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PricingCard } from "@/components/pricing/PricingCard";
import { BillingCycleSelector } from "@/components/pricing/BillingCycleSelector";
import { RESELLER_HOSTING_PLANS, BillingCycle } from "@/data/hosting-plans";
import { getFaqsByCategory } from "@/data/faqs";

export default function ResellerHostingPage() {
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
          <Breadcrumbs items={[{ label: "Hosting", href: "/hosting" }, { label: "Reseller Hosting" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Briefcase className="h-3.5 w-3.5 text-purple-600" />
              <span>Full WHM Control Panel & White-Label Nameservers</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              White-Label Reseller Web Hosting
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Launch your own profitable web hosting business today. Provision isolated cPanel accounts, bill your clients, and keep 100% of your earnings with guaranteed{" "}
              <strong className="text-purple-600 dark:text-purple-400 font-semibold">
                Same-Price Renewals
              </strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Included:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">100% White-Label</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Private Nameservers</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Free WHMCS on Annual</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">LiteSpeed Web Server</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Grid */}
      <section>
        <Container>
          <BillingCycleSelector currentCycle={billingCycle} onChange={setBillingCycle} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESELLER_HOSTING_PLANS.map((plan) => (
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
              All reseller tiers come with private nameservers, automated daily JetBackup snapshots, and cPanel account isolation.
            </span>
          </div>
        </Container>
      </section>

      {/* Reseller Feature Matrix */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Business Operating System"
            title="Everything Needed to Run an Agency Hosting Division"
            subtitle="Built on industry standards so your clients receive a professional, unbranded hosting experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit mb-4">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Web Host Manager (WHM)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Full administrative control to create packages, modify disk and bandwidth quotas, suspend delinquent accounts, and reset client credentials in seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit mb-4">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Free WHMCS Billing License
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Automate recurring invoicing, automated payment collection, instant cPanel provisioning, and support ticket queues with WHMCS (included on annual commitments).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                100% White-Label Branding
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Your clients never see Shroti Host branding. Private nameservers (ns1/ns2.yourdomain.com), custom cPanel logos, and customizable email notification templates.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Reseller FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Reseller FAQs"
            title="Questions About Reselling & WHM"
            subtitle="Straightforward answers regarding WHM quotas, overselling, and billing automation."
          />
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Infinity as InfinityIcon,
  Zap,
  ShieldCheck,
  Check,
  Info,
  Server,
  Terminal,
  Layers,
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
import { UNLIMITED_HOSTING_PLANS, BillingCycle } from "@/data/hosting-plans";
import { getFaqsByCategory } from "@/data/faqs";

export default function UnlimitedHostingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");
  const faqs = getFaqsByCategory("hosting").map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Hosting", href: "/hosting" }, { label: "Unlimited Multi-Site" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <InfinityIcon className="h-3.5 w-3.5 text-purple-600" />
              <span>Unmetered NVMe Storage & Bandwidth</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Unlimited Multi-Site NVMe Hosting
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Unrestricted growth for developers and multi-domain operators. Run your websites without worrying about arbitrary gigabyte storage tiers, backed by transparent{" "}
              <strong className="text-purple-600 dark:text-purple-400 font-semibold">
                Same-Price Renewals
              </strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Features:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Unmetered NVMe</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Python & Node.js</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">SSH & Git CLI</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">Fair-Use Governance</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Grid */}
      <section>
        <Container>
          <BillingCycleSelector currentCycle={billingCycle} onChange={setBillingCycle} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNLIMITED_HOSTING_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
              />
            ))}
          </div>

          {/* Honest Commercial Transparency Box */}
          <div className="mt-10 max-w-3xl mx-auto p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
            <Info className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-slate-900 dark:text-slate-200 block mb-0.5">
                Commercial Fair-Use Policy (FUP) Disclosure:
              </strong>
              <span>
                &ldquo;Unmetered&rdquo; signifies there are no fixed gigabyte billing limits for normal website files, media, and databases. To guarantee cluster reliability, accounts remain subject to CloudLinux LVE limits (CPU, RAM, and inode counts) and may not be used as an archival dump or file-sharing mirror.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Developer Environment Capabilities */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Developer Ready"
            title="Complete Runtime Freedom"
            subtitle="Everything modern web engineers need to deploy APIs, micro-frontends, and CMS platforms."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit mb-4">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                SSH & Git Version Control
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Connect via encrypted terminal, run Composer and npm builds directly on the server, and deploy changes seamlessly via git repositories.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit mb-4">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Multi-Language Support
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Select your preferred runtime: Node.js 18.x/20.x, Python 3.9/3.11 with virtual environments, Ruby, and selectable PHP versions (7.4 to 8.3).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Imunify360 Protection
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Automated machine-learning malware defense, proactive PHP patch immunity, and web application firewall (WAF) blocking suspicious traffic.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Product FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Unlimited Plan FAQs"
            title="Questions About Unmetered Resources"
            subtitle="Clear explanations on our resource allocation, inode thresholds, and support model."
          />
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}

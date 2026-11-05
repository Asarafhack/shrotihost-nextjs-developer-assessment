import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Zap,
  ShieldCheck,
  Server,
  QrCode
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { SERVICES } from "@/data/services";

export default function EcommerceDevelopmentPage() {
  const service = SERVICES.find((s) => s.slug === "ecommerce-development")!;
  const faqs = service.faqs.map((f, i) => ({
    id: `ecom-faq-${i}`,
    title: f.question,
    content: f.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Services" }, { label: service.shortTitle }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <ShoppingBag className="h-3.5 w-3.5 text-purple-600" />
              <span>UPI Checkout Optimization &bull; Redis Object Caching &bull; 1-Click Buy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {service.heroHeadline}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                <span>Build an Online Store</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button href="#deliverables" variant="outline" size="lg">
                <span>View Integrations</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem & Solution */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-2">
                The Problem
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Cart Lag & Checkout Drop-offs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.businessProblem}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">
                Our Solution
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                High-Conversion Storefront Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.solutionOverview}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section id="deliverables">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="What Powers Our E-Commerce Implementations"
            subtitle="Engineered for high concurrency, fast checkout flows, and Indian logistics APIs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Indian Payment Ecosystem Showcase */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Gateway Integrations"
            title="Integrated with India's Premier Payment Rail"
            subtitle="Smooth UPI Intent and card transactions supporting Razorpay, Cashfree, PhonePe, and PayU."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <QrCode className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">UPI Instant Intent</h4>
              <p className="text-[11px] text-slate-500 mt-1">Open directly in GPay, PhonePe, or Paytm with zero manual VPA entry.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <CreditCard className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">RuPay & Cards</h4>
              <p className="text-[11px] text-slate-500 mt-1">Tokenized 3D-Secure cards with OTP autofill and zero checkout drop-off.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Zap className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Redis Object Caching</h4>
              <p className="text-[11px] text-slate-500 mt-1">Accelerates dynamic shopping carts and prevents concurrency slowdowns.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="E-Commerce FAQs"
            title="Frequently Asked Questions"
            subtitle="Inquiries regarding payment security, flash sale scale, and logistics plugins."
          />
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  ShieldCheck,
  Server,
  Zap
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { SERVICES } from "@/data/services";

export default function AppDevelopmentPage() {
  const service = SERVICES.find((s) => s.slug === "app-development")!;
  const faqs = service.faqs.map((f, i) => ({
    id: `app-faq-${i}`,
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
              <Smartphone className="h-3.5 w-3.5 text-purple-600" />
              <span>Native iOS & Android Performance with Cloud VPS Backends</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {service.heroHeadline}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                <span>Start Mobile Project</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button href="#deliverables" variant="outline" size="lg">
                <span>Explore Architecture</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Business Problem & Engineering Solution */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-2">
                The Problem
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Fragmented Codebases & Fragile APIs
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
                Unified Cross-Platform Engineering
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
            eyebrow="Deliverables"
            title="Full-Lifecycle Mobile Application Scope"
            subtitle="Everything required to take your application from initial concept wireframes to production store launch."
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

      {/* Tech Stack */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Engineering Stack"
            title="Mobile Technologies & Native Bridges"
            subtitle="We build with cross-platform leaders to deliver fluid 60fps native feel on both platforms."
          />

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-purple-500/30 bg-purple-950/20 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h4 className="font-bold text-purple-300 text-base mb-2 flex items-center gap-2">
              <Server className="h-5 w-5 text-purple-400" />
              Hosting & Backend Synergy
            </h4>
            <p>{service.infrastructureSynergy}</p>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Common Questions"
            title="App Development FAQs"
            subtitle="Inquiries regarding store submissions, source code ownership, and maintenance."
          />
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Check,
  Server,
  HardDrive,
  Globe,
  Sliders,
  ExternalLink,
  ArrowRight,
  Info
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { VPS_PLANS, VPSPlan } from "@/data/hosting-plans";
import { getFaqsByCategory } from "@/data/faqs";
import { formatINR } from "@/lib/utils";

export default function VpsPage() {
  const [selectedPlan, setSelectedPlan] = useState<VPSPlan>(VPS_PLANS[2]); // Default to VPS Core
  const faqs = getFaqsByCategory("vps").map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Hosting", href: "/hosting" }, { label: "KVM Virtual Private Servers" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Cpu className="h-3.5 w-3.5 text-purple-600" />
              <span>Full Root Access &bull; 1 Gbps Uplink &bull; Tier-3 Datacenter</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              High-Performance KVM VPS Hosting
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Unrestricted virtualization for production applications, Docker microservices, custom APIs, and high-concurrency databases.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/configurator" variant="primary" size="md">
                <Sliders className="h-4 w-4 mr-1.5" />
                <span>Launch Interactive VPS Configurator</span>
              </Button>
              <Button href="#vps-tiers" variant="outline" size="md">
                <span>View All 8 Tier Specifications</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* VPS Plans Matrix */}
      <section id="vps-tiers">
        <Container>
          <SectionHeading
            eyebrow="Tiered KVM Specifications"
            title="Choose Your Compute Scale"
            subtitle="Transparent pricing with zero hidden overselling. Dedicated virtual CPU cores and dedicated RAM."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VPS_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm ${
                  plan.id === "vps-core"
                    ? "border-purple-500 ring-1 ring-purple-500/50 shadow-md"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {plan.id === "vps-core" && (
                  <div className="absolute -top-3 left-6">
                    <Badge variant="purple" size="sm" className="font-semibold uppercase text-[10px]">
                      Recommended Value
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                      {formatINR(plan.monthlyPrice)}
                    </span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>

                  <div className="mt-1 text-xs">
                    {plan.setupFee > 0 ? (
                      <span className="text-slate-500">
                        + {formatINR(plan.setupFee)} one-time setup fee
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Free Instant Setup
                      </span>
                    )}
                  </div>
                </div>

                {/* Core specs list */}
                <div className="space-y-2 py-4 border-y border-slate-100 dark:border-slate-800 text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">vCPU Cores</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.vCpu} vCPU</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dedicated RAM</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      {plan.ramGb < 1 ? `${plan.ramGb * 1024} MB` : `${plan.ramGb} GB`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">NVMe SSD</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.storageGb} GB NVMe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bandwidth</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.bandwidthTb} TB @ 1 Gbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Virtualization</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">KVM (Kernel-based)</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    href={plan.purchaseUrl}
                    isExternal
                    variant={plan.id === "vps-core" ? "primary" : "secondary"}
                    size="sm"
                    className="w-full"
                  >
                    <span>Deploy {plan.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* VPS Hardware & Isolation Details */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Virtualization Architecture"
            title="Enterprise Virtualization Built with KVM"
            subtitle="True hardware virtualization guaranteeing your compute resources cannot be stolen by neighboring tenants."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Guaranteed Dedicated vCPU
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Kernel-based Virtual Machine (KVM) ensures isolated CPU thread allocations. Run intensive compiling or heavy database operations without throttling.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit mb-4">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                1 Gbps Port Connectivity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Direct connections to Tier-1 Indian peering exchanges (NIXI, Extreme IX) ensuring minimal ping times across all major domestic telecom networks.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Root SSH & Custom ISOs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Full root permissions. Install Docker, Kubernetes, configure custom iptables, and rebuild with Ubuntu, AlmaLinux, Debian, or Rocky Linux in minutes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* VPS FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="VPS FAQs"
            title="Questions About VPS Deployments"
            subtitle="Setup fees, IP allocations, OS reinstallations, and backup frequencies."
          />
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitCompare,
  Check,
  X,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Globe,
  Server,
  Zap,
  Info,
  Layers,
  HelpCircle
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ALL_HOSTING_PLANS, HostingPlan } from "@/data/hosting-plans";
import { COMPETITOR_PROVIDERS, CATEGORY_EXPLANATIONS, CompetitorProvider } from "@/data/competitor-intelligence";
import { formatINR } from "@/lib/utils";

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState<"internal" | "competitors">("competitors");

  // Internal Comparison State
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([
    "shared-grow",
    "wp-business",
    "reseller-growth",
  ]);

  const selectedPlans = selectedPlanIds
    .map((id) => ALL_HOSTING_PLANS.find((p) => p.id === id))
    .filter((p): p is HostingPlan => !!p);

  const removePlan = (id: string) => {
    setSelectedPlanIds(selectedPlanIds.filter((pId) => pId !== id));
  };

  const addPlan = (id: string) => {
    if (selectedPlanIds.length < 4 && !selectedPlanIds.includes(id)) {
      setSelectedPlanIds([...selectedPlanIds, id]);
    }
  };

  const availableToAdd = ALL_HOSTING_PLANS.filter(
    (p) => !selectedPlanIds.includes(p.id)
  );

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
      <Container>
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "Hosting & Provider Comparison" }]} />

        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge variant="blue" size="sm" className="mb-3">
            Objective Engineering Analysis
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Comprehensive Specification & Provider Comparison
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Evaluate technical specifications side-by-side. Compare ShrotiHost tiers internally, or review our honest market comparison against Hostinger, Namecheap, GoDaddy, and Cloudflare.
          </p>

          {/* Primary View Mode Switcher */}
          <div className="inline-flex p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 mt-8 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("competitors")}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "competitors"
                  ? "bg-white dark:bg-purple-900/60 text-purple-900 dark:text-white shadow-sm ring-1 ring-black/5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Industry Landscape (ShrotiHost vs Hostinger vs Namecheap vs Cloudflare)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("internal")}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "internal"
                  ? "bg-white dark:bg-purple-900/60 text-purple-900 dark:text-white shadow-sm ring-1 ring-black/5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              ShrotiHost Tier Comparison Matrix
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: COMPETITOR INTELLIGENCE & PROVIDER ECOSYSTEM */}
        {/* ---------------------------------------------------- */}
        {activeTab === "competitors" && (
          <div className="space-y-12 animate-in fade-in-50 duration-200">
            {/* Architectural Clarification Callout: Cloudflare vs Origin Hosts */}
            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-indigo-50/70 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {CATEGORY_EXPLANATIONS.dns_cdn.title}
                    </h3>
                    <Badge variant="purple" size="sm">Ecosystem Architecture</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {CATEGORY_EXPLANATIONS.dns_cdn.explanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPETITOR_PROVIDERS.map((provider) => {
                const isShroti = provider.id === "shrotihost";
                return (
                  <div
                    key={provider.id}
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                      isShroti
                        ? "border-purple-500 bg-purple-50/30 dark:bg-purple-950/20 shadow-md ring-1 ring-purple-500"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                          {provider.name}
                        </span>
                        {isShroti ? (
                          <Badge variant="purple" size="sm">Our Platform</Badge>
                        ) : (
                          <Badge variant="neutral" size="sm">{provider.role.split(" ")[0]}</Badge>
                        )}
                      </div>

                      <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-2">
                        {provider.tagline}
                      </p>

                      <div className="text-[11px] font-mono text-slate-500 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                        {provider.role}
                      </div>

                      {/* Pricing Specs Box */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-2 mb-4 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-sans">Shared Entry:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">{provider.sharedHostingEntry.introPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-sans">Renewal Rate:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">{provider.sharedHostingEntry.renewalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-sans">Renewal Hike:</span>
                          <span className={`font-bold ${isShroti ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                            {provider.sharedHostingEntry.renewalMultiplier}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-sans">Web Server:</span>
                          <span className="text-slate-800 dark:text-slate-200">{provider.sharedHostingEntry.webServer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-sans">.com Renewal:</span>
                          <span className="text-slate-800 dark:text-slate-200">{provider.domainPricing.comRenewal}</span>
                        </div>
                      </div>

                      {/* Strengths */}
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Notable Strengths</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {provider.keyStrengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 shrink-0 font-bold">&bull;</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Limitations */}
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
                          <Info className="h-3.5 w-3.5 text-amber-500" />
                          <span>Trade-Offs & Limitations</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {provider.keyLimitations.map((l, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-500 shrink-0 font-bold">&bull;</span>
                              <span>{l}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 italic">
                      <strong>Best suited for:</strong> {provider.idealFor}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Objective Methodology Note */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs text-slate-500 text-center max-w-3xl mx-auto">
              Pricing and technical parameters verified as of November 2026 from public documentation. We do not claim ShrotiHost is superior in every dimension: for example, Cloudflare provides unbeatable global Anycast edge DDoS protection, and Namecheap offers broader international TLD availability. We encourage informed architecture choices based on your specific requirements.
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: INTERNAL SHROTIHOST PLAN SPECIFICATION TABLE */}
        {/* ---------------------------------------------------- */}
        {activeTab === "internal" && (
          <div className="space-y-8 animate-in fade-in-50 duration-200">
            {/* Plan Selectors & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Comparing {selectedPlans.length} of 4 plans</span>
              </div>

              {availableToAdd.length > 0 && selectedPlanIds.length < 4 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:inline">Add plan:</span>
                  <select
                    onChange={(e) => {
                      if (e.target.value) addPlan(e.target.value);
                      e.target.value = "";
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a plan to add...</option>
                    {availableToAdd.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({formatINR(p.monthlyPrice)}/mo)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60">
                    <th className="p-4 sm:p-5 w-48 text-slate-500 font-semibold uppercase text-xs tracking-wider">
                      Plan Details
                    </th>
                    {selectedPlans.map((plan) => (
                      <th key={plan.id} className="p-4 sm:p-5 min-w-[200px] align-top">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-base text-slate-900 dark:text-slate-100">
                            {plan.name}
                          </span>
                          {selectedPlans.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removePlan(plan.id)}
                              aria-label={`Remove ${plan.name} from comparison`}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-md"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <Badge variant="purple" size="sm" className="mb-2">
                          {plan.category.toUpperCase()}
                        </Badge>
                        <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                          {formatINR(plan.monthlyPrice)}
                          <span className="text-xs font-normal text-slate-500">/mo</span>
                        </div>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          Same-price renewal ({formatINR(plan.renewalPrice)}/mo)
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  {/* Hosted Websites */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      Hosted Websites
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4 font-mono">
                        {p.websites}
                      </td>
                    ))}
                  </tr>

                  {/* NVMe Storage */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      NVMe Storage
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4 font-mono">
                        {p.storage} {p.storageType}
                      </td>
                    ))}
                  </tr>

                  {/* CPU Allocation */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      CloudLinux CPU
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4 font-mono">
                        {p.cpu || "Standard Shared"}
                      </td>
                    ))}
                  </tr>

                  {/* RAM Allocation */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      RAM Memory
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4 font-mono">
                        {p.ram || "Standard Pool"}
                      </td>
                    ))}
                  </tr>

                  {/* Web Server */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      Web Server
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4">
                        LiteSpeed Enterprise + LSCache
                      </td>
                    ))}
                  </tr>

                  {/* Automated Backups */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      Backups
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4">
                        Daily JetBackup Included
                      </td>
                    ))}
                  </tr>

                  {/* Control Panel */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/20">
                      Control Panel
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4 font-mono">
                        {p.controlPanel}
                      </td>
                    ))}
                  </tr>

                  {/* Actions Row */}
                  <tr className="bg-slate-50/30 dark:bg-slate-800/10">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">
                      Order Link
                    </td>
                    {selectedPlans.map((p) => (
                      <td key={p.id} className="p-4">
                        <Button href={p.purchaseUrl} isExternal size="sm" variant="primary" className="w-full">
                          <span>Get Started</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

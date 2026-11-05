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
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ALL_HOSTING_PLANS, HostingPlan } from "@/data/hosting-plans";
import { formatINR } from "@/lib/utils";

export default function ComparePage() {
  // Default compare 3 diverse plans: Shared Grow, WP Business, Reseller Growth
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
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "Plan Comparison Matrix" }]} />

        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge variant="blue" size="sm" className="mb-3">
            Cross-Product Matrix
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Side-by-Side Specification Comparison
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Compare resource limits, server runtimes, and pricing across our Shared, WordPress, and Reseller hosting plans.
          </p>
        </div>

        {/* Plan Selectors & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8">
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
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs uppercase font-bold text-purple-600 dark:text-purple-400 block">
                          {plan.category.toUpperCase()}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                          {plan.name}
                        </h4>
                      </div>
                      {selectedPlans.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlan(plan.id)}
                          aria-label={`Remove ${plan.name} from comparison`}
                          className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-2 text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      {formatINR(plan.monthlyPrice)}
                      <span className="text-xs font-normal text-slate-500"> /mo</span>
                    </div>
                    <div className="mt-3">
                      <Button
                        href={plan.purchaseUrl}
                        isExternal
                        variant="primary"
                        size="sm"
                        className="w-full text-xs h-9"
                      >
                        <span>Choose {plan.name}</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {/* Row: Same Price Renewal */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  Renewal Policy
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4">
                    {plan.hasSamePriceRenewal ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                        <Check className="h-4 w-4" /> Same-Price ({formatINR(plan.renewalPrice)}/mo)
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">{formatINR(plan.renewalPrice)}/mo</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Websites / Accounts */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  Websites / Accounts
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4 font-semibold">
                    {plan.websites}
                  </td>
                ))}
              </tr>

              {/* Row: Storage */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  NVMe Storage
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4 font-semibold">
                    {plan.storage}
                  </td>
                ))}
              </tr>

              {/* Row: RAM */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  RAM Memory
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4 font-mono">
                    {plan.ram || "Standard LVE"}
                  </td>
                ))}
              </tr>

              {/* Row: CPU Cores */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  CPU Allocation
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4 font-mono">
                    {plan.cpu || "1 Core"}
                  </td>
                ))}
              </tr>

              {/* Row: Control Panel */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  Control Panel
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4">
                    <Badge variant="purple" size="sm">{plan.controlPanel}</Badge>
                  </td>
                ))}
              </tr>

              {/* Row: Web Server */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  Web Server Software
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    LiteSpeed Enterprise + LSCache
                  </td>
                ))}
              </tr>

              {/* Row: Automated Backups */}
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/40 dark:bg-slate-800/30">
                  Backup System
                </td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id} className="p-4 text-xs">
                    JetBackup Daily Automated
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

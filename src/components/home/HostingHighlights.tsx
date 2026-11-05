"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SHARED_HOSTING_PLANS, WORDPRESS_HOSTING_PLANS, BillingCycle } from "@/data/hosting-plans";
import { PricingCard } from "@/components/pricing/PricingCard";
import { BillingCycleSelector } from "@/components/pricing/BillingCycleSelector";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function HostingHighlights() {
  const [activeCategory, setActiveCategory] = useState<"shared" | "wordpress">("shared");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");

  const plans = activeCategory === "shared" ? SHARED_HOSTING_PLANS : WORDPRESS_HOSTING_PLANS;

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveCategory("shared")}
            className={cn(
              "px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all",
              activeCategory === "shared"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            )}
          >
            NVMe Shared Hosting (from ₹49/mo)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("wordpress")}
            className={cn(
              "px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all",
              activeCategory === "wordpress"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            )}
          >
            Managed WordPress (from ₹69/mo)
          </button>
        </div>
      </div>

      {/* Centralized Billing Cycle Selector */}
      <BillingCycleSelector currentCycle={billingCycle} onChange={setBillingCycle} />

      {/* Responsive Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
          />
        ))}
      </div>

      {/* Deep Link to Full Category & Comparison */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Button
          href={activeCategory === "shared" ? "/hosting" : "/wordpress-hosting"}
          variant="outline"
          size="md"
        >
          View Detailed {activeCategory === "shared" ? "Shared Hosting" : "WordPress"} Specifications &rarr;
        </Button>
        <Button href="/compare" variant="ghost" size="md">
          Compare with Reseller & VPS &rarr;
        </Button>
      </div>
    </div>
  );
}

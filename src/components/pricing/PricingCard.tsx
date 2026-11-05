"use client";

import React from "react";
import { Check, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { HostingPlan, BillingCycle } from "@/data/hosting-plans";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: HostingPlan;
  billingCycle: BillingCycle;
  onSelectPlan?: (plan: HostingPlan) => void;
  className?: string;
}

export function PricingCard({
  plan,
  billingCycle,
  onSelectPlan,
  className,
}: PricingCardProps) {
  // Calculate price based on selected billing cycle
  const displayPrice = billingCycle === "annually" ? plan.annualPrice : plan.monthlyPrice;
  const isAnnual = billingCycle === "annually";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900/90 p-6 sm:p-7 shadow-sm",
        plan.highlighted
          ? "border-purple-500/80 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/50"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
    >
      {/* Plan Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <Badge
            variant={plan.highlighted ? "purple" : "neutral"}
            size="sm"
            className="shadow-sm font-semibold tracking-wide uppercase text-[10px]"
          >
            {plan.badge}
          </Badge>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
          <span>{plan.name}</span>
          {plan.highlighted && <Zap className="h-4 w-4 text-purple-500 fill-purple-500" />}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[32px]">
          {plan.tagline}
        </p>
      </div>

      {/* Pricing Display */}
      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {formatINR(displayPrice)}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">/ month</span>
        </div>

        {/* Renewal & Billing Term Disclosure */}
        <div className="mt-2.5 flex flex-col gap-1 text-xs">
          {plan.hasSamePriceRenewal ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              Renews at same {formatINR(plan.renewalPrice)}/mo (No Hike)
            </span>
          ) : (
            <span className="text-slate-500">
              Renews at standard {formatINR(plan.renewalPrice)}/mo
            </span>
          )}

          {isAnnual && (
            <span className="text-[11px] text-slate-500">
              Billed annually at {formatINR(displayPrice * 12)} + tax
            </span>
          )}
        </div>
      </div>

      {/* Key Hardware Specs Pills */}
      <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
        {plan.cpu && (
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">CPU Core</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.cpu}</span>
          </div>
        )}
        {plan.ram && (
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">RAM Memory</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.ram}</span>
          </div>
        )}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Storage</span>
          <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.storage}</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Domains</span>
          <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.websites}</span>
        </div>
      </div>

      {/* Feature Bullet Points */}
      <div className="flex-1 mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Included Features:
        </p>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <div className="mt-auto pt-2">
        <Button
          href={plan.purchaseUrl}
          isExternal
          variant={plan.highlighted ? "primary" : "secondary"}
          className="w-full text-xs font-semibold py-2.5 h-11"
        >
          <span>Get Started with {plan.name}</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
        <p className="text-[11px] text-center text-slate-500 mt-2">
          7-day money-back guarantee &bull; Instant activation
        </p>
      </div>
    </div>
  );
}

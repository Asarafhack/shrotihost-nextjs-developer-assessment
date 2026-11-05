"use client";

import React from "react";
import { BillingCycle } from "@/data/hosting-plans";
import { cn } from "@/lib/utils";

interface BillingCycleSelectorProps {
  currentCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  className?: string;
}

export function BillingCycleSelector({
  currentCycle,
  onChange,
  className,
}: BillingCycleSelectorProps) {
  return (
    <div className={cn("flex items-center justify-center mb-10", className)}>
      <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-inner">
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={cn(
            "px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all",
            currentCycle === "monthly"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          Monthly Billing
        </button>

        <button
          type="button"
          onClick={() => onChange("annually")}
          className={cn(
            "relative px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5",
            currentCycle === "annually"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          <span>Annual Billing</span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded-full">
            Best Value
          </span>
        </button>
      </div>
    </div>
  );
}

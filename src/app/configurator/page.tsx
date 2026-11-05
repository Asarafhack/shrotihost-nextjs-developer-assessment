"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sliders,
  Cpu,
  HardDrive,
  Globe,
  ShieldCheck,
  ExternalLink,
  Check,
  Server,
  Layers,
  ArrowRight,
  Info
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { VPS_PLANS, VPSPlan } from "@/data/hosting-plans";
import { formatINR } from "@/lib/utils";

const OS_OPTIONS = [
  { id: "ubuntu", name: "Ubuntu 22.04 LTS", category: "Linux", popular: true },
  { id: "ubuntu-24", name: "Ubuntu 24.04 LTS", category: "Linux" },
  { id: "almalinux", name: "AlmaLinux 9 (cPanel ready)", category: "RHEL", popular: true },
  { id: "debian", name: "Debian 12 Bookworm", category: "Linux" },
  { id: "rocky", name: "Rocky Linux 9", category: "RHEL" },
];

export default function VpsConfiguratorPage() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(2); // Default to VPS Core (index 2)
  const [selectedOs, setSelectedOs] = useState<string>("ubuntu");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const currentPlan: VPSPlan = VPS_PLANS[selectedPlanIndex] || VPS_PLANS[0];

  // Annual discount calculation (e.g. 10% discount on 12-month billing)
  const monthlyRate = billingCycle === "annually"
    ? Math.round(currentPlan.monthlyPrice * 0.9)
    : currentPlan.monthlyPrice;

  const totalBilled = billingCycle === "annually"
    ? monthlyRate * 12 + currentPlan.setupFee
    : monthlyRate + currentPlan.setupFee;

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
      <Container>
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "VPS Configurator" }]} />

        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="blue" size="sm" className="mb-3">
            Real-Time Resource Estimator
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Interactive VPS Server Configurator
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Customize your dedicated KVM virtual compute environment. Select vCPU, RAM, storage, and operating system with instant price updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Plan Tier Slider */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="tier-slider" className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-purple-600" />
                  <span>1. Select Compute Tier: {currentPlan.name}</span>
                </label>
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                  {currentPlan.vCpu} vCPU / {currentPlan.ramGb < 1 ? `${currentPlan.ramGb * 1024} MB` : `${currentPlan.ramGb} GB`} RAM
                </span>
              </div>

              <input
                id="tier-slider"
                type="range"
                min={0}
                max={VPS_PLANS.length - 1}
                step={1}
                value={selectedPlanIndex}
                onChange={(e) => setSelectedPlanIndex(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                <span>Spark (₹499)</span>
                <span>Core (₹1,199)</span>
                <span>Forge (₹3,499)</span>
                <span>Apex (₹9,999)</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {VPS_PLANS.slice(0, 4).map((plan, idx) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedPlanIndex === idx
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className="font-bold text-xs block">{plan.name}</span>
                    <span className="text-[10px] text-slate-500">{formatINR(plan.monthlyPrice)}/mo</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Operating System Selection */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Server className="h-4 w-4 text-purple-600" />
                <span>2. Select Linux Distribution / OS Image</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OS_OPTIONS.map((os) => (
                  <button
                    key={os.id}
                    type="button"
                    onClick={() => setSelectedOs(os.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedOs === os.id
                        ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs block">{os.name}</span>
                      <span className="text-[10px] text-slate-500">{os.category} Architecture</span>
                    </div>
                    {os.popular && <Badge variant="neutral" size="sm">Standard</Badge>}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Billing Term Selection */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Globe className="h-4 w-4 text-purple-600" />
                <span>3. Billing Cycle & Term</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    billingCycle === "monthly"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="font-bold text-sm block">Monthly Term</span>
                  <span className="text-xs text-slate-500 mt-1 block">Maximum flexibility &bull; Cancel anytime</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle("annually")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    billingCycle === "annually"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Annual Term</span>
                    <Badge variant="green" size="sm">10% Savings</Badge>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">Lock in lowest rate for 12 months</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Configuration Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-purple-500/40 bg-white dark:bg-slate-900 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Server Summary
                </span>
                <Badge variant="purple" size="sm">KVM Virtual</Badge>
              </div>

              <div className="py-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {currentPlan.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tier-3 Datacenter &bull; India Peering
                </p>
              </div>

              {/* Hardware specifications list */}
              <div className="space-y-2.5 py-4 border-y border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">vCPU Compute:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{currentPlan.vCpu} vCPU Cores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dedicated RAM:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {currentPlan.ramGb < 1 ? `${currentPlan.ramGb * 1024} MB` : `${currentPlan.ramGb} GB`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">NVMe SSD Drive:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{currentPlan.storageGb} GB NVMe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Transfer:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{currentPlan.bandwidthTb} TB @ 1 Gbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Operating System:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400 capitalize">{selectedOs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dedicated IP:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">1x IPv4 Included</span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Monthly Rate:</span>
                  <span>{formatINR(monthlyRate)}/mo</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Setup Fee:</span>
                  <span>{currentPlan.setupFee > 0 ? formatINR(currentPlan.setupFee) : "Free (₹0)"}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Due Today:</span>
                  <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                    {formatINR(totalBilled)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 text-right">
                  (Exclusive of 18% GST where applicable)
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Button
                  href={currentPlan.purchaseUrl}
                  isExternal
                  variant="primary"
                  size="md"
                  className="w-full h-11"
                >
                  <span>Deploy on Official Portal</span>
                  <ExternalLink className="h-4 w-4 ml-1.5" />
                </Button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Immediate provisioning upon invoice validation
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

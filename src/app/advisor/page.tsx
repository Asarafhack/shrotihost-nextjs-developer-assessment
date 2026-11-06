"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Server,
  Zap,
  ShieldCheck,
  ExternalLink,
  Info
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ALL_HOSTING_PLANS, HostingPlan } from "@/data/hosting-plans";
import { formatINR } from "@/lib/utils";

interface QuestionnaireState {
  websiteCount: "1" | "2-5" | "6-15" | "16+";
  isWordPress: "yes" | "no" | "unsure";
  expectedTraffic: "low" | "medium" | "high"; // low < 10k, medium 10k-50k, high 50k+
  needsNodePython: boolean;
  needsRootAccess: boolean;
  isReselling: boolean;
}

export default function PlanAdvisorPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuestionnaireState>({
    websiteCount: "1",
    isWordPress: "no",
    expectedTraffic: "low",
    needsNodePython: false,
    needsRootAccess: false,
    isReselling: false,
  });

  const [recommendation, setRecommendation] = useState<{
    primary: HostingPlan;
    alternative: HostingPlan;
    rationale: string[];
    limitations: string[];
  } | null>(null);

  const calculateRecommendation = () => {
    // Deterministic rules engine based on real technical specs
    let primaryId = "shared-launch";
    let altId = "shared-grow";
    const rationale: string[] = [];
    const limitations: string[] = [];

    if (answers.isReselling) {
      if (answers.websiteCount === "16+") {
        primaryId = "reseller-growth";
        altId = "reseller-pro";
        rationale.push("You are hosting multiple client websites; WHM allows you to create isolated cPanel accounts with independent passwords.");
        rationale.push("Includes white-label private nameservers so clients never see Shroti Host branding.");
        limitations.push("Does not include root SSH server access (shared server daemon environment).");
      } else {
        primaryId = "reseller-starter";
        altId = "reseller-growth";
        rationale.push("25 separate cPanels provide plenty of room to onboard your initial design and development clients.");
        rationale.push("Keeps client accounts completely sandboxed to prevent cross-site malware contamination.");
      }
    } else if (answers.needsRootAccess) {
      primaryId = "vps-core"; // VPS Core
      altId = "shared-turbo";
      rationale.push("Root SSH access is only available on KVM Virtual Private Servers.");
      rationale.push("Dedicated 2 vCPU cores and 2 GB RAM guarantee no noisy-neighbor interference.");
      limitations.push("Requires system administration knowledge or command-line familiarity.");
    } else if (answers.isWordPress === "yes") {
      if (answers.expectedTraffic === "high" || answers.websiteCount === "6-15") {
        primaryId = "wp-performance";
        altId = "wp-business";
        rationale.push("Equipped with Redis Object Caching in memory to handle frequent database queries and eliminate cart lag.");
        rationale.push("Supports up to 10 separate WordPress and WooCommerce stores.");
        limitations.push("Unmetered bandwidth is subject to CloudLinux LVE resource governance.");
      } else if (answers.websiteCount === "2-5" || answers.expectedTraffic === "medium") {
        primaryId = "wp-business";
        altId = "wp-starter";
        rationale.push("Tailored for WooCommerce with elevated PHP memory limits (512M) and 1-click staging.");
        rationale.push("LiteSpeed Cache integration delivers fast dynamic page delivery without heavy PHP worker overhead.");
      } else {
        primaryId = "wp-starter";
        altId = "shared-launch";
        rationale.push("LiteSpeed WordPress acceleration optimized for single domain setups at an entry price of ₹69/month.");
        rationale.push("Automated daily JetBackup and automatic core/plugin updates.");
      }
    } else if (answers.needsNodePython) {
      if (answers.websiteCount === "1") {
        primaryId = "shared-grow";
        altId = "shared-turbo";
        rationale.push("Grow plan (₹79/mo) includes native cPanel Application Manager for Node.js and Python virtual environments.");
        rationale.push("Supports up to 5 websites with 50 GB NVMe storage.");
      } else {
        primaryId = "shared-turbo";
        altId = "unlimited-gold";
        rationale.push("2 dedicated CPU cores and 3 GB RAM give your Node.js and Python processes ample bursting power.");
        rationale.push("Includes full SSH terminal access.");
      }
    } else {
      // General shared hosting
      if (answers.websiteCount === "1" && answers.expectedTraffic === "low") {
        primaryId = "shared-launch";
        altId = "shared-grow";
        rationale.push("Launch plan at ₹49/month provides pure NVMe storage and LiteSpeed speed for single websites.");
        rationale.push("Features our same-price renewal guarantee (renews at ₹49, zero markup).");
        limitations.push("Restricted to 1 hosted website and 5 email accounts.");
      } else if (answers.websiteCount === "16+") {
        primaryId = "shared-infinity";
        altId = "unlimited-diamond";
        rationale.push("Infinity plan provides unlimited hosted websites, 250 GB NVMe storage, and 4 GB RAM.");
        rationale.push("Includes free domain registration on annual billing.");
      } else {
        primaryId = "shared-grow";
        altId = "shared-turbo";
        rationale.push("Grow plan (₹79/mo) offers the optimal balance of multi-site hosting (5 sites) and 50 GB NVMe storage.");
        rationale.push("2 GB RAM ensures smooth operation under moderate visitor traffic.");
      }
    }

    const primaryPlan = ALL_HOSTING_PLANS.find((p) => p.id === primaryId) || ALL_HOSTING_PLANS[0];
    const altPlan = ALL_HOSTING_PLANS.find((p) => p.id === altId) || ALL_HOSTING_PLANS[1];

    setRecommendation({
      primary: primaryPlan,
      alternative: altPlan,
      rationale,
      limitations,
    });
    setStep(5); // Show results
  };

  const reset = () => {
    setStep(1);
    setRecommendation(null);
  };

  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "Hosting Plan Advisor" }]} />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="blue" size="sm" className="mb-3">
            Deterministic Decision Engine
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Hosting Plan Recommendation Advisor
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Answer 4 quick technical questions to determine the optimal compute and storage tier for your specific application workload.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            (Rule-based matching &bull; No marketing fluff &bull; Transparent trade-offs)
          </p>
        </div>

        {/* Wizard Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          {/* Progress Indicator */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Step {step} of 4</span>
                <span>{step === 1 ? "Scale" : step === 2 ? "Stack" : step === 3 ? "Traffic" : "Privileges"}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Website Count */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  How many websites do you plan to host?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select your expected total domain count across this hosting subscription.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: "1", label: "Single Website (1)", desc: "A personal portfolio, blog, or single business domain" },
                  { value: "2-5", label: "2 to 5 Websites", desc: "A few side projects, test environments, or client sites" },
                  { value: "6-15", label: "6 to 15 Websites", desc: "Small agency portfolio or growing online network" },
                  { value: "16+", label: "16+ Websites / Unlimited", desc: "Large portfolio or multi-client hosting division" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, websiteCount: option.value as any })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      answers.websiteCount === option.value
                        ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <span className="font-bold text-sm block">{option.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">{option.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} variant="primary" size="md">
                  <span>Continue to Application Stack</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Application Stack */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  What application software will you be running?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Helps us determine whether LiteSpeed Cache or Python/Node runtimes are necessary.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                    Are you building with WordPress / WooCommerce?
                  </span>
                  <div className="flex gap-2">
                    {["yes", "no", "unsure"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAnswers({ ...answers, isWordPress: val as any })}
                        className={`px-4 py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                          answers.isWordPress === val
                            ? "border-purple-600 bg-purple-600 text-white"
                            : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      Do you need Node.js or Python backend runtimes?
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Required for Express, Flask, Django, or Ghost apps
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={answers.needsNodePython}
                    onChange={(e) => setAnswers({ ...answers, needsNodePython: e.target.checked })}
                    className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button onClick={() => setStep(1)} variant="ghost" size="sm">
                  &larr; Back
                </Button>
                <Button onClick={() => setStep(3)} variant="primary" size="md">
                  <span>Continue to Traffic Expectations</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Traffic Expectations */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  What is your anticipated monthly visitor traffic?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Determines concurrent entry process (EP) and physical RAM requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "low", label: "Under 10,000 / mo", desc: "Low traffic, standard blogs, personal sites" },
                  { value: "medium", label: "10,000 to 50,000", desc: "Growing business sites, active blogs" },
                  { value: "high", label: "50,000+ / mo", desc: "Heavy eCommerce, membership, busy news portals" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, expectedTraffic: option.value as any })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      answers.expectedTraffic === option.value
                        ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <span className="font-bold text-sm block">{option.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">{option.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button onClick={() => setStep(2)} variant="ghost" size="sm">
                  &larr; Back
                </Button>
                <Button onClick={() => setStep(4)} variant="primary" size="md">
                  <span>Continue to Server Privileges</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Privileges & Resale */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Administrative Access & Client Management
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Do you need root-level server access or multi-client WHM provisioning?
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      Will you be hosting and billing external clients?
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Requires WHM (Web Host Manager) to give clients private, isolated cPanels
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={answers.isReselling}
                    onChange={(e) => setAnswers({ ...answers, isReselling: e.target.checked })}
                    className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      Do you require root SSH access or custom system daemons?
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Requires a dedicated KVM VPS environment
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={answers.needsRootAccess}
                    onChange={(e) => setAnswers({ ...answers, needsRootAccess: e.target.checked })}
                    className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button onClick={() => setStep(3)} variant="ghost" size="sm">
                  &larr; Back
                </Button>
                <Button onClick={calculateRecommendation} variant="primary" size="md">
                  <span>Calculate Recommendation &rarr;</span>
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Recommendation Results Display */}
          {step === 5 && recommendation && (
            <div className="space-y-8 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <Badge variant="green" size="sm" className="mb-1">
                    Optimal Plan Match
                  </Badge>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {recommendation.primary.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {recommendation.primary.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                    {formatINR(recommendation.primary.monthlyPrice)}
                  </span>
                  <span className="text-xs text-slate-500 block">/ month (same-price renewal)</span>
                </div>
              </div>

              {/* Why It Fits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Why This Plan Fits Your Workload:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {recommendation.rationale.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resource Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Storage</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{recommendation.primary.storage}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Domains</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{recommendation.primary.websites}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">RAM / Limits</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{recommendation.primary.ram || "Standard"}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Control Panel</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{recommendation.primary.controlPanel}</span>
                </div>
              </div>

              {/* Limitations / Disclosures */}
              {recommendation.limitations.length > 0 && (
                <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300">
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    <Info className="h-4 w-4" />
                    <span>Important Plan Boundaries:</span>
                  </div>
                  <ul className="space-y-1 pl-5 list-disc text-[11px]">
                    {recommendation.limitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  href={recommendation.primary.purchaseUrl}
                  isExternal
                  variant="primary"
                  size="md"
                  className="w-full sm:flex-1"
                >
                  <span>Deploy {recommendation.primary.name} on Official Portal</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </Button>
                <Button onClick={reset} variant="outline" size="md" className="w-full sm:w-auto">
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  <span>Restart Advisor</span>
                </Button>
              </div>

              {/* Alternative Plan Callout */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Alternative option to consider: <strong>{recommendation.alternative.name}</strong> ({formatINR(recommendation.alternative.monthlyPrice)}/mo)
                </span>
                <Link href="/compare" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                  Compare specs &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

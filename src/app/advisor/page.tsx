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
  Info,
  Sparkles,
  MessageSquare,
  Bot,
  User,
  Send,
  Sliders,
  Check
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ALL_HOSTING_PLANS, HostingPlan } from "@/data/hosting-plans";
import { formatINR } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  recommendedPlan?: HostingPlan;
  rationale?: string[];
  suggestedPrompts?: string[];
}

interface QuestionnaireState {
  websiteCount: "1" | "2-5" | "6-15" | "16+";
  isWordPress: "yes" | "no" | "unsure";
  expectedTraffic: "low" | "medium" | "high";
  needsNodePython: boolean;
  needsRootAccess: boolean;
  isReselling: boolean;
}

const DEFAULT_PROMPTS = [
  "Which hosting plan should I choose?",
  "Do I need shared hosting or VPS?",
  "Which plan is suitable for WordPress?",
  "How many resources might my application require?",
  "Should I use Cloudflare with my hosting?",
  "What is the difference between domain, DNS, hosting, and CDN?",
  "Which provider best fits my budget?",
  "What should I upgrade when my traffic grows?"
];

export default function PlanAdvisorPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "wizard">("chat");

  // ----------------------------------------------------
  // CHAT ADVISOR STATE & LOGIC
  // ----------------------------------------------------
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "advisor",
      text: "Hello! I am the ShrotiHost Technical Infrastructure Advisor. Ask me anything about hosting selection, resource requirements, DNS vs hosting architecture, or Cloudflare integration.",
      suggestedPrompts: [
        "Which hosting plan should I choose?",
        "Do I need shared hosting or VPS?",
        "Which plan is suitable for WordPress?",
        "Should I use Cloudflare with my hosting?"
      ]
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: promptText
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    // Simulate intelligent deterministic processing
    setTimeout(() => {
      const lower = promptText.toLowerCase();
      let replyText = "";
      let plan: HostingPlan | undefined;
      let rationale: string[] | undefined;
      let nextPrompts: string[] = [];

      if (lower.includes("wordpress") || lower.includes("woocommerce")) {
        plan = ALL_HOSTING_PLANS.find((p) => p.id === "wp-starter") || ALL_HOSTING_PLANS[0];
        replyText = "For WordPress websites, LiteSpeed Enterprise web server with LSCache is essential to eliminate PHP bottlenecks. Our Managed WordPress Starter plan (₹69/mo) provides automated core updates, WP-CLI, and server-level caching.";
        rationale = [
          "Pre-configured LiteSpeed Cache plugin delivers fast dynamic cache hits.",
          "Automated daily JetBackup keeps your database and media files secure.",
          "Same-price renewal at ₹69/mo with zero unexpected renewal spikes."
        ];
        nextPrompts = ["Do I need shared hosting or VPS?", "Should I use Cloudflare with my hosting?"];
      } else if (lower.includes("vps") || lower.includes("root") || lower.includes("shared hosting or vps")) {
        plan = ALL_HOSTING_PLANS.find((p) => p.id === "vps-spark");
        replyText = "Choose Shared Hosting if you want a zero-maintenance environment with cPanel, automated backups, and CloudLinux resource containment (ideal for 95% of standard websites). Choose a KVM VPS (from ₹499/mo) if you need full root SSH access, Docker containers, custom background daemons, or dedicated CPU/RAM allocations.";
        rationale = [
          "Shared hosting: zero sysadmin overhead, automated OS patches.",
          "KVM VPS: dedicated kernel isolation, root access, independent network port."
        ];
        nextPrompts = ["How many resources might my application require?", "What should I upgrade when my traffic grows?"];
      } else if (lower.includes("cloudflare") || lower.includes("cdn") || lower.includes("edge")) {
        replyText = "Yes, we strongly recommend combining Cloudflare with ShrotiHost! Cloudflare is an Anycast Edge Network and DNS provider that sits in front of your ShrotiHost LiteSpeed origin server. Cloudflare absorbs DDoS attacks and caches static assets globally, while ShrotiHost executes your dynamic PHP, MariaDB, and cPanel environment.";
        nextPrompts = ["What is the difference between domain, DNS, hosting, and CDN?", "Which hosting plan should I choose?"];
      } else if (lower.includes("difference") || lower.includes("domain, dns")) {
        replyText = "Here is the essential architectural distinction:\n• Domain: Your street address (e.g. yourbrand.in)\n• DNS: The GPS directory mapping your name to an IP address\n• Hosting: The physical server storage and compute where your website files and databases reside (ShrotiHost)\n• CDN: Regional courier nodes caching static images and assets close to visitors (Cloudflare).";
        nextPrompts = ["Which hosting plan should I choose?", "Which provider best fits my budget?"];
      } else if (lower.includes("budget") || lower.includes("price") || lower.includes("cost") || lower.includes("cheap")) {
        plan = ALL_HOSTING_PLANS.find((p) => p.id === "shared-launch");
        replyText = "Our Launch plan at ₹49/month delivers the industry's strongest price-to-performance ratio: 10 GB NVMe storage, LiteSpeed server, daily JetBackup, and our Same-Price Renewal Guarantee. Unlike competitors that quadruple rates after the first year, ShrotiHost renews at the identical ₹49/month rate.";
        rationale = [
          "Annual cost: ₹588 + GST with 0 renewal penalty.",
          "Includes 5 professional business email accounts and free SSL."
        ];
        nextPrompts = ["Which plan is suitable for WordPress?", "Do I need shared hosting or VPS?"];
      } else if (lower.includes("resource") || lower.includes("traffic") || lower.includes("ram")) {
        plan = ALL_HOSTING_PLANS.find((p) => p.id === "shared-grow");
        replyText = "Resource guidelines based on workload:\n• Under 15,000 monthly visits: 1 CPU (100%), 1.5 GB RAM (Launch - ₹49/mo)\n• 15,000 to 50,000 monthly visits: 1.5 CPU (150%), 2.0 GB RAM (Grow - ₹79/mo)\n• 50,000+ monthly visits or WooCommerce: 2 CPU (200%), 3.0 GB RAM (Turbo - ₹149/mo) or KVM VPS.";
        rationale = [
          "Grow plan (₹79/mo) supports up to 5 websites with 50 GB NVMe storage.",
          "Equipped with cPanel Application Manager for Node.js and Python."
        ];
        nextPrompts = ["What should I upgrade when my traffic grows?", "Do I need shared hosting or VPS?"];
      } else if (lower.includes("upgrade") || lower.includes("grow")) {
        replyText = "Upgrading is completely seamless. With CloudLinux LVE, your cPanel account can be scaled from Launch (₹49) to Grow (₹79) to Turbo (₹149) with zero downtime and no IP changes. If your workload outgrows shared hosting, our team assists with seamless migration to a dedicated KVM VPS.";
        nextPrompts = ["Do I need shared hosting or VPS?", "Which hosting plan should I choose?"];
      } else {
        plan = ALL_HOSTING_PLANS.find((p) => p.id === "shared-grow");
        replyText = "For most new websites, portfolios, and multi-site owners, our Grow plan (₹79/mo) is the sweet spot. It provides 5 hosted domains, 50 GB NVMe storage, LiteSpeed Enterprise acceleration, and cPanel App Manager for Node.js and Python.";
        rationale = [
          "5 websites on isolated 2 GB RAM pool.",
          "Same-price renewal at ₹79/mo guaranteed."
        ];
        nextPrompts = ["Which plan is suitable for WordPress?", "Do I need shared hosting or VPS?", "Should I use Cloudflare with my hosting?"];
      }

      const advisorMsg: ChatMessage = {
        id: `adv-${Date.now()}`,
        sender: "advisor",
        text: replyText,
        recommendedPlan: plan,
        rationale,
        suggestedPrompts: nextPrompts.length > 0 ? nextPrompts : DEFAULT_PROMPTS.slice(0, 4)
      };

      setChatMessages((prev) => [...prev, advisorMsg]);
      setIsTyping(false);
    }, 400);
  };

  // ----------------------------------------------------
  // GUIDED WIZARD STATE & LOGIC
  // ----------------------------------------------------
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
      primaryId = "vps-core";
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
        rationale.push("200% CloudLinux CPU allocation (2 cores) and 3 GB RAM give your Node.js and Python processes ample bursting power.");
        rationale.push("Includes full SSH terminal access.");
      }
    } else {
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
    setStep(5);
  };

  const resetWizard = () => {
    setStep(1);
    setRecommendation(null);
  };

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-8 sm:gap-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "Technical Hosting Advisor" }]} />

        <div className="text-center max-w-2xl mx-auto mb-6">
          <Badge variant="blue" size="sm" className="mb-3">
            Deterministic Decision Engine
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technical Hosting & Infrastructure Advisor
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Get instant technical recommendations based on verifiable server specifications, workload demands, and budget requirements.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 mt-6 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "chat"
                  ? "bg-white dark:bg-purple-900/60 text-purple-900 dark:text-white shadow-sm ring-1 ring-black/5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Bot className="h-4 w-4 text-purple-600" />
              <span>Conversational Chat Advisor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("wizard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "wizard"
                  ? "bg-white dark:bg-purple-900/60 text-purple-900 dark:text-white shadow-sm ring-1 ring-black/5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sliders className="h-4 w-4 text-purple-600" />
              <span>4-Step Guided Wizard</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: CONVERSATIONAL CHAT ADVISOR */}
        {/* ---------------------------------------------------- */}
        {activeTab === "chat" && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-[650px] animate-in fade-in-50 duration-200">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Infrastructure Knowledge Advisor
                  </h3>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Deterministic Rule Base &bull; Live &bull; Zero Hallucinations
                  </span>
                </div>
              </div>
              <Badge variant="neutral" size="sm">Rule-Based Demo</Badge>
            </div>

            {/* Architecture Disclosure Notice */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 text-center">
              Answers are generated by an indexed technical rules engine derived from ShrotiHost server specifications, not an ungrounded third-party neural network.
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "advisor" && (
                    <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 shrink-0 mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-3 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white rounded-tr-none shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-700/50"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Embedded Plan Recommendation Card */}
                    {msg.recommendedPlan && (
                      <div className="rounded-xl border border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/30 p-4 text-xs space-y-3 animate-in fade-in-50 duration-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            Recommended: {msg.recommendedPlan.name}
                          </span>
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                            {formatINR(msg.recommendedPlan.monthlyPrice)}/mo
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300">
                          {msg.recommendedPlan.description}
                        </p>

                        {msg.rationale && (
                          <div className="space-y-1 pt-2 border-t border-purple-200/50 dark:border-purple-800/50">
                            <span className="font-bold text-[11px] text-purple-900 dark:text-purple-300 uppercase tracking-wider block">
                              Technical Justification:
                            </span>
                            {msg.rationale.map((r, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                                <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{r}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Guaranteed Same-Price Renewal
                          </span>
                          <Button
                            href={msg.recommendedPlan.purchaseUrl}
                            isExternal
                            size="sm"
                            variant="primary"
                            className="h-8 text-xs"
                          >
                            <span>Configure Plan</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Quick Suggested Follow-Up Prompts */}
                    {msg.suggestedPrompts && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendPrompt(p)}
                            className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 text-slate-600 dark:text-slate-400 transition-colors"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-1">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-slate-400 text-xs italic pl-11">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" />
                  <span>Evaluating server workload parameters...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(userInput);
              }}
              className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about hosting plans, resource limits, Cloudflare, or VPS..."
                className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button type="submit" variant="primary" size="sm" className="h-10 px-4">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: 4-STEP GUIDED WIZARD */}
        {/* ---------------------------------------------------- */}
        {activeTab === "wizard" && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm animate-in fade-in-50 duration-200">
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

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    How many websites do you plan to host?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your expected total domain count across this hosting subscription.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "1", label: "Single Website (1)", desc: "A personal portfolio, blog, or single business domain" },
                    { id: "2-5", label: "2 to 5 Websites", desc: "A few side projects, test environments, or client sites" },
                    { id: "6-15", label: "6 to 15 Websites", desc: "Small agency portfolio or growing online network" },
                    { id: "16+", label: "16+ Websites / Unlimited", desc: "Large portfolio or multi-client hosting division" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, websiteCount: opt.id as any })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        answers.websiteCount === opt.id
                          ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 ring-1 ring-purple-600"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="font-bold text-sm block">{opt.label}</span>
                      <span className="text-xs text-slate-500 mt-0.5 block">{opt.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={() => setStep(2)} variant="primary" size="md">
                    <span>Continue to Application Stack</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    What application framework or CMS are you running?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    This determines caching mechanics, PHP execution modes, and CLI access requirements.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      Is this primarily a WordPress or WooCommerce website?
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "yes", label: "Yes (WordPress)" },
                        { id: "no", label: "No (HTML/PHP/Node)" },
                        { id: "unsure", label: "Not Sure Yet" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAnswers({ ...answers, isWordPress: opt.id as any })}
                          className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                            answers.isWordPress === opt.id
                              ? "border-purple-600 bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                              : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.needsNodePython}
                      onChange={(e) => setAnswers({ ...answers, needsNodePython: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                        Requires Node.js, Python, or Ruby App Manager
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Check this if deploying Next.js, Express, Django, Flask, or background worker scripts.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button onClick={() => setStep(1)} variant="outline" size="md">Back</Button>
                  <Button onClick={() => setStep(3)} variant="primary" size="md">
                    <span>Continue to Traffic Volume</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    What is your expected monthly visitor traffic?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    CloudLinux LVE allocates memory and entry processes to prevent throttling during spikes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "low", label: "Early Stage", desc: "Under 15,000 monthly visitors (1.5 GB RAM)" },
                    { id: "medium", label: "Growing Brand", desc: "15,000 to 50,000 monthly visitors (2-3 GB RAM)" },
                    { id: "high", label: "High Volume", desc: "50,000+ monthly visitors or high WooCommerce concurrency" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, expectedTraffic: opt.id as any })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        answers.expectedTraffic === opt.id
                          ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 ring-1 ring-purple-600"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="font-bold text-sm block">{opt.label}</span>
                      <span className="text-xs text-slate-500 mt-0.5 block">{opt.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <Button onClick={() => setStep(2)} variant="outline" size="md">Back</Button>
                  <Button onClick={() => setStep(4)} variant="primary" size="md">
                    <span>Continue to Control & Privileges</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Do you require root access or reseller account management?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select any specialized infrastructure privileges required for your organization.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.needsRootAccess}
                      onChange={(e) => setAnswers({ ...answers, needsRootAccess: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                        Requires Full Root SSH Access (Dedicated KVM Virtual Machine)
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Only available on VPS tiers; shared hosting does not permit root daemon modifications.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.isReselling}
                      onChange={(e) => setAnswers({ ...answers, isReselling: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                        Hosting Agency / Reseller (WHM Account Isolation)
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Requires WebHost Manager (WHM) to create separate cPanel logins for each end-client.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button onClick={() => setStep(3)} variant="outline" size="md">Back</Button>
                  <Button onClick={calculateRecommendation} variant="primary" size="md">
                    <span>Calculate Plan Recommendation</span>
                    <Sparkles className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && recommendation && (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
                  <Badge variant="green" size="sm" className="mb-2">Matching Complete</Badge>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Optimal Hosting Recommendation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Based on your workload inputs, here is the verified tier that balances performance, limits, and cost.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Recommendation */}
                  <div className="rounded-2xl border-2 border-purple-600 bg-purple-50/20 dark:bg-purple-950/30 p-6 flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="purple" size="sm">Primary Fit</Badge>
                        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                          Same-Price Renewal
                        </span>
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                        {recommendation.primary.name} Hosting
                      </h4>
                      <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 my-2 font-mono">
                        {formatINR(recommendation.primary.monthlyPrice)}
                        <span className="text-xs font-normal text-slate-500">/month</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                        {recommendation.primary.description}
                      </p>

                      <div className="space-y-2 mb-4 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white block">Why this plan matches:</span>
                        {recommendation.rationale.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      href={recommendation.primary.purchaseUrl}
                      isExternal
                      variant="primary"
                      size="md"
                      className="w-full mt-4"
                    >
                      <span>Proceed with {recommendation.primary.name}</span>
                      <ExternalLink className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>

                  {/* Alternative Tier */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="neutral" size="sm">Alternative Option</Badge>
                        <span className="text-xs text-slate-500">{recommendation.alternative.category}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {recommendation.alternative.name}
                      </h4>
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white my-2 font-mono">
                        {formatINR(recommendation.alternative.monthlyPrice)}
                        <span className="text-xs font-normal text-slate-500">/month</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">
                        {recommendation.alternative.tagline}
                      </p>
                    </div>

                    <Button
                      href={recommendation.alternative.purchaseUrl}
                      isExternal
                      variant="outline"
                      size="md"
                      className="w-full mt-4"
                    >
                      <span>Review Alternative</span>
                      <ExternalLink className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={resetWizard}
                    className="text-xs text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 font-semibold inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Start Over with Different Answers</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

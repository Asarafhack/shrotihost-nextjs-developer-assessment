"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Globe,
  ShieldCheck,
  Check,
  Info,
  ExternalLink,
  ArrowRight,
  Filter,
  Lock,
  RefreshCw
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { DOMAIN_TLDS, TldCategory, simulateDomainCheck, SimulatedDomainResult } from "@/data/domain-pricing";
import { getFaqsByCategory } from "@/data/faqs";
import { formatINR, cn } from "@/lib/utils";

export default function DomainsPage() {
  const [selectedCategory, setSelectedCategory] = useState<TldCategory>("all");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SimulatedDomainResult[]>([]);

  const filteredTlds = selectedCategory === "all"
    ? DOMAIN_TLDS
    : DOMAIN_TLDS.filter((t) => t.category.includes(selectedCategory));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const apiRes = await fetch(`/api/domains/check?domain=${encodeURIComponent(query)}`);
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.success) {
          const sim = simulateDomainCheck(query);
          setResults(sim);
          setHasSearched(true);
          setIsSearching(false);
          return;
        }
      }
    } catch {
      // Graceful fallback to client simulator
    }
    const res = simulateDomainCheck(query);
    setResults(res);
    setHasSearched(true);
    setIsSearching(false);
  };

  const domainFaqs = getFaqsByCategory("domains").map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "Domains & Discovery" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Globe className="h-3.5 w-3.5 text-purple-600" />
              <span>Transparent Domain Registration & Renewal Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Search and Register Your Domain Identity
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Clear upfront pricing with no hidden renewal multipliers. Every domain includes free DNS management and WHOIS privacy protection.
            </p>

            {/* Main Interactive Search Input */}
            <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your target domain name..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="h-12 px-6">
                <span>Check Domain</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <p className="mt-3 text-[11px] text-slate-400">
                Notice: Client-side demonstration simulator. Real-time registry availability &amp; registration occurs via the official portal at <strong>portal.shrotihost.in</strong>.
              </p>
            </form>
          </div>
        </Container>
      </section>

      {/* Interactive Search Results Section (if searched) */}
      {hasSearched && (
        <section>
          <Container size="narrow">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Results for &ldquo;{query}&rdquo;
                  </h3>
                  <p className="text-xs text-slate-500">
                    Showing extension pricing for registration and renewal.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                  <Info className="h-3.5 w-3.5" />
                  <span>DEMO MODE: Simulated Availability</span>
                </div>
              </div>

              <div className="space-y-3">
                {results.map((res) => (
                  <div
                    key={res.fullDomain}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900 dark:text-slate-100 font-mono">
                          {res.fullDomain}
                        </span>
                        {res.available ? (
                          <Badge variant="green" size="sm">Available in Demo</Badge>
                        ) : (
                          <Badge variant="neutral" size="sm">Unavailable</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span>Registration: <strong className="text-slate-700 dark:text-slate-300">{formatINR(res.registrationPrice)}</strong>/yr</span>
                        <span>Renewal: <strong className="text-slate-700 dark:text-slate-300">{formatINR(res.renewalPrice)}</strong>/yr</span>
                      </div>
                    </div>

                    <div>
                      <a
                        href={res.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm"
                      >
                        <span>Continue to Official Portal</span>
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* TLD Pricing Table & Category Filters */}
      <section>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                Transparent Pricing
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Top Domain Extensions
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-3 py-1.5 font-medium rounded-lg transition-colors",
                  selectedCategory === "all" ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-600 dark:text-slate-400"
                )}
              >
                All Extensions
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("popular")}
                className={cn(
                  "px-3 py-1.5 font-medium rounded-lg transition-colors",
                  selectedCategory === "popular" ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-600 dark:text-slate-400"
                )}
              >
                Popular
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("business")}
                className={cn(
                  "px-3 py-1.5 font-medium rounded-lg transition-colors",
                  selectedCategory === "business" ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-600 dark:text-slate-400"
                )}
              >
                Business
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("tech")}
                className={cn(
                  "px-3 py-1.5 font-medium rounded-lg transition-colors",
                  selectedCategory === "tech" ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-600 dark:text-slate-400"
                )}
              >
                Tech & Dev
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-slate-100">
                  <th className="p-4">Extension</th>
                  <th className="p-4">1-Year Registration</th>
                  <th className="p-4">Annual Renewal</th>
                  <th className="p-4">Transfer Fee</th>
                  <th className="p-4">Grace Period</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {filteredTlds.map((tld) => (
                  <tr key={tld.extension} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100 font-mono text-base">
                      {tld.extension}
                    </td>
                    <td className="p-4 font-semibold text-purple-600 dark:text-purple-400">
                      {formatINR(tld.registrationPrice)}
                    </td>
                    <td className="p-4 font-medium">
                      {formatINR(tld.renewalPrice)}
                      {tld.hasSamePriceRenewal && (
                        <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Same-Price Renewal
                        </span>
                      )}
                    </td>
                    <td className="p-4">{formatINR(tld.transferPrice)}</td>
                    <td className="p-4">
                      {tld.gracePeriodDays} days ({formatINR(tld.gracePeriodFee)} fee)
                    </td>
                    <td className="p-4">
                      <a
                        href={`https://portal.shrotihost.in/cart.php?a=add&domain=register&tld=${tld.extension.replace(".", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-xs text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <span>Register</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Included Free with Every Domain */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <SectionHeading
            eyebrow="Zero Hidden Addons"
            title="Included with Every Domain Registration"
            subtitle="Other registrars charge extra at checkout for privacy and DNS controls. We bundle them free of charge."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Free WHOIS Privacy Protection
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Masks your personal phone number, home address, and personal email address from public ICANN registries to prevent spam and identity harvesting.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit mb-4">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Complete DNS Record Management
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Configure A, AAAA, CNAME, MX, TXT, and SRV records instantly without requiring an active hosting plan. Full support for custom email routing.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Domain Theft Protection (EPP Lock)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Registrar-lock ensures your domain cannot be transferred away without your two-factor verified authorization code (EPP key).
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Domain FAQs */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Domain FAQs"
            title="Questions About Domains & Transfers"
            subtitle="Details on redemption periods, domain locks, and ICANN policies."
          />
          <Accordion items={domainFaqs} />
        </Container>
      </section>
    </div>
  );
}

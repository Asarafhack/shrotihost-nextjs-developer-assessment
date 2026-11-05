"use client";

import React, { useState } from "react";
import { Search, ExternalLink, ShieldCheck, ArrowRight, Info } from "lucide-react";
import { DOMAIN_TLDS, simulateDomainCheck, SimulatedDomainResult } from "@/data/domain-pricing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";

export function HomeDomainSearch() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<SimulatedDomainResult[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = simulateDomainCheck(query);
    setResults(res.slice(0, 4)); // Show top 4 results on homepage
    setSearched(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="blue" size="sm">Domain Discovery</Badge>
          <span className="text-xs text-slate-500 font-mono">Real TLD Pricing</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Find Your Perfect Domain Identity
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Transparent renewal pricing upfront. No hidden price jumps on year two.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your ideal domain name (e.g. yourbrand)..."
            aria-label="Domain search query"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />
        </div>
        <Button type="submit" variant="primary" size="md" className="h-11 px-6">
          <span>Check Availability</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </form>

      {/* Popular TLD Pricing Strip */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
        {DOMAIN_TLDS.filter((t) => t.popular)
          .slice(0, 5)
          .map((tld) => (
            <div
              key={tld.extension}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
            >
              <span className="font-bold text-slate-900 dark:text-slate-100">{tld.extension}</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {formatINR(tld.registrationPrice)}/yr
              </span>
              <span className="text-[10px] text-slate-400">
                (Renews {formatINR(tld.renewalPrice)})
              </span>
            </div>
          ))}
      </div>

      {/* Simulated Search Results */}
      {searched && results.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Results for &ldquo;{query}&rdquo;
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              <Info className="h-3 w-3" />
              DEMO MODE: Simulated preview
            </span>
          </div>

          <div className="space-y-2">
            {results.map((res) => (
              <div
                key={res.fullDomain}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {res.fullDomain}
                    </span>
                    {res.available ? (
                      <Badge variant="green" size="sm">Available</Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">Unavailable</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Registration: {formatINR(res.registrationPrice)} &bull; Renewal: {formatINR(res.renewalPrice)}/yr
                  </p>
                </div>

                <a
                  href={res.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  <span>Register on Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button href="/domains" variant="link" size="sm" className="text-xs">
              View all 20+ supported extensions & pricing table &rarr;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

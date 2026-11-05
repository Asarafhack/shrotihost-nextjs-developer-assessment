import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, MessageSquare, ExternalLink, Server, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { MAIN_NAVIGATION, COMPANY_DETAILS } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 text-sm">
      {/* Trust & Transparency Banner */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 py-8 bg-white dark:bg-slate-900/40">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Same-Price Renewal Pledge
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  No sudden 300% renewal markups. Your renewal rate matches introductory pricing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  7-Day Refund Guarantee
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Full refund on eligible Shared and Reseller tiers within 7 days. Terms apply.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Pure NVMe + LiteSpeed
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  High IOPS PCIe Gen4 storage paired with event-driven LiteSpeed server caching.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Direct Engineer Support
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  WhatsApp and ticket support directly handled by systems engineers, no phone trees.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Col 1 & 2: Brand & Corporate */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-sm">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Shroti<span className="text-purple-600 dark:text-purple-400">Host</span>
                </span>
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4 leading-relaxed">
                India-based web hosting infrastructure and bespoke software engineering. Serving developers, agencies, startups, and growing enterprises worldwide.
              </p>
              <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="purple" size="sm">Govt. MSME</Badge>
                  <span>{COMPANY_DETAILS.udyamRegistration}</span>
                </div>
                <p className="text-slate-500">{COMPANY_DETAILS.legalEntity} • Founded {COMPANY_DETAILS.foundingYear}</p>
                <p className="text-slate-500">{COMPANY_DETAILS.headquarters}</p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={`mailto:${COMPANY_DETAILS.supportEmail}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{COMPANY_DETAILS.supportEmail}</span>
                </a>
              </div>
            </div>

            {/* Col 3: Hosting Products */}
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider mb-3">
                Hosting
              </p>
              <ul className="space-y-2 text-xs">
                {MAIN_NAVIGATION.hosting.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Domains & Tools */}
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider mb-3">
                Domains & Tools
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/domains" className="hover:text-purple-600 dark:hover:text-purple-400">
                    Domain Search
                  </Link>
                </li>
                {MAIN_NAVIGATION.tools.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Services & Company */}
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider mb-3">
                Services
              </p>
              <ul className="space-y-2 text-xs">
                {MAIN_NAVIGATION.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400">
                    About Company
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-purple-600 dark:hover:text-purple-400">
                    Technical Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400">
                    Contact & Routing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 6: Legal & Portal */}
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider mb-3">
                Legal & Access
              </p>
              <ul className="space-y-2 text-xs">
                {MAIN_NAVIGATION.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-3">
                  <a
                    href={COMPANY_DETAILS.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <span>Client Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal & Regulatory Disclaimer */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="leading-relaxed text-center md:text-left">
              &copy; 2026 Shroti Enterprises. All rights reserved. &bull; Uptime is communicated as an operational 99.9% target. Unmetered resources are governed by fair-use terms.
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Network Systems Operational
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

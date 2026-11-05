import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { COMPANY_DETAILS } from "@/data/navigation";

export const metadata = {
  title: "Refund & Cancellation Policy | 7-Day Guarantee | Shroti Host",
  description:
    "Shroti Host 7-day money-back guarantee terms, eligible hosting plans, non-refundable domain and VPS exclusions, and refund disbursement timelines.",
};

export default function RefundPolicyPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Legal & Trust", href: "/legal/terms" }, { label: "Refund Policy" }]} />

        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Badge variant="purple" size="sm" className="mb-3">
            Customer Assurance
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Policy Window: 7 Calendar Days (168 Hours) &bull; Verified: November 2026
          </p>
        </div>

        {/* Overview Box */}
        <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-purple-600 dark:text-purple-300 font-semibold">
                Transparent 7-Day Money-Back Guarantee:
              </strong>{" "}
              We believe in our high-speed LiteSpeed NVMe architecture. If our hosting does not meet your expectations within your first 7 calendar days of sign-up, we will refund 100% of your hosting fee without arbitrary penalties.
            </div>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. Eligible Hosting Services
            </h2>
            <p className="mb-3">
              The 7-day refund guarantee applies exclusively to first-time purchases of the following recurring hosting subscriptions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>NVMe Shared Hosting:</strong> Launch, Grow, Turbo, Infinity tiers</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Managed WordPress Hosting:</strong> Starter, Business, Performance, Ultimate</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Multi-Site Unlimited:</strong> Single, Dual, Unlimited hosting</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Reseller &amp; Master Reseller:</strong> Base subscription hosting tiers</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Non-Refundable Items &amp; Exclusions
            </h2>
            <p className="mb-3">
              Due to immediate upstream non-reversible registry and compute provisioning costs, the following products and services are strictly non-refundable:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Domain Registrations &amp; Transfers:</strong> Once registered with the registry (.com, .in, etc.), registry fees are irreversibly committed.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong>KVM VPS Compute Instances:</strong> Dedicated IPv4 allocations and hardware slice setups incur upfront operational costs.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Custom Development Milestone Fees:</strong> Web, App, and E-commerce project retainer and development stage payments.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong>SSL &amp; Third-party Software Licenses:</strong> cPanel, LiteSpeed, or dedicated IP add-on licenses.</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              3. Refund Request Submission &amp; Timeline
            </h2>
            <p>
              To request a refund under the 7-day guarantee, log in to <code>portal.shrotihost.in</code>, navigate to <em>Services &rarr; My Services &rarr; Request Cancellation</em>, and select &ldquo;Immediate Cancellation&rdquo;. State your reason for cancellation and request the refund.
            </p>
            <p className="mt-2">
              Refunds are processed within <strong>24 to 48 hours</strong> of verification. Funds returned to your original payment method (UPI, Net Banking, or Debit/Credit card) reflect within <strong>5 to 7 banking days</strong> depending on your issuing bank. Alternatively, you may choose immediate store credit with zero processing latency.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              4. Forfeiture of Refund Rights
            </h2>
            <p>
              Accounts suspended or terminated due to violations of our Acceptable Use Policy (including mass unsolicited email/spam, hosting phishing portals, cryptocurrency mining, or botnet command-and-control operations) immediately forfeit all refund rights without exception.
            </p>
          </section>
        </div>

        {/* Quick Legal Switcher */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">Related Legal Policies:</span>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
              Terms of Service &rarr;
            </Link>
            <Link href="/legal/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
              Privacy Policy &rarr;
            </Link>
            <Link href="/legal/aup" className="text-purple-600 dark:text-purple-400 hover:underline">
              Acceptable Use Policy &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

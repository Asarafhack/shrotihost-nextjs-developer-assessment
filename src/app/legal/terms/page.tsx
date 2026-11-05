import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowRight, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_DETAILS } from "@/data/navigation";

export default function TermsOfServicePage() {
  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Legal & Trust", href: "/legal/terms" }, { label: "Terms of Service" }]} />

        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Badge variant="purple" size="sm" className="mb-3">
            Legal Agreement
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Last Updated & Verified: November 2026 &bull; Governing Jurisdiction: Uttar Pradesh, India
          </p>
        </div>

        {/* Legal Text Hierarchy */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. Commercial Relationship & Scope
            </h2>
            <p>
              These Terms of Service (&ldquo;Agreement&rdquo;) constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;User&rdquo;) and <strong>{COMPANY_DETAILS.legalEntity}</strong> (trading as <strong>{COMPANY_DETAILS.brandName}</strong>, MSME Registration: {COMPANY_DETAILS.udyamRegistration}). By provisioning, purchasing, or utilizing web hosting, domains, VPS infrastructure, or custom engineering services via <code>portal.shrotihost.in</code>, you agree to be bound by these provisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Account Responsibilities & Credential Security
            </h2>
            <p>
              Customers are solely responsible for maintaining the confidentiality of their client portal, cPanel, WHM, and root SSH credentials. You must provide accurate, verifiable registration details including your legal name, billing address, and contact information. Shroti Host reserves the right to suspend accounts displaying falsified identification.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              3. Same-Price Renewal Guarantee
            </h2>
            <p>
              Shroti Host guarantees that recurring baseline subscription fees for eligible Shared Hosting, Managed WordPress Hosting, and Reseller Hosting tiers will renew at introductory published baseline rates, preventing unfair industry renewal inflation. Any changes to commercial renewal rates will be notified at least 30 calendar days in advance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              4. Fair-Use Policy & Resource Limits
            </h2>
            <p>
              Where accounts advertise &ldquo;unmetered&rdquo; storage or monthly transfer, resources are intended for active production website content only. Accounts are governed by CloudLinux LVE thresholds (CPU, RAM, Inodes, and concurrent entry processes). Storage of large offline backups, media streaming repositories, or file distribution mirrors is strictly prohibited on shared hosting.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              5. Service Level Target & Maintenance
            </h2>
            <p>
              Shroti Host operates with a <strong>99.9% network and infrastructure availability target</strong>. Scheduled maintenance windows are communicated ahead of execution. Operational uptime is monitored continually; however, uptime targets represent operational standards and do not constitute financial penalty credit contracts unless explicitly negotiated under enterprise SLAs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              6. Governing Law & Dispute Resolution
            </h2>
            <p>
              This Agreement shall be interpreted and governed by the laws of India. Any legal dispute, arbitration, or proceeding arising under this Agreement shall fall under the exclusive jurisdiction of the competent courts in Hathras, Uttar Pradesh, India.
            </p>
          </section>
        </div>

        {/* Quick Legal Switcher */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">Related Legal Policies:</span>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
              Privacy Policy &rarr;
            </Link>
            <Link href="/legal/refund" className="text-purple-600 dark:text-purple-400 hover:underline">
              7-Day Refund Terms &rarr;
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

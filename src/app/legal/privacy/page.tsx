import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_DETAILS } from "@/data/navigation";

export const metadata = {
  title: "Privacy Policy | DPDP Act 2023 Compliance | Shroti Host",
  description:
    "Shroti Host privacy policy detailing personal data processing, DPDP Act 2023 compliance, server log retention, and grievance officer contact details.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Legal & Trust", href: "/legal/terms" }, { label: "Privacy Policy" }]} />

        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Badge variant="purple" size="sm" className="mb-3">
            DPDP Act 2023 Compliant
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Effective Date: November 2026 &bull; Data Fiduciary: {COMPANY_DETAILS.legalEntity}
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. Regulatory Framework & Commitment
            </h2>
            <p>
              This Privacy Policy explains how <strong>{COMPANY_DETAILS.legalEntity}</strong> (&ldquo;{COMPANY_DETAILS.brandName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) processes, stores, and protects personal data in compliance with India&rsquo;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>Information Technology Act, 2000</strong> along with associated rules. We treat personal data strictly as a Data Fiduciary under statutory mandates.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Categories of Information Collected
            </h2>
            <p className="mb-2">We collect only information necessary to deliver, bill, and protect our infrastructure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong>Identity & Billing Data:</strong> Full legal name, billing address, business name (if applicable), email address, and phone number required for account setup, GST invoicing, and communications.
              </li>
              <li>
                <strong>Domain Registration Records:</strong> Registrant, technical, and administrative contact details required by registry operators (.IN Registry/NIXI and ICANN-accredited registries).
              </li>
              <li>
                <strong>Technical & Diagnostic Data:</strong> IP addresses, HTTP request headers, browser type, and timestamps collected via LiteSpeed/cPanel access logs for cybersecurity, DDoS mitigation, and intrusion prevention.
              </li>
              <li>
                <strong>Payment Metadata:</strong> Transaction reference IDs and payment status returned by certified payment aggregators. Shroti Host never stores raw debit/credit card numbers or CVV codes on our servers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              3. Purpose of Processing & Legal Basis
            </h2>
            <p className="mb-2">Personal data is processed exclusively for legitimate commercial purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Provisioning and maintaining web hosting accounts, virtual private servers, and cPanel/WHM environments.</li>
              <li>Processing official domain registrations, renewals, and WHOIS/RDAP directory compliance.</li>
              <li>Generating statutory tax invoices complying with Indian GST and MSME accounting regulations.</li>
              <li>Detecting, preventing, and mitigating security threats, spamming, brute-force attacks, and network abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              4. Data Retention & Backups
            </h2>
            <p>
              Account data is retained for the active duration of your hosting service. Following service cancellation or termination, hosting file data is purged after 14 calendar days. Billing records and statutory invoices are archived for up to 8 years in accordance with Indian tax laws. Automated JetBackup offsite backups are rotated cyclically and encrypted at rest using industry-standard AES-256 encryption.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              5. Data Principal Rights
            </h2>
            <p>
              Under the DPDP Act 2023, you have the right to request access to the personal data we hold about you, request rectification of inaccurate records, and request erasure of your personal data upon closure of your account (subject to statutory legal hold obligations). Requests can be submitted directly via the client support desk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              6. Grievance Redressal & Officer Details
            </h2>
            <p className="mb-3">
              In accordance with Rule 5(9) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the contact details of the Grievance Officer are provided below:
            </p>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Grievance Officer: {COMPANY_DETAILS.founder}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Entity: {COMPANY_DETAILS.legalEntity}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Location: {COMPANY_DETAILS.headquarters}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Email: <a href={`mailto:${COMPANY_DETAILS.supportEmail}`} className="text-purple-600 dark:text-purple-400 underline">{COMPANY_DETAILS.supportEmail}</a>
              </p>
              <p className="text-xs text-slate-500 mt-2">Response turnaround: Within 48 business hours.</p>
            </div>
          </section>
        </div>

        {/* Quick Legal Switcher */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">Related Legal Policies:</span>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
              Terms of Service &rarr;
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

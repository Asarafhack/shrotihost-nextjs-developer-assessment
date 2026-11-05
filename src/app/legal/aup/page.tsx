import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, AlertTriangle, FileWarning, Mail } from "lucide-react";
import { COMPANY_DETAILS } from "@/data/navigation";

export const metadata = {
  title: "Acceptable Use Policy (AUP) | Shroti Host",
  description:
    "Shroti Host Acceptable Use Policy governing prohibited activities, network security, spam zero-tolerance, abuse reporting, and CERT-In cooperation.",
};

export default function AcceptableUsePolicyPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Legal & Trust", href: "/legal/terms" }, { label: "Acceptable Use Policy" }]} />

        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Badge variant="purple" size="sm" className="mb-3">
            Network Integrity Policy
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Acceptable Use Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Applies to All Shared, Reseller, and VPS Services &bull; Verified: November 2026
          </p>
        </div>

        {/* Warning Callout */}
        <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <strong className="text-amber-700 dark:text-amber-300 font-semibold">Zero-Tolerance Infrastructure Rules:</strong>{" "}
            Shroti Host operates shared LiteSpeed and dedicated KVM nodes. Any customer activity that compromises server IP reputation, degrades shared neighbor performance, or violates statutory Indian cybersecurity laws results in immediate quarantine or termination.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. Unsolicited Commercial Email (SPAM)
            </h2>
            <p>
              We maintain a strict zero-tolerance policy regarding unsolicited email communications. The transmission of mass unsolicited commercial emails (UCE), newsletters without double opt-in verification, purchased marketing lists, or running open mail relays from any Shroti Host server is strictly forbidden. Outbound email on shared accounts is rate-limited to 100 emails per domain per hour to protect server IP sender reputation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Malicious Content &amp; Fraud
            </h2>
            <p className="mb-2">The following content categories are prohibited across all hosting tiers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Phishing portals, fake banking websites, identity theft traps, and spoofed login pages.</li>
              <li>Hosting, distributing, or executing ransomware, trojans, worms, keyloggers, or malicious payloads.</li>
              <li>Unauthorized distribution of copyright-protected software, media torrent trackers, or warez portals.</li>
              <li>Defamatory, threatening, fraudulent, or legally prohibited content under the laws of India.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              3. System &amp; Network Integrity
            </h2>
            <p className="mb-2">Users must not perform activities that compromise server stability or neighboring tenants:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Initiating or facilitating Distributed Denial of Service (DDoS), IP address spoofing, or packet flooding attacks.</li>
              <li>Port scanning, vulnerability testing, or brute-forcing authentication without written authorization.</li>
              <li>Cryptocurrency mining (e.g. Monero, Bitcoin) using shared CPU or VPS hypervisor cores.</li>
              <li>Running perpetual non-web background processes or IRC bots on shared hosting environments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              4. Enforcement, Suspension &amp; CERT-In Cooperation
            </h2>
            <p>
              Shroti Host actively scans files using automated server-side anti-malware signatures. If malicious files are detected, the infected paths are automatically quarantined. Where deliberate malicious conduct or severe network abuse is confirmed, the account is terminated without refund.
            </p>
            <p className="mt-2">
              In compliance with Indian Computer Emergency Response Team (CERT-In) guidelines and relevant cyber laws, Shroti Host cooperates fully with recognized regulatory bodies and law enforcement agencies when legally required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              5. Abuse Reporting Procedure
            </h2>
            <p className="mb-3">
              To report abuse originating from our IP ranges or domains hosted on our infrastructure:
            </p>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
              <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Abuse Contact Desk</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Email: <a href={`mailto:${COMPANY_DETAILS.supportEmail}`} className="text-purple-600 dark:text-purple-400 underline">{COMPANY_DETAILS.supportEmail}</a>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Please provide the destination URL, original unedited email headers (for spam complaints), log timestamps in UTC or IST, and a detailed incident summary. Abuse reports are acknowledged within 24 hours.
                </p>
              </div>
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
            <Link href="/legal/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
              Privacy Policy &rarr;
            </Link>
            <Link href="/legal/refund" className="text-purple-600 dark:text-purple-400 hover:underline">
              7-Day Refund Terms &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

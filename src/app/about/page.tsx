import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Building,
  Award,
  ArrowRight,
  Server,
  Zap,
  Lock,
  Mail,
  MapPin,
  ExternalLink
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { COMPANY_DETAILS } from "@/data/navigation";

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
      {/* Hero Header */}
      <section className="relative">
        <Container>
          <Breadcrumbs items={[{ label: "About Us" }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Badge variant="purple" size="sm">Govt. MSME Registered</Badge>
              <span>UDYAM-UP-36-0017127</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Honest Hosting & Engineering for the Modern Web
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Founded in 2023 in Uttar Pradesh, Shroti Host was established with a clear mission: eliminate the deceptive 300% renewal markups of the legacy web hosting industry while delivering enterprise LiteSpeed and NVMe speed.
            </p>
          </div>
        </Container>
      </section>

      {/* Corporate Identity & Regulatory Standing */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">
                  Official Entity Background
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  Shroti Enterprises (MSME Registered)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                  <span>
                    Shroti Host operates as a specialized technology division of <strong>{COMPANY_DETAILS.legalEntity}</strong>, founded by <strong>{COMPANY_DETAILS.founder}</strong> in 2023. Headquartered in Hathras, Uttar Pradesh, we are registered under the Government of India&apos;s Ministry of Micro, Small & Medium Enterprises.
                  </span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 font-mono text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Udyam Reg:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{COMPANY_DETAILS.udyamRegistration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jurisdiction:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{COMPANY_DETAILS.headquarters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Model:</span>
                  <span className="font-bold text-emerald-600">Active & Bootstrapped</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
                  Our Engineering Charter
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  Why We Built Shroti Host
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Same-Price Renewals:</strong> What you pay on day one is what you pay when your subscription renews. We reject deceptive introductory trap pricing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Pure NVMe Hardware:</strong> We run on enterprise PCIe Gen4 drives, never legacy mechanical hard drives or throttled SATA buses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Human Engineer Support:</strong> Direct communication through WhatsApp and ticketing systems, not outsourced L1 chatbots.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button href="/hosting" variant="outline" size="sm" className="w-full">
                  Explore Hosting Products &rarr;
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Infrastructure Standards */}
      <section>
        <Container>
          <SectionHeading
            eyebrow="Technical Standards"
            title="The Hardware We Stand On"
            subtitle="Real specifications powering our production hosting clusters."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <Server className="h-6 w-6 text-purple-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">LiteSpeed Web Server</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Asynchronous event-driven web server capable of handling massive concurrency with low CPU footprint.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <Zap className="h-6 w-6 text-purple-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Enterprise NVMe SSD</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                PCIe Gen4 solid state drives delivering up to 3,500 MB/s sequential read throughput and 550k IOPS.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-purple-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">CloudLinux CageFS</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Per-tenant Lightweight Virtual Environment (LVE) isolation ensuring zero neighbor interference.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <Lock className="h-6 w-6 text-purple-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">JetBackup Automation</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Automated daily offsite backups with granular file, database, and email restoration controls.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Direct Contact Routes */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-t border-slate-200/80 dark:border-slate-800/80">
        <Container size="narrow" className="text-center">
          <Badge variant="purple" size="sm" className="mb-3">
            Open Channels
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Have Questions for Our Leadership?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Reach out directly for partnership inquiries, migration planning, or custom software proposals.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/contact" variant="primary" size="md">
              <Mail className="h-4 w-4 mr-1.5" />
              <span>Contact Department Routing</span>
            </Button>
            <Button href={COMPANY_DETAILS.portalUrl} isExternal variant="outline" size="md">
              <span>Client Portal Desk</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

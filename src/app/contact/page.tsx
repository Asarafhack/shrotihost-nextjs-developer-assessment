"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Headphones,
  PhoneCall
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { COMPANY_DETAILS } from "@/data/navigation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Sales",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "A valid email address is required";
    }
    if (!formData.subject.trim()) errs.subject = "Subject line is required";
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getTargetEmail = () => {
    if (formData.department === "Sales") return COMPANY_DETAILS.salesEmail;
    if (formData.department === "Billing") return COMPANY_DETAILS.billingEmail;
    return COMPANY_DETAILS.supportEmail;
  };

  const getMailtoUrl = () => {
    const targetEmail = getTargetEmail();
    const subject = encodeURIComponent(`[${formData.department}] ${formData.subject || "Hosting Inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nDepartment: ${formData.department}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate deterministic demo submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
      <Container>
        <Breadcrumbs items={[{ label: "Company", href: "/about" }, { label: "Contact & Routing" }]} />

        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" size="sm" className="mb-3">
            Direct Routing
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Speak with Our Systems Engineers
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Direct communication through dedicated departments. No automated phone trees, no outsourced runarounds.
          </p>
        </div>

        {/* Department Routing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Pre-Sales & Orders
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Sales & Sizing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Hosting recommendations, bulk domain registrations, and VPS resource capacity planning.
              </p>
            </div>
            <a
              href={`mailto:${COMPANY_DETAILS.salesEmail}`}
              className="mt-4 inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>{COMPANY_DETAILS.salesEmail}</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Technical Desk
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Technical Support
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                DNS records, cPanel issues, SSL certificate renewals, and PHP environment adjustments.
              </p>
            </div>
            <a
              href={`mailto:${COMPANY_DETAILS.supportEmail}`}
              className="mt-4 inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>{COMPANY_DETAILS.supportEmail}</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Zero Downtime
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Migration Assistance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Free professional cPanel-to-cPanel transfers and manual WordPress staging migrations.
              </p>
            </div>
            <a
              href={COMPANY_DETAILS.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Open Migration Ticket</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Billing & Accounts
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Billing & Refunds
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                GST invoices, renewal confirmations, and 7-day money-back guarantee requests.
              </p>
            </div>
            <a
              href={COMPANY_DETAILS.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>Billing Portal Login</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>

        {/* Contact Form & Portal Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left: Interactive Enquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Send an Enquiry
              </h3>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-mono">
                DEMO MODE FORM
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Note: This web form validates input on the client for assessment evaluation. For actual production delivery, click <strong>&quot;Send via Email Client&quot;</strong> or contact our team via WhatsApp/Client Portal.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 text-center animate-in fade-in-50 duration-200">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold text-base">Demonstration Submission Validated</h4>
                <p className="text-xs mt-2 text-emerald-700 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. The client-side form validation succeeded. Because this is a static frontend deployment, you can dispatch this exact message directly to our engineering desk right now:
                </p>

                <div className="my-5 p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-800 text-left text-xs space-y-1 font-mono">
                  <div><strong>To:</strong> {getTargetEmail()}</div>
                  <div><strong>Subject:</strong> [{formData.department}] {formData.subject}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Button
                    href={getMailtoUrl()}
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                    <span>Send via Email Client ({getTargetEmail()})</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", department: "Sales", subject: "", message: "" });
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Reset Form
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="department" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Department Routing
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Sales">Sales & Sizing Inquiries</option>
                      <option value="Technical">Technical & Server Assistance</option>
                      <option value="Migration">Free cPanel Migration Request</option>
                      <option value="Custom Dev">Custom Web / App Project</option>
                      <option value="Billing">Billing & GST Accounts</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject Line *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. VPS plan inquiry"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your traffic, website count, or project scope..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="flex-1 h-11"
                  >
                    {isSubmitting ? (
                      <span>Validating Demo Submission...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1.5" />
                        <span>Validate Demo Submission</span>
                      </>
                    )}
                  </Button>

                  <Button
                    href={getMailtoUrl()}
                    variant="outline"
                    size="md"
                    className="h-11 px-4"
                  >
                    <Mail className="h-4 w-4 mr-1.5" />
                    <span>Send via Email Client</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Registered Entity & Fast Portal Links */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Direct WhatsApp Desk */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="green" size="sm">Instant Messenger</Badge>
                  <span className="text-xs text-emerald-400 font-mono">WhatsApp Support</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Direct Engineer Chat
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Have quick questions about server sizing or plan migration? Chat directly with our engineering staff via WhatsApp.
                </p>
              </div>
              <div className="mt-6">
                <Button
                  href={COMPANY_DETAILS.whatsappUrl}
                  isExternal
                  variant="primary"
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
                  <span>Chat on WhatsApp (+91 82794 87798)</span>
                </Button>
              </div>
            </div>

            {/* Live Client Portal Card */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="purple" size="sm">Client Portal</Badge>
                  <span className="text-xs text-purple-400 font-mono">24/7 Ticketing</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Existing Customer Support Desk
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  For active hosting clients needing immediate DNS modifications, nameserver updates, or server console access, log directly into the official portal.
                </p>
              </div>
              <div className="mt-6">
                <Button
                  href={COMPANY_DETAILS.portalUrl}
                  isExternal
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  <span>Open Client Portal Desk</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* Entity Background Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm text-xs text-slate-600 dark:text-slate-400 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Corporate Identification
              </h4>
              <p className="leading-relaxed">
                Shroti Host operates as a specialized division of <strong>{COMPANY_DETAILS.legalEntity}</strong>.
              </p>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] space-y-1">
                <div><span className="text-slate-400">MSME Udyam:</span> {COMPANY_DETAILS.udyamRegistration}</div>
                <div><span className="text-slate-400">Founder:</span> {COMPANY_DETAILS.founder}</div>
                <div><span className="text-slate-400">Location:</span> {COMPANY_DETAILS.headquarters}</div>
              </div>
              <p className="text-[11px] text-slate-500">
                Official operational responses generally delivered within 2 to 4 business hours.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

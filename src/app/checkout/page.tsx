"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  CreditCard,
  QrCode,
  Building,
  Info
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SHARED_HOSTING_PLANS, HostingPlan } from "@/data/hosting-plans";
import { formatINR } from "@/lib/utils";

export default function DemoCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan>(SHARED_HOSTING_PLANS[1]); // Default to Grow
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isCompleted, setIsCompleted] = useState(false);

  // Calculate pricing & GST
  const baseRate = billingCycle === "annual" ? selectedPlan.annualPrice * 12 : selectedPlan.monthlyPrice;
  const gstAmount = Math.round(baseRate * 0.18);
  const totalAmount = baseRate + gstAmount;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
  };

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "Simulated Checkout Demo" }]} />

        {/* Prominent Demo Disclosure Alert */}
        <div className="rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/40 p-4 sm:p-5 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3 shadow-sm mb-6">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-sm block">
              Frontend Recruitment Demonstration Notice
            </strong>
            <p className="leading-relaxed">
              This checkout flow is a client-side simulation engineered to demonstrate billing architecture, GST calculations, and payment UI patterns. <strong>No real payment is processed, and no financial credentials, OTPs, or UPI PINs are ever requested or stored.</strong>
            </p>
          </div>
        </div>

        {isCompleted ? (
          <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 shadow-sm text-center animate-in fade-in-50 duration-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <Badge variant="green" size="sm" className="mb-2">
              Simulation Completed
            </Badge>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Demo Order Calculated Successfully
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
              You tested the order workflow for <strong>{selectedPlan.name} Hosting</strong> ({billingCycle === "annual" ? "Annual Term" : "Monthly Term"}) totaling <strong>{formatINR(totalAmount)}</strong> (including 18% GST).
            </p>

            <div className="my-6 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 max-w-sm mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Selected Plan:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Billing Term:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 capitalize">{billingCycle}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Payment Route:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 uppercase">{paymentMethod} (Simulated)</span>
              </div>
              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Amount:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{formatINR(totalAmount)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => setIsCompleted(false)} variant="outline" size="sm">
                Try Another Demo Configuration
              </Button>
              <Button href={selectedPlan.purchaseUrl} isExternal variant="primary" size="sm">
                <span>Proceed to Official Shroti Host Portal</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Configuration & Payment Method Selector */}
            <div className="md:col-span-7 space-y-6">
              {/* Product Selector */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  1. Select Hosting Plan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SHARED_HOSTING_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedPlan.id === plan.id
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="font-bold text-xs block">{plan.name}</span>
                      <span className="text-[11px] text-slate-500">{formatINR(plan.monthlyPrice)}/mo</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing Term Selector */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  2. Select Billing Cycle
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("annual")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      billingCycle === "annual"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-xs block">Annual Commitment</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Includes Same-Price Renewal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      billingCycle === "monthly"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-xs block">Monthly Term</span>
                    <span className="text-[10px] text-slate-500">Pay as you go</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  3. Verified Payment Methods (India & Global)
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === "upi"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <QrCode className="h-4 w-4 text-purple-600" />
                      <div>
                        <span className="font-semibold text-xs block">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <span className="text-[10px] text-slate-500">Instant activation via QR or VPA</span>
                      </div>
                    </div>
                    <Badge variant="green" size="sm">Zero Surcharge</Badge>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === "card"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <div>
                        <span className="font-semibold text-xs block">Cards (Visa, Mastercard, RuPay)</span>
                        <span className="text-[10px] text-slate-500">Domestic & International credit/debit cards</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building className="h-4 w-4 text-emerald-600" />
                      <div>
                        <span className="font-semibold text-xs block">Net Banking (50+ Indian Banks)</span>
                        <span className="text-[10px] text-slate-500">HDFC, ICICI, SBI, Axis, Kotak</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Order Summary & Simulation Action */}
            <div className="md:col-span-5">
              <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
                  Order Summary
                </h3>

                <div className="py-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{selectedPlan.name} NVMe Hosting</span>
                      <span className="text-[11px] text-slate-500">{billingCycle === "annual" ? "12 Months" : "1 Month"} subscription</span>
                    </div>
                    <span className="font-bold">{formatINR(baseRate)}</span>
                  </div>

                  <div className="flex justify-between text-slate-500">
                    <span>GST (18% Statutory Tax):</span>
                    <span>{formatINR(gstAmount)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Total Payable:</span>
                    <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                      {formatINR(totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 space-y-1 my-4">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>7-Day Money-Back Guarantee</span>
                  </div>
                  <p>Renews at the identical baseline rate upon future billing cycles.</p>
                </div>

                <form onSubmit={handleSimulatePayment}>
                  <Button type="submit" variant="primary" size="md" className="w-full h-11">
                    <span>Complete Demo Order</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </form>

                <p className="text-[10px] text-center text-slate-400 mt-3">
                  Demo interaction only &bull; No credit card or UPI pin required
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

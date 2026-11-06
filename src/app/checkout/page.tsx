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
  Info,
  Tag,
  Receipt,
  RotateCcw,
  Sparkles,
  Check
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SHARED_HOSTING_PLANS, HostingPlan } from "@/data/hosting-plans";
import { formatINR } from "@/lib/utils";
import { COMPANY_DETAILS } from "@/data/navigation";

export default function DemoCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan>(SHARED_HOSTING_PLANS[1]); // Default to Grow
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [activeRazorpayOrderId, setActiveRazorpayOrderId] = useState<string | null>(null);
  const [whmcsDetails, setWhmcsDetails] = useState<{ orderId: number; invoiceId: number } | null>(null);

  // Base pricing calculations
  const rawBaseRate = billingCycle === "annual" ? selectedPlan.annualPrice * 12 : selectedPlan.monthlyPrice;
  const discountAmount = Math.round(rawBaseRate * appliedDiscount);
  const taxableAmount = rawBaseRate - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.18);
  const totalAmount = taxableAmount + gstAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (couponCode.trim().toUpperCase() === "SHROTI10") {
      setAppliedDiscount(0.10); // 10% discount
    } else if (couponCode.trim()) {
      setCouponError("Invalid promo code. Try 'SHROTI10' for 10% demo discount.");
      setAppliedDiscount(0);
    }
  };

  const executeOrderCreation = async () => {
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          billingCycle: billingCycle === "annual" ? "annually" : "monthly",
          couponCode,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order?.orderId) {
          setActiveRazorpayOrderId(data.order.orderId);
          return data.order.orderId;
        }
      }
    } catch {
      // Fallback for static builds without server
    }
    const fallbackId = `order_mock_${Date.now()}`;
    setActiveRazorpayOrderId(fallbackId);
    return fallbackId;
  };

  const executeOrderVerification = async (rzpOrderId: string) => {
    const mockPaymentId = `pay_mock_${Date.now()}`;
    const mockSignature = `mock_sig_pass_${Date.now()}`;

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: rzpOrderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: mockSignature,
          planId: selectedPlan.id,
          billingCycle: billingCycle === "annual" ? "annually" : "monthly",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.whmcs) {
          setWhmcsDetails({
            orderId: data.whmcs.whmcsOrderId,
            invoiceId: data.whmcs.whmcsInvoiceId,
          });
        }
      }
    } catch {
      // Fallback
    }
  };

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const createdOrderId = await executeOrderCreation();
    setIsProcessing(false);

    if (paymentMethod === "upi") {
      setShowQrModal(true);
    } else {
      setIsProcessing(true);
      await executeOrderVerification(createdOrderId);
      setIsProcessing(false);
      setOrderId(`SHR-${Date.now().toString().slice(-6)}`);
      setIsCompleted(true);
    }
  };

  const handleConfirmUpiDemo = async () => {
    setShowQrModal(false);
    setIsProcessing(true);
    const rzpId = activeRazorpayOrderId || `order_mock_${Date.now()}`;
    await executeOrderVerification(rzpId);
    setIsProcessing(false);
    setOrderId(`SHR-${Date.now().toString().slice(-6)}`);
    setIsCompleted(true);
  };

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-8 sm:gap-12">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "Interactive Tools" }, { label: "Payment & Tax Calculator Demo" }]} />

        {/* Dual Mode Alert: Live Production vs Frontend Simulator */}
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/80 dark:bg-indigo-950/40 p-4 sm:p-5 text-xs sm:text-sm shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold text-sm block text-indigo-950 dark:text-indigo-200">
                Production Order vs. Architecture Simulation
              </strong>
              <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed">
                This page serves as an <strong>interactive frontend demonstration</strong> to inspect itemized order architecture, statutory 18% GST calculation, and coupon logic. <strong>No financial credentials, UPI PINs, or card numbers are collected.</strong>
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
              Ready to place a live production order with automated cPanel provisioning?
            </span>
            <Button
              href={selectedPlan.purchaseUrl}
              isExternal
              variant="primary"
              size="sm"
              className="h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <span>Deploy on Official Portal</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: COMPLETED RECEIPT / INVOICE SUMMARY */}
        {/* ---------------------------------------------------- */}
        {isCompleted ? (
          <div className="p-6 sm:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 shadow-sm text-center animate-in fade-in-50 duration-200 space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <Badge variant="green" size="sm" className="mb-2">
                Simulated Order Validated
              </Badge>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Demonstration Invoice #{orderId}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                This simulated transaction has passed all frontend validation checks.
              </p>
            </div>

            {/* Itemized Receipt Card */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 max-w-md mx-auto text-xs text-left space-y-2.5 font-mono">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700 font-sans">
                <span className="font-bold text-slate-900 dark:text-slate-100">Item Description</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">Subtotal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300 font-sans">
                  {selectedPlan.name} NVMe Shared ({billingCycle === "annual" ? "12 Months" : "1 Month"})
                </span>
                <span className="font-bold">{formatINR(rawBaseRate)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="font-sans">Promo Discount (10% SHROTI10):</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span className="font-sans">Taxable Value:</span>
                <span>{formatINR(taxableAmount)}</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span className="font-sans">Statutory GST (18%):</span>
                <span>{formatINR(gstAmount)}</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span className="font-sans">Payment Channel:</span>
                <span className="uppercase text-[11px] font-bold">{paymentMethod} (Simulation)</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-bold">
                <span className="text-slate-900 dark:text-slate-100 font-sans">Total Paid (Demo):</span>
                <span className="text-purple-600 dark:text-purple-400 font-mono text-base">{formatINR(totalAmount)}</span>
              </div>

              {whmcsDetails && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-emerald-600 dark:text-emerald-400 space-y-1">
                  <div className="flex justify-between">
                    <span>WHMCS Order Ref:</span>
                    <span className="font-bold">#{whmcsDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WHMCS Invoice Ref:</span>
                    <span className="font-bold">#{whmcsDetails.invoiceId}</span>
                  </div>
                  {activeRazorpayOrderId && (
                    <div className="flex justify-between text-slate-500">
                      <span>Razorpay Order ID:</span>
                      <span className="font-mono text-[10px]">{activeRazorpayOrderId}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 text-[10px] text-slate-400 font-sans text-center">
                Pledged: Guaranteed Same-Price Renewal at {formatINR(selectedPlan.renewalPrice)}/mo on renewal.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => {
                  setIsCompleted(false);
                  setAppliedDiscount(0);
                  setCouponCode("");
                }}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                <span>Test Another Calculation</span>
              </Button>
              <Button
                href={selectedPlan.purchaseUrl}
                isExternal
                variant="primary"
                size="sm"
              >
                <span>Deploy Real Plan on Portal</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        ) : (
          /* ---------------------------------------------------- */
          /* VIEW 2: CHECKOUT CONFIGURATOR & PAYMENT DEMO */
          /* ---------------------------------------------------- */
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
                      <span className="text-[11px] text-slate-500 font-mono">{formatINR(plan.monthlyPrice)}/mo</span>
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
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      billingCycle === "annual"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-xs block">Annual Commitment</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">
                      Includes Same-Price Renewal
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      billingCycle === "monthly"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-xs block">Monthly Term</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Pay as you go</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  3. Select Payment Route (Simulation Demo)
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === "upi"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <QrCode className="h-4 w-4 text-purple-600" />
                      <div>
                        <span className="font-semibold text-xs block">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <span className="text-[10px] text-slate-500">Simulate QR code scanning demo</span>
                      </div>
                    </div>
                    <Badge variant="green" size="sm">Zero Fee</Badge>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === "card"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ring-1 ring-purple-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <div>
                        <span className="font-semibold text-xs block">Cards (Visa, Mastercard, RuPay)</span>
                        <span className="text-[10px] text-slate-500">Domestic & International credit/debit</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
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

            {/* Right: Order Summary & Coupon */}
            <div className="md:col-span-5 space-y-4">
              <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
                  Order Breakdown
                </h3>

                <div className="py-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{selectedPlan.name} NVMe Hosting</span>
                      <span className="text-[11px] text-slate-500">{billingCycle === "annual" ? "12 Months" : "1 Month"} subscription</span>
                    </div>
                    <span className="font-bold font-mono">{formatINR(rawBaseRate)}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-mono">
                      <span>Promo Discount (10%):</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>Taxable Base:</span>
                    <span>{formatINR(taxableAmount)}</span>
                  </div>

                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>GST (18% Statutory):</span>
                    <span>{formatINR(gstAmount)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Total Payable:</span>
                    <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
                      {formatINR(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2 pb-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Try 'SHROTI10'"
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 uppercase font-mono"
                    />
                    <Button type="submit" variant="outline" size="sm" className="h-8 text-xs">
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-amber-500 mt-1">{couponError}</p>}
                  {appliedDiscount > 0 && (
                    <p className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      <span>10% promotional discount applied!</span>
                    </p>
                  )}
                </form>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 space-y-1 mb-4">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>7-Day Money-Back Guarantee</span>
                  </div>
                  <p>Guaranteed same-price renewal at {formatINR(selectedPlan.renewalPrice)}/mo.</p>
                </div>

                <form onSubmit={handleInitiatePayment}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isProcessing}
                    className="w-full h-11"
                  >
                    {isProcessing ? (
                      <span>Validating Demo Payment...</span>
                    ) : (
                      <>
                        <span>{paymentMethod === "upi" ? "Simulate UPI QR Payment" : "Execute Demo Payment"}</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-[10px] text-center text-slate-400 mt-3">
                  Frontend Demonstration Only &bull; Zero Real Funds Collected
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mock UPI QR Code Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
              <Badge variant="purple" size="sm">Demonstration QR Code</Badge>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Scan to Pay (Demo Mode)
              </h3>
              <p className="text-xs text-slate-500">
                Amount Payable: <strong className="text-purple-600 dark:text-purple-400 font-mono">{formatINR(totalAmount)}</strong>
              </p>

              {/* Mock QR SVG Box */}
              <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto w-48 h-48 border border-slate-200 dark:border-slate-700 relative">
                <QrCode className="h-32 w-32 text-slate-800 dark:text-slate-200" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[11px] font-mono font-bold bg-amber-500 text-black px-2 py-0.5 rounded rotate-12 shadow-sm">
                    DEMO SIMULATOR
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Simulating UPI intent: <code>shrotihost@okhdfcbank</code>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setShowQrModal(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmUpiDemo}
                  variant="primary"
                  size="sm"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Confirm Demo Pay
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

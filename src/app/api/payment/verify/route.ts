import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/services/payment";
import { whmcsService } from "@/lib/services/whmcs";
import { ALL_HOSTING_PLANS, VPS_PLANS } from "@/data/hosting-plans";

export async function POST(req: NextRequest) {
  try {
    let body: {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      planId?: string;
      billingCycle?: string;
      domain?: string;
      clientEmail?: string;
      clientName?: string;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, verified: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      billingCycle,
      domain,
      clientEmail,
      clientName,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Missing required signature parameters (razorpay_order_id, razorpay_payment_id, razorpay_signature).",
        },
        { status: 400 }
      );
    }

    // 1. Cryptographically verify signature
    const verification = paymentService.verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!verification.verified) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: verification.message,
        },
        { status: 400 }
      );
    }

    // Check if this payment was previously fulfilled to prevent duplicate provisioning
    if (verification.message.includes("previously verified")) {
      return NextResponse.json(
        {
          success: true,
          verified: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: verification.message,
          duplicate: true,
          whmcsOrderId: verification.whmcsOrderId,
          whmcsInvoiceId: verification.whmcsInvoiceId,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // 2. Validate plan existence in catalog to prevent invalid order injection
    const effectivePlanId = planId || "shared-launch";
    const validPlan =
      ALL_HOSTING_PLANS.some((p) => p.id === effectivePlanId) ||
      VPS_PLANS.some((p) => p.id === effectivePlanId);

    if (!validPlan) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: `Invalid plan identifier '${effectivePlanId}'. Plan does not exist in catalog.`,
        },
        { status: 400 }
      );
    }

    // 3. Verify plan against stored order to prevent plan parameter tampering / tier upgrading
    const storedOrder = paymentService.getOrder(razorpay_order_id);
    if (storedOrder && storedOrder.planId && planId && storedOrder.planId !== planId) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: `Plan mismatch: order was created for '${storedOrder.planId}' but verification requested '${planId}'.`,
        },
        { status: 400 }
      );
    }

    // 4. Acquire payment fulfillment lock to prevent concurrent double provisioning
    if (!paymentService.acquirePaymentLock(razorpay_payment_id)) {
      const existing = paymentService.getProcessedPayment(razorpay_payment_id);
      return NextResponse.json(
        {
          success: true,
          verified: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment previously verified or currently being processed. Duplicate fulfillment prevented.",
          duplicate: true,
          whmcsOrderId: existing?.whmcsOrderId,
          whmcsInvoiceId: existing?.whmcsInvoiceId,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // 5. Automated WHMCS Provisioning Hand-off with Lock Release on Failure
    let whmcsResult;
    try {
      whmcsResult = await whmcsService.addOrder({
        clientEmail: clientEmail || storedOrder?.customerEmail || "client@shrotihost.in",
        clientName: clientName || "Valued Customer",
        pid: effectivePlanId,
        domain: domain || "",
        billingCycle: (billingCycle as "monthly" | "semi-annually" | "annually") || "annual",
        paymentMethod: "razorpay",
        paymentId: razorpay_payment_id,
      });

      // Mark payment as fulfilled in idempotency cache
      paymentService.markPaymentProcessed(razorpay_payment_id, {
        ...verification,
        whmcsOrderId: whmcsResult.whmcsOrderId,
        whmcsInvoiceId: whmcsResult.whmcsInvoiceId,
      });
    } catch (whmcsErr: unknown) {
      paymentService.releasePaymentLock(razorpay_payment_id);
      throw whmcsErr;
    }

    return NextResponse.json(
      {
        success: true,
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        message: "Payment successfully verified and WHMCS order queued.",
        whmcs: whmcsResult,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error: (err as Error).message || "Internal server error during verification.",
      },
      { status: 500 }
    );
  }
}

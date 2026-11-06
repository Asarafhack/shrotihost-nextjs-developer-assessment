import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/services/payment";
import { whmcsService } from "@/lib/services/whmcs";

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

    // 2. Automated WHMCS Provisioning Hand-off
    const whmcsResult = await whmcsService.addOrder({
      clientEmail: clientEmail || "client@shrotihost.in",
      clientName: clientName || "Valued Customer",
      pid: planId || "shared-launch",
      domain: domain || "",
      billingCycle: (billingCycle as "monthly" | "semi-annually" | "annually") || "annual",
      paymentMethod: "razorpay",
      paymentId: razorpay_payment_id,
    });

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

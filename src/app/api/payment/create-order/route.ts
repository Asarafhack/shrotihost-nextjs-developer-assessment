import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/services/payment";
import { CreateOrderParams } from "@/lib/services/types";
import { BillingCycle } from "@/data/hosting-plans";

export async function POST(req: NextRequest) {
  try {
    let body: Partial<CreateOrderParams>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    if (!body.planId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter 'planId'." },
        { status: 400 }
      );
    }

    const rawCycle = String(body.billingCycle || "annually");
    if (!["monthly", "semi-annually", "annually", "annual"].includes(rawCycle)) {
      return NextResponse.json(
        { success: false, error: "Invalid billing cycle. Must be monthly, semi-annually, or annually." },
        { status: 400 }
      );
    }

    const normalizedCycle: BillingCycle = rawCycle === "annual" ? "annually" : (rawCycle as BillingCycle);

    const order = await paymentService.createOrder({
      planId: body.planId,
      billingCycle: normalizedCycle,
      couponCode: body.couponCode,
      domain: body.domain,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
    });

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Internal server error during order creation.",
      },
      { status: 400 }
    );
  }
}

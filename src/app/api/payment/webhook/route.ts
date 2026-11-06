import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/services/payment";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (!rawBody) {
      return NextResponse.json(
        { status: "error", message: "Empty webhook payload received." },
        { status: 400 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { status: "error", message: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    const result = paymentService.verifyWebhook(rawBody, signature);

    if (!result.valid) {
      return NextResponse.json(
        { status: "error", message: result.message },
        { status: 400 }
      );
    }

    if (result.duplicate) {
      return NextResponse.json(
        { status: "ignored", message: result.message, eventId: result.eventId },
        { status: 200 }
      );
    }

    // Process valid webhook event
    return NextResponse.json(
      {
        status: "success",
        message: "Webhook processed successfully.",
        eventId: result.eventId,
        eventType: result.eventType,
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { status: "error", message: (err as Error).message || "Webhook processing error" },
      { status: 500 }
    );
  }
}

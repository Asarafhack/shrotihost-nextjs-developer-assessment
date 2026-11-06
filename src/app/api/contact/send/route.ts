import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/services/email";
import { whmcsService } from "@/lib/services/whmcs";
import { COMPANY_DETAILS } from "@/data/navigation";

export async function POST(req: NextRequest) {
  try {
    let body: {
      name?: string;
      email?: string;
      department?: "Sales" | "Billing" | "Support";
      subject?: string;
      message?: string;
      honeypot?: string;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { name, email, department, subject, message, honeypot } = body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, subject, message)." },
        { status: 400 }
      );
    }

    // 1. Transactional email dispatch (with anti-bot honeypot check)
    const emailResult = await emailService.sendContactInquiry({
      name,
      email,
      department: department || "Support",
      subject,
      message,
      honeypot,
    });

    // 2. Automated WHMCS Support Ticket Creation
    let ticketResult = null;
    if (!emailResult.isSpam) {
      ticketResult = await whmcsService.openTicket({
        name,
        email,
        department: department || "Support",
        subject,
        message,
        priority: "Medium",
      });
    }

    // Construct client direct fallback bridges
    const targetEmail =
      department === "Sales"
        ? COMPANY_DETAILS.salesEmail
        : department === "Billing"
        ? COMPANY_DETAILS.billingEmail
        : COMPANY_DETAILS.supportEmail;

    const mailtoSubject = encodeURIComponent(`[${department || "Support"}] ${subject}`);
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    return NextResponse.json(
      {
        success: true,
        messageId: emailResult.messageId,
        provider: emailResult.provider,
        ticket: ticketResult
          ? {
              ticketId: ticketResult.ticketId,
              ticketMask: ticketResult.ticketMask,
              status: ticketResult.status,
            }
          : null,
        status: "dispatched",
        emailBridge: {
          mailtoUrl: `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`,
          whatsappUrl: COMPANY_DETAILS.whatsappUrl,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err as Error).message || "Error processing contact inquiry." },
      { status: 400 }
    );
  }
}

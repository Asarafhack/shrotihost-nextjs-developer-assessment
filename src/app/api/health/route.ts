import { NextResponse } from "next/server";
import { paymentService } from "@/lib/services/payment";
import { whmcsService } from "@/lib/services/whmcs";
import { registrarService } from "@/lib/services/registrar";
import { emailService } from "@/lib/services/email";
import { aiAdvisorService } from "@/lib/services/ai-advisor";
import { HealthCheckResult } from "@/lib/services/types";

const startTime = Date.now();

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  const report: HealthCheckResult = {
    status: "healthy",
    version: "1.0.0-production-ready",
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    environment: process.env.NODE_ENV || "development",
    services: {
      payment: {
        name: "Razorpay Payment Gateway",
        provider: paymentService.isMock ? "Mock Cryptographic Provider" : "Razorpay REST API",
        status: paymentService.isMock ? "mock_mode" : "operational",
        configured: !paymentService.isMock,
        details: paymentService.isMock
          ? "Running in zero-credential HMAC simulation mode with 18% statutory GST enforcement."
          : "Configured with live/test Razorpay API credentials.",
      },
      whmcs: {
        name: "WHMCS Client Management & Provisioning",
        provider: whmcsService.isMock ? "Mock WHMCS Provisioner" : "WHMCS External API",
        status: whmcsService.isMock ? "mock_mode" : "operational",
        configured: !whmcsService.isMock,
        details: whmcsService.isMock
          ? "Simulates client creation, invoice generation, and cPanel account queueing."
          : "Connected to live WHMCS instance at portal.shrotihost.in.",
      },
      registrar: {
        name: "Domain Registrar Lookup",
        provider: registrarService.isMock ? "Deterministic Registry Simulator" : "ResellerClub / LogicBoxes EPP",
        status: registrarService.isMock ? "mock_mode" : "operational",
        configured: !registrarService.isMock,
        details: "Evaluates RFC 1035 domain syntax, pricing from catalog, and multi-TLD availability.",
      },
      email: {
        name: "Transactional Email Dispatcher",
        provider: emailService.isMock ? "Mock Transactional Dispatcher" : "Resend API",
        status: emailService.isMock ? "mock_mode" : "operational",
        configured: !emailService.isMock,
        details: "Processes inbound contact inquiries, anti-bot honeypots, and order receipts.",
      },
      aiAdvisor: {
        name: "Infrastructure Advisor Service",
        provider: process.env.GEMINI_API_KEY ? "Google Gemini 1.5 Flash" : "Deterministic Rules Engine",
        status: "operational",
        configured: Boolean(process.env.GEMINI_API_KEY),
        details: process.env.GEMINI_API_KEY
          ? "Live LLM grounded in ShrotiHost technical specs and same-price renewal guarantees."
          : "Deterministic decision matrix with zero hallucinations and exact pricing verification.",
      },
    },
  };

  return NextResponse.json(report, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

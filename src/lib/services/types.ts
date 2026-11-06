import { BillingCycle, HostingPlan } from "@/data/hosting-plans";

// =============================================================================
// PAYMENT GATEWAY TYPES (Razorpay & Mock)
// =============================================================================

export interface CreateOrderParams {
  planId: string;
  billingCycle: BillingCycle;
  domain?: string;
  couponCode?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface PaymentOrderResult {
  orderId: string;
  amount: number; // in paise (e.g., 4900 = ₹49.00)
  amountRupees: number;
  currency: "INR";
  planId: string;
  planName: string;
  billingCycle: BillingCycle;
  baseAmountRupees: number;
  discountRupees: number;
  taxRupees: number; // 18% GST
  keyId: string;
  isMock: boolean;
  receipt: string;
  notes?: Record<string, string>;
}

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  verified: boolean;
  orderId: string;
  paymentId: string;
  whmcsOrderId?: number;
  whmcsInvoiceId?: number;
  message: string;
  timestamp: string;
}

export interface WebhookVerificationResult {
  valid: boolean;
  eventId?: string;
  eventType?: string;
  duplicate: boolean;
  message: string;
}

// =============================================================================
// CLIENT MANAGEMENT & BILLING (WHMCS)
// =============================================================================

export interface WhmcsOrderParams {
  clientId?: number;
  clientEmail: string;
  clientName: string;
  clientPhone?: string;
  pid: number | string; // WHMCS Product ID
  domain?: string;
  billingCycle: BillingCycle;
  paymentMethod: "razorpay" | "upi" | "banktransfer";
  paymentId?: string;
}

export interface WhmcsOrderResult {
  success: boolean;
  whmcsOrderId: number;
  whmcsInvoiceId: number;
  status: "Active" | "Pending" | "Completed";
  cPanelUser?: string;
  portalUrl: string;
  isMock: boolean;
}

export interface WhmcsTicketParams {
  name: string;
  email: string;
  department: "Sales" | "Billing" | "Support";
  subject: string;
  message: string;
  priority?: "Low" | "Medium" | "High";
}

export interface WhmcsTicketResult {
  success: boolean;
  ticketId: number;
  ticketMask: string; // e.g. "SHR-992143"
  status: "Open";
  isMock: boolean;
}

// =============================================================================
// DOMAIN REGISTRAR (ResellerClub / LogicBoxes / Direct EPP)
// =============================================================================

export interface DomainCheckResult {
  domain: string;
  extension: string;
  fullDomain: string;
  available: boolean;
  registrationPrice: number;
  renewalPrice: number;
  transferPrice: number;
  hasSamePriceRenewal: boolean;
  provider: "resellerclub" | "logicboxes" | "mock";
  verifiedAt: string;
  portalUrl: string;
  suggestions?: {
    fullDomain: string;
    available: boolean;
    registrationPrice: number;
    renewalPrice: number;
  }[];
}

// =============================================================================
// TRANSACTIONAL EMAIL (Resend / Postmark / SMTP)
// =============================================================================

export interface EmailDispatchParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId: string;
  provider: "resend" | "smtp" | "mock";
  timestamp: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  department: "Sales" | "Billing" | "Support";
  subject: string;
  message: string;
  honeypot?: string; // Anti-spam hidden field
}

// =============================================================================
// AI HOSTING ADVISOR (Google Gemini / Rules Engine)
// =============================================================================

export interface AdvisorChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AdvisorQueryPayload {
  message: string;
  history?: AdvisorChatMessage[];
}

export interface AdvisorRecommendationResult {
  reply: string;
  recommendedPlan?: HostingPlan;
  recommendedCategory?: string;
  confidence: number; // 0 to 1
  reasoning: string[];
  samePriceRenewalGuaranteed: boolean;
  checkoutUrl: string;
  portalUrl: string;
  engine: "gemini-1.5-flash" | "deterministic-rules";
}

// =============================================================================
// SYSTEM HEALTH & READINESS
// =============================================================================

export interface ServiceStatus {
  name: string;
  provider: string;
  status: "operational" | "degraded" | "mock_mode";
  configured: boolean;
  latencyMs?: number;
  details?: string;
}

export interface HealthCheckResult {
  status: "healthy" | "degraded";
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  services: {
    payment: ServiceStatus;
    whmcs: ServiceStatus;
    registrar: ServiceStatus;
    email: ServiceStatus;
    aiAdvisor: ServiceStatus;
  };
}

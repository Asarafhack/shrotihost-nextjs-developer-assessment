import {
  EmailDispatchParams,
  EmailDispatchResult,
  ContactSubmissionPayload,
  PaymentOrderResult
} from "./types";

export class EmailService {
  private provider: string;
  private apiKey: string;
  private defaultFrom: string;
  public readonly isMock: boolean;

  constructor() {
    this.provider = process.env.EMAIL_PROVIDER || "mock";
    this.apiKey = process.env.RESEND_API_KEY || "mock_re_123456789abcdef";
    this.defaultFrom = process.env.EMAIL_FROM || "ShrotiHost Support <support@shrotihost.in>";

    this.isMock = this.provider === "mock" || this.apiKey.startsWith("mock_");
  }

  /**
   * Basic HTML sanitization to prevent stored XSS in emails
   */
  private sanitize(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Generic transactional email dispatcher
   */
  async dispatch(params: EmailDispatchParams): Promise<EmailDispatchResult> {
    if (!this.isMock) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          signal: AbortSignal.timeout(10000),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            from: this.defaultFrom,
            to: Array.isArray(params.to) ? params.to : [params.to],
            subject: params.subject,
            html: params.html,
            text: params.text,
            reply_to: params.replyTo,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(`Resend Error: ${JSON.stringify(errData)}`);
        }

        const data = await response.json();
        return {
          success: true,
          messageId: data.id || `msg_${Date.now()}`,
          provider: "resend",
          timestamp: new Date().toISOString(),
        };
      } catch (err: unknown) {
        console.error("Live email dispatch failed:", (err as Error).message);
        throw new Error(`Email Dispatch Error: ${(err as Error).message}`);
      }
    }

    // High-fidelity mock dispatch
    const mockMsgId = `msg_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return {
      success: true,
      messageId: mockMsgId,
      provider: "mock",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Send validated customer contact inquiry with honeypot anti-spam check
   */
  async sendContactInquiry(payload: ContactSubmissionPayload): Promise<{
    success: boolean;
    messageId: string;
    isSpam: boolean;
    provider: string;
  }> {
    // 1. Honeypot anti-bot validation
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      // Silently return success to mislead spambots while dropping the payload
      return {
        success: true,
        messageId: "msg_spam_filtered",
        isSpam: true,
        provider: "anti-spam-honeypot",
      };
    }

    // 2. Validate mandatory fields
    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      throw new Error("Missing required contact form fields (name, email, subject, message).");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      throw new Error("Invalid email address format.");
    }

    const safeName = this.sanitize(payload.name);
    const safeEmail = this.sanitize(payload.email);
    const safeSubject = this.sanitize(payload.subject);
    const safeDepartment = this.sanitize(payload.department || "General");
    const safeMessage = this.sanitize(payload.message).replace(/\n/g, "<br/>");

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">New Inbound Inquiry — ShrotiHost</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Department:</strong></td><td style="padding: 8px 0; color: #0f172a;">${safeDepartment}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>From:</strong></td><td style="padding: 8px 0; color: #0f172a;">${safeName} (&lt;${safeEmail}&gt;)</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Subject:</strong></td><td style="padding: 8px 0; color: #0f172a;">${safeSubject}</td></tr>
        </table>
        <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 4px; color: #334155;">
          ${safeMessage}
        </div>
      </div>
    `;

    const res = await this.dispatch({
      to: "support@shrotihost.in",
      subject: `[${safeDepartment}] ${safeSubject}`,
      html: htmlBody,
      replyTo: payload.email,
    });

    return {
      success: res.success,
      messageId: res.messageId,
      isSpam: false,
      provider: res.provider,
    };
  }
}

export const emailService = new EmailService();

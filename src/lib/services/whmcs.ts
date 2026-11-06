import {
  WhmcsOrderParams,
  WhmcsOrderResult,
  WhmcsTicketParams,
  WhmcsTicketResult
} from "./types";

export class WhmcsService {
  private apiUrl: string;
  private identifier: string;
  private secret: string;
  public readonly isMock: boolean;

  constructor() {
    this.apiUrl = process.env.WHMCS_API_URL || "https://portal.shrotihost.in/includes/api.php";
    this.identifier = process.env.WHMCS_API_IDENTIFIER || "mock_whmcs_api_identifier";
    this.secret = process.env.WHMCS_API_SECRET || "mock_whmcs_api_secret_hash";

    this.isMock =
      !process.env.WHMCS_API_IDENTIFIER ||
      this.identifier.startsWith("mock_") ||
      this.secret.startsWith("mock_");
  }

  /**
   * Helper to execute a typed WHMCS External API action.
   */
  private async callWhmcsApi(action: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    if (this.isMock) {
      throw new Error("WHMCS service is in mock mode; live API invocation skipped.");
    }

    const payload = new URLSearchParams();
    payload.append("action", action);
    payload.append("identifier", this.identifier);
    payload.append("secret", this.secret);
    payload.append("responsetype", "json");

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        payload.append(key, String(value));
      }
    }

    const response = await fetch(this.apiUrl, {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      throw new Error(`WHMCS API HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.result === "error") {
      throw new Error(`WHMCS Error: ${data.message || "Unknown error"}`);
    }

    return data;
  }

  /**
   * Provision or queue an order in WHMCS following verified payment.
   */
  async addOrder(params: WhmcsOrderParams): Promise<WhmcsOrderResult> {
    if (!this.isMock) {
      try {
        const result = await this.callWhmcsApi("AddOrder", {
          clientid: params.clientId || 0,
          clientemail: params.clientEmail,
          pid: params.pid,
          domain: params.domain || "",
          billingcycle: params.billingCycle,
          paymentmethod: params.paymentMethod,
          noinvoice: "0",
          noemail: "0",
        });

        return {
          success: true,
          whmcsOrderId: Number(result.orderid) || 1000,
          whmcsInvoiceId: Number(result.invoiceid) || 2000,
          status: "Pending",
          portalUrl: `https://portal.shrotihost.in/viewinvoice.php?id=${result.invoiceid}`,
          isMock: false,
        };
      } catch (err: unknown) {
        console.error("Live WHMCS AddOrder failed:", (err as Error).message);
        throw new Error(`WHMCS Provisioning Error: ${(err as Error).message}`);
      }
    }

    // High-fidelity mock response
    const mockOrderId = 40000 + Math.floor(Math.random() * 9000);
    const mockInvoiceId = 80000 + Math.floor(Math.random() * 9000);

    return {
      success: true,
      whmcsOrderId: mockOrderId,
      whmcsInvoiceId: mockInvoiceId,
      status: "Pending",
      cPanelUser: params.domain ? params.domain.replace(/[^a-z0-9]/g, "").slice(0, 8) : `u${mockOrderId}`,
      portalUrl: `https://portal.shrotihost.in/viewinvoice.php?id=${mockInvoiceId}`,
      isMock: true,
    };
  }

  /**
   * Automatically log a support ticket in WHMCS for customer inquiries.
   */
  async openTicket(params: WhmcsTicketParams): Promise<WhmcsTicketResult> {
    if (!this.isMock) {
      try {
        const deptMap: Record<string, number> = { Sales: 1, Billing: 2, Support: 3 };
        const deptId = deptMap[params.department] || 1;

        const result = await this.callWhmcsApi("OpenTicket", {
          deptid: deptId,
          name: params.name,
          email: params.email,
          subject: params.subject,
          message: params.message,
          priority: params.priority || "Medium",
        });

        return {
          success: true,
          ticketId: Number(result.id) || 101,
          ticketMask: String(result.tid || `SHR-${result.id}`),
          status: "Open",
          isMock: false,
        };
      } catch (err: unknown) {
        console.error("Live WHMCS OpenTicket failed:", (err as Error).message);
        throw new Error(`WHMCS Ticket Error: ${(err as Error).message}`);
      }
    }

    // Mock Ticket Response
    const mockTicketId = 50000 + Math.floor(Math.random() * 9000);
    return {
      success: true,
      ticketId: mockTicketId,
      ticketMask: `SHR-${mockTicketId}`,
      status: "Open",
      isMock: true,
    };
  }
}

export const whmcsService = new WhmcsService();

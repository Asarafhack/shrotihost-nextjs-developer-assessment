import { DOMAIN_TLDS } from "@/data/domain-pricing";
import { DomainCheckResult } from "./types";

export class RegistrarService {
  private provider: string;
  private apiKey: string;
  private resellerId: string;
  public readonly isMock: boolean;

  constructor() {
    this.provider = process.env.REGISTRAR_PROVIDER || "mock";
    this.apiKey = process.env.REGISTRAR_API_KEY || "mock_registrar_api_key_3344";
    this.resellerId = process.env.REGISTRAR_RESELLER_ID || "mock_reseller_9901";

    this.isMock = this.provider === "mock" || this.apiKey.startsWith("mock_");
  }

  /**
   * Validate domain format conforming to RFC 1035 / RFC 1123.
   */
  validateDomainName(input: string): { isValid: boolean; normalized: string; error?: string } {
    const normalized = input.trim().toLowerCase();

    if (!normalized) {
      return { isValid: false, normalized, error: "Domain name cannot be empty." };
    }

    if (normalized.length > 253) {
      return { isValid: false, normalized, error: "Domain name exceeds maximum length of 253 characters." };
    }

    // Must contain only letters, digits, hyphens, and dots
    if (!/^[a-z0-9.-]+$/.test(normalized)) {
      return { isValid: false, normalized, error: "Domain contains invalid characters. Only alphanumeric characters and hyphens are allowed." };
    }

    const labels = normalized.split(".");
    for (const label of labels) {
      if (!label && labels.length > 1) {
        return { isValid: false, normalized, error: "Domain contains empty label (consecutive dots)." };
      }
      if (label.length > 63) {
        return { isValid: false, normalized, error: `Domain label '${label}' exceeds maximum 63 characters.` };
      }
      if (label.startsWith("-") || label.endsWith("-")) {
        return { isValid: false, normalized, error: `Domain label '${label}' cannot start or end with a hyphen.` };
      }
    }

    return { isValid: true, normalized };
  }

  /**
   * Check single domain or SLD availability across supported TLDs.
   */
  async checkAvailability(rawInput: string): Promise<DomainCheckResult> {
    const { isValid, normalized, error } = this.validateDomainName(rawInput);
    if (!isValid) {
      throw new Error(error || "Invalid domain syntax.");
    }

    let sld = normalized;
    let tldExt = ".com";

    const dotIndex = normalized.indexOf(".");
    if (dotIndex !== -1) {
      sld = normalized.substring(0, dotIndex);
      tldExt = normalized.substring(dotIndex);
    }

    // Match TLD pricing
    const tldConfig = DOMAIN_TLDS.find((t) => t.extension === tldExt) || {
      extension: tldExt,
      registrationPrice: 1169,
      renewalPrice: 1299,
      transferPrice: 1299,
      hasSamePriceRenewal: false,
    };

    // Reserved or taken patterns in mock simulator
    const highValueReserved = ["google", "host", "cloud", "apple", "shroti", "amazon", "server", "domain", "ai", "microsoft", "meta"];
    const isTaken = sld.length < 4 || highValueReserved.includes(sld);

    // Build alternative suggestions
    const alternateExtensions = [".com", ".in", ".co.in", ".org", ".net"].filter((ext) => ext !== tldExt);
    const suggestions = alternateExtensions.map((altExt) => {
      const altTld = DOMAIN_TLDS.find((t) => t.extension === altExt);
      return {
        fullDomain: `${sld}${altExt}`,
        available: !highValueReserved.includes(sld),
        registrationPrice: altTld?.registrationPrice || 999,
        renewalPrice: altTld?.renewalPrice || 1099,
      };
    });

    return {
      domain: sld,
      extension: tldExt,
      fullDomain: `${sld}${tldExt}`,
      available: !isTaken,
      registrationPrice: tldConfig.registrationPrice,
      renewalPrice: tldConfig.renewalPrice,
      transferPrice: tldConfig.transferPrice,
      hasSamePriceRenewal: tldConfig.hasSamePriceRenewal,
      provider: this.isMock ? "mock" : (this.provider as "resellerclub" | "logicboxes"),
      verifiedAt: new Date().toISOString(),
      portalUrl: `https://portal.shrotihost.in/cart.php?a=add&domain=register&query=${sld}${tldExt}`,
      suggestions,
    };
  }
}

export const registrarService = new RegistrarService();

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { join } from "path";
import { addBusinessDays, toDateInputValue } from "@/lib/businessDays";

const DATA_DIR = join(process.cwd(), ".data");
const MOQ_MIN = 500;
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "hotmail.com",
  "hotmail.co.uk", "outlook.com", "live.com", "msn.com", "aol.com", "icloud.com",
  "mail.com", "protonmail.com", "proton.me", "yandex.com", "zoho.com", "gmx.com",
  "gmx.net", "mail.ru", "inbox.com", "me.com", "mac.com",
]);

function isFreeEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

function getMinDeliveryDate(): string {
  return toDateInputValue(addBusinessDays(new Date(), 15));
}
const LEADS_FILE = join(DATA_DIR, "leads.json");

interface LeadEntry {
  timestamp: string;
  type: string;
  payload: Record<string, unknown>;
}

const SALES_EMAIL = "sales@boylebags.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Boyle Bags <[email protected]>";
const LEADS_WEBHOOK_URL = process.env.LEADSWEBHOOKURL;

const isProduction =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist, ignore
  }
}

async function readLeads(): Promise<LeadEntry[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data) as LeadEntry[];
  } catch {
    return [];
  }
}

async function writeLeads(leads: LeadEntry[]) {
  await ensureDataDir();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

function formatLeadEmailBody(entry: LeadEntry, sourcePage: string): string {
  const payload = entry.payload;
  const typeLabel = entry.type === "custom" ? "Custom Quote" : "Contact";
  
  let body = "New Lead Received\n";
  body += `Type: ${typeLabel}\n`;
  body += `Submitted At: ${entry.timestamp}\n`;
  body += `Source Page: ${sourcePage}\n`;
  body += "\n";
  
  // Extract fields in the exact order specified
  const name = payload.name || payload.contactName || "";
  const company = payload.company || payload.companyName || "";
  const email = payload.email || payload.workEmail || "";
  const phone = payload.phone || payload.contactPhone || "";
  const bagType = payload.bagType || payload.productInterest || payload.style || "";
  const quantity = payload.quantity || "";
  const applicationUse = payload.applicationUse || payload.application || "";
  const deadline = payload.dueDate || payload.needByDate || payload.targetDeliveryDate || payload.timeline || "";
  const message = payload.message || payload.notes || payload.specificRequirements || "";
  const decorationMethod = payload.decorationType || payload.decorationMethod || "";

  if (name) body += `Name: ${name}\n`;
  if (company) body += `Company: ${company}\n`;
  if (email) body += `Email: ${email}\n`;
  if (phone) body += `Phone: ${phone}\n`;
  if (bagType) body += `Product Interest: ${bagType}\n`;
  if (applicationUse) body += `Application/Use: ${applicationUse}\n`;
  if (quantity) body += `Quantity: ${quantity}\n`;
  if (decorationMethod) body += `Decoration Method: ${decorationMethod}\n`;
  if (deadline) body += `Target Delivery / Deadline: ${deadline}\n`;
  if (message) {
    const messageLabel = entry.type === "contact" ? "Message" : "Notes / Specific Requirements";
    body += `${messageLabel}: ${message}\n`;
  }
  
  return body;
}

function getEmailSubject(type: string): string {
  if (type === "custom" || type === "rfq") {
    return "[BoyleBags] New Custom Quote Lead";
  }
  return "[BoyleBags] New Contact Message";
}

function getAutoReplyBody(): string {
  return `Thank you for contacting Boyle Bags.
We've received your request and our team will review it shortly.
For custom quotes, you can expect a response within 4 business hours.
If you have additional details or files to share, feel free to reply to this email.
– Boyle Bags
Southern California`;
}

async function sendEmailToSales(
  entry: LeadEntry,
  sourcePage: string
): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    // Dynamically import Resend if available
    // @ts-expect-error - Resend is optional, module may not be installed
    const resendModule = await import("resend").catch(() => null);
    if (!resendModule) {
      return { success: false, error: "Resend module not available" };
    }

    const { Resend } = resendModule;
    const resend = new Resend(resendApiKey);

    const subject = getEmailSubject(entry.type);
    const emailBody = formatLeadEmailBody(entry, sourcePage);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [SALES_EMAIL],
      subject,
      text: emailBody,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error: String(error) };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function sendAutoReply(
  userEmail: string
): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    // Dynamically import Resend if available
    // @ts-expect-error - Resend is optional, module may not be installed
    const resendModule = await import("resend").catch(() => null);
    if (!resendModule) {
      return { success: false, error: "Resend module not available" };
    }

    const { Resend } = resendModule;
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [userEmail],
      subject: "We received your request – Boyle Bags",
      text: getAutoReplyBody(),
    });

    if (error) {
      console.error("Resend auto-reply error:", error);
      return { success: false, error: String(error) };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send auto-reply via Resend:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function sendToWebhook(
  entry: LeadEntry,
  sourcePage: string,
  utm: Record<string, string>,
  referrer?: string
): Promise<{ success: boolean; error?: string }> {
  if (!LEADS_WEBHOOK_URL) {
    return { success: false, error: "LEADSWEBHOOKURL not configured" };
  }

  try {
    const webhookPayload = {
      timestamp: entry.timestamp,
      type: entry.type,
      page: sourcePage,
      utm: {
        source: utm.source || null,
        medium: utm.medium || null,
        campaign: utm.campaign || null,
        term: utm.term || null,
        content: utm.content || null,
      },
      referrer: referrer || null,
      data: entry.payload,
    };

    const response = await fetch("https://script.google.com/macros/s/AKfycbws0ZqFm678cWGHNaDQR3WJq4Fhq9ABv4uXzjSfe4cUJR3qEcD5e5A414gD4cxBhrXIXA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      return { success: false, error: `Webhook returned ${response.status}: ${errorText}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send to webhook:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function handleLeadInProduction(
  entry: LeadEntry,
  sourcePage: string,
  utm: Record<string, string>,
  referrer?: string
): Promise<{ success: boolean; error?: string; webhookStatus?: "ok" | "error" }> {
  // Send email to sales
  const salesEmailResult = await sendEmailToSales(entry, sourcePage);
  
  if (!salesEmailResult.success) {
    console.error("Failed to send email to sales:", salesEmailResult.error);
    // Log to console as fallback
    console.log("=== LEAD SUBMISSION ===");
    console.log(JSON.stringify(entry, null, 2));
    console.log("======================");
    return salesEmailResult;
  }

  // Send auto-reply to user
  const userEmail = entry.payload.email as string;
  if (userEmail) {
    const autoReplyResult = await sendAutoReply(userEmail);
    if (!autoReplyResult.success) {
      // Log error but don't fail the request
      console.error("Failed to send auto-reply:", autoReplyResult.error);
    }
  }

  // Send to webhook (non-blocking - don't fail if this fails)
  const webhookResult = await sendToWebhook(entry, sourcePage, utm, referrer);
  const webhookStatus = webhookResult.success ? "ok" : "error";
  
  if (!webhookResult.success) {
    console.error("Webhook failed (non-blocking):", webhookResult.error);
  }

  return { success: true, webhookStatus };
}

async function handleLeadInDevelopment(entry: LeadEntry): Promise<void> {
  const leads = await readLeads();
  leads.push(entry);
  await writeLeads(leads);
}

function extractUTMParams(url: string): Record<string, string> {
  try {
    // Handle both absolute and relative URLs
    const urlObj = url.startsWith("http") 
      ? new URL(url)
      : new URL(url, "https://boylebags.com");
    const utm: Record<string, string> = {};
    const utmParams = ["source", "medium", "campaign", "term", "content"];
    
    for (const param of utmParams) {
      const value = urlObj.searchParams.get(`utm_${param}`);
      if (value) {
        utm[param] = value;
      }
    }
    
    return utm;
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body.type;
    const payload = body.payload || body;
    
    // Extract UTM parameters and referrer from request
    // The referer header contains the full URL of the page that made the request
    const refererHeader = request.headers.get("referer") || "";
    const utm = extractUTMParams(refererHeader);
    // Extract clean referrer (domain only, for privacy) or full referrer if available
    let referrer: string | undefined;
    if (refererHeader) {
      try {
        const refererUrl = new URL(refererHeader);
        // Only include external referrers (not same domain)
        if (refererUrl.hostname !== "boylebags.com" && refererUrl.hostname !== "www.boylebags.com") {
          referrer = refererUrl.origin;
        }
      } catch {
        // Invalid URL, ignore
      }
    }
    
    // Determine source page
    const sourcePage = type === "custom" || type === "rfq" ? "/custom" : "/contact";
    
    // Validate required fields and qualification rules for custom/rfq
    if (type === "custom" || type === "rfq") {
      const email = (payload.email || payload.workEmail) as string | undefined;
      const quantity = payload.quantity;
      const dueDate = (payload.dueDate || payload.needByDate || payload.targetDeliveryDate || payload.timeline) as string | undefined;
      const productInterest = payload.productInterest || payload.bagType || payload.style;
      const applicationUse = payload.applicationUse;
      const company = payload.company || payload.companyName;

      if (!email || quantity == null || quantity === "" || !dueDate || !productInterest || !applicationUse || !company) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields: work email, quantity, target delivery date, product interest, application/use, company name." },
          { status: 400 }
        );
      }

      const qty = typeof quantity === "number" ? quantity : parseInt(String(quantity), 10);
      if (isNaN(qty) || qty < MOQ_MIN) {
        return NextResponse.json(
          { ok: false, error: "For orders under 500 units, please use our Sample Request form." },
          { status: 400 }
        );
      }

      const minDelivery = getMinDeliveryDate();
      if (dueDate < minDelivery) {
        return NextResponse.json(
          { ok: false, error: `Our guaranteed lead time requires delivery no sooner than ${minDelivery}.` },
          { status: 400 }
        );
      }

      if (isFreeEmail(email)) {
        return NextResponse.json(
          { ok: false, error: "Please use a work or corporate email address." },
          { status: 400 }
        );
      }

      if (String(company).trim().length < 2) {
        return NextResponse.json(
          { ok: false, error: "Company name must be at least 2 characters." },
          { status: 400 }
        );
      }
    } else if (type === "contact") {
      const name = payload.name;
      const email = payload.email;
      const message = payload.message;
      
      if (!name || !email || !message) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields: name, email, message" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { ok: false, error: "Invalid type. Must be 'custom', 'rfq', or 'contact'" },
        { status: 400 }
      );
    }
    
    const timestamp = new Date().toISOString();
    const entry = {
      timestamp,
      type,
      payload,
    };

    // Handle lead based on environment
    let webhookStatus: "ok" | "error" | undefined;
    if (isProduction) {
      const result = await handleLeadInProduction(entry, sourcePage, utm, referrer);
      if (!result.success) {
        // Log error server-side
        console.error("Failed to process lead in production:", result.error);
        // Return friendly error to user
        return NextResponse.json(
          { ok: false, error: "We encountered an issue sending your request. Please try again or contact us directly." },
          { status: 500 }
        );
      }
      webhookStatus = result.webhookStatus;
    } else {
      await handleLeadInDevelopment(entry);
      // In development, also try webhook if URL is set
      if (LEADS_WEBHOOK_URL) {
        const webhookResult = await sendToWebhook(entry, sourcePage, utm, referrer);
        webhookStatus = webhookResult.success ? "ok" : "error";
      }
    }

    return NextResponse.json({ ok: true, webhookStatus });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { ok: false, error: "We encountered an issue processing your request. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

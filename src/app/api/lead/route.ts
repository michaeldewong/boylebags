import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const LEADS_FILE = join(DATA_DIR, "leads.json");

interface LeadEntry {
  timestamp: string;
  type: string;
  payload: Record<string, unknown>;
}

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

async function sendEmailViaResend(entry: LeadEntry): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL;

  if (!resendApiKey || !toEmail) {
    return false;
  }

  try {
    // Dynamically import Resend if available
    // @ts-expect-error - Resend is optional, module may not be installed
    const resendModule = await import("resend").catch(() => null);
    if (!resendModule) {
      return false;
    }

    const { Resend } = resendModule;
    const resend = new Resend(resendApiKey);

    const subject = `New Lead: ${entry.type}`;
    const typeLabel =
      entry.type === "custom"
        ? "Custom RFQ"
        : entry.type === "contact"
          ? "Contact Form"
          : entry.type === "rfq"
            ? "RFQ"
            : entry.type;

    const emailBody = formatLeadEmail(entry, typeLabel);

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Boyle Bags <[email protected]>",
      to: [toEmail],
      subject,
      html: emailBody,
    });

    if (error) {
      console.error("Resend email error:", error);
      return false;
    }

    return true;
  } catch (error) {
    // Resend not installed or other error
    console.error("Failed to send email via Resend:", error);
    return false;
  }
}

function formatLeadEmail(entry: LeadEntry, typeLabel: string): string {
  const payload = entry.payload;
  let fields = "";

  for (const [key, value] of Object.entries(payload)) {
    const displayKey = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
    const displayValue =
      typeof value === "boolean" ? (value ? "Yes" : "No") : String(value || "");
    fields += `<tr><td style="padding: 8px; font-weight: bold;">${displayKey}:</td><td style="padding: 8px;">${displayValue}</td></tr>`;
  }

  return `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New ${typeLabel} Submission</h2>
        <p><strong>Timestamp:</strong> ${entry.timestamp}</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          ${fields}
        </table>
      </body>
    </html>
  `;
}

async function handleLeadInProduction(entry: LeadEntry): Promise<void> {
  // Try to send email via Resend first
  const emailSent = await sendEmailViaResend(entry);

  if (!emailSent) {
    // Fallback to console.log
    console.log("=== LEAD SUBMISSION ===");
    console.log(JSON.stringify(entry, null, 2));
    console.log("======================");
  }
}

async function handleLeadInDevelopment(entry: LeadEntry): Promise<void> {
  const leads = await readLeads();
  leads.push(entry);
  await writeLeads(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body.type;
    const payload = body.payload || body;
    
    // Validate required fields based on type
    if (type === "custom" || type === "rfq") {
      const name = payload.name || payload.contactName;
      const email = payload.email;
      const quantity = payload.quantity;
      const dueDate = payload.dueDate || payload.needByDate || payload.timeline;
      const bagType = payload.bagType || payload.style;
      
      if (!name || !email || !quantity || !dueDate || !bagType) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields: name, email, quantity, dueDate/timeline, bagType/style" },
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
    if (isProduction) {
      await handleLeadInProduction(entry);
    } else {
      await handleLeadInDevelopment(entry);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

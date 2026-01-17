import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.contactName || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Log the RFQ for now (in production, this would save to database/email)
    console.log("RFQ received:", body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error processing RFQ:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

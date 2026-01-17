import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Log the sample pack request for now (in production, this would save to database/email)
    console.log("Sample pack request received:", body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error processing sample pack request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

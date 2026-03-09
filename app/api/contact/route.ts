import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(req: NextRequest) {
  try {
    const { from_name, from_email, message } = await req.json();

    if (!from_name || !from_email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      { from_name, from_email, message },
      { 
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

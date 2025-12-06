import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import OfferEmailTemplate from "../ai-logo/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const OfferSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  offer: z.string().min(1),
  message: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = OfferSchema.parse(body);

    // Send email
    await resend.emails.send({
      from: process.env.OFFER_FROM_EMAIL!,
      to: process.env.OFFER_RECEIVER_EMAIL!,
      subject: `New Offer Received for Aiexor.com — $${parsed.offer}`,
      html: OfferEmailTemplate({
        name: parsed.name,
        email: parsed.email,
        offer: parsed.offer,
        message: parsed.message
      })
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Offer API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
  }
      

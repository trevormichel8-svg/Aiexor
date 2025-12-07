import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/logo-generator?sub=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/logo-generator?sub=cancel`,
    line_items: [
      {
        price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!,
        quantity: 1,
      },
    ],
  });

  return NextResponse.json({ url: session.url });
}


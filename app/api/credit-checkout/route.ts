import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { pack } = await req.json();

  const prices: any = {
    small: "price_small_credits",
    medium: "price_medium_credits",
    large: "price_large_credits",
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/logo-generator?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/logo-generator?cancel=1`,
    line_items: [
      {
        price: prices[pack],
        quantity: 1,
      },
    ],
  });

  return NextResponse.json({ url: session.url });
}


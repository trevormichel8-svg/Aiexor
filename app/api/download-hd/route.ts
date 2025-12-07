import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(req: Request) {
  const { genId } = await req.json();

  const user = await supabaseServer.auth.getUser();
  if (!user.user) return NextResponse.json({ error: "NOT_LOGGED_IN" });

  const { data: trial } = await supabaseServer
    .from("trials")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  if (trial && trial.used < 3) {
    return NextResponse.json({ error: "TRIAL_HD_BLOCKED" });
  }

  const { data: sub } = await supabaseServer
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  const pro = sub?.active === true;

  let creditsToUse = 0;

  if (!pro) {
    creditsToUse = 2; // HD always costs 2 credits unless PRO
    const { data: credits } = await supabaseServer
      .from("credits")
      .select("*")
      .eq("user_id", user.user.id)
      .single();

    if ((credits?.credits ?? 0) < creditsToUse) {
      return NextResponse.json({ error: "NO_CREDITS" });
    }

    await supabaseServer
      .from("credits")
      .update({ credits: credits.credits - creditsToUse })
      .eq("user_id", user.user.id);
  }

  // Fetch HD from Stability AI
  const hdImage = await fetchHD(genId);

  return NextResponse.json({
    success: true,
    url: `data:image/png;base64,${hdImage}`,
  });
}

async function fetchHD(genId: string) {
  // You already have your Stability AI key
  const resp = await fetch(
    "https://api.stability.ai/v2beta/image-to-image/hd",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_KEY}`,
      },
      body: JSON.stringify({ genId }),
    }
  );

  const json = await resp.json();
  return json.result_b64;
}


import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { generateLogo } from "@/lib/ai-engines";

export async function POST(req: Request) {
  const supabase = createServerSupabase({ cookies: {} });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json();
  const { prompt, engine } = body;

  // -----------------------------
  // GET TRIAL + CREDIT + SUB DATA
  // -----------------------------
  const { data: trial } = await supabase
    .from("trials")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: credits } = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const trialLimit = Number(process.env.NEXT_PUBLIC_TRIAL_LIMIT) || 3;

  // -----------------------------
  // TRIAL LOGIC (3 free logos)
  // -----------------------------
  if (!subscription?.active) {
    if (trial?.used >= trialLimit) {
      if (!credits || credits.credits_remaining <= 0) {
        return NextResponse.json({ error: "NO_CREDITS" }, { status: 402 });
      }
    }
  }

  // -----------------------------
  // GENERATE LOGO
  // -----------------------------
  const img = await generateLogo({ engine, prompt });

  // -----------------------------
  // SAVE GENERATION
  // -----------------------------
  const { data: generation } = await supabase
    .from("generations")
    .insert({
      user_id: user.id,
      low_res_url: img,
      engine,
      prompt,
    })
    .select()
    .single();

  // -----------------------------
  // CONSUME TRIAL OR CREDITS
  // -----------------------------
  if (!subscription?.active) {
    if (trial?.used < trialLimit) {
      await supabase.from("trials").update({ used: trial.used + 1 }).eq("user_id", user.id);
    } else {
      await supabase
        .from("credits")
        .update({
          credits_remaining: credits.credits_remaining - 1,
        })
        .eq("user_id", user.id);
    }
  }

  return NextResponse.json({
    success: true,
    generation,
  });
}
  

import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const supabase = createServerSupabase({ cookies: {} });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { genId } = await req.json();

  const { data: generation } = await supabase
    .from("generations")
    .select("*")
    .eq("id", genId)
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

  if (!subscription?.active && (!credits || credits.credits_remaining <= 0)) {
    return NextResponse.json({ error: "NO_PERMISSIONS" }, { status: 402 });
  }

  const hd = generation.hd_url || generation.low_res_url;

  if (!subscription?.active) {
    await supabase
      .from("credits")
      .update({
        credits_remaining: credits.credits_remaining - 1,
      })
      .eq("user_id", user.id);
  }

  return NextResponse.json({
    success: true,
    url: hd,
  });
}


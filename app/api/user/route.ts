import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const supabase = createServerSupabase({ cookies: {} });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { data: credits } = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: trial } = await supabase
    .from("trials")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return NextResponse.json({
    user,
    credits,
    trial,
    subscription,
  });
}

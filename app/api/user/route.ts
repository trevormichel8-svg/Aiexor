import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
  const user = await supabaseServer.auth.getUser();
  if (!user.user) return NextResponse.json({ user: null });

  const { data: credits } = await supabaseServer
    .from("credits")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  const { data: trial } = await supabaseServer
    .from("trials")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  const { data: sub } = await supabaseServer
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  const { data: history } = await supabaseServer
    .from("generations")
    .select("*")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    credits,
    trial,
    subscription: sub,
    history,
  });
    }

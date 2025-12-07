import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST() {
  const supabase = createServerSupabase({ cookies: {} });

  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
    }

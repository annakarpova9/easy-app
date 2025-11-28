import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { AppRoutes } from "@/lib/config/routes";
import { UserMessages } from "@/lib/config/messages";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${AppRoutes.TODOS}`);
    }

    return NextResponse.redirect(
      `${origin}${AppRoutes.LOGIN}?error=${encodeURIComponent(UserMessages.SYSTEM.AUTH_CODE_INVALID)}`,
    );
  }

  return NextResponse.redirect(`${origin}${AppRoutes.LOGIN}`);
}

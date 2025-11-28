import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/todos";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = "/login";

  if (!token || !type) {
    redirectTo.searchParams.set(
      "error",
      "Отсутствует токен или тип подтверждения.",
    );
    return NextResponse.redirect(redirectTo);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type: type as "signup",
    token_hash: token,
  });

  if (!error) {
    const successUrl = request.nextUrl.clone();
    successUrl.pathname = next;
    return NextResponse.redirect(successUrl);
  }

  // 5. ОШИБКА: Токен недействителен, истек и т.д.
  redirectTo.searchParams.set(
    "error",
    "Не удалось подтвердить адрес электронной почты. Попробуйте войти снова.",
  );
  return NextResponse.redirect(redirectTo);
}

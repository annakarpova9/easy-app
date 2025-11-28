import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { AppRoutes } from "@/lib/config/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  const pathname = request.nextUrl.pathname;

  const publicPaths = [
    AppRoutes.LOGIN,
    AppRoutes.SIGNUP,
    AppRoutes.AUTH_CALLBACK,
    AppRoutes.AUTH_RESET_PASSWORD,
    AppRoutes.AUTH_RESET_PASSWORD_CALLBACK,
    AppRoutes.RESET_PASSWORD_REQUEST,
  ];
  const isRootPath = pathname === AppRoutes.HOME;

  const startsWithPublicFolder = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  const isPublicPath = isRootPath || startsWithPublicFolder;

  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = AppRoutes.LOGIN;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

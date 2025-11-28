"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AppRoutes } from "@/lib/config/routes";
import { UserMessages } from "@/lib/config/messages";
import { getBaseUrl } from "@/lib/utils/get-base-url";
import { headers } from "next/headers";

type ActionResponse = { error?: string } | void;

export async function login(formData: FormData): Promise<ActionResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(AppRoutes.HOME, "layout");
  redirect(AppRoutes.TODOS);
}

export async function signup(formData: FormData): Promise<ActionResponse> {
  const supabase = await createClient();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const origin = (await headers()).get("origin") || getBaseUrl();

  if (!origin) {
    return { error: UserMessages.SYSTEM.URL_ORIGIN_MISSING };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
      emailRedirectTo: `${origin}${AppRoutes.AUTH_CALLBACK}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(
    `${AppRoutes.LOGIN}?message=` +
      encodeURIComponent(UserMessages.SUCCESS.SIGNUP),
  );
}

export async function logout(): Promise<ActionResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(UserMessages.ERROR.LOGOUT, error.message);
  }

  redirect(
    `${AppRoutes.LOGIN}?message=` +
      encodeURIComponent(UserMessages.SUCCESS.LOGOUT),
  );
}

export async function requestPasswordReset(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const origin = (await headers()).get("origin") || getBaseUrl();
  const redirectToUrl = `${origin}${AppRoutes.AUTH_RESET_PASSWORD_CALLBACK}`;

  if (!origin) {
    return { error: UserMessages.SYSTEM.URL_ORIGIN_MISSING };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectToUrl,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(
    `${AppRoutes.LOGIN}?message=` +
      encodeURIComponent(UserMessages.SUCCESS.PASSWORD_RESET_EMAIL_SENT),
  );
}

export async function updatePassword(
  newPassword: string,
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return;
}

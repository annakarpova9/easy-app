"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
    // return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    // redirect("/login?error=Could not authenticate");
  }

  revalidatePath("/", "layout");
  redirect("/todos");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (error) {
    return { error: error.message };
    // return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
    // redirect("/signup?error=Could not register");
  }

  // redirect("/login?message=Проверьте свою почту для подтверждения регистрации");
  redirect(
    "/login?message=" +
      encodeURIComponent("Проверьте свою почту для подтверждения регистрации"),
  );

  // revalidatePath("/", "layout");
  // redirect("/todos");
}

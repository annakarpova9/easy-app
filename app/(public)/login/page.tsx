"use client";

import { AuthMessages, LoginForm } from "@/components/shared";
import { Suspense } from "react";

export default function Page() {
  // useUrlToastMessages();

  return (
    <>
      <Suspense fallback={null}>
        <AuthMessages />
      </Suspense>
      <LoginForm />
    </>
  );
}

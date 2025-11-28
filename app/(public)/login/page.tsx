import { AuthMessages, LoginForm } from "@/components/shared";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthMessages />
      </Suspense>
      <LoginForm />
    </>
  );
}

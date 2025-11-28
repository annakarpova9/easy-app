import { AuthMessages, SignupForm } from "@/components/shared";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthMessages />
      </Suspense>
      <SignupForm />
    </>
  );
}

"use client";

import { FC, useTransition } from "react";
import { Button, Spinner } from "@/components/ui";
import { logout } from "@/lib/actions/auth";

export const LogoutButton: FC = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          logout();
        });
      }}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : "Выйти"}
    </Button>
  );
};

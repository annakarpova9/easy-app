"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useUrlToastMessages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const removeKey = searchParams.get("remove");

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error), {
        duration: 5000,
        position: "top-right",
      });
    }
    if (message) {
      toast.info(decodeURIComponent(message), {
        duration: 5000,
        position: "top-right",
      });
    }
  }, [error, message]);
}

"use client";

import { FC } from "react";
import { useUrlToastMessages } from "@/lib/hooks";

export const AuthMessages: FC = () => {
  useUrlToastMessages();
  return null;
};

import { FC } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn("flex w-full items-center justify-center py-6", className)}
    >
      <Logo isLink={false} size="sm" />
    </footer>
  );
};

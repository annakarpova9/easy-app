import { FC } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  sizeLogo?: "sm" | "md" | "lg";
  isLink?: boolean;
}

export const Footer: FC<FooterProps> = ({
  className,
  sizeLogo = "sm",
  isLink = false,
}) => {
  return (
    <footer
      className={cn("flex w-full items-center justify-center py-6", className)}
    >
      <Logo isLink={isLink} size={sizeLogo} />
    </footer>
  );
};

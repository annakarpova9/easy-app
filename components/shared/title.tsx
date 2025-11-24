import { createElement, FC } from "react";
import { cn } from "@/lib/utils";

type TitleSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface TitleProps {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: FC<TitleProps> = ({ size = "sm", className, text }) => {
  const mapTagBySize = {
    "2xs": "h6",
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const;

  const mapClassNameBySize = {
    "2xs": "text-[clamp(12px,1.5vw,14px)]",
    xs: "text-[clamp(14px,1.8vw,16px)]",
    sm: "text-[clamp(18px,2.2vw,22px)]",
    md: "text-[clamp(22px,2.6vw,26px)]",
    lg: "text-[clamp(26px,3vw,32px)]",
    xl: "text-[clamp(30px,3.5vw,36px)]",
    "2xl": "text-[clamp(36px,5vw,50px)]",
  };

  return createElement(
    mapTagBySize[size],
    { className: cn(mapClassNameBySize[size], className) },
    text,
  );
};

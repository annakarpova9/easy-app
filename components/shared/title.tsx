import { createElement, FC } from "react";
import { cn } from "@/lib/utils";

type TitleSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "hero";

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
    hero: "h1",
  } as const;

  //text-[clamp(MINpx,calc(MINpx + (MAX - MIN) * (100vw - 320px) / (768 - 320)),MAXpx)]

  const mapClassNameBySize = {
    "2xs":
      "text-[clamp(12px,calc(12px+2*(100vw-320px)/448),14px)] md:text-[14px]",
    xs: "text-[clamp(14px,calc(14px+2*(100vw-320px)/448),16px)] md:text-[16px]",
    sm: "text-[clamp(18px,calc(18px+4*(100vw-320px)/448),22px)] md:text-[22px]",
    md: "text-[clamp(22px,calc(22px+4*(100vw-320px)/448),26px)] md:text-[26px]",
    lg: "text-[clamp(26px,calc(26px+6*(100vw-320px)/448),32px)] md:text-[32px]",
    xl: "text-[clamp(30px,calc(30px+6*(100vw-320px)/448),36px)] md:text-[36px]",
    "2xl":
      "text-[clamp(32px,calc(32px+16*(100vw-320px)/448),48px)] md:text-[48px]",
    hero: "text-[clamp(45px,calc(45px+75*(100vw-320px)/448),120px)] md:text-[120px]",
  };

  return createElement(
    mapTagBySize[size],
    {
      className: cn(
        "text-gray-50 dark:text-gray-900",
        mapClassNameBySize[size],
        className,
      ),
    },
    text,
  );
};

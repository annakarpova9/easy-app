import Link from "next/link";
import { PawPrint } from "lucide-react";
import { AppRoutes } from "@/lib/config/routes";

interface LogoProps {
  className?: string;
  isLink?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "text-base h-8",
  md: "text-xl h-10",
  lg: "text-3xl h-14",
};

const mapSizeToIconSize = {
  sm: "16px",
  md: "20px",
  lg: "24px",
};

export const Logo = ({ className, isLink = true, size = "lg" }: LogoProps) => {
  const baseClasses = `flex items-center font-rubik font-bold ${sizeVariants[size]} ${className}`;

  const content = (
    <>
      <p className="self-start">Дела</p>
      <p className="self-end">Пса</p>
      <PawPrint size={mapSizeToIconSize[size]} />
    </>
  );

  if (isLink) {
    return (
      <Link
        href={AppRoutes.HOME}
        className={`${baseClasses} text-3xl hover:text-orange-500 hover:transition-colors duration-500`}
      >
        {content}
      </Link>
    );
  }
  return <div className={baseClasses}>{content}</div>;
};

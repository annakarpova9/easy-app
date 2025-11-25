import { Inter, Fira_Code, Rubik_Mono_One } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const rubik = Rubik_Mono_One({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
  weight: ["400"],
});

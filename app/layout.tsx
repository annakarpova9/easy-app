import type { Metadata } from "next";
import "./globals.css";
import { firaCode, inter, rubik } from "@/app/ui/fonts";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: {
    template: "%s | Easy Next App",
    default: "Easy Next App",
  },
  description: "My easy app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} ${rubik.variable} antialiased flex min-h-screen font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

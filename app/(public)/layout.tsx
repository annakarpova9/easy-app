"use client";

import { Footer, ThemeToggle } from "@/components/shared";
import Image from "next/image";
import BackgroundImage from "@/public/images/main-background.jpg";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui";

const MIN_LOAD_TIME_MS = 1600;
const MAX_LOAD_TIME_MS = 5000;

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minTimeTimer = setTimeout(() => {
      if (imageLoaded) {
        setIsLoading(false);
      }
    }, MIN_LOAD_TIME_MS);

    return () => {
      clearTimeout(minTimeTimer);
    };
  }, [imageLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && !imageLoaded) {
        setIsLoading(false);
      }
    }, MAX_LOAD_TIME_MS);
    return () => clearTimeout(timer);
  }, [isLoading, imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-zinc-50 dark:bg-black">
      <Image
        src={BackgroundImage}
        alt="Фон главной страницы"
        fill
        quality={75}
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 
          ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={handleImageLoad}
      />

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-50 dark:bg-black">
          <Spinner className="size-20" />
        </div>
      )}

      <div
        className={`relative z-20 w-full flex-grow flex flex-col items-center dark:bg-gray-800/10
        ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700 delay-300"}`}
      >
        <ThemeToggle className="absolute top-2 right-2" />
        <main className="flex-grow w-full">{children}</main>
        <Footer sizeLogo="lg" isLink />
      </div>
    </div>
  );
}

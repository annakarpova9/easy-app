"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui";
import { FC, useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Sun className="opacity-0" />
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleTheme}
      className={className}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
};

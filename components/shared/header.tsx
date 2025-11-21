import { Button } from "@/components/ui";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between pt-6">
      <Logo size="md" className="sm:text-3xl sm:h-14" />
      <div className="flex justify-center items-center gap-3">
        <ThemeToggle />
        <Button>Войти</Button>
      </div>
    </header>
  );
};

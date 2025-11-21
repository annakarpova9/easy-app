import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center py-6">
      <Logo isLink={false} size="sm" />
    </footer>
  );
};

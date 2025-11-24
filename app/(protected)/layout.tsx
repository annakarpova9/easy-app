import { Header, Footer } from "@/components/shared";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl gap-5 mx-auto px-5 sm:px-10 sm:gap-16 sm:items-start bg-zinc-50 dark:bg-black">
      <Header />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}

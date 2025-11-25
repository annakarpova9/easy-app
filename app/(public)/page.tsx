import { Title } from "@/components/shared";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function Page() {
  return (
    <section className="w-full h-full font-rubik text-gray-900">
      <div className="max-w-3xl h-full my-0 mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <Title text="Твои собачьи дела" size="hero" className="font-bold" />
        <Button asChild size="lg" className="text-xl w-full">
          <Link href="/login">Войти</Link>
        </Button>
      </div>
    </section>
  );
}

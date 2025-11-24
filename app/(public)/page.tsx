import { Title } from "@/components/shared";
import { Button } from "@/components/ui";

export default function Page() {
  return (
    <section className="flex justify-center items-center w-full h-full m-auto font-rubik px-6">
      <div className="flex flex-col items-center gap-16 bg-blue-100/50 rounded-lg px-10 py-16">
        <Title
          text="Твои собачьи дела"
          size="2xl"
          className="font-extrabold text-gray-900 text-center"
        />
        <Button size="lg" className="text-xl">
          Войти
        </Button>
      </div>
    </section>
  );
}

import { FC } from "react";
import { TodosProps } from "@/lib/mock/todos";
import { TodoItem } from "@/components/shared/todo-item";
import { cn } from "@/lib/utils";
import { Title } from "@/components/shared/title";
import { Bone } from "lucide-react";

interface TodoListProps {
  todos: TodosProps[];
  className?: string;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  className,
  onToggle,
  onRemove,
}) => {
  if (todos.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-14 mt-10">
        <Title
          text={`Все дела сделаны.\n\nКто здесь хороший мальчик?`}
          size="lg"
          className="font-rubik text-center whitespace-pre-wrap"
        ></Title>
        <Bone size="80px" />
      </div>
    );
  }

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

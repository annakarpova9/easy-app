import { FC } from "react";
import { TodosProps } from "@/lib/mock/todos";
import { Button, Checkbox, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TodoItemProps {
  item: TodosProps;
  className?: string;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  item,
  className,
  onToggle,
  onRemove,
}) => {
  return (
    <li
      className={cn(
        "flex items-center justify-between bg-gray-200 dark:bg-gray-900 rounded-sm px-2 min-h-10",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          id={item.id + item.text}
          checked={item.completed}
          onCheckedChange={() => onToggle(item.id)}
        />
        <Label
          htmlFor={item.id + item.text}
          className={cn(
            "text-lg transition-all duration-300",
            item.completed && "text-gray-400 dark:text-gray-600",
            !item.completed && "hover:translate-[-2px]",
          )}
        >
          {item.text}
        </Label>
      </div>
      <Button
        onClick={() => onRemove(item.id)}
        variant="ghost"
        size="icon-sm"
        className="group hover:bg-transparent dark:hover:bg-transparent"
      >
        <X
          className={cn(
            "size-5 text-red-500",
            "transition-transform duration-500",
            "group-hover:animate-bounce-rotate",
          )}
        />
      </Button>
    </li>
  );
};

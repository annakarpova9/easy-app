"use client";

import { FC, useState } from "react";
import { mockTodos, placeholderTodos } from "@/lib/mock/todos";
import { Filters, Title, TodoList } from "@/components/shared";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTypingEffect } from "@/lib/hooks";

interface TodoProps {
  className?: string;
}

export const Todo: FC<TodoProps> = ({ className }) => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(mockTodos);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const placeholderRef = useTypingEffect(placeholderTodos);

  const handleAddTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text[0].toUpperCase() + text.slice(1),
        completed: false,
      },
    ]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "done") return todo.completed;
    return true;
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Title
        size="xl"
        text="Список твоих собачьих дел"
        className="font-bold font-rubik"
      />
      <div className="flex items-center gap-4">
        <Input
          ref={placeholderRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        <Button onClick={handleAddTodo}>Добавить</Button>
      </div>
      <Filters onChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
      />
    </div>
  );
};

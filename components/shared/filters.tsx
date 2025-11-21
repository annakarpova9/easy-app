import { FC } from "react";
import { Select } from "@/components/ui";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  onChange: (value: "all" | "active" | "done") => void;
  className?: string;
}

const filters = [
  { id: 1, title: "Все", slug: "all" },
  { id: 2, title: "Активные", slug: "active" },
  { id: 3, title: "Завершенные", slug: "done" },
];

export const Filters: FC<FiltersProps> = ({ onChange, className }) => {
  return (
    <Select onValueChange={(val) => onChange(val as any)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Фильтр" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className={className}>
          {filters.map((filter) => (
            <SelectItem key={filter.id} value={filter.slug}>
              {filter.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

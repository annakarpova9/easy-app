export interface TodosProps {
  id: number;
  text: string;
  completed: boolean;
}

export const mockTodos: TodosProps[] = [
  { id: 1, text: "Помыть свои собачьи лапы", completed: false },
  { id: 2, text: "Протитосить всю прогулку", completed: true },
  { id: 3, text: "Не есть еду, но есть еду", completed: false },
  { id: 4, text: "Лизать подхвостье до красноты", completed: false },
  { id: 5, text: "Кусать руку кормящего", completed: false },
  { id: 6, text: "Не давать коту прохода", completed: true },
  { id: 7, text: "Сделать вид, что не боишься кошку", completed: false },
  { id: 8, text: "Радоваться человекам(любым)", completed: true },
];

export const placeholderTodos: string[] = [
  "помыть под хвостом",
  "облаять всех на прогулке",
  "украсть чужой корм",
  "быть булкой и не слушаться",
  "сожрать говно и ни о чем не жалеть",
  "устроить побег, но не точно",
  "ждать сухарики и не есть корм",
  "побыть статуэткой у врача",
  "не слушать мать",
  "быть миленькой пока спишь(и не спишь)",
];

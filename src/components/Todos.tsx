import { useTodosByIds, useTodosIds } from "../services/queries";
import TodoCard from "./TodoCard";

export default function Todos() {
  const todosIds = useTodosIds();
  const todos = useTodosByIds(todosIds.data);

  return (
    <main className="container mx-auto p-4 md:p-10">
      <h1 className="text-4xl font-semibold">Todos</h1>

      <div className="flex flex-col gap-4 py-8">
        {todos.map(({ data: todo }) => (
          <TodoCard key={todo?.id ?? crypto.randomUUID()} todo={todo} />
        ))}
      </div>
    </main>
  );
}

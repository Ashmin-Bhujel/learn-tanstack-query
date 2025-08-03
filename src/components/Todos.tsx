import { useTodos, useTodosIds } from "../services/queries";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";

export default function Todos() {
  const todosIds = useTodosIds();
  const todos = useTodos(todosIds.data);

  return (
    <main className="mx-auto max-w-2xl p-4 md:p-10">
      <h1 className="text-4xl font-bold">Learning Tanstack Query</h1>

      {/* Todo form */}
      <section className="my-16 space-y-6">
        <h2 className="text-2xl font-semibold">Todo Form</h2>
        <TodoForm />
      </section>

      {/* Todo list */}
      <section className="my-8 space-y-6">
        <h2 className="text-2xl font-semibold">Todo List</h2>
        <div className="space-y-6">
          {todos && todos.length > 0 ? (
            todos.map(({ data: todo }) => (
              <TodoCard key={todo?.id ?? crypto.randomUUID()} todo={todo} />
            ))
          ) : (
            <p className="text-center text-neutral-400">
              Create a todo to get started
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

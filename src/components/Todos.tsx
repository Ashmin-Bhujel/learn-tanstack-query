import { useTodosIds } from "../services/queries";

export default function Todos() {
  const todosIds = useTodosIds();

  if (todosIds.isPending)
    return (
      <main className="container mx-auto p-4 md:p-10">
        <h1 className="text-4xl font-semibold">Fetching Data...</h1>
      </main>
    );

  if (todosIds.isError)
    return (
      <main className="container mx-auto p-4 md:p-10">
        <h1 className="text-4xl font-semibold">Failed to get data!</h1>
      </main>
    );

  return (
    <main className="container mx-auto p-4 md:p-10">
      <h1 className="text-4xl font-semibold">Todos IDs</h1>

      <div>
        {todosIds.data.map((todoId) => (
          <p key={todoId}>ID: {todoId}</p>
        ))}
      </div>
    </main>
  );
}

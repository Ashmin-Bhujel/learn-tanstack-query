import type { Todo } from "../types/todo";

export default function TodoCard({ todo }: { todo: Todo | undefined }) {
  return (
    <div className="rounded-md bg-neutral-800 p-4">
      <p className="text-xl font-medium">{todo?.title}</p>
      <p className="text-base text-neutral-400">{todo?.description}</p>
    </div>
  );
}

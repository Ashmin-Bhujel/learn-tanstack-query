import { cn } from "../lib/utils";
import { useUpdateChecked } from "../services/mutations";
import type { Todo } from "../types/todo";

export default function TodoCard({ todo }: { todo: Todo | undefined }) {
  const updateCheckedMutation = useUpdateChecked();

  return (
    <div className="rounded-md bg-neutral-800 p-4">
      <p className={cn("text-xl font-medium", todo?.checked && "line-through")}>
        {todo?.title}
      </p>
      <p
        className={cn(
          "text-base text-neutral-400",
          todo?.checked && "line-through"
        )}
      >
        {todo?.description}
      </p>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => {
            if (todo) {
              updateCheckedMutation.mutate({
                id: todo?.id,
                checked: !todo?.checked,
              });
            }
          }}
          className={cn(
            "flex-1 cursor-pointer rounded-sm p-2 text-sm font-medium",
            todo?.checked
              ? "bg-sky-700 hover:bg-sky-600 active:bg-sky-800"
              : "bg-green-700 hover:bg-green-600 active:bg-green-800"
          )}
        >
          {todo?.checked ? "Mark undone" : "Mark done"}
        </button>
        <button className="flex-1 cursor-pointer rounded-sm bg-red-700 p-2 text-sm font-medium hover:bg-red-600 active:bg-red-800">
          Delete
        </button>
      </div>
    </div>
  );
}

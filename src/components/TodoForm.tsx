import { useForm } from "react-hook-form";
import type { Todo } from "../types/todo";
import { useCreateTodo } from "../services/mutations";
import { cn } from "../lib/utils";

export default function TodoForm() {
  const createTodoMutation = useCreateTodo();

  const todoForm = useForm<Todo>({
    defaultValues: {
      id: "",
      title: "",
      description: "",
      checked: false,
    },
  });

  function handleTodoFormSubmit(data: Todo) {
    if (data.title.trim() && data.description.trim()) {
      const newTodo = { ...data, id: crypto.randomUUID() };
      createTodoMutation.mutate(newTodo);
      todoForm.reset();
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      id="todo-form"
      onSubmit={todoForm.handleSubmit(handleTodoFormSubmit)}
    >
      <input
        type="text"
        id="todo-title"
        placeholder="Enter todo title"
        {...todoForm.register("title")}
        className="rounded-md bg-neutral-800 px-4 py-2 text-base"
      />
      <input
        type="text"
        id="todo-description"
        placeholder="Enter todo description"
        {...todoForm.register("description")}
        className="rounded-md bg-neutral-800 px-4 py-2 text-base"
      />
      <button
        type="submit"
        form="todo-form"
        disabled={createTodoMutation.isPending}
        className={cn(
          "cursor-pointer rounded-md px-4 py-2 font-medium",
          createTodoMutation.isPending
            ? "bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-800"
            : "bg-sky-700 hover:bg-sky-600 active:bg-sky-800"
        )}
      >
        {createTodoMutation.isPending ? "Creating" : "Create"}
      </button>
    </form>
  );
}

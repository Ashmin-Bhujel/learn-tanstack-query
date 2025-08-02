import { useForm } from "react-hook-form";
import type { Todo } from "../types/todo";
import { useCreateTodo } from "../services/mutations";

export default function TodoForm() {
  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<Todo>({
    defaultValues: {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      checked: false,
    },
  });

  function handleTodoFormSubmit(data: Todo) {
    if (data.title.trim() && data.description.trim()) {
      createTodoMutation.mutate(data);
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      id="todo-form"
      onSubmit={handleSubmit(handleTodoFormSubmit)}
    >
      <input
        type="text"
        id="todo-title"
        placeholder="Enter todo title"
        {...register("title")}
        className="rounded-md bg-neutral-800 px-4 py-2 text-base"
      />
      <input
        type="text"
        id="todo-description"
        placeholder="Enter todo description"
        {...register("description")}
        className="rounded-md bg-neutral-800 px-4 py-2 text-base"
      />
      <button
        type="submit"
        form="todo-form"
        disabled={createTodoMutation.isPending}
        className={`cursor-pointer rounded-md px-4 py-2 ${createTodoMutation.isPending ? "bg-neutral-800" : "bg-sky-700"} hover:bg-sky-600 active:bg-sky-800`}
      >
        {createTodoMutation.isPending ? "Creating" : "Create"}
      </button>
    </form>
  );
}

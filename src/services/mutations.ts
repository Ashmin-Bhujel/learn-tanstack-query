import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateChecked } from "./api";
import type { Todo } from "../types/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onSettled: async (_, error) => {
      if (error) {
        console.error("Failed to create new todo:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todosIds"],
        });
      }
    },
  });
}

export function useUpdateChecked() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, checked }: { id: string; checked: boolean }) =>
      updateChecked(id, checked),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.error("Failed to updated checked status:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos", { id: variables.id }],
        });
      }
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "./api";
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

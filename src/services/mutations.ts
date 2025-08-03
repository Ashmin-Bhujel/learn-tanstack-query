import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateCheckedStatus } from "./api";
import type { Todo } from "../types/todo";

// Create todo
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

// Update checked status
export function useUpdateCheckedStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, checked }: { id: string; checked: boolean }) =>
      updateCheckedStatus(id, checked),
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

// Delete todo
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log("Failed to delete the todo:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todosIds"],
        });
      }
    },
  });
}

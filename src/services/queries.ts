import { getTodo, getTodosIds } from "./api";
import { useQueries, useQuery } from "@tanstack/react-query";

// Get todos IDs
export function useTodosIds() {
  return useQuery({
    queryKey: ["todosIds"],
    queryFn: getTodosIds,
  });
}

// Get todos
export function useTodos(ids: string[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todos", { id }],
        queryFn: () => getTodo(id),
      };
    }),
  });
}

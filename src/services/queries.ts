import { getTodoById, getTodosIds } from "./api";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todosIds"],
    queryFn: getTodosIds,
  });
}

export function useTodosByIds(ids: string[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todos", { id }],
        queryFn: () => getTodoById(id),
      };
    }),
  });
}

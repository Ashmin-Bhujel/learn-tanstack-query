import axios from "axios";
import type { Todo } from "../types/todo";

// Configure axios
const BASE_URL = "http://localhost:5000";
const axiosInstance = axios.create({ baseURL: BASE_URL });

// Get todos IDs
export async function getTodosIds() {
  return (await axiosInstance.get<Todo[]>("/todos")).data.map(
    (todo) => todo.id
  );
}

// Get todo by ID
export async function getTodo(id: string) {
  return (await axiosInstance.get<Todo>(`/todos/${id}`)).data;
}

// Create todo
export async function createTodo(data: Todo) {
  return (await axiosInstance.post<Todo>("/todos", data)).data;
}

// Update checked with todo ID
export async function updateCheckedStatus(id: string, checked: boolean) {
  return (await axiosInstance.patch<Todo>(`/todos/${id}`, { checked })).data;
}

// Delete todo by ID
export async function deleteTodo(id: string) {
  return (await axiosInstance.delete<Todo>(`/todos/${id}`)).data;
}

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
export async function getTodoById(id: string) {
  return (await axiosInstance.get<Todo>(`/todos/${id}`)).data;
}

// Create todo
export async function createTodo(data: Todo) {
  return (await axiosInstance.post<Todo>("/todos", data)).data;
}

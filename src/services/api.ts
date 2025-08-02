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

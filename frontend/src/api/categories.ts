import { api } from "./axios";

export type Category = {
  id: number;
  name: string;
  kind: "income" | "expense";
};

export function getCategories(kind?: "income" | "expense") {
  return api.get<Category[]>("/categories", { params: kind ? { kind } : {} });
}

export function createCategory(data: { name: string; kind: "income" | "expense" }) {
  return api.post<Category>("/categories", { category: data });
}
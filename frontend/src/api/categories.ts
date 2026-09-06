import { api } from "./axios";
import type { Category, CategoryKind } from "../types/category";

export function getCategories(kind?: CategoryKind) {
  return api.get<Category[]>("/api/v1/categories", { params: kind ? { kind } : {} });
}

export function createCategory(data: { name: string; kind: CategoryKind }) {
  return api.post<Category>("/api/v1/categories", { category: data });
}
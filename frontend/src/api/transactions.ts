import { api } from "./axios";

export function createTransaction() {
  return api.post("/api/v1/transactions")
}

export function updateTransaction() {
  return api.put("/api/v1/transactions")
}

export function deleteTransaction() {
  return api.delete("/api/v1/transactions")
}
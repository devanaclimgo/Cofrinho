import { api } from "./axios";

export function createTransaction(transaction: { price: number; months: string }) {
  return api.post("/api/v1/transactions", transaction)
}

export function getTransactions() {
  return api.get("/api/v1/transactions")
}

export function updateTransaction(id: string, transaction: { price: number; months: string }) {
  return api.put(`/api/v1/transactions/${id}`, transaction)
}

export function deleteTransaction(id: string) {
  return api.delete(`/api/v1/transactions/${id}`)
}
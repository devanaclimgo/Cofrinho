import type { Transaction } from "../lib/data";
import { api } from "./axios";

export function createTransaction(transaction: { price: number; months: string }) {
  return api.post<Transaction>("/api/v1/transactions", transaction)
}

export function getTransactions() {
  return api.get<Transaction[]>("/api/v1/transactions")
}

export function updateTransaction(id: string, transaction: { price: number; months: string }) {
  return api.put<Transaction>(`/api/v1/transactions/${id}`, transaction)
}

export function deleteTransaction(id: string) {
  return api.delete<Transaction>(`/api/v1/transactions/${id}`)
}
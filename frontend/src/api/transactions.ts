import type { TransactionResponse } from "../lib/data";
import { api } from "./axios";

export function createTransaction(transaction: { price: number; months: string; walletId: string }) {
  return api.post<TransactionResponse>("/api/v1/transactions", transaction)
}

export function getTransactions() {
  return api.get<TransactionResponse[]>("/api/v1/transactions")
}

export function updateTransaction(id: string, transaction: { price: number; months: string; walletId: string }) {
  return api.put<TransactionResponse>(`/api/v1/transactions/${id}`, transaction)
}

export function deleteTransaction(id: string) {
  return api.delete<TransactionResponse>(`/api/v1/transactions/${id}`)
}
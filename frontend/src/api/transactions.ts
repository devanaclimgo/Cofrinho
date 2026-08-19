import type { TransactionResponse } from "../lib/data";
import { api } from "./axios";

export interface TransactionPayload {
  description: string;
  amount: number;
  category: string;
  kind: "expense" | "income";
  status?: "completed" | "pending" | "scheduled";
  transaction_date: string;
  wallet_id: string;
  card_id?: string;
}

export function createTransaction(transaction: TransactionPayload) {
  return api.post<TransactionResponse>("/api/v1/transactions", transaction);
}

export function getTransactions() {
  return api.get<TransactionResponse[]>("/api/v1/transactions");
}

export function updateTransaction(
  id: string,
  transaction: Partial<TransactionPayload>,
) {
  return api.put<TransactionResponse>(
    `/api/v1/transactions/${id}`,
    transaction,
  );
}

export function deleteTransaction(id: string) {
  return api.delete<void>(`/api/v1/transactions/${id}`);
}
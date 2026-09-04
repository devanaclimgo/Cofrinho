import type { TransactionPayload, TransactionResponse } from "../types/transaction";
import { api } from "./axios";

type Id = number | string;

export function createTransaction(transaction: TransactionPayload) {
  return api.post<TransactionResponse>("/api/v1/transactions", transaction);
}

export function getTransactions() {
  return api.get<TransactionResponse[]>("/api/v1/transactions");
}

export function getTransaction(id: Id) {
  return api.get<TransactionResponse>(`/api/v1/transactions/${id}`);
}

export function updateTransaction(
  id: Id,
  transaction: Partial<TransactionPayload>,
) {
  return api.put<TransactionResponse>(
    `/api/v1/transactions/${id}`,
    transaction,
  );
}

export function deleteTransaction(id: Id) {
  return api.delete<void>(`/api/v1/transactions/${id}`);
}

export type TransactionStatus = "completed" | "pending" | "scheduled";
export type TransactionKind = "expense" | "income";

export interface TransactionPayload {
  description: string;
  amount: number;
  category_id: number;
  wallet_id: string;
  kind: TransactionKind;
  status: TransactionStatus;
  transaction_date: string;
  installments?: number;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  category: string;
  category_id: number;
  description: string;
  kind: "income" | "expense";
  wallet_id: string;
  transaction_date: string;
  status: TransactionStatus;
}

export type TransactionStatus = "completed" | "pending" | "scheduled";
export type TransactionKind = "expense" | "income";

export interface TransactionPayload {
  description: string;
  amount: number;
  category: number;
  wallet_id: string;
  kind: TransactionKind;
  status: TransactionStatus;
  transaction_date: string;
  installments?: number;
}
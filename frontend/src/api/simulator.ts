import { api } from "./axios";

export function simulateTransaction(transaction: { price: number; months: string, cardId: string }) {
  return api.post("/api/v1/simulate", transaction)
}
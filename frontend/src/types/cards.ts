export interface Card {
  id: number;
  name: string;
  type: "credit" | "debit";
  last4: string;
  balance: number;
  limit?: number;
  color: string;
}

export interface Cards {
  cards: Card[];
}
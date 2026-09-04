import type { TranslationKey } from "../i18n/translations";

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

export interface TransactionResponse {
  id: number;
  amount: number;
  category: TranslationKey;
  description: string;
  kind: "income" | "expense";
  wallet_id: string;
  transaction_date: string;
  icon: string;
  status: "completed" | "pending" | "scheduled";
}

export const transactions: TransactionResponse[] = [
  {
    id: 1,
    description: "Salário",
    category: "category.salary",
    kind: "income",
    amount: 7200,
    wallet_id: "w2",
    transaction_date: "2026-07-05",
    icon: "briefcase",
    status: "completed",
  },
  {
    id: 2,
    description: "Supermercado Pão de Açúcar",
    category: "category.food",
    kind: "expense",
    amount: 432.5,
    wallet_id: "w1",
    transaction_date: "2026-07-09",
    icon: "shopping-cart",
    status: "completed",
  },
  {
    id: 3,
    description: "Uber",
    category: "category.transport",
    kind: "expense",
    amount: 28.9,
    wallet_id: "w1",
    transaction_date: "2026-07-10",
    icon: "car",
    status: "completed",
  },
  {
    id: 4,
    description: "Aluguel",
    category: "category.housing",
    kind: "expense",
    amount: 1850,
    wallet_id: "w2",
    transaction_date: "2026-07-08",
    icon: "home",
    status: "completed",
  },
  {
    id: 5,
    description: "Netflix",
    category: "category.subscription",
    kind: "expense",
    amount: 44.9,
    wallet_id: "w1",
    transaction_date: "2026-07-11",
    icon: "clapperboard",
    status: "completed",
  },
  {
    id: 6,
    description: "Projeto freelance",
    category: "category.freelance",
    kind: "income",
    amount: 1500,
    wallet_id: "w2",
    transaction_date: "2026-07-07",
    icon: "laptop",
    status: "completed",
  },
  {
    id: 7,
    description: "Academia",
    category: "category.health",
    kind: "expense",
    amount: 99.9,
    wallet_id: "w2",
    transaction_date: "2026-07-06",
    icon: "dumbbell",
    status: "completed",
  },
  {
    id: 8,
    description: "Cinema",
    category: "category.entertainment",
    kind: "expense",
    amount: 68,
    wallet_id: "w3",
    transaction_date: "2026-07-04",
    icon: "film",
    status: "completed",
  },
  {
    id: 9,
    description: "Curso de inglês",
    category: "category.education",
    kind: "expense",
    amount: 320,
    wallet_id: "w2",
    transaction_date: "2026-07-12",
    icon: "graduation-cap",
    status: "completed",
  },
  {
    id: 10,
    description: "Amazon",
    category: "category.shopping",
    kind: "expense",
    amount: 259.9,
    wallet_id: "w1",
    transaction_date: "2026-07-03",
    icon: "package",
    status: "completed",
  },
  {
    id: 11,
    description: "Rendimento Tesouro",
    category: "category.investment",
    kind: "income",
    amount: 210.4,
    wallet_id: "w5",
    transaction_date: "2026-07-02",
    icon: "trending-up",
    status: "completed",
  },
  {
    id: 12,
    description: "Farmácia",
    category: "category.health",
    kind: "expense",
    amount: 87.3,
    wallet_id: "w3",
    transaction_date: "2026-07-01",
    icon: "cross",
    status: "completed",
  },
];

export type WalletType = "credit" | "debit" | "cash" | "savings" | "investment";

export type Wallet = {
  id: string;
  name: string;
  wallet_type: WalletType;
  balance: number;
  limit?: number;
  used?: number;
  last4?: string;
  color?: string;
  icon?: string;
};

export const wallets: Wallet[] = [
  {
    id: "w1",
    name: "Nubank",
    wallet_type: "credit",
    balance: 0,
    limit: 8000,
    used: 2340,
    color: "#8B5CF6",
    icon: "credit-card",
  },
  {
    id: "w2",
    name: "Conta Corrente",
    wallet_type: "debit",
    balance: 4820,
    color: "#2563EB",
    icon: "landmark",
  },
  {
    id: "w3",
    name: "Carteira",
    wallet_type: "cash",
    balance: 350,
    color: "#10B981",
    icon: "wallet",
  },
  {
    id: "w4",
    name: "Poupança",
    wallet_type: "savings",
    balance: 12500,
    color: "#F59E0B",
    icon: "piggy-bank",
  },
  {
    id: "w5",
    name: "Tesouro Direto",
    wallet_type: "investment",
    balance: 28900,
    color: "#EC4899",
    icon: "trending-up",
  },
  {
    id: "w6",
    name: "Inter",
    wallet_type: "credit",
    balance: 0,
    limit: 5000,
    used: 780,
    color: "#F97316",
    icon: "credit-card",
  },
];

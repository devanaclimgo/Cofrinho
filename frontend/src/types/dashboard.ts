import type { TransactionPayload } from "./transaction";
import type { WishlistItem } from "./wishlist";

export interface Wallet {
  id: number;
  name: string;
  type: "checking" | "cash" | "savings" | "investment" | "credit";
  balance: number;
  color: string;
  last4?: string;
}

export interface DashboardData {
  summary: {
    balance: number;
    income: number;
    expenses: number;
    savings: number;
  };
  wallets: Wallet[];
  transactions: TransactionPayload[];
  wishlist: WishlistItem[];
  forecast: { m: string; balance: number }[];
}

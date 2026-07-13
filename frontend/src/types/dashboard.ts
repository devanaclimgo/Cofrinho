export interface Summary {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
}

export interface Forecast {
  month: string;
  balance: number;
}

export interface Wallet {
  id: number;
  name: string;
  type: "credit" | "cash" | "bank" | "investment" | "savings";
  color: string;
  balance: number;
  last4?: string;
}

export interface Transaction {
  id: number;
  title: string;
  category: string;
  wallet: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  store: string;
  price: number;
  verdict: "buy" | "wait" | "no";
}

export interface Dashboard {
  summary: Summary;
  forecast: Forecast[];
  wallets: Wallet[];
  transactions: Transaction[];
  wishlist: WishlistItem[];
}

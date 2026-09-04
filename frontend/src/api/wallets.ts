import { api } from "./axios";

export type Wallet = {
  id: number;
  name: string;
  wallet_type: string;
  balance: number;
  limit?: number;
  last4?: string;
  color?: string;
};

export function getWallets() {
  return api.get<Wallet[]>("/wallets");
}

export function createWallet(data: Partial<Wallet>) {
  return api.post<Wallet>("/wallets", { wallet: data });
}

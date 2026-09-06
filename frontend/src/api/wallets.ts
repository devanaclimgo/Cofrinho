import { api } from "./axios";
import type { Wallet } from "../types/wallet";

type Id = number | string;

export function getWallets() {
  return api.get<Wallet[]>("/wallets");
}

export function createWallet(data: Partial<Wallet>) {
  return api.post<Wallet>("/wallets", { wallet: data });
}

export function updateWallet(id: Id, wallet: Partial<Wallet>) {
  return api.put<Wallet>(`/api/v1/wallets/${id}`, wallet);
}

export function deleteWallet(id: Id) {
  return api.delete<void>(`/api/v1/wallets/${id}`);
}

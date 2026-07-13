import type { Wallet } from "../lib/data";
import { api } from "./axios";

export function getWallets() {
  return api.get<Wallet[]>("/api/v1/wallets");
}

export function createWallet(wallet: { name: string; type: string }) {
  return api.post<Wallet>("/api/v1/wallets", wallet);
}

export function updateWallet(id: string, wallet: { name: string; type: string }) {
  return api.put<Wallet>(`/api/v1/wallets/${id}`, wallet);
}

export function deleteWallet(id: string) {
  return api.delete<Wallet>(`/api/v1/wallets/${id}`);
}
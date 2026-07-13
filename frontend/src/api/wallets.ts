import { api } from "./axios";

export function getWallets() {
  return api.get("/api/v1/wallets");
}

export function createWallet(wallet: { name: string; type: string }) {
  return api.post("/api/v1/wallets", wallet);
}

export function updateWallet(id: string, wallet: { name: string; type: string }) {
  return api.put(`/api/v1/wallets/${id}`, wallet);
}

export function deleteWallet(id: string) {
  return api.delete(`/api/v1/wallets/${id}`);
}
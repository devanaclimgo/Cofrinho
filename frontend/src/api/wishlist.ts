import type { WishlistItem } from "../types/wishlist";
import { api } from "./axios";

export function createWishlist(data: { name: string }) {
  return api.post("/api/v1/wishlist", data);
}

export async function getWishlist() {
  const { data } = await api.get<WishlistItem[]>("/api/v1/wishlist");

  return data;
}

export function updateWishlist(id: string, data: { name: string }) {
  return api.put(`/api/v1/wishlist/${id}`, data);
}

export function deleteWishlist(id: string) {
  return api.delete(`/api/v1/wishlist/${id}`);
}
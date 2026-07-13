import { api } from "./axios";

export function createWishlist(data: { name: string }) {
  return api.post("/api/v1/wishlist", data);
}

export function getWishlists() {
  return api.get("/api/v1/wishlist");
}

export function updateWishlist(id: string, data: { name: string }) {
  return api.put(`/api/v1/wishlist/${id}`, data);
}

export function deleteWishlist(id: string) {
  return api.delete(`/api/v1/wishlist/${id}`);
}
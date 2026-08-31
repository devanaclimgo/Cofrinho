import { api } from "./axios";
import type { WishlistItem, WishlistPayload } from "../types/wishlist";

export function getWishlists() {
  return api.get<WishlistItem[]>("/api/v1/wishlists");
}

export function getWishlist(id: number | string) {
  return api.get<WishlistItem>(`/api/v1/wishlists/${id}`);
}

export function createWishlist(wishlist: WishlistPayload) {
  return api.post<WishlistItem>("/api/v1/wishlists", {
    wishlist,
  });
}

export function updateWishlist(
  id: number | string,
  wishlist: Partial<WishlistPayload>,
) {
  return api.put<WishlistItem>(`/api/v1/wishlists/${id}`, {
    wishlist,
  });
}

export function deleteWishlist(id: number | string) {
  return api.delete<void>(`/api/v1/wishlists/${id}`);
}
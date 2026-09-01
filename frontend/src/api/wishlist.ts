import type { WishlistItem, WishlistPayload } from "../types/wishlist";
import { api } from "./axios";

type Id = number | string;

export function getWishlists() {
  return api.get<WishlistItem[]>("/api/v1/wishlists");
}

export function getWishlist(id: Id) {
  return api.get<WishlistItem>(`/api/v1/wishlists/${id}`);
}

export function createWishlist(wishlist: WishlistPayload) {
  return api.post<WishlistItem>("/api/v1/wishlists", { wishlist });
}

export function updateWishlist(id: Id, wishlist: Partial<WishlistPayload>) {
  return api.put<WishlistItem>(`/api/v1/wishlists/${id}`, { wishlist });
}

export function deleteWishlist(id: Id) {
  return api.delete<void>(`/api/v1/wishlists/${id}`);
}

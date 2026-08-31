export type WishlistPriority = "high" | "medium" | "low";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  store: string | null;
  desired_date: string;
  priority: WishlistPriority;
  image: string | null;
}

export interface WishlistPayload {
  name: string;
  price: number;
  store?: string;
  desired_date: string;
  priority?: WishlistPriority;
  image?: string;
}
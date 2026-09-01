export type WishlistVerdict = "buy" | "wait" | "no";

export interface WishlistItem {
  id: number;
  name: string;
  store: string | null;
  price: number;
  image: string | null;
  desired_date: string;
  verdict: WishlistVerdict | null;
  created_at: string;
  updated_at: string;
}

export interface WishlistPayload {
  name: string;
  store?: string;
  price: number;
  image?: string;
  desired_date: string;
  verdict?: WishlistVerdict;
}
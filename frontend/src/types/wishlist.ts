export interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl?: string;
  store?: string;
  desiredDate?: string;
  price?: number;
  verdict: "buy" | "wait" | "save";
}
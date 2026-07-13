export interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  verdict: "buy" | "wait" | "save";
}
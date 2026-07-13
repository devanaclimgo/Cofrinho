import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../api/wishlist";

export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboard";
import type { DashboardData } from "../types/dashboard";

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    initialData: {
      summary: { balance: 0, income: 0, expenses: 0, savings: 0 },
      wallets: [],
      transactions: [],
      wishlist: [],
      forecast: [],
    },
  });
}
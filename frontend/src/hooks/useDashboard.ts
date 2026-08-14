import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboard";
import type { DashboardData } from "../types/dashboard";

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}
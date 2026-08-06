import type { DashboardData } from "../types/dashboard";
import { api } from "./axios";

export async function getDashboard(): Promise<DashboardData> {
  const { data } = await api.get<DashboardData>("/api/v1/dashboard");
  return data;
}
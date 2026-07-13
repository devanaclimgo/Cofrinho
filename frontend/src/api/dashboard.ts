import type { Dashboard } from "../types/dashboard"
import { api } from "./axios"

export async function getDashboard() {
  const { data } = await api.get<Dashboard>("/api/v1/dashboard")
  return data
}
import { api } from "./axios"

export async function getDashboard() {
  const { data } = await api.get("/api/v1/dashboard")
  return data
}
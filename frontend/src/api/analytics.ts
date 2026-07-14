import { api } from "./axios";

export function getAnalytics() {
  return api.get("/api/v1/analytics");
}
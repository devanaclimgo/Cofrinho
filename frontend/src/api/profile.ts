import { api } from "./axios";

export function getFinancialProfile() {
  return api.get("/api/v1/profile/financial");
}

export function getUserProfile() {
  return api.get("/api/v1/profile/user");
}
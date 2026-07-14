import { api } from "./axios";

export function getOnboarding() {
  return api.get("/api/v1/onboarding");
}
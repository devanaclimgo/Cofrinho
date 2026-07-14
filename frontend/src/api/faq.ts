import { api } from "./axios";

export function getFaqs() {
  return api.get("/api/v1/faq");
}
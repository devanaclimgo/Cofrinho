import { api } from "./axios";

export function getNotifications() {
  return api.get("/api/v1/notifications");
}
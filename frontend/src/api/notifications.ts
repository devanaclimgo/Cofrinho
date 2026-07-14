import type { NotificationItem } from "../lib/data";
import { api } from "./axios";

export function getNotifications() {
  return api.get<NotificationItem[]>("/api/v1/notifications");
}
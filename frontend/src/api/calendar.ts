import { api } from "./axios";

export function getCalendarEvents() {
  return api.get("/api/v1/calendar");
}
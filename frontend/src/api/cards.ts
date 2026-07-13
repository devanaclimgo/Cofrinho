import type { Cards } from "../types/cards";
import { api } from "./axios";

export async function getCards() {
  const { data } = await api.get<Cards>("/api/v1/cards");
  return data;
}

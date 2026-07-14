import type { PurchaseSimulationRequest } from "../hooks/useSimulation";
import { api } from "./axios";

export async function simulateTransaction(body: PurchaseSimulationRequest) {
  const { data } = await api.post("/api/v1/simulate", body);

  return data;
}
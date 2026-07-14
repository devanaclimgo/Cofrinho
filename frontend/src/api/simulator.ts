import type { PurchaseSimulationRequest, PurchaseSimulationResponse } from "../types/simulation";
import { api } from "./axios";

export async function simulateTransaction(body: PurchaseSimulationRequest) {
  const { data } = await api.post<PurchaseSimulationResponse>(
    "/api/v1/simulate",
    body,
  );

  return data;
}
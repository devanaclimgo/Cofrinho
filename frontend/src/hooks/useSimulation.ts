import { useMutation } from "@tanstack/react-query";
import { simulateTransaction } from "../api/simulator";
import type {
  PurchaseSimulationRequest,
  PurchaseSimulationResponse,
} from "../types/simulation";

async function simulatePurchase(body: PurchaseSimulationRequest) {
  const data = await simulateTransaction(body);
  return data as PurchaseSimulationResponse;
}

export function usePurchaseSimulation() {
  return useMutation<
    PurchaseSimulationResponse,
    Error,
    PurchaseSimulationRequest
  >({
    mutationFn: simulatePurchase,
  });
}

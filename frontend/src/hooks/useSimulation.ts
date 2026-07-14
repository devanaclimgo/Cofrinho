import { useMutation } from "@tanstack/react-query";
import { simulateTransaction } from "../api/simulator";

export type PurchaseSimulationRequest = {
    price: number;
    months: string;
    cardId: string;
};

async function simulatePurchase(body: PurchaseSimulationRequest) {
    const data = await simulateTransaction(body);
    return data;
}

export function usePurchaseSimulation() {
    return useMutation({
        mutationFn: simulatePurchase,
    })
}
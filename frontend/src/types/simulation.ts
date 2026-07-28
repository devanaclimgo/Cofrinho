export interface PurchaseSimulationRequest {
  product: string;
  amount: number;
  installments: number;
  wallet_id: string;
}

export interface PurchaseSimulationMonth {
  month: string;
  status: "green" | "yellow" | "red";
  balance: string;
}

export interface PurchaseSimulationResponse {
  recommendation: string;
  months: PurchaseSimulationMonth[];
}

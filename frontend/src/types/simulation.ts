export interface PurchaseSimulationRequest {
  product: string;
  amount: number;
  installments: number;
  walletId: string;
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
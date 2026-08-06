import { api } from "./axios";

export interface OnboardingPayload {
  user: { currency: string; locale: string; monthly_income: number };
  wallet: { name: string; balance: number };
  card?: { nickname: string; last4: string; limit: number };
  goal?: { name: string; target_amount: number; target_date: string };
}

export async function completeOnboarding(payload: OnboardingPayload) {
  const { data } = await api.post("/api/v1/onboardings", payload);
  return data;
}
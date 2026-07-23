import { useMutation } from "@tanstack/react-query";
import {
  completeOnboarding,
  type OnboardingPayload,
} from "../api/onboarding";

export function useOnboarding() {
  return useMutation({
    mutationFn: (payload: OnboardingPayload) =>
      completeOnboarding(payload),
  });
}
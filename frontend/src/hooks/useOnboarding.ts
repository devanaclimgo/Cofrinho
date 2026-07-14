import { useQuery } from "@tanstack/react-query";
import { getOnboarding } from "../api/onboarding";

export function useOnboarding() {
  return useQuery({
    queryKey: ["onboarding"],
    queryFn: getOnboarding,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getGoals } from "../api/goals";

export function usegoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: getGoals,
  });
}

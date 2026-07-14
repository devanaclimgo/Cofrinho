import type { Goal } from "../lib/data";
import { api } from "./axios";

export function getGoals() {
  return api.get<Goal[]>("/api/v1/goals")
}

export function createGoal(goal: { title: string; description: string }) {
  return api.post<Goal>("/api/v1/goals", goal)
}

export function updateGoal(goalId: string, goal: { title: string; description: string }) {
  return api.put<Goal>(`/api/v1/goals/${goalId}`, goal)
}

export function deleteGoal(goalId: string) {
  return api.delete(`/api/v1/goals/${goalId}`)
}
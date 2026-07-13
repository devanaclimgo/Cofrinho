import { api } from "./axios";

export function getGoals() {
  return api.get("/api/v1/goals")
}

export function createGoal(goal: { title: string; description: string }) {
  return api.post("/api/v1/goals", goal)
}

export function updateGoal(goalId: string, goal: { title: string; description: string }) {
  return api.put(`/api/v1/goals/${goalId}`, goal)
}

export function deleteGoal(goalId: string) {
  return api.delete(`/api/v1/goals/${goalId}`)
}
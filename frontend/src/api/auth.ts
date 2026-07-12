import { api } from "./axios"

export const signup = (data: {
  name: string
  email: string
  password: string
}) =>
  api.post("/signup", {
    user: data,
  })

export const login = (data: {
  email: string
  password: string
}) =>
  api.post("/login", {
    user: data,
  })
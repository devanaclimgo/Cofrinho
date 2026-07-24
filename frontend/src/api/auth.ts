import { api } from "./axios";

export interface LoginData {
  email: string;
  password: string;
}
export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export async function login(data: LoginData) {
  const response = await api.post("/login", {
    user: data,
  });

  return response;
}

export async function signup(data: SignupData) {
  const response = await api.post("/signup", {
    user: data,
  });

  return response;
}

export async function logout() {
  return api.delete("/logout");
}

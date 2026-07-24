import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
} from "../api/auth";

import { api } from "../api/axios";
import { storage } from "../lib/storage";

export interface User {
  id: number;
  name: string;
  email: string;
}

type AuthContextType = {
  user: User | null;

  authenticated: boolean;

  loading: boolean;

  login: (email: string, password: string) => Promise<void>;

  signup: (name: string, email: string, password: string) => Promise<void>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading] = useState(true);

  const authenticated = !!user;

  useEffect(() => {
    refreshUser();
  }, []);

  async function refreshUser() {
    try {
      const token = storage.getToken();

      if (!token) {
        setUser(null);
        return;
      }

      const { data } = await api.get<User>("/me");

      setUser(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        storage.removeToken();
        setUser(null);
      } else {
        console.error(err);
      }
    }
  }

  async function login(email: string, password: string) {
    const response = await loginApi({
      email,
      password,
    });

    const token = response.headers.authorization?.replace("Bearer ", "");

    if (token) {
      storage.setToken(token);
    }

    await refreshUser();
  }

  async function signup(name: string, email: string, password: string) {
    const response = await signupApi({
      name,
      email,
      password,
      password_confirmation: password,
    });

    const token = response.headers.authorization?.replace("Bearer ", "");

    if (token) {
      storage.setToken(token);
    }

    await refreshUser();
  }

  async function logout() {
    try {
      await logoutApi();
    } finally {
      storage.removeToken();
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      authenticated,
      loading,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, authenticated, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

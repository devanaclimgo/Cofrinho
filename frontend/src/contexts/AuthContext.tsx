import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/axios";

type User = { id: string; name: string; email: string };

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const { data } = await api.get("/me");
    setUser(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) refreshUser().finally(() => setIsLoading(false));
    else setIsLoading(false);
  }, []);

  const deleteAccount = async () => {
    await api.delete("/me");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  cgc: string;
  cod: string;
  loja: string;
  nome: string;
  nomeReduzido: string;

};

type AuthContextType = {
  user: User | null;
  login: (login: string, password: string) => Promise<User | null>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    login: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LOGIN: login,
          SENHA: password,
        }),
      });

      if (!response.ok) return null;

      const data = await response.json();

      if (data.sucesso === "T") {
        const userData = data.dados[0];
        const user: User = {
          cgc: userData.A1_CGC,
          cod: userData.A1_COD,
          loja: userData.A1_LOJA,
          nome: userData.A1_NOME,
          nomeReduzido: userData.A1_NREDUZ,
        };

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        return user;
      }

      return null;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

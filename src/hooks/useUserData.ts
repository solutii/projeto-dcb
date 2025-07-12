// hooks/useUserData.ts
import { useQuery } from "@tanstack/react-query";

export function useUserData() {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await fetch("/api/user-data", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao carregar dados do usuário");
      return res.json();
    },
  });
}

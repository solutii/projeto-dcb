"use client";

import axios from "axios";
import { SidebarNavegacao } from "../sidebar/Sidebar";
import { TabelaContasPagar } from "./Tabela_Contas_Pagar";
import { FiltrosContasPagar } from "./Filtros_Contas_Pagar";
import { CardsContasPagar } from "./Cards_Contas_Pagar";
import { useEffect } from "react";
import { ContasAPagarType } from "@/types/financeiro";
import { useAuth } from "@/contexts/auth-context";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FooterMobile } from "./Footer_Mobile";
import { Loader2 } from "lucide-react";
import api from "../axios";

export function LayoutContasPagar() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { dataInicio, dataFim, notaFiscal, status } = useFiltrosFinanceiro();

  const {
    data: contasAPagar,
    // isError,
    isLoading,
    // isFetching,
  } = useQuery({
    queryKey: ["contasAPagar"],
    queryFn: async () => {
      const { data } = await api.post("/api/accounts-payable", {
        CLIENTE: user?.cod,
        LOJA: user?.loja,
        DATAINI: dataInicio.toISOString().split("T")[0].replace(/-/g, ""),
        DATAFIM: dataFim.toISOString().split("T")[0].replace(/-/g, ""),
        NOTAFISCAL: notaFiscal,
      });
      return data.dados ?? ([] as ContasAPagarType[]);
    },
    refetchOnWindowFocus: false,
  });

  const total = contasAPagar?.length || 0;
  const pagas =
    contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "3").length || 0;
  const pendentes =
    contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "1").length || 0;
  const vencidas =
    contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "2").length || 0;

  // function filtrarPorStatus(contas: ContasAPagarType[]): ContasAPagarType[] {
  //   return status == "0"
  //     ? contas
  //     : contas.filter((cpg) => cpg.STATUS === status);
  // }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["contasAPagar"] });
  }, [dataInicio, dataFim, notaFiscal, status, queryClient]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-50">
        <Loader2 className="w-16 h-16 text-emerald-600 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-emerald-700 animate-pulse">
          Carregando contas a pagar, aguarde...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col">
        <div className="relative"></div>
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-4">
              <FiltrosContasPagar />
              <CardsContasPagar
                total={total}
                pagas={pagas}
                pendentes={pendentes}
                vencidas={vencidas}
              />
              <TabelaContasPagar dados={contasAPagar} />
            </div>
          </div>
        </div>
      </main>
      <FooterMobile />
    </div>
  );
}

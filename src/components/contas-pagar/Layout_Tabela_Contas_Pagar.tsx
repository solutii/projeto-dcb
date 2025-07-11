"use client";

import axios from "axios";
import { SidebarNavegacao } from "../Sidebar";
import { TabelaContasPagar } from "./Tabela_Contas_Pagar";
import { FiltrosTabelaContasPagar } from "./Filtros_Tabela_Contas_Pagar";
import { CardsTabelaContasPagar } from "./Cards_Tabela_Contas_Pagar";
import { useEffect, useState } from "react";
import { ContasAPagarType } from "@/types/financeiro";
import { useAuth } from "@/contexts/auth-context";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";
import { useQuery } from "@tanstack/react-query";

export function LayoutContasPagar() {

  const { user } = useAuth();
  const {
    dataInicio,
    dataFim,
    notaFiscal,
    status,
  } = useFiltrosFinanceiro();
  
  const {
    data: contasAPagar,
    isError,
    isLoading,
    isFetching

  } = useQuery({
    queryKey: ['contasAPagar'],
    queryFn: async () => {
      const { data } = await axios.post('/api/accounts-payable', {
        CLIENTE: user?.cod,
        LOJA: user?.loja,
        DATAINI: dataInicio.toISOString().split('T')[0].replace(/-/g, ''),
        DATAFIM: dataFim.toISOString().split('T')[0].replace(/-/g, ''),
        NOTAFISCAL: notaFiscal
      });
      return data.dados ?? [] as ContasAPagarType[];
    },
    refetchOnWindowFocus: false,
  })
  

  const total = contasAPagar?.length||0;
  const pagas = contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "3" ).length||0;
  const pendentes = contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "1").length||0;
  const vencidas = contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "2").length||0;


  function filtrarPorStatus(contas: ContasAPagarType[]):ContasAPagarType[] {

    return status == "0" ? contas : contas.filter((cpg) => cpg.STATUS === status);
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden">
        <div className="relative">
        </div>
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-4">
              <FiltrosTabelaContasPagar />
              <CardsTabelaContasPagar
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
    </div>
  );
}

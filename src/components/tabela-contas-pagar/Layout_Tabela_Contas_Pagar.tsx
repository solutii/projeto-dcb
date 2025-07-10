"use client";

import { SidebarNavegacao } from "../Sidebar";
import { TabelaContasPagar } from "./Tabela_Contas_Pagar";
import { FiltrosTabelaContasPagar } from "./Filtros_Tabela_Contas_Pagar";
import { CardsTabelaContasPagar } from "./Cards_Tabela_Contas_Pagar";
import { ContasPagarProps } from "./Colunas_Tabela_Contas_Pagar";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContasAPagarStatus, ContasAPagarType } from "@/types/financeiro";
import { set } from "date-fns";


enum  ContasAPagarStatusEnum {
  'Título em Aberto',
  'Título em Aberto e Atrasado',
  'Título Baixado Parcialmente',
  'Título Pago'
}

export function LayoutContasPagar() {

  const [contasAPagar, setContasAPagar] = useState<ContasAPagarType[]>([]);

  const total = contasAPagar.length;
  const pagas = contasAPagar.filter((n) => n.STATUS === "3" ).length;
  const pendentes = contasAPagar.filter((n) => n.STATUS === "1").length;
  const vencidas = contasAPagar.filter((n) => n.STATUS === "2").length;


  async function handleAccountsPayableData () {

    const retorno = await axios.post('/api/accounts-payable', {
      CLIENTE: "003364",
      LOJA: "01",
      DATAINI: "20240701",
      DATAFIM: "20250731"
    })

    if (retorno.status !== 200) {
      console.error("Erro ao buscar dados de contas a pagar");
      return;
    } 

    setContasAPagar(retorno.data.dados);

  }

  useEffect(() => {
    handleAccountsPayableData(); 
  },[])

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

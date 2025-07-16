"use client";

import React, { useEffect, useState } from "react";
import { CardsMetricas } from "@/components/dashboard/Cards_Metricas_Dashboard";
import { ComprasPorProdutoChart } from "@/components/dashboard/Compras_Por_Produto_Chart";
import { ContasPagarMesChart } from "@/components/dashboard/Contas_A_Pagar_Mes_Chart";
import { ContasPagarAnoChart } from "@/components/dashboard/Contas_A_Pagar_Ano_Chart";

// import { TrendingUp, Package, Calendar } from "lucide-react";
import { SidebarNavegacao } from "../sidebar/Sidebar";
import { FiltrosDashboard } from "./Filtros_Dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";
import { useAuth } from "@/contexts/auth-context";
import { ContasAPagarType } from "@/types/financeiro";
import { ItemPedidoType } from "@/types/pedido";
import api from "../axios";

export function DashboardLayout() {


  /* const queryClient = useQueryClient(); */
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [periodo, setPeriodo] = useState<string>("");
  
  const {
    data: contasAPagar,
    isError,
    isLoading,
    isFetching

  } = useQuery({
    queryKey: ['contasAPagar'],
    queryFn: async () => {

      let DataIni = new Date();
      let DataFim = new Date();

      if (periodo === "30") {
        DataIni.setDate(DataIni.getDate() - 30);
      } else if (periodo === "60") {
        DataIni.setDate(DataIni.getDate() - 60);
      } else if (periodo === "90") {
        DataIni.setDate(DataIni.getDate() - 90);
      } else {
        //dois anos
        DataIni.setFullYear(DataIni.getFullYear() - 2);
      }


      const { data } = await api.post('/api/accounts-payable', {
        CLIENTE: user?.cod,
        LOJA: user?.loja,
        DATAINI: DataIni.toISOString().split('T')[0].replace(/-/g, ''),
        DATAFIM: DataFim.toISOString().split('T')[0].replace(/-/g, ''),
        NOTAFISCAL: ""
      });

      const contasAPagar = data.dados ?? [] as ContasAPagarType[];

      const totalCompras = contasAPagar?.reduce((acc: number, item: ContasAPagarType) => acc + item.E1_VALOR, 0);
      const comprasPagas = contasAPagar?.filter((item: ContasAPagarType) => item.STATUS === "3")?.reduce((acc: number, item: ContasAPagarType) => acc + item.E1_VALOR, 0);
      const comprasAberto = contasAPagar?.filter((item: ContasAPagarType) => item.STATUS === "1")?.reduce((acc: number, item: ContasAPagarType) => acc + item.E1_VALOR, 0);
      setCardData({
        totalCompras,
        comprasPagas,
        comprasAberto
      })
      setContasAPagarTot([
        { name: "Pagas", value: comprasPagas??0},
        { name: "Em aberto", value: comprasAberto??0},
      ])

      return data.dados ?? [] as ContasAPagarType[];
    },
    refetchOnWindowFocus: false,
  })


  const {
    data: itensPedidos,
    isError: isErrorItensPedidos,
    isLoading: isLoadingItensPedidos,
    isFetching: isFetchingItensPedidos

  } = useQuery({
    queryKey: ['itensPedidos'],
    queryFn: async () => {
      const { data } = await api.post('/api/itens-pedido', {
        filial: "0101 ",
        cliente: user?.cod,
        loja: user?.loja,

      });

      const itensPedidos: ItemPedidoType[] = data.dados ?? [];

      const mapItens = new Map<string, number>();

      itensPedidos.map((item: ItemPedidoType) => {
        const valorAtual = mapItens.get(item.B1_DESC) || 0;
        mapItens.set(item.B1_DESC, valorAtual + item.C6_VALOR);
      })

      // Object.entries(mapItens) retorna um array vazio porque mapItens é um Map, não um objeto simples.
      // Para obter as entradas de um Map, use mapItens.entries() ou Array.from(mapItens.entries())
      const totalComprasProProdutos = Array.from(mapItens.entries()).map(([produto, valor]) => ({
        produto,
        valor
      }))

      setComprasProProduto(totalComprasProProdutos)

      return itensPedidos;
    },
    refetchOnWindowFocus: false,
  })

  const [cardData, setCardData] = useState({
    totalCompras: 0,
    comprasPagas: 0,
    comprasAberto:0,
  })

  const [contasAPagarTot, setContasAPagarTot] = useState<any>([])

  const [comprasPorProduto, setComprasProProduto] = useState([
    { produto: "", valor: 0 },])


  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['contasAPagar']});

  }, [periodo]);

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col">
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-6">
              <FiltrosDashboard  periodo={periodo} setPeriodo={setPeriodo}/>
              <CardsMetricas cardData={cardData} />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3 sm:gap-4 lg:gap-6 pb-24">
                <ComprasPorProdutoChart data={comprasPorProduto} />

                <ContasPagarMesChart data={contasAPagarTot} />

                {/* <ContasPagarAnoChart data={contasAnuais} /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { SidebarNavegacao } from "../../components/sidebar/Sidebar";
import { TabelaPedidos } from "./Tabela_Pedidos";
import { FiltrosTabelaPedidos } from "./Filtros_Tabela_Pedidos";
// import { CardsTabelaPedidos } from "./Cards_Tabela_Pedidos";
import { PedidoType } from "@/types/pedido";
import { useEffect, useState } from "react";
import axios from "axios";

export function LayoutPedidos() {
  
  const [pedido, setPedidos] = useState<PedidoType[]>([]);
  
  async function handleAccountsPayableData () {
    const retorno = await axios.post('/api/order', {
      CLIENTE: "003364",
      LOJA: "01",
      DATAINI: "20240701",
      DATAFIM: "20250731",
      FILIAL: "01",
    })

    if (retorno.status !== 200) {
      console.error("Erro ao buscar dados de contas a pagar");
      return;
    } 

    setPedidos(retorno.data.dados);

  }

  useEffect(() => {
    handleAccountsPayableData();
  }, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-4">
              <FiltrosTabelaPedidos />
              {/* <CardsTabelaPedidos
                emSeparacao={emSeparacao}
                faturados={faturado}
                emRota={emRota}
                entregues={entregue}
              /> */}
              <TabelaPedidos dados={pedido} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

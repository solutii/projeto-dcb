"use client";

import { SidebarNavegacao } from "../../components/sidebar/Sidebar";
import { TabelaPedidos } from "./Tabela_Pedidos";
import { FiltrosTabelaPedidos } from "./Filtros_Tabela_Pedidos";
import { PedidoType } from "@/types/pedido";
import { useEffect, useState } from "react";
import axios from "axios";
import { PedidosMobileFooter } from "./Pedidos_Mobile_Footer ";
import { useFiltrosPedido } from "@/contexts/filtros/pedidos";
import { useAuth } from "@/contexts/auth-context";

export function LayoutPedidos() {
  const [pedido, setPedidos] = useState<PedidoType[]>([]);

  const { dataInicio, dataFim, numeroPedido, status } = useFiltrosPedido();
  const { user } = useAuth();

  async function handleAccountsPayableData() {
    const retorno = await axios.post("/api/order", {
      CLIENTE: user?.cod,
      LOJA: user?.loja,
      DATAINI: dataInicio,
      DATAFIM: dataFim,
      FILIAL: "0101",
    });

    if (retorno.status !== 200) {
      console.error("Erro ao buscar dados de contas a pagar");
      return;
    }

    setPedidos(retorno.data.dados);
  }

  useEffect(() => {
    handleAccountsPayableData();
  }, []);

  return (
    <div className="flex h-screen space-y-5">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col">
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
      {/* Footer para dispositivos móveis */}
      <PedidosMobileFooter />
    </div>
  );
}

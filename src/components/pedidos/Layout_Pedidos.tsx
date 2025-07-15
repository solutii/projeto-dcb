"use client";

import { SidebarNavegacao } from "../sidebar/Sidebar";
import { TabelaPedidos } from "./Tabela_Pedidos";
import { FiltrosPedidos } from "./Filtros_Pedidos";
import { PedidoType } from "@/types/pedido";
import { useEffect, useState } from "react";
import { FooterMobile } from "./Footer_Mobile ";
import { useFiltrosPedido } from "@/contexts/filtros/pedidos";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import api from "../axios";

export function LayoutPedidos() {
  const [pedido, setPedidos] = useState<PedidoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dataInicio, dataFim, numeroPedido, status } = useFiltrosPedido();
  const { user } = useAuth();

  useEffect(() => {
    async function handleAccountsPayableData() {
      try {
        setIsLoading(true);
        const retorno = await api.post("/api/order", {
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
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    handleAccountsPayableData();
  }, [user?.cod, user?.loja, dataInicio, dataFim]);

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col relative bg-white">
        <div className="flex-shrink-0">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-4">
              <FiltrosPedidos />

              {isLoading ? (
                // ✅ LOADING GRANDE E CENTRALIZADO
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-50">
                  <Loader2 className="w-16 h-16 text-emerald-600 animate-spin" />
                  <p className="mt-4 text-lg font-semibold text-emerald-700 animate-pulse">
                    Carregando pedidos, aguarde...
                  </p>
                </div>
              ) : (
                <TabelaPedidos dados={pedido} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer para dispositivos móveis */}
      <FooterMobile />
    </div>
  );
}

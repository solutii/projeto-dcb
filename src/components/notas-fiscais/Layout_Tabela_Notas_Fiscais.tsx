"use client";

import { SidebarNavegacao } from "../sidebar/Sidebar";
import { TabelaPedidos } from "./Tabela_Notas_Fiscais";
import { FiltrosTabelaPedidos } from "./Filtros_Tabela_Notas_Fiscais";
import { PedidosProps } from "./Colunas_Tabela_Notas_Fiscais";

const dadosFicticios: PedidosProps[] = [
  {
    numero_pedido: "12345",
    data_pedido: "2023-10-01",
    valor: 150.0,
    quantidade_itens: 3,
    status: "Em separação",
    previsao_entrega: "2023-10-05",
    emSeparacao: 1,
    faturado: 0,
    emRota: 0,
    entregue: 0,
  },
  {
    numero_pedido: "12346",
    data_pedido: "2023-10-02",
    valor: 200.0,
    quantidade_itens: 5,
    status: "Faturado",
    previsao_entrega: "2023-10-06",
    emSeparacao: 0,
    faturado: 1,
    emRota: 0,
    entregue: 0,
  },
  {
    numero_pedido: "12347",
    data_pedido: "2023-10-03",
    valor: 300.0,
    quantidade_itens: 2,
    status: "Em rota",
    previsao_entrega: "2023-10-07",
    emSeparacao: 0,
    faturado: 0,
    emRota: 1,
    entregue: 0,
  },
  {
    numero_pedido: "12348",
    data_pedido: "2023-10-04",
    valor: 120.0,
    quantidade_itens: 1,
    status: "Entregue",
    previsao_entrega: "2023-10-08",
    emSeparacao: 0,
    faturado: 0,
    emRota: 0,
    entregue: 1,
  },
];

export function LayoutPedidos() {
  // const emSeparacao = dadosFicticios.filter(
  //   (n) => n.status === "Em separação"
  // ).length;

  // const faturado = dadosFicticios.filter((n) => n.status === "Faturado").length;

  // const emRota = dadosFicticios.filter((n) => n.status === "Em rota").length;

  // const entregue = dadosFicticios.filter((n) => n.status === "Entregue").length;

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
              <TabelaPedidos dados={dadosFicticios} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

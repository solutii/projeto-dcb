"use client";

import React from "react";
import { CardsMetricas } from "@/components/dashboard/Cards_Metricas_Dashboard";
import { ComprasPorProdutoChart } from "@/components/dashboard/Compras_Por_Produto_Chart";
import { ContasPagarMesChart } from "@/components/dashboard/Contas_A_Pagar_Mes_Chart";
import { ContasPagarAnoChart } from "@/components/dashboard/Contas_A_Pagar_Ano_Chart";

// import { TrendingUp, Package, Calendar } from "lucide-react";
import { SidebarNavegacao } from "../Sidebar";
import { FiltrosDashboard } from "./Filtros_Dashboard";

// Mock Data
const cardData = {
  totalCompras: 145780.5,
  comprasPagas: 98240.3,
  comprasAberto: 47540.2,
};

const comprasPorProduto = [
  { produto: "Luvas Nitrílicas", valor: 25400 },
  { produto: "Seringas 10ml", valor: 18200 },
  { produto: "Máscaras N95", valor: 22100 },
  { produto: "Cateteres", valor: 15800 },
  { produto: "Gazes Estéreis", valor: 12300 },
];

const contasAPagar = [
  { name: "Pagas", value: 67.4, count: 89 },
  { name: "Em aberto", value: 32.6, count: 43 },
];

const contasAnuais = [
  { mes: "Jan", pagas: 12400, aberto: 8200 },
  { mes: "Fev", pagas: 15200, aberto: 6800 },
  { mes: "Mar", pagas: 18600, aberto: 9400 },
  { mes: "Abr", pagas: 16800, aberto: 7200 },
  { mes: "Mai", pagas: 21200, aberto: 11800 },
  { mes: "Jun", pagas: 19400, aberto: 8600 },
  { mes: "Jul", pagas: 22800, aberto: 12400 },
  { mes: "Ago", pagas: 20600, aberto: 9800 },
  { mes: "Set", pagas: 24200, aberto: 13600 },
  { mes: "Out", pagas: 23800, aberto: 10200 },
  { mes: "Nov", pagas: 26400, aberto: 15400 },
  { mes: "Dez", pagas: 25600, aberto: 11800 },
];

export function HospitalDashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-6">
              <FiltrosDashboard />
              <CardsMetricas cardData={cardData} />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <ComprasPorProdutoChart data={comprasPorProduto} />

                <ContasPagarMesChart data={contasAPagar} />

                <ContasPagarAnoChart data={contasAnuais} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

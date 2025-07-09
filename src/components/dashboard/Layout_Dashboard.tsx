"use client";

import React from "react";
import { StatCard } from "@/components/dashboard/Stat_Card";
import { ChartCard } from "@/components/dashboard/Chart_Card";
import { Header } from "@/components/Header";
import { ComprasPorProdutoChart } from "@/components/dashboard/Compras_Por_Produto_Chart";
import { ContasPagarMesChart } from "@/components/dashboard/Contas_A_Pagar_Mes_Chart";
import { ContasPagarAnoChart } from "@/components/dashboard/Contas_A_Pagar_Ano_Chart";
import { FooterDashboard } from "@/components/Footer_Dashboard";
import { FiltrosDashboard } from "@/components/dashboard/Filtros_Dashboard";

import {
  ShoppingCart,
  CheckCircle,
  Clock,
  TrendingUp,
  Package,
  Calendar,
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header titulo="Dashboard" />


      {/* Espaço para header e filtros fixos com responsividade melhorada */}
      <div className="pt-[240px] sm:pt-[260px] md:pt-[280px] lg:pt-[300px]" />

      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-full mt-6 sm:mt-8 md:mt-10 lg:mt-14">
        {/* Cards com layout responsivo melhorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Valor Total de Compras"
            value={cardData.totalCompras}
            icon={ShoppingCart}
            colorIcon="text-white"
            bgColorIcon="bg-gradient-to-br from-blue-500 to-blue-600 via-blue-800"
            textColor="bg-gradient-to-r from-blue-900 to-blue-700 via-blue-500 bg-clip-text text-transparent"
          />
          <StatCard
            title="Total de Compras Pagas"
            value={cardData.comprasPagas}
            icon={CheckCircle}
            colorIcon="text-white"
            bgColorIcon="bg-gradient-to-br from-green-500 to-green-600 via-green-800"
            textColor="bg-gradient-to-r from-green-900 to-green-700 via-green-500 bg-clip-text text-transparent"
            total={cardData.totalCompras}
          />
          <StatCard
            title="Total de Compras em Aberto"
            value={cardData.comprasAberto}
            icon={Clock}
            colorIcon="text-white"
            bgColorIcon="bg-gradient-to-br from-red-500 to-red-600 via-red-800"
            textColor="bg-gradient-to-r from-red-900 to-red-700 via-red-500 bg-clip-text text-transparent"
            total={cardData.totalCompras}
          />
        </div>

        {/* Gráficos com layout responsivo melhorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <ChartCard title="Total de Compras por Produto" icon={Package}>
            <ComprasPorProdutoChart data={comprasPorProduto} />
          </ChartCard>

          <ChartCard title="Contas a Pagar" icon={TrendingUp}>
            <ContasPagarMesChart data={contasAPagar} />
          </ChartCard>

          <ChartCard title="Contas a Pagar Anual" icon={Calendar}>
            <ContasPagarAnoChart data={contasAnuais} />
          </ChartCard>
        </div>
        
        {/* Espaço adicional para evitar sobreposição com o footer */}
        <div className="h-16 sm:h-20 md:h-24" />
      </div>

      <FooterDashboard />

      {/* Filtros fixos com responsividade melhorada */}
      <div
        className="fixed top-[80px] sm:top-[100px] md:top-[128px] lg:top-[160px] w-full z-40 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-4 sm:mt-6 md:mt-8"
        style={{ maxWidth: "100%" }}
      >
        <FiltrosDashboard />
      </div>
    </div>
  );
}
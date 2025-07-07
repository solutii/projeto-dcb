"use client";

import React from "react";
import { StatCard } from "@/components/Stat_Card";
import { ChartCard } from "@/components/Chart_Card";
import { HeaderDashboard } from "@/components/Header";
import { ComprasPorProdutoChart } from "@/components/Compras_Por_Produtos_Chart";
import { ContasAPagarPieChart } from "@/components/Contas_A_Pagar_Mes_Chart";
import { ContasAnuaisLineChart } from "@/components/Contas_A_Pagar_Anual_Chart";
import { FooterDashboard } from "@/components/Footer_Dashboard";
import { FiltrosDashboard } from "@/components/Filtros_Dashboard";
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
  { produto: "Termômetros", valor: 9800 },
];

const contasAPagar = [
  { name: "Pagas", value: 67.4, count: 89 },
  { name: "Em Aberto", value: 32.6, count: 43 },
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

export default function HospitalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <HeaderDashboard />

      {/* Espaço para o header fixo (altura ~160px) + filtros fixos (~120px) */}
      <div className="pt-[280px]" />

      {/* Conteúdo principal */}
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-full mt-14">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Gráficos lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <ChartCard title="Total de Compras por Produto" icon={Package}>
            <ComprasPorProdutoChart data={comprasPorProduto} />
          </ChartCard>

          <ChartCard title="Contas a Pagar" icon={TrendingUp}>
            <ContasAPagarPieChart data={contasAPagar} />
          </ChartCard>

          <ChartCard title="Contas a Pagar Anual" icon={Calendar}>
            <ContasAnuaisLineChart data={contasAnuais} />
          </ChartCard>
        </div>
      </div>

      <FooterDashboard />

      {/* Filtros fixos logo abaixo do Header */}
      <div
        className="fixed top-[80px] md:top-[128px] lg:top-[160px] w-full z-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-8"
        style={{ maxWidth: '100%' }}
      >
        <FiltrosDashboard />
      </div>
    </div>
  );
}

// StatCardsGrid.tsx
import React from "react";
import { ShoppingCart, CheckCircle, Clock } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  colorIcon: string;
  bgColorIcon: string;
  textColor: string;
  total?: number;
}

function StatCard({
  title,
  value,
  icon: Icon,
  colorIcon,
  bgColorIcon,
  textColor,
  total = value,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md shadow-black p-6 border border-slate-200 group">
      <div className="flex items-center justify-between">
        <div
          className={`p-3 rounded-xl ${bgColorIcon} transition-transform group-hover:rotate-12`}
        >
          <Icon className={`w-7 h-7 ${colorIcon}`} />
        </div>
        <div className="text-right">
          <p className="text-base font-bold text-gray-800 uppercase italic tracking-wider">
            {title}
          </p>
          <p className={`text-3xl font-extrabold ${textColor}`}>
            {formatCurrency(value)}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-sm font-semibold italic text-gray-800 mb-1">
          <span>Progresso</span>
          <span>{Math.round((value / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${bgColorIcon} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min((value / total) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardsGridProps {
  cardData: {
    totalCompras: number;
    comprasPagas: number;
    comprasAberto: number;
  };
}

export function CardsMetricas({ cardData }: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 ">
      <StatCard
        title="Valor Total de Compras"
        value={cardData.totalCompras}
        icon={ShoppingCart}
        colorIcon="text-white"
        bgColorIcon="bg-gradient-to-br from-blue-500 to-blue-600 via-blue-800"
        textColor="text-blue-500 italic"
      />
      <StatCard
        title="Total de Compras Pagas"
        value={cardData.comprasPagas}
        icon={CheckCircle}
        colorIcon="text-white"
        bgColorIcon="bg-gradient-to-br from-green-500 to-green-600 via-green-800"
        textColor="text-green-500 italic"
        total={cardData.totalCompras}
      />
      <StatCard
        title="Total de Compras em Aberto"
        value={cardData.comprasAberto}
        icon={Clock}
        colorIcon="text-white"
        bgColorIcon="bg-gradient-to-br from-red-500 to-red-600 via-red-800"
        textColor="text-red-500 italic"
        total={cardData.totalCompras}
      />
    </div>
  );
}

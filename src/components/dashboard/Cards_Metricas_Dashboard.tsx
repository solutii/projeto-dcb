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
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md shadow-black p-4 sm:p-5 md:p-6 border border-slate-200 group max-w-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Ícone */}
        <div
          className={`p-2 sm:p-3 rounded-xl ${bgColorIcon} transition-transform md:group-hover:rotate-12`}
        >
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colorIcon}`} />
        </div>

        {/* Título e Valor */}
        <div className="text-left sm:text-right">
          <p className="text-sm sm:text-base font-bold text-gray-800 uppercase italic tracking-wider">
            {title}
          </p>
          <p className={`text-2xl sm:text-3xl font-extrabold ${textColor}`}>
            {formatCurrency(value)}
          </p>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 justify-items-center">
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

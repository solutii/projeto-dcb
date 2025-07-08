import React from "react";

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

export function StatCard({
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
      <div className="flex items-center justify-between mb-4">
        {/* Ícone com fundo colorido */}
        <div className={`p-3 rounded-xl ${bgColorIcon} transition-transform group-hover:rotate-12`}>
          <Icon className={`w-7 h-7 ${colorIcon}`} />
        </div>

        {/* Título e valor */}
        <div className="text-right">
          <p className="text-base font-bold text-gray-500 uppercase italic tracking-wider">
            {title}
          </p>
          <p className={`text-3xl font-extrabold ${textColor}`}>
            {formatCurrency(value)}
          </p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mt-6">
        <div className="flex justify-between text-sm font-semibold italic text-gray-500 mb-1">
          <span>Progresso</span>
          <span>{Math.round((value / total) * 100)}%</span>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${bgColorIcon} transition-all duration-700 ease-out`}
            style={{
              width: `${Math.min((value / total) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

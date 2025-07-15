import React from "react";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface ResumoNotasFiscaisProps {
  total: number;
  pagas: number;
  pendentes: number;
  vencidas: number;
}

interface CardsProps {
  titulo: string;
  valor: number;
  cor: string;
  Icon: React.ElementType;
}

function CardResumo({ titulo, valor, cor, Icon }: CardsProps) {
  const bgIcon =
    Icon === CheckCircle
      ? "bg-green-200 text-green-700"
      : Icon === Clock
      ? "bg-yellow-200 text-yellow-700"
      : Icon === AlertTriangle
      ? "bg-red-200 text-red-700"
      : "bg-blue-200 text-blue-700";

  return (
    <div
      className={`rounded-lg p-4 sm:p-4 shadow-md shadow-black ${cor} text-xs sm:text-sm`}
    >
      <div className="flex items-center justify-between">
        
        <div className="flex flex-col mb-1 gap-1">
          <span className="font-semibold text-gray-800 italic text-base uppercase tracking-wider">{titulo}</span>
          <span className="text-lg sm:text-xl font-extrabold text-gray-800 italic tracking-wider">
            {valor}
          </span>
        </div>

        <div
          className={`p-2 sm:p-3 rounded-lg ${bgIcon} shadow-md shadow-black`}
        >
          <Icon className="w-5 h-5 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
}

export function CardsContasPagar({
  total,
  pagas,
  pendentes,
  vencidas,
}: ResumoNotasFiscaisProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-2">
      <CardResumo
        titulo="Total"
        valor={total}
        cor="bg-blue-300"
        Icon={FileText}
      />
      <CardResumo
        titulo="Contas pagas"
        valor={pagas}
        cor="bg-green-300"
        Icon={CheckCircle}
      />
      <CardResumo
        titulo="Contas pendentes"
        valor={pendentes}
        cor="bg-yellow-300"
        Icon={Clock}
      />
      <CardResumo
        titulo="Contas vencidas"
        valor={vencidas}
        cor="bg-red-300"
        Icon={AlertTriangle}
      />
    </div>
  );
}

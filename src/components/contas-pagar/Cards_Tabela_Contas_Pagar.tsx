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
  styleIcon: string;
}

function CardResumo({ titulo, valor, cor, Icon }: CardsProps) {
  return (
    <div className={`rounded-lg p-4 shadow-md shadow-black ${cor}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col mb-1">
          <span className="text-lg font-semibold text-gray-800 italic">
            {titulo}
          </span>
          <span className="text-2xl font-bold text-gray-800 italic">
            {valor}
          </span>
        </div>
        <div
          className={`p-3 rounded-lg ${
            Icon === CheckCircle
              ? "bg-green-200 text-green-700"
              : Icon === Clock
              ? "bg-yellow-200 text-yellow-700"
              : Icon === AlertTriangle
              ? "bg-red-200 text-red-700"
              : "bg-blue-200 text-blue-700"
          } shadow-md shadow-black`}
        >
          <Icon className="h-6 w-6 text-black" />
        </div>
      </div>
    </div>
  );
}

export function CardsTabelaContasPagar({
  total,
  pagas,
  pendentes,
  vencidas,
}: ResumoNotasFiscaisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardResumo
        titulo="Total"
        valor={total}
        cor="bg-blue-300"
        Icon={FileText}
        styleIcon="bg-blue-200 text-blue-700 shadow-md shadow-black rounded-lg p-3"
      />
      <CardResumo
        titulo="Contas pagas"
        valor={pagas}
        cor="bg-green-300"
        Icon={CheckCircle}
        styleIcon="bg-green-200 text-green-700 shadow-md shadow-black rounded-lg p-3"
      />
      <CardResumo
        titulo="Contas pendentes"
        valor={pendentes}
        cor="bg-yellow-300"
        Icon={Clock}
        styleIcon="bg-yellow-200 text-yellow-700 shadow-md shadow-black rounded-lg p-3"
      />
      <CardResumo
        titulo="Contas vencidas"
        valor={vencidas}
        cor="bg-red-300"
        Icon={AlertTriangle}
        styleIcon="bg-red-200 text-red-700 shadow-md shadow-black rounded-lg p-3"
      />
    </div>
  );
}

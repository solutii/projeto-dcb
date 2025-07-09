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
  return (
    <div className={`rounded-lg p-4 shadow-md shadow-black ${cor}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col mb-1">
          <span className="text-lg font-semibold text-black italic">{titulo}</span>
          <span className="text-2xl font-bold text-black italic">{valor}</span>
        </div>
        <div className={`rounded-lg bg-white/40 p-3`}>
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
        cor="bg-blue-500"
        Icon={FileText}
      />
      <CardResumo
        titulo="Contas pagas"
        valor={pagas}
        cor="bg-green-500"
        Icon={CheckCircle}
      />
      <CardResumo
        titulo="Contas pendentes"
        valor={pendentes}
        cor="bg-yellow-500"
        Icon={Clock}
      />
      <CardResumo
        titulo="Contas vencidas"
        valor={vencidas}
        cor="bg-red-500"
        Icon={AlertTriangle}
      />
    </div>
  );
}
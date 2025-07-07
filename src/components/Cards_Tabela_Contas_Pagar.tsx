import React from "react";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface ResumoNotasFiscaisProps {
  total: number;
  pagas: number;
  pendentes: number;
  vencidas: number;
}

export function CardsTabelaContasPagar({
  total,
  pagas,
  pendentes,
  vencidas,
}: ResumoNotasFiscaisProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <CardResumo
        titulo="Total"
        valor={total}
        cor="from-blue-500 to-blue-700"
        Icon={FileText}
      />
      <CardResumo
        titulo="Pagas"
        valor={pagas}
        cor="from-green-500 to-green-700"
        Icon={CheckCircle}
      />
      <CardResumo
        titulo="Pendentes"
        valor={pendentes}
        cor="from-yellow-500 to-yellow-700"
        Icon={Clock}
      />
      <CardResumo
        titulo="Vencidas"
        valor={vencidas}
        cor="from-red-500 to-red-700"
        Icon={AlertTriangle}
      />
    </div>
  );
}

interface CardResumoProps {
  titulo: string;
  valor: number;
  cor: string;
  Icon: React.ElementType;
}

function CardResumo({ titulo, valor, cor, Icon }: CardResumoProps) {
  return (
    <div
      className={`flex items-center gap-4 bg-gradient-to-br ${cor} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="bg-white/10 p-3 rounded-full">
        <Icon className="w-6 h-6 text-white" aria-label={titulo} />
      </div>
      <div>
        <div className="text-xl font-bold">{valor}</div>
        <div className="text-sm opacity-90">{titulo}</div>
      </div>
    </div>
  );
}

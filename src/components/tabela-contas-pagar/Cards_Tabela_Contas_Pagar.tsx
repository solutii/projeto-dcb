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
    <div
      className={`flex items-center gap-4 bg-gradient-to-br ${cor} rounded-lg p-2 text-black shadow-md shadow-black`}
    >
      <div className="bg-white/30 p-2 rounded-full">
        <Icon
          className="w-5 h-5 text-black font-semibold"
          aria-label={titulo}
        />
      </div>
      <div>
        <div className="text-xl font-semibold italic">{valor}</div>
        <div className="text-base font-semibold italic">{titulo}</div>
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CardResumo
        titulo="Total contas"
        valor={total}
        cor="from-blue-400 to-blue-500"
        Icon={FileText}
      />
      <CardResumo
        titulo="Contas pagas"
        valor={pagas}
        cor="from-green-400 to-green-500"
        Icon={CheckCircle}
      />
      <CardResumo
        titulo="Contas pendentes"
        valor={pendentes}
        cor="from-yellow-400 to-yellow-500"
        Icon={Clock}
      />
      <CardResumo
        titulo="Contas vencidas"
        valor={vencidas}
        cor="from-red-400 to-red-500"
        Icon={AlertTriangle}
      />
    </div>
  );
}

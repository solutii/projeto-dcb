// components/ColunasContasPagar.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Clock, Eye, PackageOpen } from "lucide-react";

export interface PedidosProps {
  numero_pedido: string;
  data_pedido: string;
  valor: number;
  quantidade_itens: number;
  status: string;
  previsao_entrega: string;
  emSeparacao: number;
  faturado: number;
  emRota: number;
  entregue: number;
}

export const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    "DISPONIVEL": {
      icon: PackageOpen,
      style: "bg-blue-500 text-white",
      bgMobile: "bg-blue-50 border-blue-200",
      textMobile: "text-blue-700",
    },
    INDISPONIVEL: {
      icon: Clock,
      style: "bg-yellow-500 text-black",
      bgMobile: "bg-yellow-50 border-yellow-200",
      textMobile: "text-yellow-700",
    }
  };

  const config =
    configs[status.toUpperCase() as keyof typeof configs] ||
    configs["DISPONIVEL"];
    
  const Icon = config.icon;

  return (
    <>
      <div className="hidden md:flex justify-center">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${config.style} shadow-lg`}
        >
          <Icon className="w-3 h-3" />
          {status}
        </div>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <div className={`p-2 rounded-full ${config.bgMobile} border`}>
          <Icon className={`w-4 h-4 ${config.textMobile}`} />
        </div>
        <span className={`text-sm font-semibold ${config.textMobile}`}>
          {status}
        </span>
      </div>
    </>
  );
};

export const colunasTabelaContasPagar: ColumnDef<PedidosProps>[] = [
  {
    accessorKey: "numero_nf",
    header: "Nota Fiscal n°",
    cell: ({ getValue }) => (
      <div className="font-bold text-gray-800 italic">
        #{String(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "serie_nf",
    header: "Série",
    cell: ({ getValue }) => (
      <div className="font-bold text-gray-800 italic">
        #{String(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "dt_emissao",
    header: "Data Emissão",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      const [year, month, day] = date.split("T")[0].split("-");
      return (
        <div className="font-bold text-gray-800 italic">{`${day}/${month}/${year}`}</div>
      );
    },
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ getValue }) => (
      <div className="font-bold text-green-500 italic">
        R$ {Number(getValue()).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  {
    id: "acoes",
    header: "Ações",
    cell: () => (
      <div className="flex justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 hover:bg-blue-700"
        >
          <Eye className="w-6 h-6" />
        </Button>
      </div>
    ),
  },
];

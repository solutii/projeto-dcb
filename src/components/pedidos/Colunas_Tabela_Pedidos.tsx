// components/ColunasContasPagar.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { SiAdobeacrobatreader } from "react-icons/si";
import { CircleCheck, Clock, PackageOpen, Truck } from "lucide-react";

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
    "EM SEPARACAO": {
      icon: PackageOpen,
      style: "bg-blue-500 text-white",
      bgMobile: "bg-blue-50 border-blue-200",
      textMobile: "text-blue-700",
    },
    FATURADO: {
      icon: Clock,
      style: "bg-yellow-500 text-black",
      bgMobile: "bg-yellow-50 border-yellow-200",
      textMobile: "text-yellow-700",
    },
    "EM ROTA": {
      icon: Truck,
      style: "bg-purple-500 text-white",
      bgMobile: "bg-purple-50 border-purple-200",
      textMobile: "text-purple-700",
    },
    ENTREGUE: {
      icon: CircleCheck,
      style: "bg-green-400 text-black",
      bgMobile: "bg-green-50 border-green-200",
      textMobile: "text-green-700",
    },
  };

  const config =
    configs[status.toUpperCase() as keyof typeof configs] ||
    configs["EM SEPARACAO"];
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
    accessorKey: "numero_pedido",
    header: "Pedido nº",
    cell: ({ getValue }) => (
      <div className="font-bold text-gray-800 italic">
        #{String(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "data_pedido",
    header: "Data Pedido",
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
    accessorKey: "quantidade_itens",
    header: "Itens",
    cell: ({ getValue }) => {
      const quantidade = getValue() as number;
      return (
        <div className="font-bold text-gray-800 italic">
          {quantidade} {quantidade > 1 ? "itens" : "item"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  {
    accessorKey: "previsao_entrega",
    header: "Previsão Entrega",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      const [year, month, day] = date.split("T")[0].split("-");
      return (
        <div className="font-bold text-gray-800 italic">{`${day}/${month}/${year}`}</div>
      );
    },
  },
  {
    id: "acoes",
    header: "Ações",
    cell: () => (
      <div className="flex justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-green-700 hover:bg-green-200"
        >
          <PiMicrosoftExcelLogoFill className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-700 hover:bg-red-200"
        >
          <SiAdobeacrobatreader className="w-6 h-6" />
        </Button>
      </div>
    ),
  },
];

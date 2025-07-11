// components/ColunasContasPagar.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Clock, PackageOpen, Truck } from "lucide-react";
import { PedidoType } from "@/types/pedido";
import { ModalDetalhesPedidoAsync } from "./Modal_Detalhes_Pedido";

export const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    "1": {
      icon: PackageOpen,
      style: "bg-blue-500 text-white",
      bgMobile: "bg-blue-50 border-blue-200",
      textMobile: "text-blue-700",
    },
    "2": {
      icon: Clock,
      style: "bg-yellow-500 text-black",
      bgMobile: "bg-yellow-50 border-yellow-200",
      textMobile: "text-yellow-700",
    },
    "3": {
      icon: Truck,
      style: "bg-purple-500 text-white",
      bgMobile: "bg-purple-50 border-purple-200",
      textMobile: "text-purple-700",
    },
    "4": {
      icon: CircleCheck,
      style: "bg-green-400 text-black",
      bgMobile: "bg-green-50 border-green-200",
      textMobile: "text-green-700",
    },
  };

  const config =
    configs[status.toUpperCase() as keyof typeof configs] || configs["1"];
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

export const colunasTabelaContasPagar: ColumnDef<PedidoType>[] = [
  {
    accessorKey: "C5_NUM",
    header: "Pedido nº",
    cell: ({ getValue }) => (
      <div className="font-bold text-gray-800 italic">
        #{String(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "C5_EMISSAO",
    header: "Data Pedido",
    cell: ({ getValue }) => {
      const date: string = getValue() as string;
      const [year, month, day] = date.split("/").reverse();
      return (
        <div className="font-bold text-gray-800 italic">{`${day}/${month}/${year}`}</div>
      );
    },
  },
  {
    accessorKey: "TOTAL",
    header: "Valor",
    cell: ({ getValue }) => (
      <div className="font-bold text-green-500 italic">
        R$ {Number(getValue()).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "STATUS",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => {
      const pedido = row.original;

      return (
        <div className="flex justify-center gap-2">
          <ModalDetalhesPedidoAsync pedido={pedido} />
        </div>
      );
    },
  },
];

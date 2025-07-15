// components/ColunasContasPagar.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Circle,
  CircleCheck,
  CircleX,
  Clock,
  UnlockKeyholeIcon,
} from "lucide-react";
import { PedidoStatusLabel, PedidoType } from "@/types/pedido";
import { ModalItensPedido } from "./Modal_Itens_Pedido";
import DownloadXml from "./Download_XML";

export const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    "0": {
      icon: Clock,
      style: "bg-green-400 text-black",
      bgMobile: "bg-green-50 border-green-200",
      textMobile: "text-green-700",
    },
    "1": {
      icon: Clock,
      style: "bg-purple-500 text-white",
      bgMobile: "bg-purple-50 border-purple-200",
      textMobile: "text-purple-700",
    },
    "2": {
      icon: UnlockKeyholeIcon,
      style: "bg-blue-500 text-white",
      bgMobile: "bg-blue-50 border-blue-200",
      textMobile: "text-blue-700",
    },
    "3": {
      icon: UnlockKeyholeIcon,
      style: "bg-blue-500 text-white",
      bgMobile: "bg-blue-50 border-blue-200",
      textMobile: "text-blue-700",
    },
    "4": {
      icon: CircleX,
      style: "bg-blue-500 text-white",
      bgMobile: "bg-blue-50 border-blue-200",
      textMobile: "text-blue-700",
    },
    "5": {
      icon: Circle,
      style: "bg-yellow-500 text-white",
      bgMobile: "bg-yellow-50 border-yellow-200",
      textMobile: "text-yellow-700",
    },
    "6": {
      icon: Circle,
      style: "bg-yellow-500 text-white",
      bgMobile: "bg-yellow-50 border-yellow-200",
      textMobile: "text-yellow-700",
    },
    "7": {
      icon: CircleCheck,
      style: "bg-green-500 text-white",
      bgMobile: "bg-green-50 border-green-200",
      textMobile: "text-green-700",
    },
    "8": {
      icon: CircleCheck,
      style: "bg-green-500 text-white",
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
          className={`flex items-center gap-2 p-2 rounded-full text-base font-semibold italic tracking-wider ${config.style}`}
        >
          <Icon className="w-5 h-5" />
          {PedidoStatusLabel[status as keyof typeof PedidoStatusLabel]}
        </div>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <div className={`p-2 rounded-full ${config.bgMobile} border`}>
          <Icon className={`w-5 h-5 ${config.textMobile}`} />
        </div>
        <span className={`text-sm font-semibold ${config.textMobile}`}>
          {status}
        </span>
      </div>
    </>
  );
};

export const colunasTabelaPedidos: ColumnDef<PedidoType>[] = [
  {
    accessorKey: "C5_NUM",
    header: "Pedido nº",
    cell: ({ getValue }) => (
      <div className="font-semibold text-lg text-gray-800 italic tracking-wider">{String(getValue())}</div>
    ),
  },
  // ------------------------------------------------
  {
    accessorKey: "C5_EMISSAO",
    header: "Data Pedido",
    cell: ({ getValue }) => {
      const date: string = getValue() as string;
      const [year, month, day] = date.split("/").reverse();
      return (
        <div className="font-semibold text-lg text-gray-800 italic tracking-wider">{`${day}/${month}/${year}`}</div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "TOTAL",
    header: "Valor",
    cell: ({ getValue }) => (
      <div className="font-semibold text-lg text-gray-800 italic tracking-wider">
        {Number(getValue()).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    ),
  },
  // ------------------------------------------------
  {
    accessorKey: "STATUS",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  // ------------------------------------------------
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => {
      const pedido = row.original;
      return (
        <div className="flex justify-center gap-2">
          <ModalItensPedido pedido={pedido} />
          <DownloadXml pedido={pedido} />
        </div>
      );
    },
  },
];

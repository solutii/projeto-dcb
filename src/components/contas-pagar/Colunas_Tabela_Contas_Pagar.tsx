// components/ColunasContasPagar.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { ContasAPagarType, ContasAPagarStatus } from "@/types/financeiro";

export interface ContasPagarProps {
  status: string;
  numero_nf: number;
  data_emissao: string;
  data_vencimento: string;
  valor: number;
  juros: number;
  multa: number;
}

export const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    "0": {
      icon: Clock,
      style: "bg-yellow-400 text-black",
      bgMobile: "bg-amber-50 border-amber-200",
      textMobile: "text-amber-700",
    },
    "1": {
      icon: AlertTriangle,
      style: "bg-red-400 text-black",
      bgMobile: "bg-red-50 border-red-200",
      textMobile: "text-red-700",
    },
    "3": {
      icon: CheckCircle,
      style: "bg-green-400 text-black",
      bgMobile: "bg-emerald-50 border-emerald-200",
      textMobile: "text-emerald-700",
    },
    "2": {
      icon: CheckCircle,
      style: "bg-green-400 text-black",
      bgMobile: "bg-emerald-50 border-emerald-200",
      textMobile: "text-emerald-700",
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
          {ContasAPagarStatus[status] || "Status Desconhecido"}
        </div>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <div className={`p-2 rounded-full ${config.bgMobile} border`}>
          <Icon className={`w-5 h-5 ${config.textMobile}`} />
        </div>
        <span className={`text-sm font-semibold ${config.textMobile}`}>
          {ContasAPagarStatus[status] || "Status Desconhecido"}
        </span>
      </div>
    </>
  );
};

export const colunasTabelaContasPagar: ColumnDef<ContasAPagarType>[] = [
  {
    accessorKey: "STATUS",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_NUM",
    header: "Nota Fiscal",
    cell: ({ getValue }) => (
      <div className="font-semibold text-lg text-gray-800 italic tracking-wider">
        {String(getValue())}
      </div>
    ),
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_EMISSAO",
    header: "Emissão",
    cell: ({ getValue }) => {
      const date: string = getValue() as string;
      const match = date.match(/(\d{4})(\d{2})(\d{2})/);
      if (!match) {
        return (
          <div className="font-semibold text-lg text-gray-800 italic tracking-wider">
            Data Inválida
          </div>
        );
      }
      const [, year, month, day] = match;
      return (
        <div className="font-semibold text-lg text-gray-800 italic tracking-wider">{`${day}/${month}/${year}`}</div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_VENCREA",
    header: "Vencimento",
    cell: ({ getValue }) => {
      const date: string = getValue() as string;
      const match = date.match(/(\d{4})(\d{2})(\d{2})/);
      if (!match) {
        return (
          <div className="font-semibold text-lg text-gray-800 italic tracking-wider">
            Data Inválida
          </div>
        );
      }
      const [, year, month, day] = match;
      const isOverdue = new Date(`${year}-${month}-${day}`) < new Date();
      return (
        <div
          className={`${
            isOverdue
              ? "text-red-500 font-semibold text-lg italic tracking-wider"
              : ""
          }`}
        >
          {`${day}/${month}/${year}`}
          {isOverdue && (
            <div className="text-sm text-red-500 italic font-semibold tracking-wider">
              Vencido
            </div>
          )}
        </div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_VALOR",
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
    accessorKey: "E1_JUROS",
    header: "Juros",
    cell: ({ getValue }) => {
      const valor = Number(getValue());
      return (
        <div
          className={`font-semibold text-lg italic tracking-wider ${
            valor > 0 ? "text-red-500" : "text-gray-800"
          }`}
        >
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_MULTA",
    header: "Multa",
    cell: ({ getValue }) => {
      const valor = Number(getValue());
      return (
        <div
          className={`font-bold italic ${
            valor > 0 ? "text-red-500" : "text-gray-800"
          }`}
        >
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
];

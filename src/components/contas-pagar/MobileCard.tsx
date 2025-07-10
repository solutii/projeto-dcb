// components/MobileCard.tsx
"use client";

import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { ContasPagarProps } from "./Colunas_Tabela_Contas_Pagar";
import {
  FileText,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiAdobeacrobatreader } from "react-icons/si";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { StatusBadge } from "./Colunas_Tabela_Contas_Pagar";

export const MobileCard = ({ row }: { row: Row<ContasPagarProps> }) => {
  const [expanded, setExpanded] = useState(false);
  const data = row.original;

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const isOverdue = new Date(data.data_vencimento) < new Date();
  const hasJuros = data.juros > 0;
  const hasMulta = data.multa > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">
                NF #{data.numero_nf}
              </div>
              <div className="text-sm text-gray-800">
                {formatDate(data.data_emissao)}
              </div>
            </div>
          </div>
          <StatusBadge status={data.status} />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Valor</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            R$ {data.valor.toFixed(2)}
          </div>
        </div>

        <div
          className={`rounded-lg p-3 border-l-4 ${
            isOverdue
              ? "bg-red-50 border-red-500"
              : "bg-blue-50 border-blue-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-800" />
            <span className="text-sm font-medium text-gray-800">
              Vencimento
            </span>
          </div>
          <div
            className={`text-lg font-bold ${
              isOverdue ? "text-red-700" : "text-blue-700"
            }`}
          >
            {formatDate(data.data_vencimento)}
            {isOverdue && <span className="ml-2 text-sm">(Vencido)</span>}
          </div>
        </div>

        {(hasJuros || hasMulta) && (
          <div className="grid grid-cols-2 gap-2">
            {hasJuros && (
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <div className="text-xs font-medium text-yellow-600 mb-1">
                  Juros
                </div>
                <div className="text-lg font-bold text-yellow-700">
                  R$ {data.juros.toFixed(2)}
                </div>
              </div>
            )}
            {hasMulta && (
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="text-xs font-medium text-red-600 mb-1">
                  Multa
                </div>
                <div className="text-lg font-bold text-red-700">
                  R$ {data.multa.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full justify-center gap-2 text-gray-800"
        >
          {expanded ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {expanded ? "Menos detalhes" : "Mais detalhes"}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </Button>

        {expanded && (
          <div className="pt-3 border-t space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-800">Emissão:</span>
                <div className="font-medium">
                  {formatDate(data.data_emissao)}
                </div>
              </div>
              <div>
                <span className="text-gray-800">Total:</span>
                <div className="font-bold text-green-600">
                  R$ {(data.valor + data.juros + data.multa).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <PiMicrosoftExcelLogoFill className="w-4 h-4 mr-2" /> Excel
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              >
                <SiAdobeacrobatreader className="w-4 h-4 mr-2" /> PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  DollarSign,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  ArrowUp,
} from "lucide-react";
import {
  colunasTabelaContasPagar,
  ContasPagarProps,
} from "./Colunas_Tabela_Contas_Pagar";
import { MobileCard } from "./MobileCard";

interface TabelaContasPagarProps {
  dados: ContasPagarProps[];
}

export function TabelaContasPagar({ dados }: TabelaContasPagarProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaContasPagar,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalValor = dados.reduce((acc, item) => acc + item.valor, 0);
  const totalJuros = dados.reduce((acc, item) => acc + item.juros, 0);
  const totalMulta = dados.reduce((acc, item) => acc + item.multa, 0);

  return (
    <>
      {/* TABELA */}
      <div className="flex flex-col h-[60vh] overflow-hidden rounded-lg  bg-white shadow-md shadow-black">
        {/* Cabeçalho da tabela */}
        <div className="bg-black p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Contas a Pagar
            </h3>
          </div>
        </div>

        {/* Corpo com rolagem interna */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`p-3 bg-purple-800 text-white font-semibold text-left ${
                        index === 0 ? "pl-20" : "text-center"
                      } ${
                        header.isPlaceholder ? "bg-gray-200" : "bg-gray-100"
                      } border-b border-gray-200`}
                    >
                      <div className="flex items-center space-x-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`group transition-all duration-200 ease-in-out hover:bg-blue-100 ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } cursor-pointer`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={`p-2 text-gray-600 ${
                        cellIndex === 0
                          ? "font-semibold text-left pl-20"
                          : "text-center"
                      } ${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MobileCard (caso use em dispositivos pequenos) */}
      <div className="lg:hidden mt-6 space-y-4">
        {table.getRowModel().rows.map((row) => (
          <MobileCard key={row.id} row={row} />
        ))}
      </div>

      {/* CARDS DE TOTAIS - fora da rolagem da tabela */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card Total Valor */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 to-teal-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 tracking-wide">
                  VALOR TOTAL
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  R${" "}
                  {totalValor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-teal-50 text-teal-600 shadow-sm">
                <DollarSign className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center">
              <span className="inline-flex items-center text-xs font-semibold tracking-wide text-teal-600">
                <ArrowUp className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                Valor total das contas
              </span>
            </div>
          </div>
        </div>

        {/* Card Total Juros */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-400"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 tracking-wide">
                  JUROS ACUMULADOS
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  R${" "}
                  {totalJuros.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 shadow-sm">
                <AlertTriangle className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center">
              <span className="inline-flex items-center text-xs font-semibold tracking-wide text-amber-600">
                <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                Taxas e encargos
              </span>
            </div>
          </div>
        </div>

        {/* Card Total Multa */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 to-pink-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 tracking-wide">
                  MULTAS APLICADAS
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  R${" "}
                  {totalMulta.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 text-rose-600 shadow-sm">
                <AlertOctagon className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center">
              <span className="inline-flex items-center text-xs font-semibold tracking-wide text-rose-600">
                <AlertOctagon className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                Penalidades por atraso
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos customizados */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
}

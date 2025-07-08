// components/TabelaContasPagar.tsx
"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DollarSign, AlertTriangle } from "lucide-react";
import {
  colunasTabelaContasPagar,
  ContasPagarProps,
} from "./Colunas_Tabela_Contas_Pagar";
import { MobileCard } from "./MobileCard"; // Certifique-se de mover MobileCard para um arquivo separado

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
      <div className="bg-white rounded-t-2xl">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contas a Pagar
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Gestão financeira • {dados.length} registros
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------ */}

      <div className="hidden lg:block">
        <div className="bg-white shadow overflow-hidden rounded-b-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-900 text-white">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-center text-sm font-semibold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, rowIndex) => {
                  const isLastRow =
                    rowIndex === table.getRowModel().rows.length - 1;
                  const cells = row.getVisibleCells();

                  return (
                    <tr
                      key={row.id}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      {cells.map((cell, i) => {
                        const isFirstCell = i === 0;
                        const isLastCell = i === cells.length - 1;

                        return (
                          <td
                            key={cell.id}
                            className={`
                      px-6 py-4 text-sm text-center
                      ${isLastRow && isFirstCell ? "rounded-bl-lg" : ""}
                      ${isLastRow && isLastCell ? "rounded-br-lg" : ""}
                    `}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {table.getRowModel().rows.map((row) => (
          <MobileCard key={row.id} row={row} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                R$ {totalValor.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Valor</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                R$ {totalJuros.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Juros</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                R$ {totalMulta.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Multa</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

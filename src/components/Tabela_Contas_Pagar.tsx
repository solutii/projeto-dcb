"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Card } from "@/components/ui/card";
import {
  colunasTabelaNotasFiscais,
  NotaFiscalProps,
} from "./Colunas_Tabela_Contas_Pagar";

interface TabelaNotasFiscaisProps {
  dados: NotaFiscalProps[];
}

export function TabelaNotasFiscais({ dados }: TabelaNotasFiscaisProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaNotasFiscais as ColumnDef<NotaFiscalProps>[],
    getCoreRowModel: getCoreRowModel(),
  });

  const totalValor = dados.reduce((acc, item) => acc + item.valor, 0);
  const totalJuros = dados.reduce((acc, item) => acc + item.juros, 0);
  const totalMulta = dados.reduce((acc, item) => acc + item.multa, 0);

  return (
    <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-sm">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="p-8">
        <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b-2 border-gray-200 dark:border-gray-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 first:rounded-l-xl last:rounded-r-xl"
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

            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`group transition-all duration-300 hover:shadow-lg hover:shadow-black/5
                    ${
                      index % 2 === 0
                        ? "bg-white/70 dark:bg-gray-900/70"
                        : "bg-gray-50/70 dark:bg-gray-800/70"
                    }
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                    dark:hover:from-gray-800 dark:hover:to-gray-700
                    border-b border-gray-100 dark:border-gray-700`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 transition-all duration-300 group-hover:translate-x-1"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer com totais */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              R$ {totalValor.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Valor
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              R$ {totalJuros.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Juros
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              R$ {totalMulta.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Multa
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

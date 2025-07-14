"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DollarSign, AlertTriangle, AlertOctagon } from "lucide-react";
import { colunasTabelaContasPagar } from "./Colunas_Tabela_Contas_Pagar";
import { MobileTable } from "./Mobile_Table";
import { ContasAPagarType } from "@/types/financeiro";

interface TabelaContasPagarProps {
  dados: ContasAPagarType[];
}

export function TabelaContasPagar({ dados }: TabelaContasPagarProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaContasPagar,
    getCoreRowModel: getCoreRowModel(),
  });

  const naoTemDados = dados.length === 0;

  const totalValor = dados.reduce((acc, item) => acc + item.E1_VALOR, 0);
  const totalJuros = dados.reduce((acc, item) => acc + item.E1_JUROS, 0);
  const totalMulta = dados.reduce((acc, item) => acc + item.E1_MULTA, 0);

  return (
    <>
      {/* TABELA DESKTOP */}
      <div className="hidden md:block">
        <div className="flex flex-col h-[56vh] overflow-hidden rounded-lg bg-white shadow-md shadow-black">
          {/* Cabeçalho da tabela */}
          {/* Cabeçalho */}
          <div className="bg-black/80 p-4">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Pedidos
            </h3>
          </div>

          {/* Corpo com rolagem interna */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {naoTemDados ? (
              <div className="flex justify-center items-center h-full p-10">
                <p className="text-gray-500 italic text-lg">
                  Nenhum pedido encontrado no período selecionado.
                </p>
              </div>
            ) : (
              <table className="w-full border-separate border-spacing-0 text-sm">
                <thead className="sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <th
                          key={header.id}
                          className={`p-3 bg-teal-500 text-black font-extrabold text-left ${
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
                          className={`p-2 text-gray-800 ${
                            cellIndex === 0
                              ? "font-semibold text-left pl-20"
                              : "text-center"
                          } ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
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
            )}
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------ */}

      {/* TABELA MOBILE */}
      <div className="block md:hidden mt-4 space-y-5 overflow-y-auto max-h-[75vh] px-2 pb-24 custom-scrollbar">
        {naoTemDados ? (
          <div className="text-center p-4">
            <p className="text-gray-500 italic text-base">
              Nenhum pedido encontrado no período selecionado.
            </p>
          </div>
        ) : (
          table
            .getRowModel()
            .rows.map((row) => <MobileTable key={row.id} row={row} />)
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card Valor Total */}
        <div className="bg-white rounded-xl shadow-md shadow-black overflow-hidden relative group text-xs sm:text-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-green-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800 italic tracking-wide">
                VALOR TOTAL
              </p>
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-bold text-green-700 italic">
                  R${" "}
                  {totalValor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="p-2 rounded-lg bg-green-500 text-black shadow">
                  <DollarSign className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Juros */}
        <div className="bg-white rounded-xl shadow-md shadow-black overflow-hidden relative group text-xs sm:text-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800 italic tracking-wide">
                JUROS ACUMULADOS
              </p>
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-bold text-yellow-700 italic">
                  R${" "}
                  {totalJuros.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="p-2 rounded-lg bg-yellow-500 text-black shadow">
                  <AlertTriangle className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Multa */}
        <div className="bg-white rounded-xl shadow-md shadow-black overflow-hidden relative group text-xs sm:text-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800 italic tracking-wide">
                MULTAS APLICADAS
              </p>
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-bold text-red-700 italic">
                  R${" "}
                  {totalMulta.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="p-2 rounded-lg bg-red-500 text-white shadow">
                  <AlertOctagon className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

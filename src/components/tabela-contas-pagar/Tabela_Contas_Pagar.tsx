"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DollarSign, AlertTriangle, AlertOctagon } from "lucide-react";
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
      <div className="flex flex-col h-[56vh] overflow-hidden rounded-lg  bg-white shadow-md shadow-black">
        {/* Cabeçalho da tabela */}
        <div className="bg-black/80 p-4">
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
        </div>
      </div>

      {/* MobileCard (caso use em dispositivos pequenos) */}
      <div className="lg:hidden mt-6 space-y-4">
        {table.getRowModel().rows.map((row) => (
          <MobileCard key={row.id} row={row} />
        ))}
      </div>

      {/* CARDS DE TOTAIS - fora da rolagem da tabela */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Card Total Valor */}
        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-green-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  VALOR TOTAL
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  R${" "}
                  {totalValor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500 text-black shadow-md shadow-black">
                <DollarSign className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Card Total Juros */}
        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  JUROS ACUMULADOS
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  R${" "}
                  {totalJuros.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500 text-black shadow-md shadow-black">
                <AlertTriangle className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Card Total Multa */}
        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  MULTAS APLICADAS
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  R${" "}
                  {totalMulta.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-500 text-white shadow-md shadow-black">
                <AlertOctagon className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

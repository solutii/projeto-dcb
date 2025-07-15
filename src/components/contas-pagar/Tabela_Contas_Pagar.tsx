"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DollarSign, AlertTriangle, AlertOctagon } from "lucide-react";
import { colunasTabelaContasPagar } from "./Colunas_Tabela_Contas_Pagar";
import { TabelaMobile } from "./Tabela_Mobile";
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

  const naoTemDados = dados?.length === 0;

  const totalValor = dados?.reduce((acc, item) => acc + item.E1_VALOR, 0);
  const totalJuros = dados?.reduce((acc, item) => acc + item.E1_JUROS, 0);
  const totalMulta = dados?.reduce((acc, item) => acc + item.E1_MULTA, 0);

  return (
    <>
      {/* ========================== TABELA DESKTOP ========================== */}
      <div className="hidden md:block">
        <div className="flex flex-col h-[56vh] overflow-hidden rounded-lg bg-white shadow-md shadow-black">
          {/* Cabeçalho */}
          <div className="bg-black/80 p-4">
            <h3 className="text-2xl font-semibold text-white tracking-wide italic">
              Contas a Pagar
            </h3>
          </div>

          {/* Corpo com rolagem interna */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {naoTemDados ? (
              <div className="flex justify-center items-center h-full p-10">
                <p className="text-gray-600 italic text-lg">
                  Nenhum pedido encontrado no período selecionado.
                </p>
              </div>
            ) : (
              <table className="w-full border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-4 bg-teal-500 text-black font-extrabold text-center text-xl italic tracking-wider"
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

                <tbody>
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`p-4 text-gray-800 ${
                            rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center">
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

      {/* ========================== TABELA MOBILE ========================== */}
      <div className="block md:hidden space-y-5 px-2">
        {naoTemDados ? (
          <div className="text-center p-4">
            <p className="text-gray-500 italic text-base">
              Nenhum pedido encontrado no período selecionado.
            </p>
          </div>
        ) : (
          table
            .getRowModel()
            .rows.map((row) => <TabelaMobile key={row.id} row={row} />)
        )}
      </div>

      {/* ========================== CARDS DE TOTAIS ========================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
        {/* Card Valor Total */}
        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group text-xs sm:text-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-green-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base text-gray-800 italic tracking-wider">
                VALOR TOTAL
              </p>
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-bold text-gray-800 italic tracking-wider">
                  R${" "}
                  {totalValor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="p-4 rounded-lg bg-green-500 text-black shadow-md shadow-black">
                  <DollarSign className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Juros */}
        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group text-xs sm:text-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base text-gray-800 italic tracking-wider">
                JUROS ACUMULADOS
              </p>
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-bold text-red-500 italic tracking-wider">
                  R${" "}
                  {totalJuros.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="p-4 rounded-lg bg-yellow-500 text-black shadow-md shadow-black">
                  <AlertTriangle className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Multa */}
        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group text-xs sm:text-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base text-gray-800 italic tracking-wider">
                MULTAS APLICADAS
              </p>
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-bold text-red-500 italic tracking-wider">
                  R${" "}
                  {totalMulta.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="p-4 rounded-lg bg-red-500 text-black shadow-md shadow-black">
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

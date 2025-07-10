"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { PackageOpen, Clock, Truck, CircleCheck } from "lucide-react";
import {
  colunasTabelaContasPagar,
} from "./Colunas_Tabela_Pedidos";
import { PedidoType } from "@/types/pedido";
// import { MobileCard } from "./Mobile_Card_Pedidos";

interface TabelaContasPagarProps {
  dados: PedidoType[];
}

export function TabelaPedidos({ dados }: TabelaContasPagarProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaContasPagar,
    getCoreRowModel: getCoreRowModel(),
  });

  /* const totalEmSeparação = dados.reduce(
    (acc, item) => acc + item.emSeparacao,
    0
  );
  const totalFaturado = dados.reduce((acc, item) => acc + item.faturado, 0);
  const totalEmRota = dados.reduce((acc, item) => acc + item.emRota, 0);
  const totalEntregue = dados.reduce((acc, item) => acc + item.entregue, 0); */

  return (
    <>
      {/* TABELA */}
      <div className="flex flex-col h-[82vh] overflow-hidden rounded-lg  bg-white shadow-md shadow-black">
        {/* Cabeçalho da tabela */}
        <div className="bg-black/80 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Pedidos
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`p-3 bg-teal-600 text-black font-extrabold text-left ${
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
      {/* <div className="lg:hidden mt-6 space-y-4">
        {table.getRowModel().rows.map((row) => (
          <MobileCard key={row.id} row={row} />
        ))}
      </div> */}

      {/* CARDS TOTALIZADORES */}
      {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6 ">

        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  TOTAL EM SEPARAÇÃO
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  {totalEmSeparação}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500 text-white shadow-md shadow-black">
                <PackageOpen className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  TOTAL FATURADO
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  {totalFaturado}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500 text-black shadow-md shadow-black">
                <Clock className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  TOTAL EM ROTA
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  {totalEmRota}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500 text-white shadow-md shadow-black">
                <Truck className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md shadow-black overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-green-500"></div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 italic mb-1 tracking-wide">
                  TOTAL ENTREGUE
                </p>
                <p className="text-2xl font-bold text-gray-800 italic">
                  {totalEntregue}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500 text-black shadow-md shadow-black">
                <CircleCheck className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

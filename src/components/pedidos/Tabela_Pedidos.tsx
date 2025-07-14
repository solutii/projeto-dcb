"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { colunasTabelaPedidos } from "./Colunas_Tabela_Pedidos";
import { PedidoType } from "@/types/pedido";
import { PedidosMobileTable } from "./Mobile_Table";

interface TabelaPedidosProps {
  dados: PedidoType[];
}

export function TabelaPedidos({ dados }: TabelaPedidosProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaPedidos,
    getCoreRowModel: getCoreRowModel(),
  });

  const naoTemDados = dados.length === 0;

  return (
    <>
      {/* TABELA DESKTOP */}
      <div className="hidden md:block">
        <div className="flex flex-col h-[82vh] overflow-hidden rounded-lg bg-white shadow-md shadow-black">
          {/* Cabeçalho */}
          <div className="bg-black/80 p-4">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Pedidos
            </h3>
          </div>

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
            .rows.map((row) => <PedidosMobileTable key={row.id} row={row} />)
        )}
      </div>
    </>
  );
}

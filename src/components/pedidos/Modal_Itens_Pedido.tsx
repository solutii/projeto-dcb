"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { PedidoType } from "@/types/pedido";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface ItemFormatado {
  item: string;
  produto: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  valorTotal: number;
  valorDesconto: number;
}

interface PedidoComItens extends PedidoType {
  itens: ItemFormatado[];
}

interface ModalDetalhesPedidoProps {
  pedido: PedidoType;
}

export const ModalItensPedido = ({ pedido }: ModalDetalhesPedidoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 Buscar os itens do pedido
  const fetchItensPedido = async (): Promise<ItemFormatado[]> => {
    const dataEmissao = pedido.C5_EMISSAO;
    let dataInicio = dataEmissao;
    let dataFim = dataEmissao;

    if (dataEmissao && dataEmissao.includes("/")) {
      const [, mes, ano] = dataEmissao.split("/");
      dataInicio = `01/${mes}/${ano}`;
      dataFim = `31/${mes}/${ano}`;
    }

    const response = await fetch("/api/pedidos-itens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CLIENTE: pedido.C5_CLIENTE,
        DATAFIM: dataFim,
        DATAINI: dataInicio,
        FILIAL: pedido.C5_FILIAL || "0101",
        LOJA: pedido.C5_LOJACLI || "01",
        NUMERO_PEDIDO: pedido.C5_NUM,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.sucesso || data.sucesso !== "T") {
      throw new Error("Erro ao buscar pedidos com itens");
    }

    const pedidoEncontrado: PedidoComItens = data.dados[0];

    if (!pedidoEncontrado) {
      throw new Error(
        `Pedido ${pedido.C5_NUM} não encontrado na resposta da API`
      );
    }

    return pedidoEncontrado.itens || [];
  };

  // ✅ React Query
  const {
    data: itens = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ItemFormatado[], Error>({
    queryKey: ["pedido-itens", pedido.C5_NUM],
    queryFn: fetchItensPedido,
    enabled: isOpen,
    staleTime: 1000 * 60 * 5, // cache de 5 min
  });

  const formatarData = (data: string) => {
    if (!data || data.includes(" / / ")) return "Data não informada";
    if (data.includes("/") && data.length === 10) return data;
    const [day, month, year] = data.split("/");
    return `${day}/${month}/${year}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"
          aria-label={`Detalhes do pedido ${pedido.C5_NUM}`}
        >
          <Eye style={{ width: 28, height: 28 }} />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[1500px] overflow-y-auto p-6 md:p-10 bg-white rounded-lg">

        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Detalhes do Pedido #{pedido.C5_NUM}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* VALORES DA API */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-6 bg-gray-100 rounded-lg place-items-center text-center gap-2 md:gap-4">
            <div>
              <p className="text-sm md:text-base font-semibold italic text-gray-800 mb-1 tracking-wider">
                Data do pedido:
              </p>
              <p className="font-semibold text-gray-800 text-base md:text-lg italic tracking-wider">
                {formatarData(pedido.C5_EMISSAO)}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold italic text-gray-800 mb-1 tracking-wider">
                Status do pedido:
              </p>
              <p className="font-semibold text-gray-800 text-base md:text-lg italic tracking-wider">
                {pedido.STATUS}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold italic text-gray-800 mb-1 tracking-wider">
                Quantidade de itens:
              </p>
              <p className="font-semibold text-gray-800 text-base md:text-lg italic tracking-wider">
                {itens.length > 0 ? itens.length : "Nenhum item encontrado"}
              </p>
            </div>
          </div>

          {/* LOADING / ERROR / TABELA */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Carregando itens...</span>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-red-500 font-semibold mb-2">
                  {error?.message}
                </p>
                <Button onClick={() => refetch()} variant="outline" size="sm">
                  Tentar novamente
                </Button>
              </div>
            </div>
          ) : itens.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-medium">
              Nenhum item encontrado para este pedido
            </div>
          ) : (
            <>
              {/* ✅ Mobile: Cards */}
              <div className="md:hidden space-y-4">
                {itens.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Produto:
                      </span>{" "}
                      {item.produto} - {item.descricao}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Quantidade:
                      </span>{" "}
                      {item.quantidade}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Valor Unitário:
                      </span>{" "}
                      {item.precoUnitario.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Desconto:
                      </span>{" "}
                      {item.valorDesconto > 0
                        ? item.valorDesconto.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "—"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Total:
                      </span>{" "}
                      {item.valorTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                ))}
              </div>

              {/* ✅ Desktop: Tabela */}
              <div className="hidden md:block border rounded-lg overflow-x-auto w-full">
                <Table className="min-w-[600px] table-auto">
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      {[
                        "Item",
                        "Código Produto",
                        "Descrição",
                        "Quantidade",
                        "Valor Unitário",
                        "Desconto",
                        "Total",
                      ].map((header) => (
                        <TableHead
                          key={header}
                          className="text-gray-600 text-base italic font-semibold text-center"
                        >
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-200">
                    {itens.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold text-gray-800 italic text-center text-lg tracking-wider">
                          {item.item}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-800 italic text-center text-lg tracking-wider">
                          {item.produto}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-800 italic text-left text-lg tracking-wider">
                          {item.descricao}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-800 italic text-center text-lg tracking-wider">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-800 italic text-center text-lg tracking-wider">
                          {item.precoUnitario.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-800 italic text-center text-lg tracking-wider">
                          {item.valorDesconto > 0
                            ? item.valorDesconto.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })
                            : "—"}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-800 italic text-center text-lg tracking-wider">
                          {item.valorTotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

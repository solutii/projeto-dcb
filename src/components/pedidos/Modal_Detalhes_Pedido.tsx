"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Loader2 } from "lucide-react";
import { PedidoType } from "@/types/pedido";
import { buscarItensPedido, ItemPedido } from "../../lib/pedidoService";
import { useAuth } from "@/contexts/auth-context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface ModalDetalhesPedidoAsyncProps {
  pedido: PedidoType;
}

export const ModalDetalhesPedidoAsync = ({
  pedido,
}: ModalDetalhesPedidoAsyncProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth()

  const {
    data: itensPedidos,
    /* isError: isErrorItensPedidos,
    isLoading: isLoadingItensPedidos,
    isFetching: isFetchingItensPedidos */

  } = useQuery({
    queryKey: ['itensPedidos'],
    queryFn: async () => { 
      const response = await axios.post('/api/itens-pedido', {
        filial: "0101 ",
        cliente: user?.cod,
        loja: user?.loja,
      })

      return response.data;
    },
    refetchOnWindowFocus: false,
  })

  const carregarItens = async () => {
    try {
      setLoading(true);
      setError(null);

      const filialCorrigida = pedido.C5_FILIAL.padStart(4, "0");

      /* const itensBrutos = await buscarItensPedido(
        pedido.C5_NUM,
        pedido.C5_CLIENTE,
        filialCorrigida,
        pedido.C5_LOJACLI
      ); */

      const itensFormatados: ItemPedido[] = itensPedidos?.map((item: any) => ({
        item: item.numeroItem || item.C6_ITEM || "—",
        codigoProduto: item.codigoProduto || item.C6_PRODUTO || "—",
        quantidade:
          Number(item.quantidade) || Number(item.quantidadeVendida) || 0,
        valorUnitario:
          Number(item.valorUnitario) || Number(item.precoUnitario) || 0,
        total: Number(item.total) || Number(item.valorTotal) || 0,
      }));

      setItens(itensFormatados);
    } catch (err) {
      setError("Erro ao carregar itens do pedido");
      console.error("Erro ao carregar itens:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      carregarItens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const valorTotalPedido = itens.reduce((acc, item) => acc + item.total, 0);

  const formatarData = (data: string) => {
    if (!data || data.includes(" / / ")) return "Data não informada";

    if (data.includes("/") && data.length === 10) {
      return data;
    }

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
          <Eye className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Detalhes do Pedido #{pedido.C5_NUM}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do pedido */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Data do Pedido:</p>
              <p className="font-semibold text-gray-800">
                {formatarData(pedido.C5_EMISSAO)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Cliente:</p>
              <p className="font-semibold text-gray-800">{pedido.C5_CLIENTE}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status:</p>
              <p className="font-semibold text-gray-800">{pedido.STATUS}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Valor Total:</p>
              <p className="font-semibold text-green-600">
                R$ {Number(pedido.TOTAL).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Conteúdo principal */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Carregando itens...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-red-500 font-semibold mb-2">{error}</p>
                <Button onClick={carregarItens} variant="outline" size="sm">
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
              {/* Tabela de itens */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Item</TableHead>
                      <TableHead className="font-semibold">
                        Código Produto
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        Quantidade
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        Valor Unitário
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">
                          {item.item}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {item.codigoProduto}
                        </TableCell>
                        <TableCell className="text-right text-gray-800">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-right text-gray-800">
                          R$ {item.valorUnitario.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-green-600">
                          R$ {item.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Card com valor total */}
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-800">
                      Total do Pedido:
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      R$ {valorTotalPedido.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

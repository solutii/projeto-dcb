export interface ItemPedido {
  item: string;
  codigoProduto: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

export interface Pedido {
  C5_NUM: string;
  itens: ItemPedido[];
  // outros campos do pedido que quiser adicionar...
}

// Buscar todos os pedidos com itens, filtrando por cliente, filial, loja e datas opcionais
export const buscarPedidosComItens = async (
  cliente: string,
  filial: string,
  loja: string,
  dataIni?: string,
  dataFim?: string
): Promise<Pedido[]> => {
  try {
    if (!cliente || !filial || !loja) {
      throw new Error("Parâmetros cliente, filial e loja são obrigatórios");
    }

    const body: Record<string, string> = {
      CLIENTE: cliente,
      FILIAL: filial,
      LOJA: loja,
    };

    if (dataIni) body.DATAINI = dataIni;
    if (dataFim) body.DATAFIM = dataFim;

    const response = await fetch("/api/itens-pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar pedidos com itens");
    }

    const data = await response.json();

    if (!data.sucesso) {
      throw new Error(data.mensagem || "Erro na API");
    }

    return data.pedidos || [];
  } catch (error) {
    console.error("Erro ao buscar pedidos com itens:", error);
    return [];
  }
};

// Buscar itens de um pedido específico, filtrando na lista retornada
export const buscarItensPedido = async (
  numeroPedido: string,
  cliente: string,
  filial: string,
  loja: string,
  dataIni?: string,
  dataFim?: string
): Promise<ItemPedido[]> => {
  if (!numeroPedido) {
    console.warn("Número do pedido não informado");
    return [];
  }

  const pedidos = await buscarPedidosComItens(cliente, filial, loja, dataIni, dataFim);
  const pedido = pedidos.find((p) => p.C5_NUM === numeroPedido);

  return pedido?.itens || [];
};

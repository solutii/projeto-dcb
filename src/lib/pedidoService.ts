// services/pedidoService.ts

export interface ItemPedido {
  item: string;
  codigoProduto: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

// Função para buscar itens do pedido
export const buscarItensPedido = async (numeroPedido: string): Promise<ItemPedido[]> => {
  try {
    // Substitua pela sua API real
    const response = await fetch(`/api/pedidos/${numeroPedido}/itens`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar itens do pedido');
    }
    
    const itens = await response.json();
    return itens;
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error);
    
    // Retorna dados mock em caso de erro (remova em produção)
    return [
      {
        item: "001",
        codigoProduto: "PROD001",
        quantidade: 2,
        valorUnitario: 25.50,
        total: 51.00,
      },
      {
        item: "002",
        codigoProduto: "PROD002",
        quantidade: 1,
        valorUnitario: 15.00,
        total: 15.00,
      },
    ];
  }
};


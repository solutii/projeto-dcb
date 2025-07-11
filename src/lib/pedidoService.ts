// services/pedidoService.ts

export interface ItemPedido {
  item: string;
  codigoProduto: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

// Função para buscar itens do pedido
export const buscarItensPedido = async (
  numeroPedido: string,
  cliente?: string,
  filial?: string,
  loja?: string
): Promise<ItemPedido[]> => {
  try {
    // Constrói a URL com os parâmetros necessários
    const params = new URLSearchParams();
    if (cliente) params.append('cliente', cliente);
    if (filial) params.append('filial', filial);
    if (loja) params.append('loja', loja);
    
    const queryString = params.toString();
    const url = `/api/order/${numeroPedido}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar itens do pedido');
    }
    
    const itens = await response.json();
    return itens;
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error);
    
    // Retorna dados mock em caso de erro (remova em produção)
    return [
    ];
  }
};

// Função auxiliar para formatar números com zeros à esquerda
export const formatarComZeros = (valor: string | number, tamanho: number): string => {
  return String(valor).padStart(tamanho, '0');
};
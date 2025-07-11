// app/api/order/[numeroPedido]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { numeroPedido: string } }
) {
  try {
    const numeroPedido = params.numeroPedido;
    
    // Pega os dados do pedido da URL ou de outro lugar se necessário
    const url = new URL(request.url);
    const cliente = url.searchParams.get('cliente');
    const filial = url.searchParams.get('filial');
    const loja = url.searchParams.get('loja');

    console.log('Parâmetros recebidos:', { numeroPedido, cliente, filial, loja });
    
    const apiUrl = process.env.API_URL || 'http://localhost:8076/REST';
    const basicAuth = process.env.BASIC_AUTH || '';

    // Assumindo que você tem uma endpoint para buscar itens do pedido
    // Ajuste o endpoint conforme sua API do Protheus
    const response = await fetch(`${apiUrl}/COLETAITEMPEDIDO`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
      },
      body: JSON.stringify({
        PEDIDO: numeroPedido,
        CLIENTE: cliente || '',
        FILIAL: filial || '',
        LOJA: loja || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    
    // Define a proper interface for the item
    interface ProtheusItem {
      C6_ITEM?: string;
      C6_PRODUTO?: string;
      C6_QTDVEN?: string;
      C6_PRCVEN?: string;
      C6_VALOR?: string;
      // Adicione outros campos conforme necessário
    }

    // Mapeia os dados do Protheus para o formato esperado
    const itens = data.dados?.map((item: ProtheusItem) => ({
      item: item.C6_ITEM || '',
      codigoProduto: item.C6_PRODUTO || '',
      quantidade: parseFloat(item.C6_QTDVEN || '0'),
      valorUnitario: parseFloat(item.C6_PRCVEN || '0'),
      total: parseFloat(item.C6_VALOR || '0'),
      // Adicione outros campos conforme necessário
    })) || [];

    return NextResponse.json(itens);
    
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens do pedido' },
      { status: 500 }
    );
  }
}
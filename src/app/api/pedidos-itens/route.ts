// app/api/pedido-itens/route.ts
import { NextResponse } from 'next/server';

// Interfaces para tipagem
interface RequestBody {
    CLIENTE: string;
    DATAFIM: string;
    DATAINI: string;
    FILIAL: string;
    LOJA: string;
    NUMERO_PEDIDO?: string; // <-- ADICIONADO
}

interface Pedido {
    C5_NUM: string;
    C5_TIPO: string;
    C5_CLIENTE: string;
    C5_LOJAENT: string;
    C5_LOJACLI: string;
    C5_CLIENT: string;
    C5_CONDPAG: string;
    C5_TABELA: string;
    C5_MENNOTA: string;
    C5_VEND1: string;
    C5_EMISSAO: string;
    C5_FECENT: string;
    E4_DESCRI: string;
    TOTAL: number;
    FATURADO: number;
    STATUS: string;
}

interface Item {
    C5_FILIAL: string;
    C5_NUM: string;
    C6_ITEM: string;
    C6_PRODUTO: string;
    C6_QTDVEN: number;
    C6_PRCVEN: number;
    C6_VALOR: number;
    C6_VALDESC: number;
    B1_DESC: string;
    C5_CLIENTE: string;
    C5_LOJACLI: string;
}

interface ItemFormatado {
    item: string;
    produto: string;
    descricao: string;
    quantidade: number;
    precoUnitario: number;
    valorTotal: number;
    valorDesconto: number;
}

interface PedidoComItens extends Pedido {
    itens: ItemFormatado[];
}

interface ApiResponse<T> {
    sucesso: string;
    dados: T[];
}

export async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json();
        
        const { CLIENTE, DATAFIM, DATAINI, FILIAL, LOJA, NUMERO_PEDIDO } = body;

        const apiUrl = process.env.API_URL || 'http://localhost:8076/REST';
        const basicAuth = process.env.BASIC_AUTH || '';

        // 🔹 Buscar apenas o pedido específico, se informado
        let pedidosFiltrados: Pedido[] = [];

        if (NUMERO_PEDIDO) {
            // Filtramos apenas o pedido específico
            const pedidosResponse = await fetch(`${apiUrl}/COLETAPEDIDO`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
                },
                body: JSON.stringify({ CLIENTE, DATAFIM, DATAINI, FILIAL, LOJA }),
            });

            if (!pedidosResponse.ok) {
                throw new Error(`Erro ao buscar pedidos: ${pedidosResponse.status}`);
            }

            const pedidosData: ApiResponse<Pedido> = await pedidosResponse.json();

            if (!pedidosData.sucesso || pedidosData.sucesso !== 'T') {
                return NextResponse.json({ 
                    error: 'Erro ao buscar pedidos',
                    details: pedidosData 
                }, { status: 400 });
            }

            pedidosFiltrados = pedidosData.dados.filter(
                (pedido) => pedido.C5_NUM === NUMERO_PEDIDO
            );

            if (pedidosFiltrados.length === 0) {
                return NextResponse.json({
                    sucesso: 'T',
                    dados: []
                });
            }
        } else {
            // 🔹 Se não enviou número do pedido, busca todos
            const pedidosResponse = await fetch(`${apiUrl}/COLETAPEDIDO`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
                },
                body: JSON.stringify({ CLIENTE, DATAFIM, DATAINI, FILIAL, LOJA }),
            });

            const pedidosData: ApiResponse<Pedido> = await pedidosResponse.json();
            pedidosFiltrados = pedidosData.dados;
        }

        // 🔹 Buscar os itens do(s) pedido(s)
        const itensResponse = await fetch(`${apiUrl}/COLETAITEMPEDIDO`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
            },
            body: JSON.stringify({
                CLIENTE: CLIENTE || '',
                FILIAL: FILIAL || '',
                LOJA: LOJA || '',
            }),
        });

        if (!itensResponse.ok) {
            throw new Error(`Erro ao buscar itens: ${itensResponse.status}`);
        }

        const itensData: ApiResponse<Item> = await itensResponse.json();
        
        if (!itensData.sucesso || itensData.sucesso !== 'T') {
            return NextResponse.json({ 
                error: 'Erro ao buscar itens',
                details: itensData 
            }, { status: 400 });
        }

        // 🔹 Agrupar apenas os itens dos pedidos filtrados
        const pedidosComItens: PedidoComItens[] = pedidosFiltrados.map((pedido: Pedido) => {
            const itensDoPedido: Item[] = itensData.dados.filter(
                (item: Item) => item.C5_NUM === pedido.C5_NUM
            );
            
            return {
                ...pedido,
                itens: itensDoPedido.map((item: Item): ItemFormatado => ({
                    item: item.C6_ITEM,
                    produto: item.C6_PRODUTO,
                    descricao: item.B1_DESC,
                    quantidade: item.C6_QTDVEN,
                    precoUnitario: item.C6_PRCVEN,
                    valorTotal: item.C6_VALOR,
                    valorDesconto: item.C6_VALDESC,
                }))
            };
        });

        return NextResponse.json({
            sucesso: 'T',
            dados: pedidosComItens
        });

    } catch (error) {
        console.error('Erro na API pedido-itens:', error);
        return NextResponse.json({ 
            error: 'Erro interno do servidor',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}

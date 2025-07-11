// app/api/items/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Pegar parâmetros da query string
    const url = new URL(request.url);
    const cliente = url.searchParams.get("cliente");
    const filial = url.searchParams.get("filial");
    const loja = url.searchParams.get("loja");

    console.log("Parâmetros recebidos:", { cliente, filial, loja });

    const apiUrl = process.env.API_URL || "http://localhost:8076/REST";
    const basicAuth = process.env.BASIC_AUTH || "";

    let authHeader: string;
    if (basicAuth.includes(":")) {
      authHeader = `Basic ${Buffer.from(basicAuth).toString("base64")}`;
    } else {
      authHeader = `Basic ${basicAuth}`;
    }

    console.log("Chamando API Protheus...");

    const response = await fetch(`${apiUrl}/COLETAITEMPEDIDO`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        CLIENTE: cliente || "",
        FILIAL: filial || "",
        LOJA: loja || "",
      }),
    });

    console.log("Status da resposta:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro da API:", errorText);
      throw new Error(`Erro na API: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Resposta da API Protheus:", {
      sucesso: data.sucesso,
      totalItens: data.dados?.length || 0,
      mensagem: data.mensagem || "Sem mensagem",
    });

    if (!data.dados || data.dados.length === 0) {
      return NextResponse.json({
        sucesso: true,
        totalItens: 0,
        mensagem: data.mensagem || "Nenhum item encontrado",
        itens: [],
      });
    }

    console.log("Estrutura do primeiro item:", Object.keys(data.dados[0]));

    // Interface para tipagem
    interface ProtheusItem {
      C6_NUM?: string; // Número do pedido
      C6_ITEM?: string; // Item
      C6_PRODUTO?: string; // Código do produto
      C6_DESCRI?: string; // Descrição do produto
      C6_QTDVEN?: string; // Quantidade vendida
      C6_PRCVEN?: string; // Preço unitário
      C6_VALOR?: string; // Valor total
      C6_QTDLIB?: string; // Quantidade liberada
      C6_QTDENT?: string; // Quantidade entregue
    }

    const itens = data.dados.map((item: ProtheusItem) => ({
      numeroPedido: item.C6_NUM || "",
      numeroItem: item.C6_ITEM || "",
      codigoProduto: item.C6_PRODUTO || "",
      descricaoProduto: item.C6_DESCRI || "",
      quantidadeVendida: parseFloat(item.C6_QTDVEN || "0"),
      quantidadeLiberada: parseFloat(item.C6_QTDLIB || "0"),
      quantidadeEntregue: parseFloat(item.C6_QTDENT || "0"),
      precoUnitario: parseFloat(item.C6_PRCVEN || "0"),
      valorTotal: parseFloat(item.C6_VALOR || "0"),
      dadosOriginais: item,
    }));

    return NextResponse.json({
      sucesso: true,
      totalItens: itens.length,
      parametros: { cliente, filial, loja },
      itens,
    });
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    return NextResponse.json(
      {
        sucesso: false,
        erro: "Erro ao buscar itens dos pedidos",
        detalhes: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

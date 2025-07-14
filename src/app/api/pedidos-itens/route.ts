import { NextResponse } from "next/server";

interface Pedido {
  C5_NUM: string;
  [key: string]: unknown;
}

interface Item {
  C5_NUM: string;
  C5_FILIAL: string;
  [key: string]: unknown;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { CLIENTE, DATAFIM, DATAINI, FILIAL, LOJA } = body;

  const API_URL = process.env.API_URL || "http://localhost:8076/REST";
  const BASIC_AUTH = process.env.BASIC_AUTH || "";
  const authHeader = `Basic ${Buffer.from(BASIC_AUTH).toString("base64")}`;

  try {
    // 🔹 Buscar os pedidos
    const pedidosRes = await fetch(`${API_URL}/COLETAPEDIDO`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ CLIENTE, DATAFIM, DATAINI, FILIAL, LOJA }),
    });

    const pedidosData = await pedidosRes.json();
    console.log("Pedidos Data:", pedidosData);

    if (!pedidosRes.ok || !pedidosData.dados) {
      return NextResponse.json(
        { error: pedidosData, message: "Erro ao buscar pedidos" },
        { status: pedidosRes.status }
      );
    }

    // 🔹 Buscar os itens
    const FILIAL_CONCAT = FILIAL + LOJA;

    const itensRes = await fetch(`${API_URL}/COLETAITEMPEDIDO`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ CLIENTE, FILIAL: FILIAL_CONCAT }),
    });

    const itensData = await itensRes.json();
    console.log("Itens Data:", itensData);

    if (!itensRes.ok || !itensData.dados) {
      return NextResponse.json(
        { error: itensData, message: "Erro ao buscar itens" },
        { status: itensRes.status }
      );
    }

    // 🔗 Relacionar os pedidos com os itens
    const pedidosComItens = pedidosData.dados.map((pedido: Pedido) => {
      const itensDoPedido = itensData.dados.filter(
        (item: Item) =>
          item.C5_NUM === pedido.C5_NUM && item.C5_FILIAL === FILIAL_CONCAT
      );

      return {
        ...pedido,
        FILIAL_PADRAO: FILIAL_CONCAT,
        itens: itensDoPedido,
      };
    });

    return NextResponse.json({ pedidos: pedidosComItens });
  } catch (error) {
    console.error("Erro inesperado:", error);
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}

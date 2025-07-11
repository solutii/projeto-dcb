// lib/protheus/getItensDoPedido.ts
interface ProtheusItem {
  C6_NUM?: string;
  C6_ITEM?: string;
  C6_PRODUTO?: string;
  C6_DESCRI?: string;
  C6_QTDVEN?: string;
  C6_PRCVEN?: string;
  C6_VALOR?: string;
  C6_QTDLIB?: string;
  C6_QTDENT?: string;
  [key: string]: unknown;
}

export async function getItensDoPedido({
  cliente,
  filial,
  loja,
}: {
  cliente: string;
  filial: string;
  loja: string;
}) {
  const apiUrl = process.env.API_URL || "http://localhost:8076/REST";
  const basicAuth = process.env.BASIC_AUTH || "";
  const authHeader = `Basic ${Buffer.from(basicAuth).toString("base64")}`;

  const response = await fetch(`${apiUrl}/COLETAITEMPEDIDO`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      CLIENTE: cliente,
      FILIAL: filial,
      LOJA: loja,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao buscar itens: ${errorText}`);
  }

  const data = await response.json();

  const itens = (data.dados || []).map((item: ProtheusItem) => ({
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

  return itens;
}

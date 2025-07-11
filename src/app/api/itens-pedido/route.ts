// app/api/items/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Pegar parâmetros da query string
  const url = new URL(request.url);
  const cliente = url.searchParams.get("cliente");
  const filial = url.searchParams.get("filial");
  const loja = url.searchParams.get("loja");

  const apiUrl = process.env.API_URL || "http://localhost:8076/REST";
  const basicAuth = process.env.BASIC_AUTH || "";

  const response = await fetch(`${apiUrl}/COLETAITEMPEDIDO`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
    },
    body: JSON.stringify({
      CLIENTE: cliente || "",
      FILIAL: filial || "",
      LOJA: loja || "",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }
  return NextResponse.json(data);
}

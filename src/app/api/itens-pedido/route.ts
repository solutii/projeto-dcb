// app/api/items/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { cliente, filial, loja } = await request.json();

  const apiUrl = process.env.API_URL || "http://localhost:8076/REST";
  const basicAuth = process.env.BASIC_AUTH || "";

  const response = await fetch(`${apiUrl}/COLETAITEMPEDIDO`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
      "tenantid": "01,0101"
    },
    body: JSON.stringify({
      CLIENTE: cliente,
      FILIAL: filial,
      LOJA: loja,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }
  return NextResponse.json(data);
}

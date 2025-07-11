// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const LOGIN = body.LOGIN;
  const SENHA = body.SENHA;

  const url = process.env.API_URL || "http://localhost:8076/REST";
  const basicAuth = process.env.BASIC_AUTH || "";

  const response = await fetch(`${url}/USUARIOLOGIN`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
    },
    body: JSON.stringify({ LOGIN, SENHA }),
  });

  const data = await response.json();

  if (data.sucesso === "T") {
    const user = data.dados[0];

    const cookieStore = await cookies();

    // Cookie de token fictício
    cookieStore.set("session-token", "your-generated-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Cookie com nome do usuário
    cookieStore.set("user-data", JSON.stringify({ nome: user.A1_NOME }), {
      httpOnly: false, // visível no client
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return NextResponse.json(data);
}

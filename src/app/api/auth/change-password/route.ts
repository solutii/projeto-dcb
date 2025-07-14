// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const LOGIN = body.LOGIN;
  const SENHA = body.SENHA;

  const url = process.env.API_URL || "http://localhost:8076/REST";
  const basicAuth = process.env.BASIC_AUTH || "";

  const response = await fetch(`${url}/USUARIOSENHA`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
    },
    body: JSON.stringify({ LOGIN, SENHA }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}

// import { NextResponse } from "next/server"; // Importa NextResponse para retornar respostas HTTP

// export async function POST(request: Request) {
//   const body = await request.json();
//   const LOGIN = body.LOGIN;
//   const SENHA = body.SENHA;

//   const url = process.env.API_URL || "http://localhost:8076/REST";
//   const
//  basicAuth = process.env.BASIC_AUTH || "";

//   const response = await fetch(`${url}/USUARIOLOGIN`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
//     },
//     body: JSON.stringify({ LOGIN, SENHA }),
//   });

//   const data = await response.json();
//   return NextResponse.json(data);
// }




import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const LOGIN = body.LOGIN;
  const SENHA = body.SENHA;

  const url = process.env.API_URL || "http://localhost:8076/REST";
  const
 basicAuth = process.env.BASIC_AUTH || "";

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
    // Configurar cookie de sessão
    const cookieStore = await cookies();
    cookieStore.set("session-token", "your-generated-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    });
  }

  return NextResponse.json(data);
}

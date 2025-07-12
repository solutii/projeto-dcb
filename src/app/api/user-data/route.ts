// app/api/user-data/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const userData = cookieStore.get("user-data");

  if (!userData) {
    return NextResponse.json({ nome: null }, { status: 200 });
  }

  return NextResponse.json(JSON.parse(userData.value));
}

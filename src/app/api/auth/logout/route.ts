import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout realizado com sucesso' });

  // Remove o cookie "session" com data de expiração no passado
  response.cookies.set('session-token', '', { path: '/', expires: new Date(0) });

  return response;
}

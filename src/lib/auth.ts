// lib/auth.ts
import { cookies } from 'next/headers';

interface User {
  login: string;
  codigo: string;
  nome: string;
  empresa: string;
  filial: string;
  token: string;
}

interface Session {
  user: User;
  expires: string;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie?.value) return null;
  
  try {
    const session = JSON.parse(sessionCookie.value) as Session;
    
    // Verifica se a sessão expirou
    if (new Date(session.expires) < new Date()) {
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session ? session.user : null;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('session', '', { expires: new Date(0) });
}
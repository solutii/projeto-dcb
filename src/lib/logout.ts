export async function logoutClient() {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('Erro ao fazer logout');
    }

    // Redireciona para o login ou página inicial
    window.location.href = '/login';
  } catch (error) {
    console.error(error);
    alert('Erro ao sair. Tente novamente.');
  }
}
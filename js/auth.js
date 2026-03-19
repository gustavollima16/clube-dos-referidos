/**
 * AUTH.JS — Funções de autenticação via Supabase
 * ------------------------------------------------
 * authLogin       : Faz login com email/senha
 * authSignup      : Cria nova conta
 * authLogout      : Encerra a sessão
 * authResetPassword: Envia email de redefinição de senha
 * getSession      : Retorna a sessão ativa (ou null)
 * getUser         : Retorna os dados do usuário logado
 * requireAuth     : Redireciona para login se não autenticado
 */

// --- Verificar aprovação ---
async function checkApproved(userId) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('approved')
    .eq('id', userId)
    .single();
  if (error || !data) return false;
  return data.approved === true;
}

const ADMIN_EMAIL = 'grupoalpha.alphaville@gmail.com';

// --- Login ---
async function authLogin(email, password) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Admin bypassa aprovação
    if (data.user.email === ADMIN_EMAIL) return { data };

    const approved = await checkApproved(data.user.id);
    if (!approved) {
      await supabaseClient.auth.signOut();
      return { error: 'pending_approval' };
    }

    return { data };
  } catch (err) {
    return { error: translateAuthError(err.message) };
  }
}

// --- Cadastro ---
async function authSignup(email, password, name) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });
    if (error) throw error;
    return { data };
  } catch (err) {
    return { error: translateAuthError(err.message) };
  }
}

// --- Logout ---
async function authLogout() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
    window.location.href = 'index.html';
  }
}

// --- Reset de senha ---
async function authResetPassword(email) {
  try {
    const redirectTo = `${window.location.origin}/index.html`;
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    return { success: true };
  } catch (err) {
    return { error: translateAuthError(err.message) };
  }
}

// --- Obter sessão ativa ---
async function getSession() {
  const { data } = await supabaseClient.auth.getSession();
  return data.session;
}

// --- Obter usuário logado ---
async function getUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data.user;
}

// --- Proteção de rotas ---
// Chame esta função no topo de cada página protegida
async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  // Admin sempre tem acesso
  if (session.user.email === ADMIN_EMAIL) return session;

  const approved = await checkApproved(session.user.id);
  if (!approved) {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

// --- Redirecionar se já logado (para a página de login) ---
async function redirectIfLoggedIn() {
  const session = await getSession();
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

// --- Helper: traduzir erros para português ---
function translateAuthError(msg) {
  const errors = {
    'Invalid login credentials':          'Email ou senha inválidos. Tente novamente.',
    'Email not confirmed':                 'Confirme seu email antes de entrar.',
    'User already registered':             'Este email já possui uma conta cadastrada.',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
    'Email rate limit exceeded':           'Muitas tentativas. Aguarde alguns minutos.',
    'Unable to validate email address':    'Email inválido. Verifique e tente novamente.',
    'Signup is disabled':                  'Cadastros estão temporariamente desativados.',
  };

  for (const [key, value] of Object.entries(errors)) {
    if (msg.includes(key)) return value;
  }
  return 'Ocorreu um erro. Tente novamente em instantes.';
}

// --- Inicializar páginas de login ---
// Redireciona automaticamente quem já está logado
if (document.body.classList.contains('auth-page')) {
  redirectIfLoggedIn();
}

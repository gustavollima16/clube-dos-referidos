/**
 * SUPABASE CONFIG
 * ---------------
 * Configure suas variáveis de ambiente antes de fazer o deploy.
 * Em desenvolvimento local: use um arquivo .env ou edite as constantes abaixo.
 * Em produção (Vercel/Netlify): configure as variáveis de ambiente no painel.
 *
 * COMO OBTER SUAS CHAVES:
 * 1. Acesse https://supabase.com e crie um projeto (gratuito)
 * 2. Vá em Settings > API
 * 3. Copie a "Project URL" e a "anon public" key
 */

// ⚠️ SUBSTITUA PELOS VALORES DO SEU PROJETO SUPABASE
const SUPABASE_URL  = window.__SUPABASE_URL__  || 'https://zjdiwjmmnjigikhehamo.supabase.co';
const SUPABASE_ANON = window.__SUPABASE_ANON__ || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZGl3am1tbmppZ2lraGVoYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODMzODcsImV4cCI6MjA4OTQ1OTM4N30.wQ8JiSIXIpLPJtw0Tp_DYrZFgUfp0j3rJPYwZ54cgDA';

// Inicializa o cliente Supabase via CDN (carregado no HTML)
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON);

// Export global para uso nos outros scripts
window.supabaseClient = supabaseClient;

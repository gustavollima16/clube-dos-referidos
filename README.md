# Clube dos Referidos — Área de Membros

Plataforma web de membros do Clube dos Referidos. Dark mode, neon, stack 100% gratuita.

---

## Stack

| Camada | Tecnologia | Custo |
|--------|-----------|-------|
| Frontend | HTML + CSS + JS puro | Gratuito |
| Auth + DB | Supabase | Gratuito |
| Storage | Supabase Storage | Gratuito (até 1GB) |
| Hospedagem | Vercel ou Netlify | Gratuito |
| Vídeos | YouTube (unlisted) / Vimeo | Gratuito |
| Domínio | Comprar separado | ~R$ 40-80/ano |

---

## Páginas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `index.html` | Landing + Login/Cadastro |
| `/dashboard.html` | `dashboard.html` | Dashboard do membro |
| `/videoaulas.html` | `videoaulas.html` | Vídeo aulas por módulo |
| `/ebooks.html` | `ebooks.html` | eBooks e PDFs |
| `/arquivos.html` | `arquivos.html` | Templates, planilhas, recursos |
| `/fotos.html` | `fotos.html` | Galeria de fotos com lightbox |
| `/membros.html` | `membros.html` | Painel de membros |
| `/sobre.html` | `sobre.html` | Sobre o clube, missão, fundadores |

---

## Setup Inicial (5 minutos)

### 1. Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **New project** e preencha os dados
3. Aguarde a criação do projeto (2-3 minutos)
4. Vá em **Settings > API**
5. Copie:
   - **Project URL** → `https://xxxxx.supabase.co`
   - **anon public** key → string longa começando com `eyJ...`

### 2. Configurar variáveis

Edite o arquivo `js/supabase-config.js` e substitua:
```js
const SUPABASE_URL  = 'https://SEU-PROJETO.supabase.co';  // sua URL
const SUPABASE_ANON = 'SUA-ANON-KEY-AQUI';               // sua chave
```

### 3. Configurar Autenticação no Supabase

1. No painel do Supabase, vá em **Authentication > Settings**
2. Em **Email Auth**: ative "Enable email confirmations" (recomendado) ou desative para testes
3. Em **URL Configuration**: adicione sua URL de produção em "Site URL"
   - Exemplo: `https://seu-dominio.com.br`
   - Para testes: `http://localhost:5500` (ou sua porta local)

### 4. Criar buckets no Supabase Storage

1. Vá em **Storage** no painel do Supabase
2. Crie os seguintes buckets:
   - `ebooks` — para PDFs e eBooks
   - `arquivos` — para templates e planilhas
   - `fotos` — para fotos da galeria
3. Para cada bucket, defina a política de acesso:
   - **Leitura pública**: se quiser links diretos (mais simples)
   - **Autenticado**: se quiser restringir a membros logados (mais seguro)

---

## Conteúdo — Como editar

### Vídeo Aulas
Edite `js/data/videos.js`:
```js
const VIDEOS = [
  {
    id: 1,
    moduleId: 1,
    title: 'Título do vídeo',
    desc: 'Descrição curta',
    duration: '10:30',
    youtubeId: 'ID_DO_YOUTUBE',  // parte final da URL do YouTube
    tags: ['tag1', 'tag2'],
  },
  // ...
];
```

**Como pegar o ID do YouTube:**
URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
ID: `dQw4w9WgXcQ`

### eBooks e PDFs
Edite `js/data/ebooks.js` — adicione a URL do Supabase Storage em `fileUrl`.

### Arquivos
Edite `js/data/arquivos.js` — mesmo padrão.

### Membros
Edite `js/data/membros.js`:
```js
const MEMBROS = [
  {
    id: 1,
    name: 'Nome Completo',
    role: 'Cargo',
    company: 'Empresa',
    city: 'Cidade, UF',
    bio: 'Descrição em 1-2 frases.',
    photo: 'https://url-da-foto.jpg',  // ou deixe '' para usar iniciais
    socials: {
      instagram: 'https://instagram.com/usuario',
      linkedin: 'https://linkedin.com/in/usuario',
      whatsapp: 'https://wa.me/5511999999999',
    },
    tags: ['Vendas B2B', 'Liderança'],
    featured: false,  // true para destaque (ex: fundadores)
  },
];
```

### Fotos da galeria
Edite o array `FOTOS` diretamente em `fotos.html` (dentro da tag `<script>`):
```js
const FOTOS = [
  { url: 'https://url-da-foto.jpg', caption: 'Legenda', album: 'Eventos' },
];
```

### Novidades/Avisos no Dashboard
Edite diretamente o HTML em `dashboard.html` — procure por `<!-- Edite os itens abaixo -->`.

---

## Deploy na Vercel (recomendado)

### Opção A — Via GitHub (recomendado)

1. Crie um repositório no GitHub e faça push do projeto
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **New Project > Import Git Repository**
4. Selecione o repositório
5. Em **Environment Variables**, adicione:
   - `SUPABASE_URL` = sua URL
   - `SUPABASE_ANON_KEY` = sua chave anon
6. Clique em **Deploy**

> **Nota:** As variáveis de ambiente da Vercel NÃO são automaticamente injetadas em arquivos HTML/JS estáticos. Você precisará editar `js/supabase-config.js` diretamente com os valores, ou usar um build step. A forma mais simples é substituir os valores diretamente no arquivo antes de fazer o deploy.

### Opção B — Deploy direto (Vercel CLI)

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Deploy na Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **Add new site > Deploy manually**
3. Arraste a pasta `clube-dos-referidos` para a área de drop
4. Aguarde o deploy (30 segundos)
5. Configure as variáveis em **Site Settings > Environment Variables**

---

## Domínio Customizado

### Na Vercel:
1. Vá em **Project Settings > Domains**
2. Adicione seu domínio (ex: `membros.clubedosreferidos.com.br`)
3. Siga as instruções para apontar o DNS no seu registrador de domínios

### Na Netlify:
1. Vá em **Site Settings > Domain management**
2. Adicione seu domínio customizado
3. Configure o DNS conforme instruções

### DNS (passo a passo no registrador):
Para subdomínio (`membros.seudominio.com.br`):
- Tipo: `CNAME`
- Nome: `membros`
- Valor: fornecido pela Vercel/Netlify

Para domínio raiz (`seudominio.com.br`):
- Tipo: `A`
- Nome: `@`
- Valor: IP fornecido pela Vercel/Netlify

---

## Estrutura de Pastas

```
clube-dos-referidos/
├── index.html          # Landing + Auth
├── dashboard.html      # Dashboard do membro
├── videoaulas.html     # Vídeo aulas
├── ebooks.html         # eBooks e PDFs
├── arquivos.html       # Arquivos e templates
├── fotos.html          # Galeria de fotos
├── membros.html        # Painel de membros
├── sobre.html          # Sobre o clube
│
├── css/
│   └── global.css      # CSS global (variáveis, componentes)
│
├── js/
│   ├── supabase-config.js  # Config do Supabase
│   ├── auth.js             # Funções de autenticação
│   ├── sidebar.js          # Sidebar dinâmica
│   └── data/
│       ├── videos.js       # Dados dos vídeos
│       ├── ebooks.js       # Dados dos eBooks
│       ├── arquivos.js     # Dados dos arquivos
│       └── membros.js      # Dados dos membros
│
├── assets/
│   └── images/         # Imagens locais
│
├── .env.example        # Modelo de variáveis de ambiente
├── vercel.json         # Config de deploy Vercel
├── netlify.toml        # Config de deploy Netlify
└── README.md           # Este arquivo
```

---

## Adicionar novas páginas

1. Crie um novo arquivo HTML (ex: `eventos.html`)
2. Use o mesmo template das outras páginas:
   - Inclua `<div id="sidebar-mount"></div>`
   - Inclua as tags `<script>` do Supabase, auth, sidebar
   - Chame `initSidebar()` no `DOMContentLoaded`
3. Adicione a nova página no array `NAV_ITEMS` em `js/sidebar.js`

---

## Suporte

- Documentação Supabase: [supabase.com/docs](https://supabase.com/docs)
- Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
- Documentação Netlify: [docs.netlify.com](https://docs.netlify.com)

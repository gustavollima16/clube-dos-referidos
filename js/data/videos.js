/**
 * DADOS — VÍDEO AULAS
 * --------------------
 * Para adicionar ou editar vídeos, modifique o array abaixo.
 *
 * Campos:
 *  - id        : número único
 *  - moduleId  : ID do módulo ao qual pertence
 *  - title     : Título do vídeo
 *  - desc      : Descrição curta
 *  - duration  : Duração (string, ex: "12:34")
 *  - youtubeId : ID do vídeo no YouTube (parte da URL: youtube.com/watch?v=XXXX)
 *              : Para Vimeo, use vimeoId ao invés
 *  - tags      : Array de tags
 *
 * COMO PEGAR O ID DO YOUTUBE:
 *  URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *  ID:  dQw4w9WgXcQ
 *
 * VÍDEO NÃO LISTADO (unlisted):
 *  Funciona normalmente com embed. Só não aparece nas buscas do YouTube.
 */

const MODULOS = [
  { id: 1, title: 'Módulo 1 — Boas-Vindas ao Clube', icon: '👋', desc: 'Entenda como funcionar dentro do clube e tire o máximo dessa experiência.' },
  { id: 2, title: 'Módulo 2 — Como Funciona o Sistema de Referidos', icon: '🔗', desc: 'Aprenda o mecanismo de referidos, como gerar indicações e multiplicar sua rede.' },
  { id: 3, title: 'Módulo 3 — Formação de Times Comerciais', icon: '👥', desc: 'Como recrutar, treinar e liderar um time de vendas de alta performance.' },
  { id: 4, title: 'Módulo 4 — Liderança em Vendas', icon: '🏆', desc: 'Desenvolva as habilidades de liderança que separam os bons dos grandes.' },
  { id: 5, title: 'Módulo 5 — Técnicas Avançadas de Vendas', icon: '⚡', desc: 'Scripts, objeções, fechamento e estratégias para vender mais e melhor.' },
];

const VIDEOS = [
  // Módulo 1
  {
    id: 1,
    moduleId: 1,
    title: 'Bem-vindo ao Clube dos Referidos',
    desc: 'Mensagem de boas-vindas dos fundadores e visão geral do que você vai encontrar aqui.',
    duration: '05:30',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO', // ex: dQw4w9WgXcQ
    tags: ['boas-vindas', 'onboarding'],
  },
  {
    id: 2,
    moduleId: 1,
    title: 'Como navegar pela plataforma',
    desc: 'Um tour rápido pela área de membros, onde encontrar cada conteúdo e como aproveitar ao máximo.',
    duration: '04:15',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['onboarding', 'plataforma'],
  },
  {
    id: 3,
    moduleId: 1,
    title: 'O Manifesto do Clube',
    desc: 'Os valores, princípios e compromissos que guiam nossa comunidade de vendedores.',
    duration: '08:00',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['cultura', 'valores'],
  },

  // Módulo 2
  {
    id: 4,
    moduleId: 2,
    title: 'O que é o sistema de referidos',
    desc: 'Entenda a lógica por trás do modelo de indicação e por que ele é tão poderoso para crescimento.',
    duration: '10:20',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['referidos', 'estratégia'],
  },
  {
    id: 5,
    moduleId: 2,
    title: 'Como gerar indicações de qualidade',
    desc: 'Técnicas práticas para pedir, receber e cultivar referidos que realmente convertem.',
    duration: '14:45',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['referidos', 'indicações'],
  },

  // Módulo 3
  {
    id: 6,
    moduleId: 3,
    title: 'Recrutamento de vendedores de alto impacto',
    desc: 'Como identificar, atrair e selecionar os perfis certos para seu time comercial.',
    duration: '18:30',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['recrutamento', 'times'],
  },
  {
    id: 7,
    moduleId: 3,
    title: 'Onboarding que acelera a rampa',
    desc: 'Estruture um processo de integração que leva novos vendedores a resultados mais rápido.',
    duration: '15:00',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['onboarding', 'times'],
  },

  // Módulo 4
  {
    id: 8,
    moduleId: 4,
    title: 'Gestão de pipeline e forecast',
    desc: 'Aprenda a gerenciar oportunidades e prever resultados com precisão.',
    duration: '20:00',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['liderança', 'pipeline'],
  },

  // Módulo 5
  {
    id: 9,
    moduleId: 5,
    title: 'Tratamento de objeções avançado',
    desc: 'Scripts e técnicas para converter as principais objeções em fechamentos.',
    duration: '22:15',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['objeções', 'fechamento'],
  },
  {
    id: 10,
    moduleId: 5,
    title: 'Técnicas de fechamento de alto impacto',
    desc: 'Os métodos mais eficientes para conduzir o cliente à decisão de compra.',
    duration: '19:40',
    youtubeId: 'SUBSTITUA_PELO_ID_DO_VIDEO',
    tags: ['fechamento', 'vendas'],
  },
];

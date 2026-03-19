/**
 * DADOS — EBOOKS & PDFs
 * ----------------------
 * Para adicionar ou editar ebooks, modifique o array abaixo.
 *
 * Campos:
 *  - id       : número único
 *  - title    : Título do ebook/PDF
 *  - desc     : Descrição curta
 *  - cover    : URL da capa (pode ser do Supabase Storage ou externa)
 *  - fileUrl  : URL do arquivo para download (Supabase Storage)
 *  - category : Categoria (ex: 'Vendas', 'Liderança', 'Scripts')
 *  - pages    : Número de páginas (string)
 *  - type     : 'ebook' | 'pdf' | 'planilha'
 *
 * COMO HOSPEDAR NO SUPABASE STORAGE:
 *  1. Vá em Storage no painel do Supabase
 *  2. Crie um bucket chamado "ebooks" (pode ser público ou privado)
 *  3. Faça upload do arquivo
 *  4. Copie a URL pública e cole em fileUrl
 */

const EBOOKS = [
  {
    id: 1,
    title: 'O Guia Definitivo de Indicações',
    desc: 'Tudo que você precisa saber para construir um sistema de referidos que gera resultados consistentes.',
    cover: '', // URL da capa
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/ebooks/guia-indicacoes.pdf',
    category: 'Referidos',
    pages: '48',
    type: 'ebook',
  },
  {
    id: 2,
    title: 'Scripts de Vendas que Convertem',
    desc: '20+ scripts prontos para cada etapa do funil — prospecção, qualificação, proposta e fechamento.',
    cover: '',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/ebooks/scripts-vendas.pdf',
    category: 'Scripts',
    pages: '62',
    type: 'pdf',
  },
  {
    id: 3,
    title: 'Manual de Liderança Comercial',
    desc: 'Como liderar times de vendas com alta performance, gestão de metas e cultura de resultados.',
    cover: '',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/ebooks/manual-lideranca.pdf',
    category: 'Liderança',
    pages: '84',
    type: 'ebook',
  },
  {
    id: 4,
    title: 'Objeções: Como Transformar "Não" em "Sim"',
    desc: 'As 30 principais objeções em vendas e como tratar cada uma com naturalidade e eficácia.',
    cover: '',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/ebooks/objecoes.pdf',
    category: 'Vendas',
    pages: '36',
    type: 'pdf',
  },
  {
    id: 5,
    title: 'Gestão de Pipeline Comercial',
    desc: 'Metodologia prática para estruturar, gerenciar e acelerar seu funil de vendas.',
    cover: '',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/ebooks/pipeline.pdf',
    category: 'Gestão',
    pages: '52',
    type: 'ebook',
  },
  {
    id: 6,
    title: 'Recrutamento de Vendedores A-Players',
    desc: 'Como atrair, selecionar e reter os melhores talentos comerciais do mercado.',
    cover: '',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/ebooks/recrutamento.pdf',
    category: 'Times',
    pages: '44',
    type: 'pdf',
  },
];

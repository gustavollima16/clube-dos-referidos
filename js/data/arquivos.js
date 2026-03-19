/**
 * DADOS — ARQUIVOS E RECURSOS
 * ----------------------------
 * Templates, planilhas, materiais de apoio.
 *
 * Campos:
 *  - id       : número único
 *  - title    : Nome do arquivo
 *  - desc     : Descrição do que é o arquivo
 *  - fileUrl  : URL do arquivo no Supabase Storage
 *  - type     : 'xlsx' | 'docx' | 'pdf' | 'pptx' | 'zip' | 'csv'
 *  - size     : Tamanho estimado (ex: '1.2 MB')
 *  - category : Categoria (ex: 'Templates', 'Planilhas', 'Apresentações')
 *  - downloads: Número de downloads (opcional, decorativo)
 */

const ARQUIVOS = [
  {
    id: 1,
    title: 'Planilha de Metas de Vendas 2025',
    desc: 'Acompanhe e gerencie metas individuais e coletivas do time com dashboard automático.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/metas-vendas-2025.xlsx',
    type: 'xlsx',
    size: '820 KB',
    category: 'Planilhas',
    downloads: 142,
  },
  {
    id: 2,
    title: 'Template de Proposta Comercial',
    desc: 'Modelo profissional de proposta comercial editável, pronto para personalizar com sua marca.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/template-proposta.docx',
    type: 'docx',
    size: '350 KB',
    category: 'Templates',
    downloads: 98,
  },
  {
    id: 3,
    title: 'Checklist de Onboarding de Vendedores',
    desc: 'Processo passo a passo para integrar novos vendedores e acelerar a rampa de produtividade.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/checklist-onboarding.pdf',
    type: 'pdf',
    size: '180 KB',
    category: 'Templates',
    downloads: 76,
  },
  {
    id: 4,
    title: 'Apresentação: Pitch de Vendas Consultivas',
    desc: 'Template de apresentação para conduzir reuniões de vendas consultivas com alta taxa de conversão.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/pitch-vendas.pptx',
    type: 'pptx',
    size: '2.4 MB',
    category: 'Apresentações',
    downloads: 215,
  },
  {
    id: 5,
    title: 'Dashboard de Pipeline (Google Sheets)',
    desc: 'Planilha para gestão visual de oportunidades, etapas do funil e forecast mensal.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/dashboard-pipeline.xlsx',
    type: 'xlsx',
    size: '1.1 MB',
    category: 'Planilhas',
    downloads: 187,
  },
  {
    id: 6,
    title: 'Script de Cold Call — Modelo Completo',
    desc: 'Roteiro completo de ligação fria com abertura, qualificação, proposta de valor e call to action.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/script-cold-call.docx',
    type: 'docx',
    size: '95 KB',
    category: 'Scripts',
    downloads: 301,
  },
  {
    id: 7,
    title: 'Calculadora de Comissão de Vendas',
    desc: 'Calcule automaticamente comissões variáveis, aceleradoras e bonificações por meta.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/calculadora-comissao.xlsx',
    type: 'xlsx',
    size: '640 KB',
    category: 'Planilhas',
    downloads: 129,
  },
  {
    id: 8,
    title: 'Plano de 90 Dias para Novos Vendedores',
    desc: 'Roadmap semanal para os primeiros 90 dias de um vendedor, com metas e entregáveis claros.',
    fileUrl: 'https://SEU-PROJETO.supabase.co/storage/v1/object/public/arquivos/plano-90-dias.pdf',
    type: 'pdf',
    size: '220 KB',
    category: 'Templates',
    downloads: 93,
  },
];

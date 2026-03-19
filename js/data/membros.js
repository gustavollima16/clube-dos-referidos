/**
 * DADOS — MEMBROS DO CLUBE
 * -------------------------
 * Adicione ou edite membros no array abaixo.
 * Futuramente, esses dados podem vir direto do banco de dados Supabase.
 *
 * Campos:
 *  - id        : número único
 *  - name      : Nome completo
 *  - role      : Cargo/função (ex: 'Diretor Comercial', 'SDR Senior')
 *  - company   : Empresa atual (opcional)
 *  - city      : Cidade/estado
 *  - bio       : Descrição curta (1-2 linhas)
 *  - photo     : URL da foto (Supabase Storage ou URL externa)
 *  - socials   : { instagram, linkedin, whatsapp, twitter } — deixe '' para omitir
 *  - tags      : Array de especialidades/áreas
 *  - featured  : true para destacar o card (membros fundadores, etc)
 */

const MEMBROS = [
  {
    id: 1,
    name: 'Nome do Membro',
    role: 'Diretor Comercial',
    company: 'Empresa Exemplo',
    city: 'São Paulo, SP',
    bio: 'Especialista em vendas consultivas B2B com foco em enterprise. Liderou times de até 40 vendedores e escalou receita de R$2M para R$18M em 3 anos.',
    photo: '', // URL da foto
    socials: {
      instagram: 'https://instagram.com/usuario',
      linkedin: 'https://linkedin.com/in/usuario',
      whatsapp: '', // ex: 'https://wa.me/5511999999999'
    },
    tags: ['Vendas B2B', 'Liderança', 'Enterprise'],
    featured: true,
  },
  {
    id: 2,
    name: 'Outro Membro',
    role: 'Gerente de Vendas',
    company: 'Outra Empresa',
    city: 'Rio de Janeiro, RJ',
    bio: 'Especialista em construção de times comerciais e metodologias de vendas ágeis. Apaixonado por cultura de alta performance.',
    photo: '',
    socials: {
      instagram: 'https://instagram.com/usuario2',
      linkedin: 'https://linkedin.com/in/usuario2',
      whatsapp: '',
    },
    tags: ['Times Comerciais', 'Vendas Ágeis', 'Cultura'],
    featured: false,
  },
  {
    id: 3,
    name: 'Membro Três',
    role: 'Head de Vendas',
    company: 'Startup XYZ',
    city: 'Belo Horizonte, MG',
    bio: 'Referência em inbound sales e construção de processos comerciais escaláveis para startups em crescimento acelerado.',
    photo: '',
    socials: {
      instagram: '',
      linkedin: 'https://linkedin.com/in/usuario3',
      whatsapp: 'https://wa.me/5531999999999',
    },
    tags: ['Inbound Sales', 'Startups', 'Processos'],
    featured: false,
  },
  // Adicione quantos membros quiser seguindo o mesmo padrão...
];

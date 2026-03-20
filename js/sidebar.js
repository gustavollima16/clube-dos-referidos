/**
 * SIDEBAR.JS — Componente de navegação lateral
 * ---------------------------------------------
 * Injeta a sidebar e o header mobile em todas as páginas internas.
 * Para usar: adicione <div id="sidebar-mount"></div> no HTML
 * e chame initSidebar() após o DOM carregar.
 */

const SVG = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  video:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  ebook:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  arquivo:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  fotos:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  membros:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  newsletter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>`,
  sobre:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  sair:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
};

const NAV_ITEMS = [
  { href: 'dashboard.html',  icon: SVG.dashboard, label: 'Dashboard',       section: 'MENU' },
  { href: 'videoaulas.html', icon: SVG.video,     label: 'Vídeo Aulas',     section: null },
  { href: 'ebooks.html',     icon: SVG.ebook,     label: 'eBooks e PDFs',   section: null },
  { href: 'arquivos.html',   icon: SVG.arquivo,   label: 'Arquivos',         section: null },
  { href: 'fotos.html',      icon: SVG.fotos,     label: 'Galeria de Fotos', section: null },
  { href: 'membros.html',      icon: SVG.membros,     label: 'Membros',          section: 'COMUNIDADE' },
  { href: 'newsletter.html',  icon: SVG.newsletter,  label: 'Newsletter',       section: null },
  { href: 'sobre.html',       icon: SVG.sobre,       label: 'Sobre o Clube',    section: null },
];

function buildSidebar(user, photoUrl) {
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Membro';
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

  let navHTML = '';
  let lastSection = null;

  for (const item of NAV_ITEMS) {
    if (item.section && item.section !== lastSection) {
      navHTML += `<div class="nav-section-label">${item.section}</div>`;
      lastSection = item.section;
    } else if (!item.section && lastSection === null && navHTML === '') {
      navHTML += `<div class="nav-section-label">MENU</div>`;
      lastSection = 'MENU';
    }

    const isActive = currentPage === item.href ? 'active' : '';
    navHTML += `
      <a href="${item.href}" class="${isActive}">
        <span class="nav-icon">${item.icon}</span>
        ${item.label}
      </a>
    `;
  }

  return `
    <!-- Mobile Header -->
    <div class="mobile-header">
      <img src="images/logo.png" alt="Clube dos Referidos" class="mobile-logo" style="height:48px;width:auto;">
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">☰</button>
    </div>

    <!-- Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <!-- Foto do membro (clica → perfil) -->
        <a href="perfil.html" class="sidebar-member-photo" title="Meu Perfil">
          ${photoUrl
            ? `<img src="${photoUrl}" alt="${name}">`
            : `<span class="sidebar-member-photo-initials">${initials}</span>`
          }
        </a>
      </div>

      <nav class="sidebar-nav">
        ${navHTML}
      </nav>

      <div class="sidebar-footer">
        <a href="perfil.html" class="sidebar-user">
          <div class="sidebar-avatar">${initials}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${name}</div>
            <div class="sidebar-user-role" style="display:flex;align-items:center;gap:4px;">
              Meu Perfil
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        </a>
        <button class="btn btn-danger btn-sm" onclick="authLogout()" style="display:flex;align-items:center;gap:0.4rem;">
          ${SVG.sair} Sair
        </button>
      </div>
    </aside>
  `;
}

async function initSidebar() {
  // Protege a rota
  const session = await requireAuth();
  if (!session) return;

  const user = session.user;

  // Busca foto de perfil do Supabase (não bloqueia se falhar)
  let photoUrl = null;
  try {
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('photo_url')
      .eq('id', user.id)
      .single();
    photoUrl = profile?.photo_url || null;
  } catch (_) {}

  const mount = document.getElementById('sidebar-mount');
  if (mount) {
    mount.innerHTML = buildSidebar(user, photoUrl);
  }

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (toggle && sidebar && overlay) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Preenche nome do usuário onde existir .user-greeting
  const greetingEl = document.getElementById('userGreeting');
  if (greetingEl) {
    const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Membro';
    const firstName = name.split(' ')[0];
    greetingEl.textContent = firstName;
  }

  return user;
}

/**
 * SIDEBAR.JS — Componente de navegação lateral
 * ---------------------------------------------
 * Injeta a sidebar e o header mobile em todas as páginas internas.
 * Para usar: adicione <div id="sidebar-mount"></div> no HTML
 * e chame initSidebar() após o DOM carregar.
 */

const NAV_ITEMS = [
  { href: 'dashboard.html',  icon: '⊞',  label: 'Dashboard',       section: 'MENU' },
  { href: 'videoaulas.html', icon: '▶',  label: 'Vídeo Aulas',     section: null },
  { href: 'ebooks.html',     icon: '📖', label: 'eBooks & PDFs',   section: null },
  { href: 'arquivos.html',   icon: '📁', label: 'Arquivos',         section: null },
  { href: 'fotos.html',      icon: '🖼', label: 'Galeria de Fotos', section: null },
  { href: 'membros.html',    icon: '👥', label: 'Membros',          section: 'COMUNIDADE' },
  { href: 'sobre.html',      icon: 'ℹ', label: 'Sobre o Clube',    section: null },
];

function buildSidebar(user) {
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 52" fill="none" class="mobile-logo" style="height:36px;width:auto;" aria-label="Clube dos Referidos">
        <g transform="translate(0,6) scale(1)">
          <line x1="20" y1="14" x2="20" y2="10.5" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="24.5" y1="23.5" x2="27.5" y2="25.5" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="15.5" y1="23.5" x2="12.5" y2="25.5" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="20" cy="20" r="6" fill="#00E5FF"/>
          <circle cx="20" cy="20" r="9" fill="#00E5FF" opacity="0.12"/>
          <circle cx="20" cy="7" r="3.5" stroke="#00E5FF" stroke-width="1.5"/>
          <circle cx="31" cy="27.5" r="3.5" stroke="#00E5FF" stroke-width="1.5"/>
          <circle cx="9" cy="27.5" r="3.5" stroke="#00E5FF" stroke-width="1.5"/>
        </g>
        <line x1="52" y1="8" x2="52" y2="44" stroke="#00E5FF" stroke-width="1" opacity="0.25"/>
        <text x="64" y="24" font-family="'Bebas Neue','Arial Narrow',Arial,sans-serif" font-size="21" fill="#FFFFFF" letter-spacing="3">CLUBE DOS</text>
        <text x="64" y="46" font-family="'Bebas Neue','Arial Narrow',Arial,sans-serif" font-size="21" fill="#00E5FF" letter-spacing="3">REFERIDOS</text>
      </svg>
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">☰</button>
    </div>

    <!-- Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 52" fill="none" style="height:40px;width:auto;max-width:100%;" aria-label="Clube dos Referidos">
          <g transform="translate(0,6) scale(1)">
            <line x1="20" y1="14" x2="20" y2="10.5" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="24.5" y1="23.5" x2="27.5" y2="25.5" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="15.5" y1="23.5" x2="12.5" y2="25.5" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="20" cy="20" r="6" fill="#00E5FF"/>
            <circle cx="20" cy="20" r="9" fill="#00E5FF" opacity="0.12"/>
            <circle cx="20" cy="7" r="3.5" stroke="#00E5FF" stroke-width="1.5"/>
            <circle cx="31" cy="27.5" r="3.5" stroke="#00E5FF" stroke-width="1.5"/>
            <circle cx="9" cy="27.5" r="3.5" stroke="#00E5FF" stroke-width="1.5"/>
          </g>
          <line x1="52" y1="8" x2="52" y2="44" stroke="#00E5FF" stroke-width="1" opacity="0.25"/>
          <text x="64" y="24" font-family="'Bebas Neue','Arial Narrow',Arial,sans-serif" font-size="21" fill="#FFFFFF" letter-spacing="3">CLUBE DOS</text>
          <text x="64" y="46" font-family="'Bebas Neue','Arial Narrow',Arial,sans-serif" font-size="21" fill="#00E5FF" letter-spacing="3">REFERIDOS</text>
        </svg>
      </div>

      <nav class="sidebar-nav">
        ${navHTML}
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar">${initials}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${name}</div>
            <div class="sidebar-user-role">Membro</div>
          </div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="authLogout()">
          ⏻ Sair
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
  const mount = document.getElementById('sidebar-mount');
  if (mount) {
    mount.innerHTML = buildSidebar(user);
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

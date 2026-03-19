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
      <img src="images/logo.png" alt="Clube dos Referidos" class="mobile-logo" style="height:48px;width:auto;">
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">☰</button>
    </div>

    <!-- Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <img src="images/logo.png" alt="Clube dos Referidos" style="height:70px;width:auto;max-width:100%;">
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

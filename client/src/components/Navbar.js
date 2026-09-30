import { useState } from 'react';

const LINKS = [
  { page: 'inicio', label: 'Inicio', href: '/' },
  { page: 'productos', label: 'Productos', href: '/productos' },
  { page: 'contacto', label: 'Contacto', href: '/contacto' },
];

function Navbar({ cartCount = 0, activePage = 'inicio', searchTerm = '', showSearch = true, onNavigate, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((isOpen) => !isOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function navigate(event, page) {
    event.preventDefault();
    closeMenu();
    onNavigate(page);
  }

  function submitSearch(event) {
    event.preventDefault();
    onSearch(event.currentTarget.elements.busqueda.value);
    closeMenu();
    onNavigate('productos');
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="/" onClick={(event) => navigate(event, 'inicio')} aria-label="Mueblería Hermanos Jota - Inicio">
          <img className="navbar__mark" src="/LogoHermanosJota.png" alt="" aria-hidden="true" />
          <span className="navbar__name">
            Hermanos Jota
            <span className="navbar__tagline">Muebles artesanales</span>
          </span>
        </a>

        <nav
          id="main-navigation"
          className={`navbar__navigation${menuOpen ? ' navbar__navigation--open' : ''}`}
          aria-label="Navegación principal"
        >
          {LINKS.map((link) => (
            <a
              key={link.page}
              className={activePage === link.page ? 'navbar__link--active' : ''}
              aria-current={activePage === link.page ? 'page' : undefined}
              href={link.href}
              onClick={(event) => navigate(event, link.page)}
            >
              {link.label}
            </a>
          ))}

          {showSearch && (
            <form className="navbar__search" role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="navbar-search">Buscar productos</label>
              <svg className="navbar__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input id="navbar-search" name="busqueda" type="search" placeholder="Buscar muebles…" defaultValue={searchTerm} />
            </form>
          )}
        </nav>

        <div className="navbar__actions">
          <a className="navbar__cart" href="/productos" aria-label={`Ver carrito, ${cartCount} productos`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
              <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 8H6" />
            </svg>
            {cartCount > 0 && <span className="navbar__count">{cartCount}</span>}
          </a>
          <button
            className="navbar__menu-button"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

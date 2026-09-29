import { useState } from 'react';

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
    onNavigate('productos');
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="/" aria-label="Mueblería Hermanos Jota - Inicio">
          <span className="navbar__mark" aria-hidden="true">HJ</span>
          <span className="navbar__name">
            Mueblería Hermanos Jota
            <span className="navbar__tagline">Muebles artesanales</span>
          </span>
        </a>

        {showSearch && (
          <form className="navbar__search" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="navbar-search">Buscar productos</label>
            <span className="navbar__search-icon" aria-hidden="true">⌕</span>
            <input id="navbar-search" name="busqueda" type="search" placeholder="Buscar muebles..." defaultValue={searchTerm} />
            <button type="submit">Buscar</button>
          </form>
        )}

        <div className="navbar__actions">
          <a className="navbar__cart" href="/productos" aria-label={`Ver carrito, ${cartCount} productos`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="21" r="1.4" />
              <circle cx="18" cy="21" r="1.4" />
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

      <nav
        id="main-navigation"
        className={`navbar__navigation${menuOpen ? ' navbar__navigation--open' : ''}`}
        aria-label="Navegación principal"
      >
        <a className={activePage === 'inicio' ? 'navbar__link--active' : ''} href="/" onClick={(event) => navigate(event, 'inicio')}>Inicio</a>
        <a className={activePage === 'productos' ? 'navbar__link--active' : ''} href="/productos" onClick={(event) => navigate(event, 'productos')}>Productos</a>
        <a className={activePage === 'contacto' ? 'navbar__link--active' : ''} href="/contacto" onClick={(event) => navigate(event, 'contacto')}>Contacto</a>
      </nav>
    </header>
  );
}

export default Navbar;

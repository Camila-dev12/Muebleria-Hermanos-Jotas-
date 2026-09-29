import { useState } from 'react';

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((isOpen) => !isOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
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

        <div className="navbar__actions">
          <a className="navbar__cart" href="/productos" aria-label={`Ver carrito, ${cartCount} productos`}>
            <span aria-hidden="true">🛒</span>
            <span className="navbar__count">{cartCount}</span>
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
        <a href="/" onClick={closeMenu}>Inicio</a>
        <a href="/productos" onClick={closeMenu}>Productos</a>
        <a href="/contacto" onClick={closeMenu}>Contacto</a>
      </nav>
    </header>
  );
}

export default Navbar;

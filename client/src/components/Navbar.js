import { useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/contacto', label: 'Contacto' },
  // Sin `end`: queda activo también en /admin/crear-producto y /admin/editar-producto/:id
  { to: '/admin', label: 'Administración' },
];

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get('q') || '';

  function toggleMenu() {
    setMenuOpen((isOpen) => !isOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function submitSearch(event) {
    event.preventDefault();
    const term = event.currentTarget.elements.busqueda.value.trim();
    closeMenu();
    navigate(term ? `/productos?q=${encodeURIComponent(term)}` : '/productos');
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link className="navbar__brand" to="/" onClick={closeMenu} aria-label="Mueblería Hermanos Jota - Inicio">
          <img className="navbar__mark" src="/LogoHermanosJota.png" alt="" aria-hidden="true" />
          <span className="navbar__name">
            Hermanos Jota
            <span className="navbar__tagline">Muebles artesanales</span>
          </span>
        </Link>

        <nav
          id="main-navigation"
          className={`navbar__navigation${menuOpen ? ' navbar__navigation--open' : ''}`}
          aria-label="Navegación principal"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'navbar__link--active' : '')}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          <form className="navbar__search" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="navbar-search">Buscar productos</label>
            <svg className="navbar__search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            {/* key: si la búsqueda cambia desde otro lado (ej. se quita el filtro), el input se actualiza */}
            <input
              key={searchTerm}
              id="navbar-search"
              name="busqueda"
              type="search"
              placeholder="Buscar muebles…"
              defaultValue={searchTerm}
            />
          </form>
        </nav>

        <div className="navbar__actions">
          <Link className="navbar__cart" to="/productos" onClick={closeMenu} aria-label={`Ver carrito, ${cartCount} productos`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
              <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 8H6" />
            </svg>
            {cartCount > 0 && <span className="navbar__count">{cartCount}</span>}
          </Link>
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

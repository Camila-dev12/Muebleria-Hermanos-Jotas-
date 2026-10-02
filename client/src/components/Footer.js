import React from 'react';

const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__column footer__column--brand">
          <h3 className="footer__title">Mueblería Hermanos Jota</h3>
          <p className="footer__text">
            Cada pieza cuenta la historia de manos expertas y materiales nobles.
            Diseño atemporal y sustentable fabricado en Buenos Aires.
          </p>
        </div>
        
        <div className="footer__column">
          <h3 className="footer__title">Navegación</h3>
          <ul className="footer__links">
            {/* Navegación mediante SPA Router interno */}
            <li><a href="/" onClick={(e) => handleNav(e, 'inicio')}>Inicio</a></li>
            <li><a href="/productos" onClick={(e) => handleNav(e, 'productos')}>Productos</a></li>
            <li><a href="/contacto" onClick={(e) => handleNav(e, 'contacto')}>Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer__column">
          <h3 className="footer__title">Contacto</h3>
          <div className="footer__info">
            <p>
              <svg className="footer__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z"></path>
                <circle cx="12" cy="10" r="2.5"></circle>
              </svg> 
              Av. San Juan 2847, CABA
            </p>
            <p>
              <svg className="footer__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 3.5h3.2l1.6 4.4-2 1.6a13 13 0 0 0 6.2 6.2l1.6-2 4.4 1.6v3.2a1.5 1.5 0 0 1-1.6 1.5A17.5 17.5 0 0 1 3 5.1a1.5 1.5 0 0 1 1.5-1.6z"></path>
              </svg> 
              +54 11 4567-8900
            </p>
            <p>
              <svg className="footer__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="5" width="19" height="14" rx="2"></rect>
                <path d="M3 6.5l9 6.5 9-6.5"></path>
              </svg> 
              info@hermanosjota.com.ar
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>
          © {currentYear} Mueblería Hermanos Jota · Proyecto educativo · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

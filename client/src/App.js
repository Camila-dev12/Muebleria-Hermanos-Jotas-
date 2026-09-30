import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

const pageFromPath = () => {
  const path = window.location.pathname;
  if (path === '/productos') return 'productos';
  if (path === '/contacto') return 'contacto';
  return 'inicio';
};

function App() {
  const [activePage, setActivePage] = useState(pageFromPath);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    function handleBackOrForward() {
      setActivePage(pageFromPath());
    }

    window.addEventListener('popstate', handleBackOrForward);
    return () => window.removeEventListener('popstate', handleBackOrForward);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/productos?limit=50');
        if (!response.ok) throw new Error('No se pudo obtener el catálogo.');
        const result = await response.json();
        setProducts(result.data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function navigateTo(page) {
    const path = page === 'inicio' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToCart(product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  const categories = ['Todas', ...new Set(products.map((product) => product.categoria))];
  const featuredProducts = products.filter((product) => product.destacado);

  const visibleProducts = products.filter((product) => {
    if (activeCategory !== 'Todas' && product.categoria !== activeCategory) return false;
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) return true;
    return [product.nombre, product.categoria, product.descripcionCorta]
      .some((value) => value.toLowerCase().includes(normalizedTerm));
  });

  return (
    <div className="App">
      <Navbar
        cartCount={cart.length}
        activePage={activePage}
        searchTerm={searchTerm}
        onNavigate={navigateTo}
        onSearch={setSearchTerm}
      />
      <main className="App__content">
        {activePage === 'inicio' && (
          <>
            <section className="hero">
              <div className="hero__text">
                <p className="eyebrow">Muebles artesanales</p>
                <h1>Cada pieza cuenta la historia de manos expertas</h1>
                <p className="hero__lead">
                  Diseño atemporal en maderas nobles, pensado para acompañar tu hogar durante generaciones.
                </p>
                <div className="hero__actions">
                  <button type="button" className="button" onClick={() => navigateTo('productos')}>Ver catálogo</button>
                  <button type="button" className="button button--ghost" onClick={() => navigateTo('contacto')}>Hablemos</button>
                </div>
                <ul className="hero__facts">
                  <li><strong>FSC®</strong> Maderas certificadas</li>
                  <li><strong>{products.length || '—'}</strong> Piezas de autor</li>
                  <li><strong>Nogal</strong> Roble y lino natural</li>
                </ul>
              </div>
              <div className="hero__media">
                <img src="/assets/img/sofa-patagonia.png" alt="Sofá Patagonia en lino Warm Alabaster" />
                <span className="hero__badge">Sofá Patagonia</span>
              </div>
            </section>

            <section className="section">
              <div className="section__header">
                <div>
                  <p className="eyebrow">Destacados</p>
                  <h2>Piezas que enamoran</h2>
                </div>
                <button type="button" className="link-button" onClick={() => navigateTo('productos')}>Ver todo →</button>
              </div>
              <ProductList
                products={featuredProducts}
                loading={loading}
                error={error}
                onAddToCart={addToCart}
              />
            </section>
          </>
        )}

        {activePage === 'productos' && (
          <section className="section">
            <div className="page-heading">
              <p className="eyebrow">Catálogo</p>
              <h1>Todos nuestros productos</h1>
              <p>{visibleProducts.length} piezas disponibles</p>
            </div>

            <div className="filters" role="group" aria-label="Filtrar por categoría">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === activeCategory ? 'chip chip--active' : 'chip'}
                  aria-pressed={category === activeCategory}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
              {searchTerm && (
                <button type="button" className="chip chip--search" onClick={() => setSearchTerm('')}>
                  “{searchTerm}” <span aria-hidden="true">✕</span>
                  <span className="sr-only">Quitar búsqueda</span>
                </button>
              )}
            </div>

            <ProductList
              products={visibleProducts}
              loading={loading}
              error={error}
              onAddToCart={addToCart}
            />
          </section>
        )}

        {activePage === 'contacto' && (
          <section className="contact-card">
            <p className="eyebrow">Contacto</p>
            <h1>Hablemos</h1>
            <p>Contanos qué pieza estás buscando y te ayudamos a encontrarla. Muy pronto vas a poder escribirnos desde acá.</p>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__brand">
            <img src="/LogoHermanosJota.png" alt="" aria-hidden="true" />
            Hermanos Jota
          </span>
          <p>© {new Date().getFullYear()} Hermanos Jota </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

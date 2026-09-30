import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ContactForm from './components/ContactForm';

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
  }

  function addToCart(product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  const visibleProducts = products.filter((product) => {
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
          <section className="page-intro">
            <p className="page-intro__eyebrow">Muebles artesanales</p>
            <h1>Mueblería Hermanos Jota</h1>
            <p>Diseño atemporal y piezas hechas para acompañar tu hogar.</p>
            <button type="button" onClick={() => navigateTo('productos')}>Ver catálogo</button>
          </section>
        )}

        {activePage === 'productos' && (
          <section>
            <div className="page-heading">
              <p className="page-intro__eyebrow">Catálogo</p>
              <h1>Todos nuestros productos</h1>
              <p>{visibleProducts.length} productos disponibles</p>
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
          <section className="page-heading">
            <p className="page-intro__eyebrow">Contacto</p>
            <h1>Hablemos contigo</h1>
            <p>Escríbenos para cualquier consulta sobre nuestros muebles.</p>
            <ContactForm />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

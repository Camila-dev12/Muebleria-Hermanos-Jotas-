import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import ProductFormPage from './pages/ProductFormPage';
import NotFoundPage from './pages/NotFoundPage';

/** Vuelve al principio de la página cada vez que cambia la ruta. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  // Cada ítem del carrito: { product, quantity }
  const [cartItems, setCartItems] = useState([]);

  /** Suma una unidad. No supera el stock del producto, si lo tiene definido. */
  function addToCart(product) {
    setCartItems((items) => {
      const item = items.find((current) => current.product._id === product._id);
      if (!item) return [...items, { product, quantity: 1 }];
      if (product.stock != null && item.quantity >= product.stock) return items;
      return items.map((current) => (current === item ? { ...current, quantity: current.quantity + 1 } : current));
    });
  }

  /** Resta una unidad. Si llega a 0, el producto sale del carrito. */
  function removeFromCart(productId) {
    setCartItems((items) =>
      items
        .map((item) => (item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function quantityOf(productId) {
    return cartItems.find((item) => item.product._id === productId)?.quantity ?? 0;
  }

  const cart = { quantityOf, add: addToCart, remove: removeFromCart };
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar cartCount={cartCount} />
      <main className="App__content">
        <Routes>
          <Route path="/" element={<HomePage cart={cart} />} />
          <Route path="/productos" element={<CatalogPage cart={cart} />} />
          <Route path="/productos/:id" element={<ProductDetailPage cart={cart} />} />
          <Route path="/contacto" element={<ContactPage />} />
          {/* Vistas de administración: sin autenticación en esta etapa (ver docs/sprints/sprint_5_6.md) */}
          <Route path="/admin" element={<AdminPage />} />
          {/* key: crear y editar usan el mismo componente; la key evita que se comparta el estado entre ambas */}
          <Route path="/admin/crear-producto" element={<ProductFormPage key="crear" />} />
          <Route path="/admin/editar-producto/:id" element={<ProductFormPage key="editar" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

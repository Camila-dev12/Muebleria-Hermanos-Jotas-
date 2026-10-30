import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import useProducts from '../hooks/useProducts';
import { imageUrl } from '../services/productsService';

function HomePage({ cart }) {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.filter((product) => product.destacado);

  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Muebles artesanales</p>
          <h1>Cada pieza cuenta la historia de manos expertas</h1>
          <p className="hero__lead">
            Diseño atemporal en maderas nobles, pensado para acompañar tu hogar durante generaciones.
          </p>
          <div className="hero__actions">
            <Link className="button" to="/productos">Ver catálogo</Link>
            <Link className="button button--ghost" to="/contacto">Hablemos</Link>
          </div>
          <ul className="hero__facts">
            <li><strong>FSC®</strong> Maderas certificadas</li>
            <li><strong>{products.length || '—'}</strong> Piezas de autor</li>
            <li><strong>Algarrobo</strong> Quebracho y caldén</li>
          </ul>
        </div>
        <div className="hero__media">
          <img src={imageUrl('assets/img/sofa-patagonia.png')} alt="Sofá Patagonia en lino Warm Alabaster" />
          <span className="hero__badge">Sofá Patagonia</span>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Destacados</p>
            <h2>Piezas que enamoran</h2>
          </div>
          <Link className="link-button" to="/productos">Ver todo →</Link>
        </div>
        <ProductList
          products={featuredProducts}
          loading={loading}
          error={error}
          cart={cart}
        />
      </section>
    </>
  );
}

export default HomePage;

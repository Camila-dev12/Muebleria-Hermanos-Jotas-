import { Link, useParams } from 'react-router-dom';
import CartControl from '../components/CartControl';
import useProduct from '../hooks/useProduct';
import PRODUCT_SPECS from '../constants/productSpecs';
import { imageUrl } from '../services/productsService';

function ProductDetailPage({ cart }) {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  const backLink = (
    <Link className="link-button product-detail__back" to="/productos">
      ← Volver al catálogo
    </Link>
  );

  if (loading) {
    return (
      <section className="product-detail product-detail--skeleton" aria-busy="true" aria-label="Cargando producto">
        <div className="product-detail__media" />
        <div className="product-detail__info">
          <span />
          <span />
          <span />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        {backLink}
        <p className="catalog-message catalog-message--error">{error}</p>
      </section>
    );
  }

  const specs = PRODUCT_SPECS.filter((spec) => product[spec.key]);
  if (product.colores?.length > 0) {
    specs.push({ key: 'colores', label: 'Colores' });
  }

  return (
    <section className="section">
      {backLink}
      <article className="product-detail">
        <div className="product-detail__media">
          <img src={imageUrl(product.img)} alt={product.nombre} />
        </div>

        <div className="product-detail__info">
          {product.categoria && <p className="eyebrow">{product.categoria}</p>}
          <h1>{product.nombre}</h1>
          <p className="product-detail__price">${product.precio.toLocaleString('es-AR')}</p>
          {product.descripcion && <p className="product-detail__description">{product.descripcion}</p>}

          {specs.length > 0 && (
            <dl className="product-detail__specs">
              {specs.map((spec) => (
                <div key={spec.key}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.key === 'colores' ? product.colores.join(', ') : product[spec.key]}</dd>
                </div>
              ))}
            </dl>
          )}

          {product.stock != null && (
            <p className="product-detail__stock">
              {product.stock === 0 && 'Sin stock'}
              {product.stock > 0 && product.stock <= 3 && `Últimas ${product.stock} unidades`}
              {product.stock > 3 && 'En stock'}
            </p>
          )}

          <div className="product-detail__cart">
            <CartControl product={product} cart={cart} large />
          </div>
        </div>
      </article>
    </section>
  );
}

export default ProductDetailPage;

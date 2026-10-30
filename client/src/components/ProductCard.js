import { Link } from 'react-router-dom';
import CartControl from './CartControl';
import { imageUrl } from '../services/productsService';

function ProductCard({ product, cart }) {
  const detailPath = `/productos/${product._id}`;

  return (
    <article className="product-card">
      <Link className="product-card__media" to={detailPath} tabIndex={-1} aria-hidden="true">
        <img className="product-card__image" src={imageUrl(product.img)} alt="" loading="lazy" />
        {product.categoria && <span className="product-card__category">{product.categoria}</span>}
      </Link>
      <div className="product-card__body">
        <h3>
          <Link className="product-card__link" to={detailPath}>
            {product.nombre}
          </Link>
        </h3>
        <p>{product.descripcionCorta}</p>
        <div className="product-card__footer">
          <strong>${product.precio.toLocaleString('es-AR')}</strong>
          <CartControl product={product} cart={cart} />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

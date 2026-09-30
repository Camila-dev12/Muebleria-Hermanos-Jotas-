import { useEffect, useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    onAddToCart(product);
    setAdded(true);
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img className="product-card__image" src={`/${product.img}`} alt={product.nombre} loading="lazy" />
        <span className="product-card__category">{product.categoria}</span>
      </div>
      <div className="product-card__body">
        <h3>{product.nombre}</h3>
        <p>{product.descripcionCorta}</p>
        <div className="product-card__footer">
          <strong>${product.precio.toLocaleString('es-AR')}</strong>
          <button
            type="button"
            className={added ? 'product-card__add product-card__add--done' : 'product-card__add'}
            onClick={handleAdd}
            aria-label={`Agregar ${product.nombre} al carrito`}
          >
            {added ? '✓ Agregado' : '+ Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

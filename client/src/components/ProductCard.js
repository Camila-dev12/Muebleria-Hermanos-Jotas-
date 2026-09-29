function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__image-placeholder" aria-hidden="true">HJ</div>
      <div className="product-card__body">
        <p className="product-card__category">{product.categoria}</p>
        <h2>{product.nombre}</h2>
        <p>{product.descripcionCorta}</p>
        <div className="product-card__footer">
          <strong>${product.precio.toLocaleString('es-AR')}</strong>
          <button type="button" onClick={() => onAddToCart(product)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

import ProductCard from './ProductCard';

function ProductList({ products, loading, error, onAddToCart }) {
  if (loading) {
    return (
      <div className="product-list" aria-busy="true" aria-label="Cargando productos">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="product-card product-card--skeleton" aria-hidden="true">
            <div className="product-card__media" />
            <div className="product-card__body">
              <span />
              <span />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="catalog-message catalog-message--error">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="catalog-message">Todavía no tenemos una pieza así. Probá con otra búsqueda.</p>;
  }

  return (
    <section className="product-list" aria-label="Catálogo de productos">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}

export default ProductList;

import ProductCard from './ProductCard';

function ProductList({ products, loading, error, onAddToCart }) {
  if (loading) {
    return <p className="catalog-message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="catalog-message catalog-message--error">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="catalog-message">No encontramos productos.</p>;
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

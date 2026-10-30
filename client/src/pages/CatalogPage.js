import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import useProducts from '../hooks/useProducts';

const ALL = 'Todas';

function CatalogPage({ cart }) {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  const categories = [ALL, ...new Set(products.map((product) => product.categoria).filter(Boolean))];

  const visibleProducts = products.filter((product) => {
    if (activeCategory !== ALL && product.categoria !== activeCategory) return false;
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) return true;
    return [product.nombre, product.categoria, product.descripcionCorta]
      .some((value) => (value || '').toLowerCase().includes(normalizedTerm));
  });

  return (
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
          <button type="button" className="chip chip--search" onClick={() => setSearchParams({})}>
            “{searchTerm}” <span aria-hidden="true">✕</span>
            <span className="sr-only">Quitar búsqueda</span>
          </button>
        )}
      </div>

      <ProductList
        products={visibleProducts}
        loading={loading}
        error={error}
        cart={cart}
      />
    </section>
  );
}

export default CatalogPage;

import { useEffect, useState } from 'react';

// Especificaciones opcionales: cada producto tiene un set distinto de campos
const SPECS = [
  { key: 'medidas', label: 'Medidas' },
  { key: 'materiales', label: 'Materiales' },
  { key: 'estructura', label: 'Estructura' },
  { key: 'tapizado', label: 'Tapizado' },
  { key: 'acabado', label: 'Acabado' },
  { key: 'capacidad', label: 'Capacidad' },
  { key: 'peso', label: 'Peso' },
  { key: 'garantia', label: 'Garantía' },
];

function ProductDetail({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/productos/${productId}`);
        if (!response.ok) throw new Error('No pudimos encontrar este producto.');
        const result = await response.json();
        if (!cancelled) setProduct(result.data);
      } catch (requestError) {
        if (!cancelled) setError(requestError.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const backButton = (
    <button type="button" className="link-button product-detail__back" onClick={onBack}>
      ← Volver
    </button>
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
        {backButton}
        <p className="catalog-message catalog-message--error">{error}</p>
      </section>
    );
  }

  const specs = SPECS.filter((spec) => product[spec.key]);

  return (
    <section className="section">
      {backButton}
      <article className="product-detail">
        <div className="product-detail__media">
          <img src={`/${product.img}`} alt={product.nombre} />
        </div>

        <div className="product-detail__info">
          <p className="eyebrow">{product.categoria}</p>
          <h1>{product.nombre}</h1>
          <p className="product-detail__price">${product.precio.toLocaleString('es-AR')}</p>
          <p className="product-detail__description">{product.descripcion}</p>

          {specs.length > 0 && (
            <dl className="product-detail__specs">
              {specs.map((spec) => (
                <div key={spec.key}>
                  <dt>{spec.label}</dt>
                  <dd>{product[spec.key]}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="product-detail__stock">
            {product.stock === 0 && 'Sin stock'}
            {product.stock > 0 && product.stock <= 3 && `Últimas ${product.stock} unidades`}
            {product.stock > 3 && 'En stock'}
          </p>
        </div>
      </article>
    </section>
  );
}

export default ProductDetail;

import { useEffect, useState } from 'react';
import { getProducts } from '../services/productsService';

/**
 * Carga el listado de productos y expone los estados de la petición.
 * `setProducts` permite actualizar la lista local (ej. quitar un producto eliminado)
 * sin volver a pedirla a la API.
 */
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, setProducts, loading, error };
}

export default useProducts;

import { useEffect, useState } from 'react';
import { getProduct } from '../services/productsService';

/**
 * Carga un producto por su _id y expone los estados de la petición.
 * Si no se pasa un id, no hace ninguna petición.
 */
function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return undefined;

    let cancelled = false;
    setLoading(true);
    setError('');

    getProduct(id)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((requestError) => {
        if (cancelled) return;
        setError(requestError.status === 404 || requestError.status === 400
          ? 'No pudimos encontrar este producto.'
          : requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}

export default useProduct;

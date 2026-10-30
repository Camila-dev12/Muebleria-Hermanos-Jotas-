/**
 * Único punto de comunicación con la API de productos (ver docs/api_contracts.md).
 *
 * En desarrollo, API_URL queda vacía y las peticiones pasan por el proxy de
 * package.json. En producción se define REACT_APP_API_URL con la URL del backend.
 */
const API_URL = process.env.REACT_APP_API_URL || '';

async function request(path = '', { method = 'GET', body } = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/productos${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('No pudimos conectarnos con el servidor. Probá de nuevo en unos minutos.');
  }

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(result?.error?.message || 'Ocurrió un error inesperado.');
    error.status = response.status;
    throw error;
  }

  return result.data;
}

export function getProducts() {
  // 50 es el máximo que permite la API por página.
  return request('?limit=50');
}

export function getProduct(id) {
  return request(`/${id}`);
}

export function createProduct(product) {
  return request('', { method: 'POST', body: product });
}

export function updateProduct(id, product) {
  return request(`/${id}`, { method: 'PUT', body: product });
}

export function deleteProduct(id) {
  return request(`/${id}`, { method: 'DELETE' });
}

/**
 * Devuelve la URL de la imagen de un producto. Acepta rutas servidas por el
 * backend (ej. "assets/img/sofa.png") o URLs completas (ej. "https://...").
 */
export function imageUrl(img) {
  if (!img) return `${API_URL}/assets/img/placeholder.svg`;
  if (/^https?:\/\//.test(img)) return img;
  return `${API_URL}/${img.replace(/^\//, '')}`;
}

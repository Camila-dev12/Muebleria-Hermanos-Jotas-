import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { deleteProduct, imageUrl } from '../services/productsService';

function AdminPage() {
  const { products, setProducts, loading, error } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [deletedMessage, setDeletedMessage] = useState('');

  // Mensaje que deja el formulario al volver después de crear o editar.
  // Se lee una vez y se borra del historial, para que no reaparezca al recargar.
  const [savedMessage] = useState(location.state?.message || '');
  useEffect(() => {
    if (location.state?.message) navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  const message = deletedMessage || savedMessage;

  const normalizedFilter = filter.trim().toLowerCase();
  const visibleProducts = products.filter((product) =>
    [product.nombre, product.categoria].some((value) => (value || '').toLowerCase().includes(normalizedFilter))
  );

  async function handleDelete(product) {
    if (!window.confirm(`¿Seguro que querés eliminar "${product.nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setDeletingId(product._id);
    setDeleteError('');
    setDeletedMessage('');

    try {
      await deleteProduct(product._id);
      setProducts((current) => current.filter((item) => item._id !== product._id));
      setDeletedMessage(`Se eliminó "${product.nombre}".`);
    } catch (requestError) {
      setDeleteError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="admin">
      <div className="admin__header">
        <div>
          <p className="eyebrow">Administración del sitio</p>
          <h1>Productos</h1>
          {!loading && !error && <p>{products.length} productos en el catálogo</p>}
        </div>
        <Link className="button" to="/admin/crear-producto">+ Nuevo producto</Link>
      </div>

      {message && <p className="admin__message" role="status">{message}</p>}
      {deleteError && <p className="form-error" role="alert">{deleteError}</p>}

      {loading && <p className="catalog-message" aria-busy="true">Cargando productos…</p>}
      {error && <p className="catalog-message catalog-message--error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="admin__toolbar">
            <label className="sr-only" htmlFor="admin-filter">Filtrar productos</label>
            <input
              id="admin-filter"
              type="search"
              className="admin__filter"
              placeholder="Filtrar por nombre o categoría…"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>

          {visibleProducts.length === 0 ? (
            <p className="catalog-message">
              {products.length === 0 ? 'Todavía no hay productos. Creá el primero.' : 'Ningún producto coincide con el filtro.'}
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Imagen</span></th>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Destacado</th>
                  <th scope="col"><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="admin-table__image">
                      <img src={imageUrl(product.img)} alt="" loading="lazy" />
                    </td>
                    <th scope="row" className="admin-table__name">{product.nombre}</th>
                    <td data-label="Categoría">{product.categoria || '—'}</td>
                    <td data-label="Precio">${product.precio.toLocaleString('es-AR')}</td>
                    <td data-label="Stock">{product.stock ?? '—'}</td>
                    <td data-label="Destacado">{product.destacado ? 'Sí' : 'No'}</td>
                    <td className="admin-table__actions">
                      <Link className="link-button" to={`/productos/${product._id}`}>Ver</Link>
                      <Link className="link-button" to={`/admin/editar-producto/${product._id}`}>
                        Editar <span className="sr-only">{product.nombre}</span>
                      </Link>
                      <button
                        type="button"
                        className="link-button link-button--danger"
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product._id}
                      >
                        {deletingId === product._id ? 'Eliminando…' : 'Eliminar'}
                        <span className="sr-only"> {product.nombre}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
}

export default AdminPage;

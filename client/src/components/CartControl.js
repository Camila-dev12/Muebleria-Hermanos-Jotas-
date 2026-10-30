/**
 * Botón para agregar un producto al carrito. Una vez agregado, se convierte
 * en un control "− cantidad +" para sumar o restar unidades.
 * No permite superar el stock del producto (si el producto tiene stock definido).
 *
 * @param {object} props.cart - { quantityOf(id), add(product), remove(id) } (ver App.js)
 * @param {boolean} [props.large] - versión grande, para la vista de detalle
 */
function CartControl({ product, cart, large = false }) {
  const quantity = cart.quantityOf(product._id);
  const hasStockLimit = product.stock != null;
  const reachedStock = hasStockLimit && quantity >= product.stock;
  const sizeClass = large ? ' cart-control--large' : '';

  if (hasStockLimit && product.stock === 0) {
    return (
      <button type="button" className={`cart-control__add${sizeClass}`} disabled>
        Sin stock
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        className={`cart-control__add${sizeClass}`}
        onClick={() => cart.add(product)}
        aria-label={`Agregar ${product.nombre} al carrito`}
      >
        {large ? 'Agregar al carrito' : '+ Agregar'}
      </button>
    );
  }

  return (
    <div className={`cart-control${sizeClass}`}>
      <div className="cart-control__stepper" role="group" aria-label={`Cantidad de ${product.nombre} en el carrito`}>
        <button
          type="button"
          className="cart-control__step"
          onClick={() => cart.remove(product._id)}
          aria-label={`Quitar una unidad de ${product.nombre}`}
        >
          −
        </button>
        <span className="cart-control__quantity" aria-live="polite">{quantity}</span>
        <button
          type="button"
          className="cart-control__step"
          onClick={() => cart.add(product)}
          disabled={reachedStock}
          aria-label={`Agregar una unidad de ${product.nombre}`}
        >
          +
        </button>
      </div>
      {large && reachedStock && <p className="cart-control__hint">Agregaste todas las unidades disponibles.</p>}
    </div>
  );
}

export default CartControl;

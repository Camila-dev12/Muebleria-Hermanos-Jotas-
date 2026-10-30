import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import PRODUCT_SPECS from '../constants/productSpecs';
import { createProduct, updateProduct } from '../services/productsService';

const TEXT_FIELDS = ['nombre', 'categoria', 'img', 'descripcionCorta', 'descripcion', ...PRODUCT_SPECS.map((spec) => spec.key)];

const EMPTY_FORM = {
  ...Object.fromEntries(TEXT_FIELDS.map((field) => [field, ''])),
  precio: '',
  stock: '',
  colores: '',
  destacado: false,
};

/** Convierte un producto de la API en los valores (strings) que usa el formulario. */
function productToForm(product) {
  return {
    ...Object.fromEntries(TEXT_FIELDS.map((field) => [field, product[field] ?? ''])),
    precio: String(product.precio ?? ''),
    stock: product.stock == null ? '' : String(product.stock),
    colores: (product.colores || []).join(', '),
    destacado: Boolean(product.destacado),
  };
}

/**
 * Convierte el formulario en el cuerpo que espera la API.
 * Al crear, se omiten los campos vacíos. Al editar se envían todos,
 * así un campo que se vació también se vacía en la base.
 */
function formToProduct(form, isEditing) {
  const product = {};

  TEXT_FIELDS.forEach((field) => {
    const value = form[field].trim();
    if (value || isEditing) product[field] = value;
  });

  product.precio = Number(form.precio);

  if (form.stock.trim() !== '') product.stock = Number(form.stock);
  else if (isEditing) product.stock = null;

  product.colores = form.colores.split(',').map((color) => color.trim()).filter(Boolean);
  product.destacado = form.destacado;

  return product;
}

function validate(form) {
  const errors = {};

  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';

  if (form.precio.trim() === '') errors.precio = 'El precio es obligatorio.';
  else if (!(Number(form.precio) >= 0)) errors.precio = 'El precio debe ser un número mayor o igual a 0.';

  if (form.stock.trim() !== '') {
    const stock = Number(form.stock);
    if (!Number.isInteger(stock) || stock < 0) errors.stock = 'El stock debe ser un número entero mayor o igual a 0.';
  }

  return errors;
}

function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { product, loading, error: loadError } = useProduct(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [filledFromId, setFilledFromId] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // En modo edición, completa el formulario apenas llega el producto. Se hace durante
  // el render (y no en un useEffect) para no mostrar nunca el formulario vacío.
  if (product && product._id !== filledFromId) {
    setFilledFromId(product._id);
    setForm(productToForm(product));
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked : value;
    // El stock solo acepta dígitos: se descarta cualquier otro carácter (letras, "-", ".", "e"...).
    if (name === 'stock') newValue = value.replace(/\D/g, '');
    setForm((current) => ({ ...current, [name]: newValue }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const payload = formToProduct(form, isEditing);
      const saved = isEditing ? await updateProduct(id, payload) : await createProduct(payload);
      const message = isEditing ? `Se guardaron los cambios de "${saved.nombre}".` : `Se creó "${saved.nombre}".`;
      navigate('/admin', { state: { message } });
    } catch (requestError) {
      setSubmitError(requestError.message);
      setSubmitting(false);
    }
  }

  function field(name, label, { type = 'text', required = false, hint, ...inputProps } = {}) {
    const errorId = `${name}-error`;
    const hintId = `${name}-hint`;
    const describedBy = [errors[name] && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;
    const Input = type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className="form-group">
        <label htmlFor={name}>
          {label}
          {required && <span className="form-required" aria-hidden="true"> *</span>}
        </label>
        <Input
          id={name}
          name={name}
          type={type === 'textarea' ? undefined : type}
          value={form[name]}
          onChange={handleChange}
          required={required}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={describedBy}
          disabled={submitting}
          {...inputProps}
        />
        {hint && <span id={hintId} className="form-hint">{hint}</span>}
        {errors[name] && <span id={errorId} className="field-error">{errors[name]}</span>}
      </div>
    );
  }

  const title = isEditing ? 'Editar producto' : 'Nuevo producto';
  const backLink = <Link className="link-button product-detail__back" to="/admin">← Volver a administración</Link>;

  if (isEditing && (loading || (!loadError && filledFromId !== id))) {
    return <p className="catalog-message" aria-busy="true">Cargando producto…</p>;
  }

  if (isEditing && loadError) {
    return (
      <section className="section">
        {backLink}
        <p className="catalog-message catalog-message--error">{loadError}</p>
      </section>
    );
  }

  return (
    <section className="form-card">
      {backLink}
      <p className="eyebrow">Administración del sitio</p>
      <h1>{title}</h1>
      <p>Los campos marcados con * son obligatorios.</p>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="product-form__section">
          <legend>Datos principales</legend>
          {field('nombre', 'Nombre', { required: true })}
          <div className="product-form__row">
            {field('precio', 'Precio', { type: 'number', required: true, min: 0, step: 'any', inputMode: 'decimal' })}
            {field('stock', 'Stock', { inputMode: 'numeric', pattern: '[0-9]*', hint: 'Solo números enteros.' })}
          </div>
          <div className="product-form__row">
            {field('categoria', 'Categoría', { placeholder: 'Salas, Comedor, Oficina…' })}
            {field('colores', 'Colores', { placeholder: 'Verde Musgo, Gris Oxford', hint: 'Separados por comas.' })}
          </div>
          {field('img', 'Imagen', {
            placeholder: 'assets/img/mi-producto.png',
            hint: 'Ruta de una imagen del servidor o una URL completa (https://…).',
          })}
          <label className="form-checkbox">
            <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} disabled={submitting} />
            Mostrar en destacados de la página de inicio
          </label>
        </fieldset>

        <fieldset className="product-form__section">
          <legend>Descripción</legend>
          {field('descripcionCorta', 'Descripción corta', { hint: 'Se muestra en la tarjeta del catálogo.' })}
          {field('descripcion', 'Descripción completa', { type: 'textarea' })}
        </fieldset>

        <fieldset className="product-form__section">
          <legend>Especificaciones</legend>
          <div className="product-form__row">
            {PRODUCT_SPECS.map((spec) => (
              <div key={spec.key}>{field(spec.key, spec.label, { placeholder: spec.placeholder })}</div>
            ))}
          </div>
        </fieldset>

        {submitError && <p className="form-error" role="alert">{submitError}</p>}

        <div className="product-form__actions">
          <Link className="button button--ghost" to="/admin">Cancelar</Link>
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductFormPage;

import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido.';
    else if (formData.nombre.length < 3) newErrors.nombre = 'Debe tener al menos 3 caracteres.';

    if (!formData.email.trim()) newErrors.email = 'El email es requerido.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'El formato del email es inválido.';

    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje no puede estar vacío.';
    else if (formData.mensaje.length < 10) newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Limpiar error del campo al empezar a escribir
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulación de envío a una API
    setTimeout(() => {
      console.log('Datos del formulario enviados:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ nombre: '', email: '', mensaje: '' }); // Reset
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="catalog-message" role="alert" aria-live="polite">
        <h3 style={{ color: 'var(--color-salvia)', marginBottom: '0.5rem' }}>¡Mensaje enviado con éxito!</h3>
        <p>Gracias por contactarnos, {formData.nombre ? formData.nombre : 'pronto'} nos comunicaremos contigo.</p>
        <button type="button" className="button" style={{ marginTop: '1rem' }} onClick={() => setIsSuccess(false)}>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.nombre && <span id="nombre-error" style={{ color: 'var(--color-error)', fontSize: '0.85rem' }}>{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && <span id="email-error" style={{ color: 'var(--color-error)', fontSize: '0.85rem' }}>{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          aria-invalid={!!errors.mensaje}
          aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.mensaje && <span id="mensaje-error" style={{ color: 'var(--color-error)', fontSize: '0.85rem' }}>{errors.mensaje}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className="button">
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}

export default ContactForm;

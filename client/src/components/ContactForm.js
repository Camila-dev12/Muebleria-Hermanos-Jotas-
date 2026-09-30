import { useState } from 'react';

function ContactForm() {
  // Estados controlados para cada campo
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log('Datos del formulario:', { nombre, email, mensaje });
    alert('Mensaje enviado con éxito (Simulación)');
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;

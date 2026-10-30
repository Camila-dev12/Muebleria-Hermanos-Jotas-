import ContactForm from '../components/ContactForm';

function ContactPage() {
  return (
    <section className="contact-card">
      <p className="eyebrow">Contacto</p>
      <h1>Hablemos</h1>
      <p>Contanos qué pieza estás buscando y te ayudamos a encontrarla.</p>
      <ContactForm />
    </section>
  );
}

export default ContactPage;

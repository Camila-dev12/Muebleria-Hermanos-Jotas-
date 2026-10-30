import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="section page-heading">
      <p className="eyebrow">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link className="button page-heading__action" to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFoundPage;

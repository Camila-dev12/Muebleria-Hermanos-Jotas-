import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const SOFA = {
  _id: '665f1c2e8b3a4d0012345678',
  nombre: 'Sofá Patagonia',
  categoria: 'Salas',
  precio: 48500,
  img: 'assets/img/sofa-patagonia.png',
  destacado: true,
  stock: 5,
  descripcionCorta: 'Sofá de tres plazas',
  descripcion: 'Sofá de tres cuerpos',
  materiales: 'Nogal macizo',
  colores: ['Verde Musgo', 'Gris Oxford'],
};

const MESA = {
  _id: '665f1c2e8b3a4d0012345679',
  nombre: 'Mesa Pampa',
  categoria: 'Comedor',
  precio: 120000,
  destacado: false,
  descripcionCorta: 'Mesa extensible',
};

function jsonResponse(status, body) {
  return Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });
}

/** Simula la API según el método y la ruta. Guarda las llamadas para verificarlas. */
function mockApi(handlers = {}) {
  global.fetch = jest.fn((url, options = {}) => {
    const method = options.method || 'GET';
    const key = `${method} ${url}`;
    if (handlers[key]) return handlers[key](options);
    if (key === 'GET /api/productos?limit=50') return jsonResponse(200, { data: [SOFA, MESA] });
    if (key === `GET /api/productos/${SOFA._id}`) return jsonResponse(200, { data: SOFA });
    return jsonResponse(404, { error: { status: 404, message: 'No encontrado' } });
  });
}

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

function sentBody(method) {
  const call = global.fetch.mock.calls.find(([, options]) => options?.method === method);
  return JSON.parse(call[1].body);
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  mockApi();
});

test('el catálogo muestra los productos de la API con links al detalle por _id', async () => {
  renderAt('/productos');

  const link = await screen.findByRole('link', { name: 'Sofá Patagonia' });
  expect(link).toHaveAttribute('href', `/productos/${SOFA._id}`);
  expect(screen.getByRole('link', { name: 'Mesa Pampa' })).toBeInTheDocument();
});

test('la búsqueda del navbar filtra el catálogo usando ?q=', async () => {
  renderAt('/productos?q=mesa');

  expect(await screen.findByRole('link', { name: 'Mesa Pampa' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Sofá Patagonia' })).not.toBeInTheDocument();
});

test('si responde algo que no es la API (HTML en vez de JSON), se muestra un mensaje claro', async () => {
  // Pasa si REACT_APP_API_URL está mal configurada: el hosting devuelve su index.html.
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, status: 200, json: () => Promise.reject(new SyntaxError('Unexpected token <')) }));
  renderAt('/productos');

  expect(await screen.findByText('No pudimos conectarnos con el servidor. Probá de nuevo en unos minutos.')).toBeInTheDocument();
});

test('el inicio muestra solo los productos destacados', async () => {
  renderAt('/');

  expect(await screen.findByRole('link', { name: 'Sofá Patagonia' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Mesa Pampa' })).not.toBeInTheDocument();
});

test('el detalle muestra el producto y sus especificaciones, sin acciones de administración', async () => {
  renderAt(`/productos/${SOFA._id}`);

  expect(await screen.findByRole('heading', { name: 'Sofá Patagonia' })).toBeInTheDocument();
  expect(screen.getByText('Nogal macizo')).toBeInTheDocument();
  expect(screen.getByText('Verde Musgo, Gris Oxford')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /eliminar/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /editar/i })).not.toBeInTheDocument();
});

test('un producto inexistente muestra un mensaje de error', async () => {
  renderAt('/productos/000000000000000000000000');

  expect(await screen.findByText('No pudimos encontrar este producto.')).toBeInTheDocument();
});

test('administración lista todos los productos con sus acciones', async () => {
  renderAt('/admin');

  const sofaRow = (await screen.findByRole('rowheader', { name: 'Sofá Patagonia' })).closest('tr');
  expect(within(sofaRow).getByText('$48.500')).toBeInTheDocument();
  expect(within(sofaRow).getByRole('link', { name: /editar/i })).toHaveAttribute('href', `/admin/editar-producto/${SOFA._id}`);
  expect(within(sofaRow).getByRole('link', { name: 'Ver' })).toHaveAttribute('href', `/productos/${SOFA._id}`);
  expect(screen.getByRole('rowheader', { name: 'Mesa Pampa' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '+ Nuevo producto' })).toHaveAttribute('href', '/admin/crear-producto');
});

test('administración permite filtrar por nombre o categoría', async () => {
  renderAt('/admin');

  await userEvent.type(await screen.findByLabelText('Filtrar productos'), 'comedor');

  expect(screen.getByRole('rowheader', { name: 'Mesa Pampa' })).toBeInTheDocument();
  expect(screen.queryByRole('rowheader', { name: 'Sofá Patagonia' })).not.toBeInTheDocument();
});

test('eliminar desde administración pide confirmación, llama a DELETE y saca la fila', async () => {
  window.confirm = jest.fn(() => true);
  mockApi({ [`DELETE /api/productos/${SOFA._id}`]: () => jsonResponse(200, { data: SOFA }) });
  renderAt('/admin');

  await userEvent.click(await screen.findByRole('button', { name: 'Eliminar Sofá Patagonia' }));

  expect(window.confirm).toHaveBeenCalled();
  expect(await screen.findByRole('status')).toHaveTextContent('Se eliminó "Sofá Patagonia".');
  expect(screen.queryByRole('rowheader', { name: 'Sofá Patagonia' })).not.toBeInTheDocument();
  expect(screen.getByRole('rowheader', { name: 'Mesa Pampa' })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(`/api/productos/${SOFA._id}`, expect.objectContaining({ method: 'DELETE' }));
});

test('si se cancela la confirmación, no se elimina nada', async () => {
  window.confirm = jest.fn(() => false);
  renderAt('/admin');

  await userEvent.click(await screen.findByRole('button', { name: 'Eliminar Sofá Patagonia' }));

  expect(global.fetch.mock.calls.some(([, options]) => options?.method === 'DELETE')).toBe(false);
  expect(screen.getByRole('rowheader', { name: 'Sofá Patagonia' })).toBeInTheDocument();
});

test('si la API falla al eliminar, se muestra el error y la fila se mantiene', async () => {
  window.confirm = jest.fn(() => true);
  mockApi({
    [`DELETE /api/productos/${SOFA._id}`]: () => jsonResponse(500, { error: { status: 500, message: 'Error interno del servidor' } }),
  });
  renderAt('/admin');

  await userEvent.click(await screen.findByRole('button', { name: 'Eliminar Sofá Patagonia' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Error interno del servidor');
  expect(screen.getByRole('rowheader', { name: 'Sofá Patagonia' })).toBeInTheDocument();
});

test('el formulario de alta valida los campos obligatorios sin llamar a la API', async () => {
  renderAt('/admin/crear-producto');

  await userEvent.click(screen.getByRole('button', { name: 'Crear producto' }));

  expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
  expect(screen.getByText('El precio es obligatorio.')).toBeInTheDocument();
  expect(global.fetch.mock.calls.some(([, options]) => options?.method === 'POST')).toBe(false);
});

test('crear un producto envía POST con los datos y vuelve a administración con un mensaje', async () => {
  const nuevo = { _id: '665f1c2e8b3a4d00123456aa', nombre: 'Banco Delta', precio: 9900, stock: 2 };
  mockApi({ 'POST /api/productos': () => jsonResponse(201, { data: nuevo }) });
  renderAt('/admin/crear-producto');

  await userEvent.type(screen.getByLabelText(/^Nombre/), '  Banco Delta ');
  await userEvent.type(screen.getByLabelText(/^Precio/), '9900');
  await userEvent.type(screen.getByLabelText(/^Stock/), '2');
  await userEvent.type(screen.getByLabelText(/^Colores/), 'Roble, Negro');
  await userEvent.click(screen.getByRole('button', { name: 'Crear producto' }));

  expect(await screen.findByRole('status')).toHaveTextContent('Se creó "Banco Delta".');
  expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument();
  expect(sentBody('POST')).toEqual({
    nombre: 'Banco Delta',
    precio: 9900,
    stock: 2,
    colores: ['Roble', 'Negro'],
    destacado: false,
  });
});

test('si la API rechaza el alta, se muestra su mensaje de error', async () => {
  mockApi({
    'POST /api/productos': () => jsonResponse(400, { error: { status: 400, message: "El campo 'precio' no puede ser negativo" } }),
  });
  renderAt('/admin/crear-producto');

  await userEvent.type(screen.getByLabelText(/^Nombre/), 'Banco');
  await userEvent.type(screen.getByLabelText(/^Precio/), '10');
  await userEvent.click(screen.getByRole('button', { name: 'Crear producto' }));

  expect(await screen.findByRole('alert')).toHaveTextContent("El campo 'precio' no puede ser negativo");
});

test('editar carga los datos del producto y envía PUT con los cambios', async () => {
  mockApi({ [`PUT /api/productos/${SOFA._id}`]: () => jsonResponse(200, { data: { ...SOFA, precio: 45000 } }) });
  renderAt(`/admin/editar-producto/${SOFA._id}`);

  const precio = await screen.findByLabelText(/^Precio/);
  expect(screen.getByLabelText(/^Nombre/)).toHaveValue('Sofá Patagonia');
  expect(screen.getByLabelText(/^Colores/)).toHaveValue('Verde Musgo, Gris Oxford');

  await userEvent.clear(precio);
  await userEvent.type(precio, '45000');
  await userEvent.clear(screen.getByLabelText(/^Stock/));
  await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

  expect(await screen.findByRole('status')).toHaveTextContent('Se guardaron los cambios de "Sofá Patagonia".');
  const body = sentBody('PUT');
  expect(body.precio).toBe(45000);
  expect(body.stock).toBeNull();
  expect(body.materiales).toBe('Nogal macizo');
  expect(body.garantia).toBe('');
});

test('el stock del formulario solo acepta dígitos', async () => {
  renderAt('/admin/crear-producto');

  await userEvent.type(screen.getByLabelText(/^Stock/), '12abc-3.5e');

  expect(screen.getByLabelText(/^Stock/)).toHaveValue('1235');
});

// ---------- Carrito ----------

function cartLink() {
  return screen.getByRole('link', { name: /^Ver carrito/ });
}

test('desde el detalle se agrega al carrito y se ajusta la cantidad con + y −', async () => {
  renderAt(`/productos/${SOFA._id}`);

  await userEvent.click(await screen.findByRole('button', { name: 'Agregar Sofá Patagonia al carrito' }));
  const stepper = screen.getByRole('group', { name: 'Cantidad de Sofá Patagonia en el carrito' });
  expect(within(stepper).getByText('1')).toBeInTheDocument();
  expect(cartLink()).toHaveAccessibleName('Ver carrito, 1 productos');

  await userEvent.click(screen.getByRole('button', { name: 'Agregar una unidad de Sofá Patagonia' }));
  await userEvent.click(screen.getByRole('button', { name: 'Agregar una unidad de Sofá Patagonia' }));
  expect(within(stepper).getByText('3')).toBeInTheDocument();
  expect(cartLink()).toHaveAccessibleName('Ver carrito, 3 productos');

  await userEvent.click(screen.getByRole('button', { name: 'Quitar una unidad de Sofá Patagonia' }));
  expect(within(stepper).getByText('2')).toBeInTheDocument();

  // Al llegar a 0 vuelve el botón de agregar
  await userEvent.click(screen.getByRole('button', { name: 'Quitar una unidad de Sofá Patagonia' }));
  await userEvent.click(screen.getByRole('button', { name: 'Quitar una unidad de Sofá Patagonia' }));
  expect(screen.getByRole('button', { name: 'Agregar Sofá Patagonia al carrito' })).toBeInTheDocument();
  expect(cartLink()).toHaveAccessibleName('Ver carrito, 0 productos');
});

test('el carrito no deja superar el stock disponible', async () => {
  const poquito = { ...SOFA, _id: '665f1c2e8b3a4d00123456bb', nombre: 'Butaca', stock: 2 };
  mockApi({ [`GET /api/productos/${poquito._id}`]: () => jsonResponse(200, { data: poquito }) });
  renderAt(`/productos/${poquito._id}`);

  await userEvent.click(await screen.findByRole('button', { name: 'Agregar Butaca al carrito' }));
  const mas = screen.getByRole('button', { name: 'Agregar una unidad de Butaca' });
  await userEvent.click(mas);

  expect(mas).toBeDisabled();
  expect(screen.getByText('Agregaste todas las unidades disponibles.')).toBeInTheDocument();
  expect(cartLink()).toHaveAccessibleName('Ver carrito, 2 productos');
});

test('un producto sin stock no se puede agregar', async () => {
  const agotado = { ...SOFA, _id: '665f1c2e8b3a4d00123456cc', stock: 0 };
  mockApi({ [`GET /api/productos/${agotado._id}`]: () => jsonResponse(200, { data: agotado }) });
  renderAt(`/productos/${agotado._id}`);

  expect(await screen.findByRole('button', { name: 'Sin stock' })).toBeDisabled();
});

test('la cantidad del carrito se comparte entre el catálogo y el detalle', async () => {
  renderAt('/productos');

  await userEvent.click(await screen.findByRole('button', { name: 'Agregar Sofá Patagonia al carrito' }));
  await userEvent.click(screen.getByRole('button', { name: 'Agregar una unidad de Sofá Patagonia' }));
  expect(cartLink()).toHaveAccessibleName('Ver carrito, 2 productos');

  await userEvent.click(screen.getByRole('link', { name: 'Sofá Patagonia' }));

  const stepper = await screen.findByRole('group', { name: 'Cantidad de Sofá Patagonia en el carrito' });
  expect(within(stepper).getByText('2')).toBeInTheDocument();
});

test('una ruta desconocida muestra la página 404', () => {
  renderAt('/no-existe');

  expect(screen.getByRole('heading', { name: 'Esta página no existe' })).toBeInTheDocument();
});

test('el navbar tiene el acceso a administración', async () => {
  renderAt('/');

  const nav = screen.getByRole('navigation', { name: 'Navegación principal' });
  expect(within(nav).getByRole('link', { name: 'Administración' })).toHaveAttribute('href', '/admin');
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});

test('el link de administración queda activo dentro del formulario', () => {
  renderAt('/admin/crear-producto');

  const nav = screen.getByRole('navigation', { name: 'Navegación principal' });
  expect(within(nav).getByRole('link', { name: 'Administración' })).toHaveClass('navbar__link--active');
});

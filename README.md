# 🛋️ E-commerce Mueblería Hermanos Jota
https://muebleria-hermanos-jota-beta.vercel.app

**Grupo 15 — Comisión 2TT**

### 👥 Integrantes:
* Camila Antonela Corregidor Higa
* Ludmila Belén Argüello
* Nicolas Ferreyra

---

## 📌 Descripción del Proyecto

Entrega correspondiente a los **Sprint 3 y Sprint 4**. El proyecto pasó de un sitio estático (HTML, CSS y JS) a una aplicación separada en dos partes:

* **`backend/`** — API REST con **Node.js + Express** que expone el catálogo de productos y sirve sus imágenes.
* **`client/`** — SPA en **React** que consume la API: catálogo con filtros y búsqueda, detalle de producto, carrito y formulario de contacto.

La versión estática de los Sprint 1 y 2 se conserva en la raíz del repo (ver [Versión anterior](#-versión-anterior-sprint-1-y-2)).

---

## 🧰 Tecnologías

| Capa | Tecnologías |
|------|-------------|
| Backend | Node.js (>= 18), Express 5 |
| Frontend | React 19, Create React App (`react-scripts`), CSS |
| Herramientas | Git y GitHub, Vercel (deploy) |

---

## 📁 Estructura del Proyecto

```
Muebleria-Hermanos-Jotas-/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js              # Levanta el servidor (PORT, por defecto 3001)
│       ├── app.js                 # Configuración de Express, middlewares y rutas
│       ├── routes/                # Router /api y rutas de /api/productos
│       ├── controllers/           # productosController (listar y obtener por id)
│       ├── data/                  # productos.js + productosRepository.js
│       ├── middlewares/           # logger, notFound, errorHandler
│       ├── errors/HttpError.js    # Errores con código HTTP (400, 404)
│       └── utils/pagination.js    # Validación de page/limit y metadatos
├── client/
│   ├── package.json               # proxy → http://localhost:3001
│   ├── public/
│   └── src/
│       ├── App.js                 # Estado global: productos, carrito, filtros, navegación
│       └── components/
│           ├── Navbar.js
│           ├── ProductList.js
│           ├── ProductCard.js
│           ├── ProductDetail.js
│           └── ContactForm.js
├── assets/                        # Imágenes de productos (servidas por el backend en /assets)
└── index.html, productos.html, producto.html, contacto.html, css/, js/   # Versión Sprint 1–2
```

---

## 🚀 Instalación y Uso

**Requisitos:** Node.js 18 o superior y npm.

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Camila-dev12/Muebleria-Hermanos-Jotas-.git
   cd Muebleria-Hermanos-Jotas-
   ```

2. **Terminal 1 — Backend** (primero):
   ```bash
   cd backend
   npm install
   npm run dev      # con recarga automática (node --watch)
   # o: npm start
   ```
   La API queda en `http://localhost:3001` (se puede cambiar con la variable de entorno `PORT`).

3. **Terminal 2 — Frontend:**
   ```bash
   cd client
   npm install
   npm start
   ```

4. Abrí **http://localhost:3000** en el navegador. El cliente redirige las peticiones `/api` y `/assets` al backend gracias al `proxy` configurado en `client/package.json`.

---

## 🔌 API

Base URL local: `http://localhost:3001`

### `GET /api/productos`

Devuelve el catálogo paginado.

| Query param | Tipo | Por defecto | Notas |
|-------------|------|-------------|-------|
| `page` | entero positivo | `1` | |
| `limit` | entero positivo | `10` | Máximo `50` |

Si `page` o `limit` no son enteros positivos (o `limit` > 50) responde **400**.

Ejemplo: `GET /api/productos?page=1&limit=2`

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Sofá Patagonia",
      "categoria": "Salas",
      "precio": 48500,
      "img": "assets/img/sofa-patagonia.png",
      "destacado": true,
      "stock": 5,
      "descripcionCorta": "Sofá de tres plazas en bouclé premium color verde musgo con base de nogal macizo.",
      "...": "..."
    },
    { "id": 2, "nombre": "Aparador Uspallata", "...": "..." }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "totalItems": 11,
    "totalPages": 6,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### `GET /api/productos/:id`

Devuelve un producto por su id.

```json
{
  "data": {
    "id": 1,
    "nombre": "Sofá Patagonia",
    "categoria": "Salas",
    "precio": 48500,
    "medidas": "220 x 90 x 80 cm",
    "colores": ["Verde Musgo", "Gris Oxford", "Beige Arena"],
    "...": "..."
  }
}
```

### Errores

Todas las respuestas de error tienen el mismo formato (lo arma el middleware `errorHandler`):

| Caso | Status | Ejemplo de `message` |
|------|--------|----------------------|
| `id` no es entero positivo (`/api/productos/abc`) | 400 | `El parámetro 'id' debe ser un entero positivo` |
| Producto inexistente (`/api/productos/999`) | 404 | `No existe un producto con id 999` |
| Ruta inexistente | 404 | `Ruta no encontrada: GET /api/xyz` |
| Error inesperado | 500 | `Error interno del servidor` |

```json
{
  "error": {
    "status": 404,
    "message": "No existe un producto con id 999"
  }
}
```

### Estáticos

`GET /assets/...` sirve las imágenes desde la carpeta `assets/` de la raíz del repo (por ejemplo `/assets/img/sofa-patagonia.png`).

### Middlewares

* **logger** — registra método y URL de cada petición.
* **notFound** — convierte rutas inexistentes en un `HttpError` 404.
* **errorHandler** — manejador centralizado que responde con el formato de error de arriba.

---

## ⚛️ Requisitos de React

- [x] **Componentes funcionales:** `Navbar`, `ProductList`, `ProductCard`, `ProductDetail`, `ContactForm`.
- [x] **Fetch a la API con estados de carga y error:** `App.js` pide `/api/productos` con `useEffect`; mientras carga, `ProductList` muestra tarjetas *skeleton*, y si falla muestra un mensaje de error.
- [x] **Renderizado de listas con `.map()` y `key`:** productos (`key={product.id}`), links de navegación y filtros de categoría.
- [x] **Renderizado condicional del detalle:** al hacer clic en una tarjeta se muestra `ProductDetail`, que obtiene el producto desde `GET /api/productos/:id` y muestra su descripción, ficha técnica y stock, con un botón para volver.
- [x] **Estado del carrito + props:** el carrito vive en `App.js` (`useState`) y su cantidad se pasa a `Navbar` mediante la prop `cartCount`.
- [x] **Formulario controlado:** `ContactForm` maneja nombre, email y mensaje con `useState` y `onChange`.
- [x] **Extras:** filtros por categoría y búsqueda desde la barra de navegación.

---

## 🗂️ Versión anterior (Sprint 1 y 2)

La primera versión del sitio, hecha solo con **HTML5, CSS3 y JavaScript** (sin backend, con los productos en un array local), sigue en la raíz del repositorio: `index.html`, `productos.html`, `producto.html`, `contacto.html`, `css/` y `js/`. Se puede abrir directamente en el navegador; no forma parte de la app React.

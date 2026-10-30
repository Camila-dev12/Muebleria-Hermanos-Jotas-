# Arquitectura del Sistema
**Mueblería Hermanos Jota**

Este documento describe la arquitectura técnica del proyecto y su evolución. Está diseñado para ser incrementado a medida que avanzan los Sprints.

## Evolución Arquitectónica
- **Sprints 1-2:** Arquitectura monolítica frontend estática (HTML/CSS/JS).
- **Sprints 3-4:** Arquitectura Cliente-Servidor (Monorepo simple) con datos en memoria.
- **Sprints 5-6 (Actual):** Cliente-Servidor con persistencia en MongoDB y CRUD completo.

```text
React (client)  ⇄  Express API (backend)  ⇄  MongoDB Atlas
```

## Estructura Actual de Directorios
```text
/
├── backend/                 # API REST (Node.js + Express + Mongoose)
│   ├── public/assets/       # Imágenes de productos (servidas en /assets)
│   └── src/
│       ├── config/          # Variables de entorno (env.js) y conexión a MongoDB (db.js)
│       ├── controllers/     # Lógica de cada endpoint
│       ├── data/            # Repositorio (acceso a datos) y productos iniciales del seed
│       ├── errors/          # HttpError
│       ├── middlewares/     # Logger, 404 y manejador de errores centralizado
│       ├── models/          # Schemas de Mongoose
│       ├── routes/          # Routers de Express
│       ├── scripts/         # Script de seed
│       └── utils/           # Paginación
├── client/                  # Frontend SPA (React + React Router)
│   └── src/
│       ├── components/      # Piezas reutilizables (Navbar, ProductCard, ...)
│       ├── constants/       # Datos compartidos (especificaciones de producto)
│       ├── hooks/           # useProducts, useProduct
│       ├── pages/           # Una página por ruta
│       └── services/        # Única capa que habla con la API
└── docs/                    # Documentación y consignas de Sprints
```

## 1. Backend (Capa de Datos/API)
- **Tecnología:** Node.js con Express.js y Mongoose.
- **Persistencia:** MongoDB Atlas. La conexión se abre al iniciar el servidor (`config/db.js`); si falla, el servidor no arranca.
- **Patrones:**
  - `express.Router` para organizar los endpoints.
  - **Repositorio** (`data/productosRepository.js`): único módulo que usa el modelo de Mongoose. El controller no conoce la base de datos.
  - **Errores centralizados** (`middlewares/errorHandler.js`): los `HttpError` propios, los errores de validación de Mongoose y los JSON mal formados se responden como errores 4xx con el formato del contrato. Cualquier otro error responde 500 sin exponer detalles.
  - Express 5 propaga automáticamente los errores de los controllers `async` al manejador de errores.
- **Contrato:** ver `docs/api_contracts.md`.

## 2. Frontend (Capa de Presentación)
- **Tecnología:** React (SPA) con React Router DOM.
- **Patrones:**
  - Componentes funcionales y Hooks.
  - **Ruteo:** una página por ruta en `pages/`. Rutas dinámicas con `useParams` (`/productos/:id`) y navegación después de crear, editar o eliminar con `useNavigate`. La búsqueda vive en la URL (`/productos?q=`).
  - **Servicio de API** (`services/productsService.js`): centraliza todas las peticiones y la URL del backend (`REACT_APP_API_URL` en producción, proxy de desarrollo en local).
  - **Hooks de datos** (`useProducts`, `useProduct`): manejan los estados `loading`, `success` y `error` de cada petición.
  - El carrito vive como estado en `App.js` (lista de `{ product, quantity }`) y se comparte por props. El componente `CartControl` muestra "Agregar" o el control "− cantidad +", y no permite superar el stock del producto.
  - **Administración separada de la tienda:** `AdminPage` (`/admin`) lista los productos en una tabla con las acciones de editar y eliminar. Un formulario único (`ProductFormPage`) sirve para alta y edición, valida en el cliente antes de llamar a la API y, al guardar, vuelve a `/admin` con un mensaje (vía `state` de `useNavigate`).

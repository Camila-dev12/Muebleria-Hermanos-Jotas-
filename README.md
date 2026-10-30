# 🛋️ E-commerce Mueblería Hermanos Jota
https://muebleria-hermanos-jota-beta.vercel.app 

**Grupo 15 — Comisión 2TT**

### 👥 Integrantes:
* Camila Antonela Corregidor Higa
* Ludmila Belén Argüello
* Nicolas Ferreyra
* Gonzalo Librandi

---

## 📌 Descripción del Proyecto

Este proyecto es una aplicación web **evolutiva** construida a lo largo de múltiples Sprints para el curso Full Stack Developer. 

El proyecto refleja el crecimiento desde un sitio web estático tradicional hacia una aplicación moderna cliente-servidor:
- **Fase Inicial (Sprints 1 y 2):** Maquetación y lógica frontend nativa (HTML5, CSS3, JavaScript Vanilla).
- **Sprints 3 y 4:** Refactorización completa a una arquitectura Monorepo. El frontend pasa a **React** y los datos son servidos por una API REST construida con **Node.js y Express**.
- **Fase Actual (Sprints 5 y 6):** Persistencia en **MongoDB** con **Mongoose** y CRUD completo de productos (crear, leer, actualizar y eliminar). El frontend incorpora **React Router DOM** con rutas dinámicas y un panel de administración en `/admin` para crear, editar y eliminar productos.

---

## 🎯 Objetivos y Requerimientos Evolutivos

El proyecto mantiene los objetivos de UI/UX originales (sitio responsivo, experiencia de compra simulada, catálogo, carrito y formulario de contacto), pero la implementación técnica se ha actualizado:

* **Arquitectura:** De archivos estáticos servidos localmente a un entorno de Monorepo con separación Cliente/Servidor.
* **Frontend:** De manipulación directa del DOM con Vanilla JS a una jerarquía de componentes funcionales en React manejando el estado mediante hooks, con páginas y rutas de React Router (`useParams`, `useNavigate`).
* **Backend:** De datos hardcodeados en el frontend a un servidor Express con enrutamiento (`express.Router`) y middlewares, y de datos en memoria a una base de datos MongoDB.

### Rutas del frontend

| Ruta | Vista |
|------|-------|
| `/` | Inicio con productos destacados |
| `/productos` | Catálogo con filtros por categoría y búsqueda (`?q=`) |
| `/productos/:id` | Detalle del producto |
| `/contacto` | Formulario de contacto |
| `/admin` | Administración del sitio: tabla de productos con acciones para ver, editar y eliminar |
| `/admin/crear-producto` | Alta de producto |
| `/admin/editar-producto/:id` | Edición de producto |

> Las vistas de `/admin` no requieren autenticación en esta etapa (ver `docs/sprints/sprint_5_6.md`).

*(Para ver el historial completo de requerimientos por sprint, consultar la carpeta `/docs/sprints/`)*

---

## 🚀 Instalación y Ejecución (Fase Cliente-Servidor)

A partir de los Sprints 3 y 4, el proyecto requiere levantar dos servidores locales (uno para la API y otro para React). Necesitarás tener **Node.js** instalado.

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/muebleria-hermanos-jota.git
cd muebleria-hermanos-jota
```

### 2. Levantar el Backend (Express)
Desde el Sprint 5, el backend necesita una base de datos **MongoDB** (por ejemplo, un cluster gratuito de MongoDB Atlas).

Abre una terminal y ejecuta:
```bash
cd backend
npm install
cp .env.example .env
```
Completa `backend/.env` con tus valores:

| Variable      | Obligatoria | Descripción                                              |
|---------------|-------------|----------------------------------------------------------|
| `MONGODB_URI` | Sí          | URI de conexión de MongoDB (Atlas > Connect > Drivers).  |
| `PORT`        | No          | Puerto del servidor. Por defecto `3001`.                 |
| `DNS_SERVERS` | No          | Solo si aparece el error `querySrv ECONNREFUSED` al iniciar. Usar `8.8.8.8,1.1.1.1`. |

> El archivo `.env` contiene credenciales y **no se sube al repositorio**.

Si la base está vacía, carga los productos iniciales:
```bash
npm run seed
```
Si la base ya tiene productos, el script no hace nada. Para borrarlos y volver a cargar los iniciales, usa `npm run seed -- --reset`.

Luego inicia el servidor:
```bash
npm run dev
```

### 3. Levantar el Frontend (React)
Abre una **segunda terminal** en la raíz del proyecto y ejecuta:
```bash
cd client
npm install
npm start
```
La aplicación se abrirá en tu navegador consumiendo los datos de la API local. En desarrollo no hace falta configurar nada: las peticiones a `/api` pasan al backend por el `proxy` de `client/package.json`.

Para correr los tests del frontend:
```bash
cd client
npm test
```

---

## ☁️ Despliegue

| Parte    | Servicio | Carpeta raíz | Build | Inicio |
|----------|----------|--------------|-------|--------|
| Backend  | Render (Web Service) | `backend` | `npm install` | `npm start` |
| Frontend | Vercel | `client` | `npm run build` (automático) | — |

### Variables de entorno en producción

**Render (backend):**

| Variable       | Valor |
|----------------|-------|
| `MONGODB_URI`  | URI de MongoDB Atlas (la misma del `.env` local). |
| `CORS_ORIGINS` | URL del frontend en Vercel, ej. `https://mi-sitio.vercel.app`. Si hay más de una, separarlas con comas. |

> En Atlas, **Network Access** debe permitir `0.0.0.0/0`, porque Render no tiene una IP fija.

**Vercel (frontend):**

| Variable            | Valor |
|---------------------|-------|
| `REACT_APP_API_URL` | URL del backend en Render, sin barra final, ej. `https://mi-backend.onrender.com`. |

> Vercel lee esta variable **al compilar**: si se cambia, hay que volver a desplegar (Deployments → Redeploy).
>
> El archivo `client/vercel.json` redirige todas las rutas a `index.html`, para que al recargar o compartir links como `/productos/:id` no aparezca un 404.

**Plan gratuito de Render:** el backend se "duerme" después de 15 minutos sin uso. La primera visita después de eso puede tardar alrededor de un minuto en cargar los productos.

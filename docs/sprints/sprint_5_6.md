# Consigna Final - Sprint 5 y 6
**Persistencia de Datos y CRUD Completo**

📅 **Entrega:** fin del Sprint 6

## 1. Resumen del proyecto
Este es el sprint que transforma el proyecto en una aplicación web real y persistente. Conectaremos la API de Express a una base de datos **MongoDB** en la nube e implementaremos el **CRUD completo** (Crear, Leer, Actualizar, Borrar) para los productos de "Mueblería Jota". El frontend de React evolucionará para crear, editar y eliminar productos a través de formularios interactivos, todo gestionado con un sistema de ruteo profesional.

## 2. Objetivos de aprendizaje
1. Conectar una aplicación de Node.js a una base de datos MongoDB usando Mongoose.
2. Definir Esquemas y Modelos de datos para estructurar la información.
3. Implementar una API RESTful con funcionalidad CRUD completa (`GET`, `POST`, `PUT`, `DELETE`) en Express.
4. Gestionar la configuración de la aplicación y los secretos de forma segura con variables de entorno (`.env`).
5. Crear una aplicación de React con múltiples páginas y rutas dinámicas utilizando React Router DOM (`useParams`).
6. Realizar navegación programática en React con `useNavigate` después de acciones del usuario.
7. Construir formularios controlados en React para enviar datos de creación y edición a la API.
8. Manejar el ciclo completo de una petición full stack, desde la interacción del usuario hasta el cambio en la base de datos.

## 3. Arquitectura del proyecto
```
React Client (Frontend)  ⇄  Express API (Backend)  ⇄  MongoDB (Persistencia)
```

## 4. Requisitos técnicos

### Backend — API (Express + Mongoose)

**Modelo: `Product`**

| Campo         | Tipo     | Requerido |
|---------------|----------|-----------|
| `nombre`      | `String` | Sí        |
| `descripcion` | `String` | No        |
| `precio`      | `Number` | Sí        |
| `stock`       | `Number` | No        |
| `imagenUrl`   | `String` | No        |

**Endpoints**
- `GET /api/productos` → devuelve todos los productos.
- `GET /api/productos/:id` → devuelve un producto por `_id`.
- `POST /api/productos` → crea un producto, responde `201`.
- `PUT /api/productos/:id` → actualiza un producto existente.
- `DELETE /api/productos/:id` → elimina un producto.

### Frontend — React (React Router DOM)

| Ruta                     | Vista                       |
|--------------------------|-----------------------------|
| `/`                      | Inicio                      |
| `/productos`             | Catálogo                    |
| `/productos/:id`         | Detalle (`useParams`)       |
| `/contacto`              | Formulario de contacto      |
| `/admin`                 | Administración del sitio *(agregada, ver nota)* |
| `/admin/crear-producto`  | Alta de producto            |
| `/admin/editar-producto/:id` | Edición de producto *(agregada, ver nota)* |

### Decisiones del equipo
- **Ruta de edición:** la consigna pide editar productos desde el frontend pero no listaba una ruta para eso. Con el OK del profesor se agrega `/admin/editar-producto/:id`, que carga el producto con `GET /api/productos/:id` y guarda los cambios con `PUT /api/productos/:id`.
- **Panel de administración:** se agrega `/admin` ("Administración del sitio"), accesible desde el navbar. Lista todos los productos en formato tabla con las acciones Ver, Editar y Eliminar, y el botón para crear uno nuevo. La tienda pública (catálogo y detalle) no muestra acciones de administración.
- **Eliminación:** desde la tabla de `/admin`, con confirmación previa. Llama a `DELETE /api/productos/:id` y saca el producto de la lista.
- **Después de crear o editar:** se vuelve a `/admin` con `useNavigate` y se muestra un mensaje de confirmación.
- **Campos del modelo:** el schema de Mongoose tiene 20 campos: los 5 de la consigna (que son el mínimo requerido), los que ya usaban los productos del Sprint 3-4 (`categoria`, `destacado`, `colores`, etc.) y las especificaciones técnicas que muestra la página de detalle (`medidas`, `materiales`, `acabado`, `capacidad`, `peso`, `garantia`, etc.). Las especificaciones que aparecían en un solo producto (por ejemplo, `rotacion` o `apilables`) no se incluyen en el modelo; el script de seed avisa cuáles descarta.
- **Imagen:** se mantiene el nombre `img` en lugar de `imagenUrl` para no romper el frontend existente.
- **Identificador:** el `id` numérico se reemplaza por el `_id` (ObjectId) que genera MongoDB, tanto en la API como en el frontend.
- **Sin autenticación:** el proyecto todavía no tiene usuarios, así que las vistas `/admin/...` quedan accesibles para todos en esta etapa. Todas las vistas de administración viven bajo el prefijo `/admin` para poder protegerlas en bloque cuando se incorpore el login.

## 5. Entregables
- Repositorio GitHub con las carpetas `/client` y `/backend`.
- Frontend desplegado en **Vercel** o **Netlify**.
- Backend desplegado en **Render**.
- `README.md` actualizado con los enlaces a ambos despliegues y las instrucciones para configurar las variables de entorno necesarias.

# Contratos de API (API Contracts)

Este documento define la interfaz de comunicación entre el frontend (React) y el backend (Express) para la Mueblería Hermanos Jota.

> **Vigente desde el Sprint 5-6** (persistencia en MongoDB). Ver la sección [Migración desde el Sprint 3-4](#migración-desde-el-sprint-3-4) para los cambios respecto de la versión anterior.

---

## Convenciones generales

- **Respuestas exitosas:** el contenido viaja siempre dentro de la propiedad `data`.
- **Cuerpo de las peticiones:** `POST` y `PUT` envían JSON con el header `Content-Type: application/json`.
- **Respuestas de error:** todas usan el mismo formato:
  ```json
  {
    "error": {
      "status": 404,
      "message": "No existe un producto con id 665f1c2e8b3a4d0012345678"
    }
  }
  ```
- **Errores inesperados:** responden `500` con el mensaje genérico `"Error interno del servidor"`.

### Modelo `Producto`

| Campo              | Tipo       | Requerido | Notas                                    |
|--------------------|------------|-----------|------------------------------------------|
| `_id`              | `String`   | —         | ObjectId generado por MongoDB. No se envía al crear. |
| `nombre`           | `String`   | Sí        |                                          |
| `precio`           | `Number`   | Sí        | Mayor o igual a `0`.                     |
| `categoria`        | `String`   | No        |                                          |
| `img`              | `String`   | No        | Ruta o URL de la imagen.                 |
| `destacado`        | `Boolean`  | No        | Por defecto `false`.                     |
| `stock`            | `Number`   | No        | Entero mayor o igual a `0`.              |
| `descripcionCorta` | `String`   | No        |                                          |
| `descripcion`      | `String`   | No        |                                          |
| `medidas`          | `String`   | No        |                                          |
| `estructura`       | `String`   | No        |                                          |
| `tapizado`         | `String`   | No        |                                          |
| `relleno`          | `String`   | No        |                                          |
| `sostenibilidad`   | `String`   | No        |                                          |
| `colores`          | `String[]` | No        |                                          |

Los campos que no figuran en la tabla se ignoran al crear o actualizar.

```json
{
  "_id": "665f1c2e8b3a4d0012345678",
  "nombre": "Sofá Patagonia",
  "categoria": "Salas",
  "precio": 48500,
  "img": "assets/img/sofa-patagonia.png",
  "destacado": true,
  "stock": 5,
  "descripcionCorta": "...",
  "descripcion": "...",
  "medidas": "220 x 90 x 80 cm",
  "estructura": "...",
  "tapizado": "...",
  "relleno": "...",
  "sostenibilidad": "...",
  "colores": ["Verde Musgo", "Gris Oxford", "Beige Arena"]
}
```

### Errores comunes a las rutas con `:id`
- **400 Bad Request:** el `id` no tiene formato de ObjectId válido.
  ```json
  { "error": { "status": 400, "message": "El parámetro 'id' no es un id válido" } }
  ```
- **404 Not Found:** el `id` es válido pero no existe ningún producto con ese id.
  ```json
  { "error": { "status": 404, "message": "No existe un producto con id 665f1c2e8b3a4d0012345678" } }
  ```

---

## 1. Obtener todos los productos
Devuelve una página del listado de productos.

- **Método HTTP:** `GET`
- **Ruta:** `/api/productos`
- **Query params (opcionales):**
  - `page` (entero positivo, por defecto `1`): número de página.
  - `limit` (entero positivo, por defecto `10`, máximo `50`): cantidad de productos por página.
- **Respuesta de Éxito (200 OK):**
  ```json
  {
    "data": [
      { "_id": "665f1c2e8b3a4d0012345678", "nombre": "Sofá Patagonia", "...": "..." }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 11,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
  ```
- **Respuesta de Error (400 Bad Request):**
  Ocurre cuando `page` o `limit` no son enteros positivos, o cuando `limit` supera `50`.
  ```json
  { "error": { "status": 400, "message": "El parámetro 'limit' no puede superar 50" } }
  ```

---

## 2. Obtener un producto específico
Busca y devuelve la información de un producto único mediante su `_id`.

- **Método HTTP:** `GET`
- **Ruta:** `/api/productos/:id`
- **Parámetros de Ruta:**
  - `id` (ObjectId): el `_id` del producto.
- **Respuesta de Éxito (200 OK):**
  ```json
  { "data": { "_id": "665f1c2e8b3a4d0012345678", "nombre": "Sofá Patagonia", "...": "..." } }
  ```
- **Errores:** `400` y `404` (ver [errores comunes](#errores-comunes-a-las-rutas-con-id)).

---

## 3. Crear un producto
Crea un producto nuevo en la base de datos.

- **Método HTTP:** `POST`
- **Ruta:** `/api/productos`
- **Cuerpo:** un objeto `Producto` sin `_id`. Solo `nombre` y `precio` son obligatorios.
  ```json
  {
    "nombre": "Mesa Ratona Lago",
    "precio": 21000,
    "categoria": "Salas",
    "stock": 3
  }
  ```
- **Respuesta de Éxito (201 Created):** el producto creado, con su `_id`.
  ```json
  { "data": { "_id": "665f1c2e8b3a4d0012345679", "nombre": "Mesa Ratona Lago", "...": "..." } }
  ```
- **Respuesta de Error (400 Bad Request):**
  Ocurre cuando falta un campo obligatorio o algún campo tiene un tipo o valor inválido.
  ```json
  { "error": { "status": 400, "message": "El campo 'precio' es obligatorio" } }
  ```

---

## 4. Actualizar un producto
Modifica un producto existente.

- **Método HTTP:** `PUT`
- **Ruta:** `/api/productos/:id`
- **Cuerpo:** los campos a modificar. Los campos que no se envían conservan su valor actual. Se aplican las mismas validaciones que al crear.
  ```json
  { "precio": 19500, "stock": 0 }
  ```
- **Respuesta de Éxito (200 OK):** el producto ya actualizado.
  ```json
  { "data": { "_id": "665f1c2e8b3a4d0012345678", "precio": 19500, "stock": 0, "...": "..." } }
  ```
- **Errores:**
  - `400`: `id` inválido, o algún campo tiene un tipo o valor inválido.
  - `404`: no existe un producto con ese `id`.

---

## 5. Eliminar un producto
Borra un producto de la base de datos.

- **Método HTTP:** `DELETE`
- **Ruta:** `/api/productos/:id`
- **Respuesta de Éxito (200 OK):** el producto eliminado.
  ```json
  { "data": { "_id": "665f1c2e8b3a4d0012345678", "nombre": "Sofá Patagonia", "...": "..." } }
  ```
- **Errores:** `400` y `404` (ver [errores comunes](#errores-comunes-a-las-rutas-con-id)).

---

## Migración desde el Sprint 3-4

| Aspecto            | Sprint 3-4                                  | Sprint 5-6                                         |
|--------------------|---------------------------------------------|----------------------------------------------------|
| Persistencia       | Array en memoria (`backend/src/data/productos.js`) | MongoDB con Mongoose                        |
| Identificador      | `id` numérico (entero positivo)             | `_id` (ObjectId de MongoDB, string)                |
| Validación de `:id`| `400` si no es entero positivo              | `400` si no es un ObjectId válido                  |
| Endpoints          | `GET` listado y detalle                     | CRUD completo (`GET`, `POST`, `PUT`, `DELETE`)     |

Sin cambios: el formato de respuesta (`data` / `error`), la paginación del listado y el nombre de los campos (incluido `img`).

**Impacto en el frontend:** reemplazar todos los usos de `product.id` por `product._id` (keys de listas, links y llamadas a la API).

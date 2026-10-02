# Contratos de API (API Contracts)

Este documento define la interfaz de comunicación entre el frontend (React) y el backend (Express) para la Mueblería Hermanos Jota.

---

## 1. Obtener todos los productos
Devuelve la lista completa de productos disponibles.

- **Método HTTP:** `GET`
- **Ruta:** `/api/productos`
- **Respuesta de Éxito (200 OK):**
  ```json
  [
    {
      "id": 1,
      "nombre": "Silla de Roble",
      "precio": 15000,
      "descripcion": "...",
      "imagen": "..."
    },
    ...
  ]
  ```

---

## 2. Obtener un producto específico
Busca y devuelve la información de un producto único mediante su ID.

- **Método HTTP:** `GET`
- **Ruta:** `/api/productos/:id`
- **Parámetros de Ruta:**
  - `id` (Number/String): El identificador único del producto.
- **Respuesta de Éxito (200 OK):**
  ```json
  {
    "id": 1,
    "nombre": "Silla de Roble",
    "precio": 15000,
    "descripcion": "...",
    "imagen": "..."
  }
  ```
- **Respuesta de Error (404 Not Found):**
  Acurre cuando el ID del producto no existe en el sistema.
  ```json
  {
    "error": "Producto no encontrado"
  }
  ```

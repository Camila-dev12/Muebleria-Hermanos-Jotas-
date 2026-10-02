# Arquitectura del Sistema
**Mueblería Hermanos Jota**

Este documento describe la arquitectura técnica del proyecto y su evolución. Está diseñado para ser incrementado a medida que avanzan los Sprints.

## Evolución Arquitectónica
- **Sprints 1-2:** Arquitectura monolítica frontend estática (HTML/CSS/JS).
- **Sprints 3-4 (Actual):** Arquitectura Cliente-Servidor (Monorepo simple).

## Estructura Actual de Directorios
```text
/
├── backend/    # API REST (Node.js + Express)
├── client/     # Frontend SPA (React)
└── docs/       # Documentación y consignas de Sprints
```

## 1. Backend (Capa de Datos/API)
- **Tecnología:** Node.js con Express.js.
- **Estado Actual:** Provee datos a través de peticiones HTTP. La persistencia es temporal (en memoria vía arrays de JavaScript).
- **Patrones:** Uso de `express.Router` para organizar los endpoints y middlewares para registro y manejo de errores (e.g. 404).

## 2. Frontend (Capa de Presentación)
- **Tecnología:** React (SPA).
- **Estado Actual:** Consume la API local mediante `fetch`.
- **Patrones:** 
  - Componentes funcionales y Hooks (`useState`).
  - Renderizado condicional para vistas sin enrutador externo (react-router).
  - Elevación del estado (Lifting State Up) para compartir información global como el carrito de compras.

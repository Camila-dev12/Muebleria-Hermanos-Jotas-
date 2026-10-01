# Reglas y Contexto del Agente de IA (Mueblería Hermanos Jota)

Este archivo define la identidad, el stack tecnológico y las reglas base que el Agente de IA debe seguir al trabajar en este proyecto evolutivo.

## 1. Identidad del Proyecto
- **Nombre:** E-commerce Mueblería Hermanos Jota
- **Naturaleza:** Proyecto evolutivo iterativo (Sprints del curso Full Stack Developer de ITBA).
- **Estrategia:** Priorizar código limpio e incrementable. Al refactorizar código de Sprints anteriores, mantener la compatibilidad o documentar claramente la migración.

## 2. Stack Tecnológico Base (Actualizable)
*Nota: Este stack crece con cada sprint. Revisar la carpeta `docs/sprints/` para confirmar requerimientos del sprint en curso.*
- **Frontend Actual:** React SPA (Componentes Funcionales, Hooks, Fetch).
- **Backend Actual:** Node.js + Express (API REST).
- **Persistencia Actual:** En memoria (archivos JS). Sin bases de datos por el momento.

## 3. Directrices Arquitectónicas Universales
- **Estructura Monorepo:** Respetar estrictamente la separación de responsabilidades: `/backend` para el servidor y `/client` para la interfaz.
- **Escalabilidad del Código:** Escribir código pensado para evolucionar. (Ej. Centralizar peticiones HTTP en servicios para que cuando cambie el backend, solo se toque un archivo; modularizar rutas en Express).
- **Manejo de Estados Asíncronos:** Toda petición de red en el frontend debe manejar explícitamente los estados: `loading`, `success`, y `error`.

## 4. Reglas de Código
- **Idioma del Código:** Mantener variables, funciones y nombres de componentes en el idioma predominante del proyecto (inglés o mantener coherencia con lo existente).
- **Cero Deuda Técnica Consciente:** No dejar "TODOs" funcionales sin implementar.
- **Contexto Antes de Codear:** Antes de implementar un endpoint o vista nueva, el agente SIEMPRE debe consultar `docs/api_contracts.md` y las consignas en `docs/sprints/` para asegurarse de no romper reglas establecidas en fases anteriores.

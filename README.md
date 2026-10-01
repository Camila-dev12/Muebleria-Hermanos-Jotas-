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
- **Fase Actual (Sprints 3 y 4):** Refactorización completa a una arquitectura Monorepo. El frontend ahora utiliza **React**, mientras que los datos son servidos por una API REST construida con **Node.js y Express**.

---

## 🎯 Objetivos y Requerimientos Evolutivos

El proyecto mantiene los objetivos de UI/UX originales (sitio responsivo, experiencia de compra simulada, catálogo, carrito y formulario de contacto), pero la implementación técnica se ha actualizado:

* **Arquitectura:** De archivos estáticos servidos localmente a un entorno de Monorepo con separación Cliente/Servidor.
* **Frontend:** De manipulación directa del DOM con Vanilla JS a una jerarquía de componentes funcionales en React manejando el estado mediante hooks (`useState`).
* **Backend:** De datos hardcodeados en el frontend a un servidor Express con enrutamiento (`express.Router`) y middlewares, comunicándose vía peticiones `fetch`.

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
Abre una terminal y ejecuta:
```bash
cd backend
npm install
npm run dev
```

### 3. Levantar el Frontend (React)
Abre una **segunda terminal** en la raíz del proyecto y ejecuta:
```bash
cd client
npm install
npm start
```
La aplicación se abrirá en tu navegador consumiendo los datos de la API local.

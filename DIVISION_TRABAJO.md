# EventHub - Plan de División de Trabajo y Responsabilidades

## Información General

- **Proyecto:** EventHub – Plataforma de Gestión de Eventos y Reservaciones
- **Arquitectura:** Backend (Node.js/Express 5 + MongoDB Atlas), Frontend (Vue 3 / Nuxt 3), Cloud (AWS: SES, S3, Lambda, API Gateway, EventBridge Scheduler).

---

## Asignación de Roles y Módulos

### Integrante 1: Autenticación, Seguridad, Notificaciones (Amazon SES) y Panel Admin

- **Nombre:** Jorge González
- **Rama Git:** `feat/auth-users-ses`
- **Backend:**
  - Modelos de Usuario (`User`), Roles (`admin`, `organizer`, `attendee`) y Sesiones.
  - Flujo de Auth: Registro, Login con JWT (Access & Refresh Tokens) y hashing seguro (bcrypt).
  - Integración de Google OAuth 2.0.
  - Middlewares de seguridad: `authMiddleware`, `roleMiddleware`, rate limiting, helmet y cors.
  - Flujo de verificación de correo y recuperación de contraseña (tokens criptográficos de un solo uso).
  - Panel Administrativo en backend: Endpoints de gestión de usuarios, cambio de roles y moderación global.
- **Cloud (Amazon SES):**
  - Configuración del servicio de correo con Amazon SES.
  - Servicio reutilizable de envío de correos (verificación de cuenta, restablecimiento de contraseña, confirmaciones y avisos).
- **Frontend:**
  - Vistas de Login, Registro, Recuperación de Contraseña y Callback de Google.
  - Vista del Panel de Administración (gestión de usuarios y métricas globales).
- **Testing:**
  - Pruebas automatizadas de autenticación, autorización de roles y tokens con Jest + Supertest.
- **Defensa Técnica:** Domina el ciclo de vida de JWT, control de acceso por roles (RBAC), seguridad de contraseñas, integración de Amazon SES y administración de usuarios.

---

### Integrante 2: Gestión de Eventos, Categorías, Reseñas, Almacenamiento (Amazon S3) y Dashboard Organizador

- **Nombre:** Douglas O
- **Rama Git:** `feat/events-reviews-s3`
- **Backend:**
  - Modelos de Evento (`Event`), Categoría (`Category`) y Reseñas (`Review`).
  - CRUD completo de eventos (crear, editar propios, cancelar, publicar) y categorías.
  - Filtros avanzados, búsqueda por texto, ordenamiento y paginación con `queryHelper`.
  - Sistema de comentarios y calificaciones (validando que solo asistentes con reserva completada puedan calificar).
  - Endpoints del Dashboard del Organizador (ocupación, porcentaje de asistencia, eventos activos y promedios de calificación con agregaciones de MongoDB).
- **Cloud (Amazon S3):**
  - Subida y gestión de imágenes de eventos en Amazon S3 (configuración de bucket, AWS SDK v3 y multer-s3).
- **Frontend:**
  - Catálogo público de eventos (buscador, filtros por categoría/fecha).
  - Detalle completo del evento con galería de imágenes y componente de comentarios/estrellas.
  - Formulario de creación/edición de eventos para organizadores con carga de imágenes.
  - Dashboard visual del Organizador (métricas y gráficos de ocupación).
- **Testing:**
  - Pruebas automatizadas de endpoints de eventos, categorías, filtros y validación de reseñas con Jest + Supertest.
- **Defensa Técnica:** Domina agregaciones en MongoDB para filtros y métricas, almacenamiento multimedia en Amazon S3 y reglas de negocio de eventos.

---

### Integrante 3: Reservaciones, Entradas QR, Concurrencia, Serverless (Lambda) y Cron Job (EventBridge)

- **Nombre:** Alejandro U
- **Rama Git:** `feat/bookings-tickets-cloud`
- **Backend:**
  - Modelos de Reservación (`Booking`) y Entrada Digital (`Ticket`).
  - Lógica transaccional de reservación con control estricto de concurrencia y atomicidad en MongoDB (evitar sobreventa del último cupo disponible).
  - Generación de entradas digitales con códigos QR únicos y verificables.
  - Endpoint de validación/escaneo de QR en puerta para organizadores (prevención estricta de reuso).
  - Flujo de cancelación de reservaciones y liberación automática de cupos.
- **Cloud (AWS Lambda, API Gateway y EventBridge):**
  - AWS Lambda + API Gateway: Función serverless externa desacoplada para generación asíncrona de reportes PDF/CSV de eventos y guardado en S3.
  - AWS EventBridge Scheduler: Cron Job programado automático (ej. diario a las 11:00 PM) para actualización de eventos finalizados y recordatorios.
  - Comunicación del backend principal con API Gateway para solicitar y descargar reportes.
- **Frontend:**
  - Flujo interactivo de reservación de entradas.
  - Vista "Mis Entradas / Historial" para asistentes con visor y descarga de código QR digital.
  - Módulo de escaneo/validación de entradas para organizadores.
  - Interfaz de solicitud y descarga de reportes PDF/CSV.
- **Testing:**
  - Pruebas automatizadas de reservaciones, disponibilidad simultánea (concurrencia) y verificación de QR con Jest + Supertest.
- **Defensa Técnica:** Domina operaciones atómicas y consistencia en MongoDB, generación/verificación criptográfica de QR, arquitectura serverless con Lambda y programación con EventBridge.

---

## Matriz de Cobertura de Criterios de Evaluación

| Criterio del Enunciado                                 | Puntos | Responsable Principal                                                      |
| :----------------------------------------------------- | :----: | :------------------------------------------------------------------------- |
| Arquitectura y organización Express                    |   12   | Integrante 1 (Jorge)                                                       |
| Autenticación, OAuth y seguridad                       |   12   | Integrante 1 (Jorge)                                                       |
| Funcionalidades y lógica de negocio (Eventos/Reservas) |   18   | Integrantes 2 y 3                                                          |
| Diseño y manejo de MongoDB                             |   8    | Integrantes 2 y 3 (Apoyo: 1)                                               |
| Integraciones Cloud y Serverless (AWS)                 |   15   | Integrante 1 (SES), Integrante 2 (S3), Integrante 3 (Lambda + EventBridge) |
| Frontend y experiencia de usuario                      |   7    | Todos en sus vistas                                                        |
| Testing, documentación y despliegue                    |   8    | Todos en sus módulos (Setup: Integrante 1)                                 |
| **Total**                                              | **80** |                                                                            |

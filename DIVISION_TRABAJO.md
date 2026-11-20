# EventHub - Plan de División de Trabajo y Responsabilidades

## Información General

- **Proyecto:** EventHub – Plataforma de Gestión de Eventos y Reservaciones
- **Arquitectura:** Backend (Node.js/Express 5 + MongoDB Atlas), Frontend (Vue 3 / Nuxt 3), Cloud (AWS: S3, Lambda, API Gateway, EventBridge, SES).

---

## Asignación de Roles y Módulos

### Jorge: Autenticación, Usuarios, Seguridad y Notificaciones (Amazon SES)

- **Nombre:** [Jorge]
- **Backend:**
  - Modelos de Usuario (`User`), Roles (`Admin`, `Organizer`, `Attendee`) y Sesiones.
  - Flujo de Auth: Registro, Login con JWT (Access & Refresh Tokens) y bcrypt/Argon2.
  - Integración de Google OAuth 2.0.
  - Middlewares de seguridad: `authMiddleware`, `roleMiddleware`, rate limiting, helmet y cors.
  - Flujo de verificación de correo y recuperación de contraseña (tokens de un solo uso).
- **Cloud (Amazon SES):**
  - Configuración del servicio de correo con Amazon SES.
  - Servicio reutilizable de envío de correos (verificación, recuperación, confirmación de reservas y recordatorios).
- **Frontend:**
  - Vistas de Login, Registro, Recuperación de Contraseña y Callback de Google OAuth.
- **Testing:**
  - Pruebas automatizadas de autenticación, autorización y validación de tokens con Jest + Supertest.
- **Defensa Técnica:** Domina el ciclo de vida de JWT, almacenamiento seguro de contraseñas, middlewares de protección e integración de Amazon SES.

---

### Integrante 2: Gestión de Eventos, Categorías y Almacenamiento (Amazon S3)

- **Nombre:** [Nombre]
- **Backend:**
  - Modelos de Evento (`Event`) y Categoría (`Category`).
  - CRUD completo de eventos (crear, editar propios, cancelar, publicar) y categorías.
  - Filtros avanzados, búsqueda por texto, ordenamiento y paginación (utilizando `queryHelper`).
  - Validación de esquemas con Zod / Express-validator.
- **Cloud (Amazon S3):**
  - Subida de imágenes de eventos a Amazon S3 (configuración de bucket, permisos, AWS SDK v3 y multer-s3).
  - Mecanismo seguro de acceso a archivos multimedia.
- **Frontend:**
  - Catálogo público de eventos (buscador, filtros por categoría/fecha).
  - Detalle del evento con información completa y galería de imágenes.
  - Formulario de creación y edición de eventos para organizadores con subida de imagen.
- **Testing:**
  - Pruebas automatizadas de endpoints de eventos, categorías y filtros con Jest + Supertest.
- **Defensa Técnica:** Domina consultas/agregaciones de MongoDB para filtros, manejo de almacenamiento en Amazon S3 y validación de esquemas.

---

### Integrante 3: Reservaciones, Entradas QR, Concurrencia y Tareas Programadas (EventBridge)

- **Nombre:** [Nombre]
- **Backend:**
  - Modelo de Reservación (`Booking`) y Entrada (`Ticket`).
  - Lógica transaccional de reservación con control estricto de concurrencia y atomicidad en MongoDB (evitar sobreventa del último cupo disponible).
  - Generación de entradas digitales únicas con códigos QR verificables.
  - Endpoint de validación/escaneo de QR en puerta por parte del organizador (evitar reuso).
  - Cancelación de reservaciones y liberación automática de cupos.
- **Cloud (AWS EventBridge Scheduler):**
  - Implementación del Cron Job programado diario (ej. 11:00 PM) para actualización de estados de eventos, recordatorios automáticos de eventos próximos y consolidación de datos.
- **Frontend:**
  - Flujo de reservación de entradas en la interfaz.
  - Vista "Mis Entradas / Historial" para el usuario asistente.
  - Visor del código QR digital descargable o escaneable.
- **Testing:**
  - Pruebas automatizadas de reservaciones, disponibilidad y pruebas de concurrencia simultánea con Jest + Supertest.
- **Defensa Técnica:** Domina operaciones atómicas (`findOneAndUpdate` / transacciones) en MongoDB, generación/verificación de QR y configuración de tareas programadas con EventBridge.

---

### Integrante 4: Dashboards, Calificaciones y Función Serverless (Lambda + API Gateway)

- **Nombre:** [Nombre]
- **Backend:**
  - Modelo de Reseñas / Calificaciones (`Review`).
  - Validación de que solo usuarios con reservación completada puedan calificar/comentar.
  - Endpoints para cálculo de promedios de calificación y moderación de comentarios para administradores.
  - Endpoints de analítica y estadísticas para el Dashboard del Organizador (ocupación, ingresos, ventas en el tiempo).
  - Endpoints para el Dashboard del Administrador (estadísticas globales, gestión de usuarios/eventos).
- **Cloud (AWS Lambda + API Gateway):**
  - Desarrollo de la función serverless externa desacoplada para generación asíncrona de reportes PDF/CSV de eventos y guardado en S3.
  - Exposición de la función mediante Amazon API Gateway y consumo desde el backend principal.
- **Frontend:**
  - Dashboard visual del Organizador (gráficos y tablas de ocupación/reportes).
  - Panel de control del Administrador.
  - Componente de comentarios y calificaciones por estrellas en la página del evento.
  - Interfaz de solicitud y descarga de reportes.
- **Testing:**
  - Pruebas automatizadas de reseñas, agregaciones de dashboards e integración con Lambda con Jest + Supertest.
- **Defensa Técnica:** Domina el pipeline de agregación de MongoDB (`$group`, `$match`, `$project`, `$avg`), arquitectura desacoplada serverless con Lambda y API Gateway.

---

## Matriz de Cobertura de Criterios de Evaluación

| Criterio del Enunciado                 | Puntos | Responsable Principal                             | Apoyo                             |
| :------------------------------------- | :----: | :------------------------------------------------ | :-------------------------------- |
| Arquitectura y organización Express    |   12   | Integrante 1                                      | Integrantes 2, 3                  |
| Autenticación, OAuth y seguridad       |   12   | Integrante 1                                      | Integrante 1                      |
| Funcionalidades y lógica de negocio    |   18   | Integrantes 2 y 3                                 | Integrante 4                      |
| Diseño y manejo de MongoDB             |   8    | Integrantes 2, 3 y 4                              | Integrante 1                      |
| Integraciones Cloud y Serverless (AWS) |   15   | Integrantes 4 (Lambda), 2 (S3), 3 (Cron), 1 (SES) | Todos                             |
| Frontend y experiencia de usuario      |   7    | Todos (en sus respectivos módulos)                | Integrante 4 (UI/UX dashboards)   |
| Testing, documentación y despliegue    |   8    | Todos (pruebas por módulo)                        | Integrante 1 (Setup inicial Jest) |
| **Total**                              | **80** |                                                   |                                   |

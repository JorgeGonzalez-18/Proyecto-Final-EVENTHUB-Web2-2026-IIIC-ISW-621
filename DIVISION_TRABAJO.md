# EventHub - Plan de División de Trabajo y Responsabilidades

## Información General

- **Proyecto:** EventHub – Plataforma de Gestión de Eventos y Reservaciones
- **Modalidad:** Grupal (5 integrantes)
- **Arquitectura:** Backend (Node.js/Express 5 + MongoDB Atlas), Frontend (Vue 3 / Nuxt 3), Cloud (AWS: Lambda, API Gateway, S3, EventBridge, SES).

---

## Asignación de Roles y Módulos

### Integrante 1 JORGE : Autenticación, Usuarios y Seguridad Base

- **Nombre:** [Jorge Gonzalez]
- **Backend:**
  - Modelos de Usuario (`User`), Roles (`Admin`, `Organizer`, `Attendee`) y Sesiones.
  - Flujo de Auth: Registro, Login con JWT (Access & Refresh Tokens) y bcrypt/Argon2.
  - Integración de Google OAuth 2.0.
  - Middlewares de seguridad: `authMiddleware`, `roleMiddleware`, rate limiting, helmet y cors.
  - Flujo de verificación de correo y recuperación de contraseña (tokens de un solo uso).
- **Frontend:**
  - Vistas de Login, Registro, Recuperación de Contraseña y Callback de Google.
- **Defensa Técnica:** Domina el ciclo de vida de JWT, almacenamiento seguro de contraseñas y middlewares de protección.

---

### Integrante 2: Gestión de Eventos y Categorías

- **Nombre:** [Nombre del Integrante 2]
- **Backend:**
  - Modelos de Evento (`Event`) y Categoría (`Category`).
  - CRUD completo de eventos (crear, editar propios, cancelar, publicar).
  - Filtros avanzados, búsqueda por texto, ordenamiento y paginación (utilizando `queryHelper`).
  - Validación de esquemas con Zod / Express-validator.
- **Cloud (AWS S3):**
  - Subida de imágenes de eventos a Amazon S3 (configuración de bucket, URLs públicas o pre-firmadas y multer-s3 / AWS SDK v3).
- **Frontend:**
  - Catálogo público de eventos (buscador, filtros por categoría/fecha).
  - Detalle del evento con información completa y galería/imagen.
  - Formulario de creación y edición de eventos para organizadores.
- **Defensa Técnica:** Domina agregaciones en MongoDB para filtros, manejo de imágenes en AWS S3 y validación de datos.

---

### Integrante 3: Reservaciones, Entradas Digitales y Concurrencia

- **Nombre:** [Nombre del Integrante 3]
- **Backend:**
  - Modelo de Reservación (`Booking`) y Entrada (`Ticket`).
  - Lógica transaccional de reservación con control estricto de concurrencia y atomicidad en MongoDB (evitar sobreventa del último cupo disponible).
  - Generación de entradas digitales únicas con códigos QR verificables.
  - Endpoint de validación/escaneo de QR en puerta por parte del organizador (evitar reuso).
  - Cancelación de reservaciones y liberación automática de cupos.
- **Frontend:**
  - Flujo de reservación de entradas en la interfaz.
  - Vista "Mis Entradas / Historial" para el usuario asistente.
  - Visor del código QR digital descargable o escaneable.
- **Defensa Técnica:** Domina operaciones atómicas (`findOneAndUpdate` / transacciones en MongoDB) y flujo de generación/validación de QR.

---

### Integrante 4: Dashboards, Métricas, Calificaciones y Moderación

- **Nombre:** [Nombre del Integrante 4]
- **Backend:**
  - Modelo de Reseñas / Calificaciones (`Review`).
  - Validación de que solo usuarios con reservación completada puedan calificar/comentar.
  - Endpoints para cálculo de promedios de calificación y moderación de comentarios.
  - Endpoints de analítica y estadísticas para el Dashboard del Organizador (ocupación, ingresos, ventas en el tiempo).
  - Endpoints para el Dashboard del Administrador (estadísticas globales, gestión de usuarios/eventos).
- **Frontend:**
  - Dashboard visual del Organizador (gráficos y tablas de ocupación).
  - Panel de control del Administrador.
  - Componente de comentarios y calificaciones por estrellas en la página del evento.
- **Defensa Técnica:** Domina el pipeline de agregación de MongoDB (`$group`, `$match`, `$project`, `$avg`) y reglas de negocio para comentarios.

---

### Integrante 5: Infraestructura Cloud Serverless, Cron Jobs y Testing

- **Nombre:** [Nombre del Integrante 5]
- **Cloud (AWS Serverless & Emails):**
  - AWS Lambda + API Gateway: Función serverless externa para generación asíncrona de reportes PDF/CSV de eventos.
  - AWS EventBridge Scheduler: Cron job diario para consolidación de métricas y disparo automático de alertas.
  - Amazon SES: Plantillas y envío de correos (verificación, recuperación, confirmación de reserva y recordatorios).
- **Backend & Testing:**
  - Comunicación del backend principal con API Gateway / Lambda y almacenamiento de reportes en S3.
  - Suite de pruebas automatizadas con Jest y Supertest (servicios, rutas críticas, autenticación y concurrencia).
- **Frontend:**
  - Interfaz de solicitud y descarga de reportes para organizadores.
- **Defensa Técnica:** Domina la arquitectura desacoplada serverless, configuración de EventBridge/SES y pruebas con Jest/Supertest.

---

## Matriz de Cobertura de Criterios de Evaluación

| Criterio del Enunciado                 | Puntos | Responsable Principal  | Apoyo                       |
| :------------------------------------- | :----: | :--------------------- | :-------------------------- |
| Arquitectura y organización Express    |   12   | Integrante 1           | Integrantes 2, 3            |
| Autenticación, OAuth y seguridad       |   12   | Integrante 1           | Integrante 5 (SES)          |
| Lógica de negocio (Eventos/Reservas)   |   18   | Integrantes 2 y 3      | Integrante 4                |
| Diseño y manejo de MongoDB             |   8    | Integrantes 2, 3 y 4   | Integrante 1                |
| Integraciones Cloud y Serverless (AWS) |   15   | Integrante 5           | Integrante 2 (S3)           |
| Frontend y experiencia de usuario      |   7    | Todos (en sus módulos) | Integrante 4 (UI/UX global) |
| Testing, documentación y despliegue    |   8    | Integrante 5           | Todos                       |

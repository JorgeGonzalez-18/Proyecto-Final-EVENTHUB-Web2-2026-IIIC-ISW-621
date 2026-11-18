**PROYECTO FINAL – EVENTHUB**

**Plataforma Full Stack de gestión de eventos y reservaciones**

Valor: 40% de la nota final del curso  
Modalidad: Grupal (2 a 4 estudiantes)  
Backend obligatorio: Node.js + Express.js  
**Base de datos obligatoria:** MongoDB

**Entrega:** Ultima semana lectiva  
**Frontend:** Libre elección (Nuxt 3 / Vue 3 recomendado)

**1\. Descripción del proyecto**

EventHub es una plataforma web destinada a la publicación, administración y reservación de eventos.

El objetivo es desarrollar una aplicación Full Stack que permita a organizadores crear y administrar eventos, mientras que los usuarios puedan descubrir eventos disponibles, realizar reservaciones, obtener entradas digitales y consultar su historial de participación.

El proyecto deberá implementar una arquitectura profesional, con separación de responsabilidades entre frontend, backend y servicios externos.

No se busca desarrollar únicamente una aplicación CRUD. Se espera que los estudiantes implementen funcionalidades reales, lógica de negocio, autenticación segura, autorización, procesamiento asíncrono, almacenamiento de archivos y automatizaciones.

El resultado deberá ser una aplicación funcional, desplegada y accesible mediante una URL pública.

**2\. Objetivos de aprendizaje**

Al finalizar el proyecto, los estudiantes deberán demostrar que son capaces de:

1.  Diseñar y desarrollar una API REST utilizando Express.js.
2.  Implementar una arquitectura backend modular y escalable.
3.  Diseñar modelos y relaciones utilizando MongoDB.
4.  Implementar autenticación y autorización seguras.
5.  Integrar autenticación mediante proveedores externos.
6.  Gestionar sesiones y recuperación de contraseñas.
7.  Desarrollar una aplicación frontend que consuma una API externa.
8.  Integrar servicios cloud para almacenamiento y procesamiento.
9.  Implementar tareas automatizadas mediante cron jobs.
10.  Generar documentos y reportes mediante procesos asíncronos.
11.  Implementar validaciones y manejo centralizado de errores.
12.  Documentar, probar y desplegar una aplicación completa.

**3\. Tecnologías y herramientas**

**3.1 Backend (obligatorio)**

1.  Node.js
2.  Express.js
3.  MongoDB
4.  Mongoose
5.  JWT
6.  bcrypt o Argon2
7.  Google OAuth 2.0
8.  Zod, Joi o express-validator
9.  Swagger / OpenAPI / Scalar

El backend deberá implementar una arquitectura modular, evitando concentrar toda la lógica de negocio en los controladores o en un único archivo.

Se recomienda separar:

1.  Routes
2.  Controllers
3.  Services
4.  Repositories
5.  Models
6.  Middlewares
7.  Validators
8.  Configurations
9.  Utils

**3.2 Frontend**

El framework frontend será de libre elección.

Se recomienda utilizar:

-   Nuxt 3 / Vue 3.

El frontend deberá ser una aplicación independiente del backend y consumir los endpoints mediante HTTP.

Se deberá implementar una interfaz responsive, con una experiencia de usuario consistente y adecuada para los distintos roles de la aplicación.

**3.3 Base de datos**

MongoDB será obligatorio.

Se podrá utilizar MongoDB Atlas o una instalación propia de MongoDB.

La base de datos deberá contar con:

1.  Modelos correctamente definidos.
2.  Validaciones.
3.  Índices cuando sean necesarios.
4.  Relaciones entre documentos.
5.  Manejo adecuado de referencias.
6.  Consultas y agregaciones.
7.  Estrategias para evitar inconsistencias en operaciones críticas.

**3.4 Infraestructura Cloud**

Se recomienda utilizar AWS como proveedor principal.

Sin embargo, se permitirá utilizar herramientas gratuitas de proveedores independientes de AWS. No será obligatorio crear una cuenta de Amazon ni utilizar servicios de pago.

Se deberán implementar las funcionalidades equivalentes, independientemente del proveedor seleccionado.

<table><tbody><tr><td><p><strong>Servicio requerido</strong></p></td><td><p><strong>AWS recomendado</strong></p></td><td><p><strong>Alternativa independiente</strong></p></td></tr><tr><td><p>Funciones serverless</p></td><td><p>AWS Lambda</p></td><td><p>Cloudflare Workers</p></td></tr><tr><td><p>API Gateway</p></td><td><p>Amazon API Gateway</p></td><td><p>Cloudflare Workers</p></td></tr><tr><td><p>Almacenamiento</p></td><td><p>Amazon S3</p></td><td><p>Cloudflare R2</p></td></tr><tr><td><p>Tareas programadas</p></td><td><p>EventBridge Scheduler</p></td><td><p>Cloudflare Cron Triggers</p></td></tr><tr><td><p>Envío de correos</p></td><td><p>Amazon SES</p></td><td><p>Resend</p></td></tr></tbody></table>

**Importante:** utilizar una alternativa no significa omitir la funcionalidad. Los servicios deben estar realmente implementados e integrados.

No se aceptará como sustitución de Lambda un endpoint convencional de Express que ejecute directamente toda la funcionalidad sin integrar un servicio serverless externo.

**4\. Requerimientos funcionales**

**RF-01. Registro y autenticación**

La aplicación deberá permitir registrar usuarios mediante email y contraseña.

Se deberán implementar:

1.  Registro de usuarios.
2.  Login mediante email y contraseña.
3.  Login mediante Google OAuth 2.0.
4.  Logout.
5.  Gestión de sesiones.
6.  Access tokens y refresh tokens.
7.  Verificación de correo electrónico.
8.  Recuperación de contraseña.
9.  Restablecimiento de contraseña.

Las contraseñas deberán almacenarse utilizando algoritmos seguros de hashing.

No se permitirá almacenar contraseñas en texto plano.

**RF-02. Recuperación de contraseña**

La aplicación deberá implementar el flujo completo de recuperación de contraseña.

Flujo esperado:

1.  El usuario solicita recuperar su contraseña.
2.  El backend genera un token seguro.
3.  El token deberá tener una expiración definida y ser de un solo uso.
4.  Se envía un correo electrónico mediante un proveedor de email.
5.  El usuario recibe un enlace para restablecer su contraseña.
6.  El frontend presenta un formulario para ingresar la nueva contraseña.
7.  El backend valida el token.
8.  Se actualiza la contraseña utilizando hashing.
9.  El token queda invalidado.

Se deberá implementar tanto el envío del correo como la validación del proceso.

No será suficiente mostrar un mensaje ficticio indicando que se envió un correo.

**RF-03. Gestión de usuarios y roles**

Se deberán implementar al menos tres roles:

**Administrator**

1.  Administrar usuarios.
2.  Consultar eventos.
3.  Administrar categorías.
4.  Moderar comentarios.
5.  Consultar estadísticas generales.

**Organizer**

1.  Crear eventos.
2.  Editar sus propios eventos.
3.  Publicar y cancelar eventos.
4.  Consultar reservaciones.
5.  Consultar estadísticas de sus eventos.
6.  Descargar reportes.

**Attendee**

1.  Consultar eventos.
2.  Realizar reservaciones.
3.  Cancelar reservaciones según las reglas del sistema.
4.  Consultar sus entradas.
5.  Consultar su historial.
6.  Publicar comentarios y calificaciones.

Los permisos deberán validarse en el backend. Ocultar botones en el frontend no constituye autorización.

**RF-04. Gestión de eventos**

Los organizadores deberán poder crear y administrar eventos.

Cada evento deberá contemplar como mínimo:

1.  Nombre.
2.  Descripción.
3.  Categoría.
4.  Imagen.
5.  Ubicación.
6.  Fecha y hora.
7.  Capacidad máxima.
8.  Cantidad de espacios disponibles.
9.  Precio (puede ser gratuito).
10.  Estado del evento.
11.  Organizador responsable.

Se deberán implementar operaciones para crear, consultar, actualizar y cancelar eventos.

Los usuarios deberán poder buscar y filtrar eventos por categoría, fecha, ubicación y otros criterios relevantes.

**RF-05. Reservaciones**

Los usuarios deberán poder reservar espacios disponibles en un evento.

El sistema deberá:

1.  Validar que el evento exista.
2.  Validar que el evento esté publicado.
3.  Validar que no haya finalizado.
4.  Validar la disponibilidad.
5.  Evitar que se exceda la capacidad máxima.
6.  Registrar la reservación.
7.  Permitir consultar el historial.
8.  Permitir cancelar reservaciones según las condiciones establecidas.

Se deberá prestar especial atención a la concurrencia.

Dos usuarios no podrán reservar simultáneamente el último espacio disponible y provocar una sobreventa.

La lógica deberá implementarse en el backend utilizando mecanismos apropiados de atomicidad y consistencia de MongoDB.

**RF-06. Entradas digitales**

Cada reservación confirmada deberá generar una entrada digital.

La entrada deberá incluir:

1.  Identificador único.
2.  Información del evento.
3.  Información del asistente.
4.  Fecha de reservación.
5.  Código QR.

El código QR deberá permitir verificar la validez de la entrada.

Se deberá evitar que una misma entrada pueda utilizarse más de una vez.

Como funcionalidad adicional, se podrá implementar un módulo para que los organizadores validen entradas durante el acceso al evento.

**RF-07. Comentarios y calificaciones**

Los usuarios podrán calificar y comentar eventos.

Se deberán implementar:

1.  Creación de comentarios.
2.  Edición o eliminación de comentarios propios.
3.  Calificaciones.
4.  Consulta de comentarios.
5.  Promedio de calificaciones.
6.  Moderación por parte de administradores.

Se deberán establecer reglas para evitar que usuarios sin reservaciones puedan publicar calificaciones de eventos a los que no han asistido.

**RF-08. Dashboard del organizador**

Cada organizador deberá contar con un dashboard que muestre información relevante de sus eventos.

Como mínimo:

1.  Eventos creados.
2.  Eventos activos.
3.  Reservaciones.
4.  Espacios disponibles.
5.  Eventos próximos.
6.  Porcentaje de ocupación.
7.  Estadísticas de reservaciones.

Los datos deberán provenir del backend y de consultas reales a MongoDB.

**RF-09. Dashboard administrativo**

El administrador deberá disponer de un panel general que permita:

1.  Consultar usuarios.
2.  Consultar organizadores.
3.  Consultar eventos.
4.  Consultar reservaciones.
5.  Administrar categorías.
6.  Consultar estadísticas generales.
7.  Moderar contenido.

**RF-10. Notificaciones por correo electrónico**

Se deberán implementar notificaciones automáticas mediante un proveedor de correo.

Como mínimo:

1.  Verificación de correo.
2.  Recuperación de contraseña.
3.  Confirmación de reservación.
4.  Confirmación de cancelación.
5.  Recordatorio de eventos próximos.

Se recomienda utilizar Resend o Amazon SES.

**5\. Requerimientos de infraestructura Cloud**

Estos requerimientos son obligatorios, independientemente de si se utiliza AWS o un proveedor alternativo.

**RC-01. Función serverless**

Se deberá desarrollar e implementar al menos una función serverless independiente del backend Express.

Se recomienda utilizarla para generar reportes PDF o CSV de los eventos.

La función deberá:

1.  Recibir una solicitud.
2.  Obtener la información necesaria.
3.  Procesar los datos.
4.  Generar un documento.
5.  Guardar el resultado en un servicio de almacenamiento.
6.  Retornar información que permita consultar el resultado.

**RC-02. API Gateway**

La función serverless deberá ser accesible mediante un endpoint expuesto a través de un API Gateway o su alternativa.

Se deberá demostrar la comunicación entre el backend principal y la función serverless.

**RC-03. Almacenamiento de archivos**

Se deberá integrar un servicio de almacenamiento externo.

Se podrá utilizar S3 o Cloudflare R2.

Se deberán almacenar como mínimo:

1.  Imágenes de eventos.
2.  Reportes generados.

Se deberá implementar un mecanismo seguro para cargar y consultar los archivos.

No se deberán almacenar archivos directamente en el repositorio del proyecto ni depender exclusivamente del almacenamiento local del servidor.

**RC-04. Cron job**

Se deberá implementar al menos una tarea programada.

Se recomienda utilizarla para generar reportes automáticos diarios o semanales.

Ejemplo:

Todos los días a las 11:00 PM se ejecutará un proceso que:

1.  Consulte los eventos y reservaciones.
2.  Calcule estadísticas.
3.  Genere un reporte.
4.  Almacene el documento.
5.  Notifique al organizador mediante correo electrónico.

Se deberá demostrar que la tarea se ejecuta automáticamente y no solamente cuando un usuario realiza una solicitud manual.

**6\. Requerimientos técnicos del backend**

El backend deberá implementar los siguientes elementos:

**Middlewares**

1.  Authentication middleware.
2.  Authorization middleware.
3.  Error handling middleware.
4.  Request validation middleware.
5.  Logging middleware.
6.  Rate limiting.
7.  CORS.
8.  Helmet.

Se espera que los estudiantes comprendan qué responsabilidad tiene cada middleware y por qué se utiliza.

**Manejo de errores**

Se deberá implementar un mecanismo centralizado para manejar errores.

Las respuestas deberán mantener una estructura consistente.

No se deberán exponer detalles internos, credenciales ni stack traces al cliente en producción.

**Paginación y filtros**

Los endpoints que devuelvan colecciones deberán implementar paginación cuando corresponda.

Se deberán soportar filtros y ordenamiento en los módulos que lo requieran.

**Seguridad**

Se deberá considerar:

1.  Protección contra fuerza bruta.
2.  Validación de entradas.
3.  Protección de endpoints.
4.  Control de acceso.
5.  Manejo seguro de tokens.
6.  Variables de entorno.
7.  Protección de información sensible.
8.  Prevención de accesos no autorizados a recursos de otros usuarios.

**7\. Requerimientos no funcionales**

La aplicación deberá cumplir con las siguientes condiciones:

1.  El backend y frontend deberán estar separados.
2.  La API deberá contar con documentación.
3.  El código deberá tener una estructura organizada.
4.  La aplicación deberá ser responsive.
5.  Se deberán manejar adecuadamente los errores.
6.  Se deberá evitar duplicación innecesaria de código.
7.  Las variables sensibles deberán utilizar variables de entorno.
8.  La aplicación deberá estar desplegada.
9.  Se deberán implementar pruebas automatizadas.
10.  Se deberá contar con instrucciones para ejecutar el proyecto localmente.

**8\. Testing**

Se deberán implementar pruebas automatizadas.

Como mínimo:

1.  Pruebas unitarias de servicios.
2.  Pruebas de endpoints.
3.  Pruebas de autenticación.
4.  Pruebas de autorización.
5.  Pruebas de validaciones.
6.  Pruebas de reservaciones.
7.  Pruebas de disponibilidad y concurrencia.

Se recomienda utilizar Jest y Supertest.

No se aceptará como evidencia de testing únicamente una colección de Postman ejecutada manualmente.

**9\. Documentación y entregables**

Cada equipo deberá entregar:

**1\. Código fuente**

1.  Repositorio Git.
2.  Historial de commits.
3.  Código de frontend.
4.  Código de backend.
5.  Configuración de infraestructura cuando corresponda.

**2\. Documentación técnica**

1.  README.
2.  Arquitectura general.
3.  Diagrama de componentes.
4.  Diagrama de base de datos.
5.  Documentación de endpoints.
6.  Instrucciones de instalación.
7.  Variables de entorno requeridas (sin valores secretos).
8.  Descripción de integraciones externas.

**3\. Evidencias**

1.  Capturas de funcionamiento.
2.  Evidencia de los correos enviados.
3.  Evidencia de reportes generados.
4.  Evidencia de ejecución automática del cron job.
5.  Evidencia de almacenamiento en S3 o alternativa.
6.  Evidencia de pruebas automatizadas.

**5\. Presentación**

1.  Demostración funcional.
2.  Explicación técnica individual.
3.  Respuestas a preguntas sobre cualquier módulo del proyecto.

**10\. Evaluación**

El proyecto representa un 40% de la nota final del curso.

La evaluación se divide en dos componentes:

-   80% desarrollo grupal.
-   20% presentación y defensa técnica individual.

**10.1 Desarrollo grupal – 80 puntos del proyecto**

<table><tbody><tr><td><p><strong>Criterio</strong></p></td><td><p><strong>Puntaje</strong></p></td></tr><tr><td><p>Arquitectura y organización del backend Express</p></td><td><p>12</p></td></tr><tr><td><p>Autenticación, OAuth y seguridad</p></td><td><p>12</p></td></tr><tr><td><p>Funcionalidades y lógica de negocio</p></td><td><p>18</p></td></tr><tr><td><p>Diseño y manejo de MongoDB</p></td><td><p>8</p></td></tr><tr><td><p>Integraciones Cloud y procesos serverless</p></td><td><p>15</p></td></tr><tr><td><p>Frontend y experiencia de usuario</p></td><td><p>7</p></td></tr><tr><td><p>Testing, documentación y despliegue</p></td><td><p>8</p></td></tr><tr><td><p><strong>Total</strong></p></td><td><p><strong>80</strong></p></td></tr></tbody></table>

**10.2 Presentación y defensa individual – 20 puntos del proyecto**

<table><tbody><tr><td><p><strong>Criterio</strong></p></td><td><p><strong>Puntaje</strong></p></td></tr><tr><td><p>Comprensión general de la arquitectura</p></td><td><p>4</p></td></tr><tr><td><p>Dominio del backend, endpoints y middlewares</p></td><td><p>5</p></td></tr><tr><td><p>Dominio de autenticación y seguridad</p></td><td><p>3</p></td></tr><tr><td><p>Comprensión de MongoDB y lógica de negocio</p></td><td><p>3</p></td></tr><tr><td><p>Dominio de integraciones Cloud y automatizaciones</p></td><td><p>3</p></td></tr><tr><td><p>Capacidad de demostrar, modificar y explicar código</p></td><td><p>2</p></td></tr><tr><td><p><strong>Total</strong></p></td><td><p><strong>20</strong></p></td></tr></tbody></table>

**10.3 Política de defensa individual**

Cada estudiante deberá asistir a una cita individual con el profesor.

Durante la evaluación se podrán realizar preguntas sobre cualquier requerimiento implementado por el equipo.

El estudiante deberá demostrar que comprende el funcionamiento del sistema y que puede explicar las decisiones técnicas tomadas.

Si un estudiante no puede responder correctamente o demostrar comprensión del requerimiento consultado, obtendrá cero puntos en ese requerimiento dentro de su evaluación individual.

Esta evaluación busca comprobar el dominio real del trabajo realizado y evitar que un estudiante obtenga una calificación por funcionalidades que no comprende o que fueron desarrolladas completamente mediante herramientas de inteligencia artificial sin supervisión ni entendimiento.

La evaluación individual no será sustituida por la nota grupal.

**12\. Uso de herramientas de Inteligencia Artificial**

Se permite utilizar herramientas de IA como apoyo durante el desarrollo.

Sin embargo:

1.  El estudiante deberá comprender el código generado.
2.  Será responsable de validar las soluciones.
3.  Deberá poder explicar las decisiones de arquitectura.
4.  No podrá justificar desconocimiento indicando que el código fue generado por IA.
5.  Se deberá declarar el uso de herramientas de IA cuando hayan contribuido significativamente al desarrollo.

El uso de IA no elimina la responsabilidad individual sobre el trabajo entregado.

**12\. Consideraciones finales**

1.  No se exige utilizar AWS, pero AWS es el proveedor recomendado.
2.  Se aceptarán alternativas gratuitas e independientes de AWS.
3.  No se aceptarán funcionalidades simuladas cuando se requiera una integración real.
4.  Todos los integrantes deberán conocer la totalidad del proyecto.
5.  Se podrá trabajar en grupos de 2 a 4 estudiantes.
6.  La presentación será individual.
7.  El proyecto deberá estar funcional y desplegado al momento de su evaluación.

**El objetivo no es solamente entregar una aplicación que funcione, sino demostrar que se tiene la capacidad de diseñar, desarrollar, integrar, desplegar y defender técnicamente una solución Full Stack profesional.**
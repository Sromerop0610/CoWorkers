# CO-WORKERS

CO-WORKERS es una red social orientada a personas del ámbito creativo y tecnológico. Su objetivo es facilitar la conexión entre profesionales y estudiantes, permitiéndoles compartir proyectos, descubrir ideas, intercambiar opiniones y encontrar personas con las que colaborar.

El proyecto se desarrolla en dos hitos principales: el primero dedicado a la planificación, definición y diseño de la aplicación; y el segundo centrado en la implementación de sus funcionalidades mediante HTML, CSS y JavaScript.

# 1. Hito 1 — Planificación y diseño

## 1.1. Backlog inicial

El backlog recoge las funcionalidades que se desarrollarán en la aplicación, ordenadas por prioridad. Cada tarea está dividida en pequeñas partes que pueden implementarse y probarse de manera independiente.

| ID | Funcionalidad | Descripción | Prioridad |
|---|---|---|---|
| F01 | Registro de usuarios | Crear una cuenta mediante un formulario con los datos necesarios y validación. | Alta |
| F02 | Inicio de sesión | Permitir que los usuarios accedan a su cuenta. | Alta |
| F03 | Perfil de usuario | Mostrar información personal, descripción, habilidades y proyectos del usuario. | Alta |
| F04 | Edición del perfil | Permitir modificar los datos personales y la información profesional. | Alta |
| F05 | Feed de publicaciones | Mostrar las publicaciones de otros usuarios en un listado. | Alta |
| F06 | Visualización de publicaciones | Consultar el contenido completo de una publicación y sus detalles. | Alta |
| F07 | Creación de publicaciones | Permitir compartir contenido, ideas y novedades con la comunidad. | Alta |
| F08 | Descubrimiento de proyectos | Explorar proyectos compartidos por otros usuarios. | Alta |
| F09 | Interacción con publicaciones | Permitir dar feedback y participar en las publicaciones. | Media |
| F10 | Mensajería | Permitir mantener conversaciones privadas con otros usuarios. | Media |
| F11 | Notificaciones | Mostrar avisos sobre interacciones y actividad relevante. | Media |
| F12 | Configuración | Gestionar las preferencias y opciones de la cuenta. | Media |

## 1.2. Mapa de pantallas

El mapa de pantallas recoge las diferentes vistas de CO-WORKERS y la información que se muestra en cada una.

| Pantalla | Datos y contenido |
|---|---|
| **Inicio / Registro** | Presentación de CO-WORKERS, información sobre la plataforma y formulario para crear una cuenta. |
| **Login** | Formulario de inicio de sesión con correo electrónico y contraseña. |
| **Feed** | Publicaciones de la comunidad, navegación entre secciones, contenido recomendado y acceso a proyectos. |
| **Proyectos** | Listado de proyectos compartidos por la comunidad, información básica y acceso a sus detalles. |
| **Detalle de publicación** | Contenido completo de la publicación, autor, información relacionada y sección de feedback. |
| **Perfil** | Información del usuario, descripción, habilidades, proyectos y publicaciones. |
| **Mensajes** | Conversaciones, listado de chats, participantes y mensajes intercambiados. |
| **Nueva publicación** | Formulario para crear una publicación, añadir contenido y compartirlo con la comunidad. |
| **Nuevo proyecto** | Formulario para presentar un proyecto, describirlo y compartir información sobre él. |
| **Notificaciones** | Avisos de actividad, interacciones, mensajes y novedades relacionadas con el usuario. |
| **Configuración** | Preferencias de usuario, ajustes de la cuenta y opciones de personalización. |

### Navegación de la aplicación

La navegación principal permite acceder al feed, descubrir proyectos, consultar el perfil, gestionar mensajes y revisar notificaciones o ajustes.

CO-WORKERS busca ofrecer una experiencia sencilla, visual y colaborativa, facilitando que los usuarios puedan compartir su trabajo, descubrir talento y establecer conexiones profesionales.

## 1.3. Documentación y diseño en Figma

Los siguientes enlaces recogen los documentos de planificación, investigación y diseño realizados durante el primer hito.

### Investigación y planificación

- [Ficha 1 — User Persona](https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=38-140&t=i6gGraDX4StvAwP5-4)
- [Ficha 2 — User Persona](https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=42-239&t=i6gGraDX4StvAwP5-4)
- [Ficha 3 — User Persona](https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=42-271&t=i6gGraDX4StvAwP5-4)
- [MVP](https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=17-39&t=i6gGraDX4StvAwP5-4)
- [Userflow](https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=25-125&t=i6gGraDX4StvAwP5-4)
- [Sitemap](https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=51-293&t=i6gGraDX4StvAwP5-4)

### Diseño y prototipado

- [Wireframe](https://www.figma.com/design/q6PHVKEsGc7gRZnUVwSbJx/Plantilla-para-iniciar-proyectos--Community-?node-id=4-6&p=f&t=ljPR0RsWRnA9BzJP-0)
- [Prototipo navegable de ordenador](https://www.figma.com/proto/q6PHVKEsGc7gRZnUVwSbJx/Plantilla-para-iniciar-proyectos--Community-?node-id=536-22&p=f&t=ljPR0RsWRnA9BzJP-0&scaling=min-zoom&content-scaling=fixed&page-id=4%3A6&starting-point-node-id=536%3A22&show-proto-sidebar=1)
- [Prototipo navegable de móvil](https://www.figma.com/proto/q6PHVKEsGc7gRZnUVwSbJx/Plantilla-para-iniciar-proyectos--Community-?node-id=566-268&p=f&t=ljPR0RsWRnA9BzJP-0&scaling=min-zoom&content-scaling=fixed&page-id=4%3A6&starting-point-node-id=566%3A268&show-proto-sidebar=1)

---

# 2. Hito 2 — Implementación, formularios y validación

## 2.1. Descripción del trabajo realizado

Durante este hito se ha desarrollado el sistema de gestión de usuarios y publicaciones de CO-WORKERS, conectando los formularios con JavaScript y el almacenamiento del navegador.

Se ha trabajado sobre las páginas HTML que ya existían, adaptando sus formularios y conectándolos con la lógica necesaria para gestionar los datos introducidos.

### Tecnologías utilizadas

- **HTML5:** estructura y contenido de las páginas.
- **CSS3:** diseño y estilos de la aplicación.
- **JavaScript:** validación de formularios, gestión de usuarios, sesiones y publicaciones.
- **localStorage:** almacenamiento de usuarios y publicaciones.
- **sessionStorage:** almacenamiento de la información necesaria para mantener identificada la sesión activa.
- **Web Crypto API:** generación de hashes de contraseñas mediante PBKDF2 y SHA-256.

### Organización de los módulos JavaScript

La lógica se ha organizado en tres módulos principales:

| Archivo | Responsabilidad |
|---|---|
| `almacen.js` | Gestiona las operaciones CRUD de usuarios y publicaciones en `localStorage`. |
| `validacion.js` | Contiene las validaciones y la lógica de los formularios. |
| `sesion.js` | Gestiona la sesión activa, la carga del perfil y las publicaciones del usuario. |

### Almacenamiento de datos

Se utilizan dos mecanismos de almacenamiento del navegador:

- `localStorage`: conserva los datos de usuarios y publicaciones aunque se cierre el navegador.
- `sessionStorage`: mantiene la información de la sesión del usuario durante la sesión de navegación.

Los usuarios y las publicaciones se guardan en colecciones independientes. Cada usuario tiene un identificador propio y cada publicación almacena el identificador de su autor.

## 2.2. Adaptación de los formularios

Se han adaptado los formularios de registro, inicio de sesión, edición de perfil y creación de publicaciones a las páginas que ya existían en CO-WORKERS.

Se ha respetado el diseño, los campos, los identificadores y la distribución de los elementos originales.

Posteriormente, se ha conectado cada formulario con JavaScript para gestionar los datos introducidos, comprobar que cumplen las reglas establecidas y mostrar los mensajes de error correspondientes.

También se ha utilizado `novalidate` en los formularios para controlar las validaciones mediante JavaScript y personalizar los mensajes que recibe el usuario.

## 2.3. Sistema de registro e inicio de sesión

Se ha implementado un sistema que permite crear cuentas y acceder posteriormente a ellas mediante las credenciales registradas.

Cuando una persona se registra, se comprueba que los datos sean correctos y que el nombre de usuario y el correo electrónico no estén ya utilizados.

Las contraseñas no se almacenan directamente. Se genera un salt aleatorio y se obtiene un hash mediante PBKDF2 con SHA-256 y 100.000 iteraciones. En el almacenamiento se guardan el hash y el salt, en lugar de la contraseña original.

Cuando el usuario inicia sesión, se localiza su cuenta y se comprueba la contraseña introducida utilizando el procedimiento de hash correspondiente.

Si las credenciales son correctas, se establece la sesión y se guarda en `sessionStorage` la información necesaria para identificar al usuario activo.

## 2.4. Funcionamiento de la sesión

La sesión permite que las diferentes páginas de la aplicación sepan qué usuario está conectado.

El módulo `sesion.js` se encarga de recuperar la información del usuario activo y utilizarla para cargar sus datos personales y sus publicaciones.

De esta manera, el usuario puede consultar su perfil, modificar sus datos, cerrar sesión y gestionar sus propias publicaciones.

## 2.5. Gestión de usuarios

Se ha implementado el CRUD completo de usuarios:

- **Create:** registrar nuevos usuarios.
- **Read:** consultar todos los usuarios o buscar uno por su identificador.
- **Update:** modificar los datos de una cuenta.
- **Delete:** eliminar una cuenta.

## 2.6. Gestión de publicaciones

También se ha implementado el CRUD de publicaciones.

Cada publicación queda asociada al identificador del usuario que la crea. Así, no es necesario seleccionar manualmente el autor, ya que se obtiene de la sesión activa.

El formulario permite introducir un título, seleccionar una categoría, escribir el contenido y adjuntar una imagen. Las imágenes se convierten a Base64 para almacenarlas junto con los demás datos.

Las publicaciones se muestran en el perfil de su autor y pueden editarse o eliminarse. Al editar una publicación, si no se selecciona una imagen nueva, se conserva la imagen anterior.

---

# 3. Backlog actualizado

El siguiente backlog recoge el estado de las funcionalidades planteadas inicialmente y las tareas técnicas desarrolladas durante el segundo hito.

## 3.1. Funcionalidades implementadas y probadas

- [x] F01 — Registro de usuarios.
- [x] F02 — Inicio de sesión.
- [x] F03 — Perfil de usuario.
- [x] F04 — Edición del perfil.
- [x] F07 — Creación de publicaciones.
- [x] Implementar la consulta de todos los usuarios.
- [x] Implementar la búsqueda de usuarios por identificador.
- [x] Implementar la creación de usuarios.
- [x] Implementar la actualización de usuarios.
- [x] Implementar la eliminación de usuarios.
- [x] Evitar el registro de nombres de usuario y correos electrónicos duplicados.
- [x] Proteger las contraseñas mediante hash y salt.
- [x] Implementar la gestión de sesiones.
- [x] Mostrar los datos del usuario activo en su perfil.
- [x] Permitir eliminar la cuenta.
- [x] Implementar la consulta, creación, actualización y eliminación de publicaciones.
- [x] Relacionar cada publicación con el usuario que la ha creado.
- [x] Mostrar las publicaciones propias en el perfil.
- [x] Permitir editar y eliminar publicaciones.
- [x] Validar los datos introducidos en los formularios.
- [x] Comprobar el registro y el inicio de sesión.
- [x] Comprobar la edición y eliminación de usuarios y publicaciones.
- [x] Comprobar la relación entre usuarios y publicaciones.
- [x] Comprobar el almacenamiento y la recuperación de los datos.

## 3.2. Funcionalidades pendientes

- [ ] F05 — Feed completo de publicaciones de la comunidad.
- [ ] F06 — Visualización completa de publicaciones y sus detalles.
- [ ] F08 — Descubrimiento de proyectos.
- [ ] F09 — Interacción con publicaciones.
- [ ] F10 — Mensajería.
- [ ] F11 — Notificaciones.
- [ ] F12 — Configuración.
- [ ] Implementar la persistencia de los datos introducidos en los formularios mediante `localStorage`.
- [ ] Recuperar automáticamente los valores guardados cuando el usuario vuelva a acceder al formulario.

---

# 4. Mapa de validación

Las validaciones se realizan mediante JavaScript en `validacion.js`.

## 4.1. Formulario de registro

| Campo | Regla de validación | Mensaje de error |
|---|---|---|
| Nombre de usuario | Obligatorio, entre 3 y 20 caracteres y no puede estar repetido. | El nombre de usuario es obligatorio. / Debe tener entre 3 y 20 caracteres. / Este nombre de usuario ya está registrado. |
| Correo electrónico | Obligatorio, debe tener un formato válido y no estar registrado previamente. | El correo electrónico es obligatorio. / Introduce un correo electrónico válido. / Este correo electrónico ya está registrado. |
| Contraseña | Obligatoria, entre 8 y 64 caracteres, con al menos una mayúscula y un número. | La contraseña es obligatoria. / La contraseña no cumple los requisitos. |
| Confirmación de contraseña | Debe coincidir con la contraseña introducida anteriormente. | Las contraseñas no coinciden. |
| Teléfono | Debe cumplir el formato y la longitud establecidos para el número de teléfono. | Introduce un número de teléfono válido. |
| Fecha de nacimiento | Obligatoria y debe cumplir las restricciones de fecha y edad establecidas. | Introduce una fecha de nacimiento válida. |
| Condiciones | Es obligatorio aceptar las condiciones. | Debes aceptar las condiciones para continuar. |

## 4.2. Formulario de inicio de sesión

| Campo | Regla de validación | Mensaje de error |
|---|---|---|
| Identificador de acceso | Obligatorio. Debe corresponder a una cuenta registrada. | Introduce tus datos de acceso. / No existe una cuenta con esos datos. |
| Contraseña | Obligatoria y debe coincidir con la contraseña almacenada. | Introduce tu contraseña. / La contraseña es incorrecta. |

## 4.3. Formulario de edición del perfil

| Campo | Regla de validación | Mensaje de error |
|---|---|---|
| Nombre de usuario | Debe cumplir el formato establecido y no coincidir con el de otro usuario. | Introduce un nombre de usuario válido. / Este nombre de usuario ya está registrado. |
| Correo electrónico | Debe tener un formato válido y no estar utilizado por otra cuenta. | Introduce un correo electrónico válido. / Este correo electrónico ya está registrado. |
| Teléfono | Debe cumplir el formato y la longitud establecidos. | Introduce un número de teléfono válido. |
| Fecha de nacimiento | Debe cumplir las restricciones de fecha establecidas. | Introduce una fecha de nacimiento válida. |
| Contraseña | Si se modifica, debe cumplir los requisitos de seguridad establecidos. | La contraseña no cumple los requisitos. |

## 4.4. Formulario de publicaciones

| Campo | Regla de validación | Mensaje de error |
|---|---|---|
| Título | Obligatorio. No puede estar vacío. | El título es obligatorio. |
| Categoría | Es obligatorio seleccionar una categoría. | Selecciona una categoría. |
| Contenido | Obligatorio. No puede estar vacío. | El contenido de la publicación es obligatorio. |
| Imagen | Opcional. Si se adjunta, debe ser JPG o PNG y no superar los 5 MB. | El formato de imagen no es válido. / La imagen no puede superar los 5 MB. |
| Visibilidad | Se recoge la opción seleccionada en el formulario. | — |

---

# 5. Dificultades encontradas durante el Hito 2

La parte más complicada ha sido conseguir que todos los elementos funcionasen de manera coordinada.

No bastaba con que cada formulario recogiese los datos correctamente. Había que conectar el registro con el almacenamiento, el inicio de sesión con la identificación del usuario y esa sesión con el perfil y las publicaciones.

También ha sido necesario adaptar el JavaScript a la estructura HTML que ya existía, manteniendo el diseño original de CO-WORKERS y evitando modificar innecesariamente las páginas.

Otra parte que ha requerido especial atención ha sido la protección de las contraseñas mediante hash y salt, así como la relación entre usuarios y publicaciones para que cada persona pueda gestionar sus propios contenidos.

---

# 6. Estado general del proyecto

CO-WORKERS cuenta con una planificación inicial, un diseño de pantallas y un prototipo navegable desarrollados durante el Hito 1.

Durante el Hito 2 se han implementado y probado el registro, el inicio de sesión, la gestión de sesiones, el perfil de usuario y las operaciones CRUD de usuarios y publicaciones.

Los formularios están conectados con JavaScript y cuentan con validaciones para controlar los datos introducidos. El almacenamiento de usuarios y publicaciones se realiza mediante `localStorage`, mientras que la sesión activa se mantiene mediante `sessionStorage`.

Queda pendiente implementar la función de recordar los datos escritos previamente en los campos de los formularios mediante `localStorage`, para que cuando el usuario vuelva a acceder a ellos pueda recuperar la información introducida anteriormente.

Las funcionalidades restantes del backlog inicial, como la mensajería, las notificaciones y las interacciones, quedan fuera de las funcionalidades implementadas hasta el momento.

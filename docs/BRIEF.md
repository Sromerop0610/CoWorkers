# BRIEF.md — Co-Workers

## 1. Problema y oportunidad

Encontrar personas con las que colaborar, descubrir proyectos interesantes y recibir feedback útil son necesidades habituales de las personas que trabajan en ámbitos creativos y tecnológicos. Sin embargo, la información, las oportunidades de colaboración y las conversaciones pueden quedar dispersas entre diferentes plataformas, dificultando el contacto entre personas con intereses y habilidades complementarias.

El informe *The State of Creative Collaboration*, publicado por Filestage, recoge una encuesta a 366 profesionales del marketing y creativos. Entre sus resultados, señala que la espera del feedback es el principal problema que ralentiza el proceso creativo y que el proceso medio de revisión tarda ocho días y más de tres versiones en obtener aprobación.

Fuente: [Filestage — The State of Creative Collaboration](https://filestage.io/blog/creative-collaboration-report/).

Estos datos se refieren a procesos de revisión creativa y no demuestran por sí solos que falte una plataforma como Co-Workers. No obstante, respaldan la importancia de mejorar la comunicación y el intercambio de feedback durante la colaboración.

**Hipótesis del proyecto:** si las personas creativas disponen de una plataforma que reúna publicaciones, feedback, descubrimiento de proyectos y contacto con otros usuarios, podrán encontrar oportunidades de colaboración y compartir sus trabajos con menos fricción.

Co-Workers pretende ofrecer un espacio digital cercano, creativo y colaborativo que facilite estas interacciones sin convertirse en una red social centrada únicamente en publicar contenido.

## 2. Alcance del MVP

El objetivo general es desarrollar una aplicación web que facilite a las personas creativas compartir su trabajo, descubrir proyectos, recibir feedback y conectar con posibles colaboradores desde un mismo espacio.

### Funcionalidades incluidas

- **Registro e inicio de sesión:** permitir el acceso a la cuenta personal.
- **Feed:** reunir las publicaciones y ofrecer las pestañas «Para ti», «Proyectos» y «Descubrir».
- **Publicaciones:** permitir crear contenido, consultar su detalle e interactuar mediante feedback integrado en la propia publicación.
- **Proyectos:** permitir crear proyectos, explorar los disponibles y consultar sus detalles.
- **Perfiles:** mostrar información relevante de los usuarios y sus trabajos.
- **Mensajes:** permitir contactar con otros usuarios mediante conversaciones privadas.
- **Notificaciones:** informar de interacciones relevantes, como feedback recibido o actividad relacionada con el usuario.
- **Configuración:** ofrecer los ajustes básicos de la cuenta.

La creación de publicaciones y proyectos tendrá formularios propios, aunque se acceda a ellos desde la interfaz principal. «Para ti», «Proyectos» y «Descubrir» serán pestañas del feed, no páginas independientes duplicadas.

### Fuera del alcance inicial

Quedan fuera del MVP las videollamadas, los sistemas avanzados de contratación y pagos, las recomendaciones basadas en inteligencia artificial y las integraciones complejas con plataformas externas. Solo se incorporarán si queda tiempo después de completar las funciones esenciales.

## 3. Personas

El diseño se orientará a tres perfiles principales. Sus fichas individuales deberán mantenerse vinculadas a este documento para que las decisiones de diseño puedan contrastarse con las necesidades de cada persona.

Ficha 1: https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=38-140&t=i6gGraDX4StvAwP5-4
Ficha 2: https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=42-239&t=i6gGraDX4StvAwP5-4
Ficha 3: https://www.figma.com/board/nzcJnBkGPToyU8m5axGXfD/Desarrollo-interfaces-web?node-id=42-271&t=i6gGraDX4StvAwP5-4

## 4. Criterios de éxito

Los siguientes criterios permitirán comprobar si el MVP responde a las necesidades de las dos personas. Se evaluarán mediante pruebas de usabilidad con participantes que se ajusten a sus perfiles.

1. **Publicación y feedback:** al menos el 80 % de los participantes podrá crear una publicación de prueba y localizar el feedback asociado en menos de tres minutos, sin ayuda del moderador.

2. **Descubrimiento de proyectos:** al menos el 80 % de los participantes que podrá encontrar un proyecto que cumpla unas condiciones previamente indicadas y abrir su detalle en menos de dos minutos.

3. **Contacto entre usuarios:** al menos el 80 % de los participantes podrá localizar el perfil de otro usuario e iniciar una conversación de prueba en menos de dos minutos.

4. **Comprensión de la navegación:** al menos el 80 % de los participantes completará las tareas principales sin indicaciones del moderador y sin confundir las pestañas del feed con páginas independientes.

5. **Rendimiento y sostenibilidad:** las vistas principales respetarán el presupuesto de transferencia establecido en las restricciones. Se comprobará el peso real de los recursos descargados durante la carga inicial.

Para cada prueba se registrarán el porcentaje de tareas completadas, el tiempo empleado y los errores relevantes. Los resultados se documentarán para identificar mejoras antes de la entrega final. Los porcentajes representan objetivos del proyecto, no resultados ya obtenidos.

## 5. Restricciones del proyecto

### Tiempo y alcance

El desarrollo se realizará dentro del calendario académico y con los recursos disponibles. Se priorizarán las funcionalidades esenciales del MVP frente a las mejoras opcionales.

### Diseño y accesibilidad

La interfaz tendrá un estilo creativo, tecnológico, cercano y colaborativo. Los wireframes iniciales utilizarán blanco, negro y tonalidades grises. La navegación deberá ser clara, los formularios comprensibles y los controles utilizables desde distintos tamaños de pantalla.

### Privacidad y seguridad

Los datos personales y las conversaciones deberán estar protegidos. Se evitará exponer información privada y se limitará el acceso a las funcionalidades que requieran autenticación. Las pruebas iniciales utilizarán datos ficticios.

### Restricción ambiental: transferencia de datos

Se establece un presupuesto inicial de **500 KB de recursos transferidos durante la carga inicial de cada vista principal**, medido con la caché desactivada. Se contabilizarán los recursos necesarios para mostrar la vista, incluidos HTML, CSS, JavaScript, fuentes, imágenes y otras solicitudes iniciales.

Este valor es un objetivo propio del proyecto, no un límite oficial del W3C. Busca reducir el consumo de datos y facilitar el acceso a personas con conexiones lentas o dispositivos modestos.

Para cumplirlo se priorizarán imágenes comprimidas y adaptadas a su tamaño de visualización, carga diferida de contenido no esencial, dependencias ligeras y eliminación de recursos innecesarios. El presupuesto se revisará durante el desarrollo con las herramientas de red del navegador.

La decisión se inspira en las [Web Sustainability Guidelines del W3C](https://www.w3.org/TR/web-sustainability-guidelines/), especialmente en el criterio 2.4, que recomienda recorridos eficientes, navegación clara y mecanismos ligeros para descubrir contenido. La optimización de la transferencia complementa este enfoque de sostenibilidad.

### Restricciones técnicas

El proyecto utilizará las tecnologías definidas en la planificación académica y las herramientas disponibles para el equipo. Se evitarán integraciones externas que aumenten innecesariamente la complejidad, el coste o el consumo de recursos.


---

**Estado:** brief inicial pendiente de verificar las fichas de personas, validar la hipótesis con usuarios y comprobar los criterios de éxito mediante pruebas.

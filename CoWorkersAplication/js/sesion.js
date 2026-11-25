import {
    obtenerPorId,
    eliminar,
    obtenerTodasLasPublicaciones,
    eliminarPublicacion
} from "./almacen.js";

const CLAVE_SESION = "usuarioActivo";

// Obtener el usuario que tiene la sesión iniciada.
export function obtenerUsuarioActivo() {
    const datos = sessionStorage.getItem(CLAVE_SESION);

    if (!datos) {
        return null;
    }

    return JSON.parse(datos);
}

// Comprobar si hay una sesión iniciada.
export function haySesionIniciada() {
    return obtenerUsuarioActivo() !== null;
}

// Cerrar la sesión actual.
export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}

// ------------------------------------
// GESTIÓN DEL PERFIL
// ------------------------------------

const botonEliminar = document.querySelector("#delete-account-button");

if (botonEliminar) {
    const usuarioActivo = obtenerUsuarioActivo();

    if (!usuarioActivo) {
        window.location.href = "login.html";
    } else {
        const usuario = obtenerPorId(usuarioActivo.id);

        if (!usuario) {
            cerrarSesion();
            window.location.href = "login.html";
        } else {
            const nombreLateral = document.querySelector("#sidebar-username");
            const nombrePerfil = document.querySelector("#profile-username");
            const correoPerfil = document.querySelector("#profile-email");
            const telefonoPerfil = document.querySelector("#profile-phone");
            const correoDetalle = document.querySelector("#profile-email-detail");
            const telefonoDetalle = document.querySelector("#profile-phone-detail");
            const fechaNacimiento = document.querySelector("#profile-birthdate");

            function mostrarDatos() {
                const telefono = usuario.phone
                    ? `${usuario.phonePrefix || ""} ${usuario.phone}`
                    : "No indicado";

                nombreLateral.textContent = usuario.username;
                nombrePerfil.textContent = usuario.username;
                correoPerfil.textContent = usuario.email;
                telefonoPerfil.textContent = telefono;
                correoDetalle.textContent = usuario.email;
                telefonoDetalle.textContent = telefono;
                fechaNacimiento.textContent = usuario.birthdate;
            }

            mostrarDatos();

            // ------------------------------------
            // MOSTRAR Y GESTIONAR PUBLICACIONES
            // ------------------------------------

            const contenedorPublicaciones = document.querySelector("#user-publications");
            const mensajeSinPublicaciones = document.querySelector("#no-publications-message");

            function mostrarPublicaciones() {
                const publicaciones = obtenerTodasLasPublicaciones();

                const publicacionesUsuario = publicaciones.filter(
                    publicacion => publicacion.usuarioId === usuario.id
                );

                contenedorPublicaciones.replaceChildren();

                if (publicacionesUsuario.length === 0) {
                    mensajeSinPublicaciones.hidden = false;
                    contenedorPublicaciones.appendChild(mensajeSinPublicaciones);
                    return;
                }

                mensajeSinPublicaciones.hidden = true;

                publicacionesUsuario.forEach(publicacion => {
                    const tarjeta = document.createElement("article");
                    tarjeta.classList.add("publication-card");

                    if (publicacion.image) {
                        const figura = document.createElement("figure");
                        figura.classList.add("publication-image");

                        const imagen = document.createElement("img");
                        imagen.src = publicacion.image;
                        imagen.alt = "Imagen de la publicación";

                        figura.appendChild(imagen);
                        tarjeta.appendChild(figura);
                    }

                    const encabezado = document.createElement("header");
                    encabezado.classList.add("publication-content");

                    const titulo = document.createElement("h3");
                    titulo.textContent = publicacion.title;

                    const meta = document.createElement("p");
                    meta.classList.add("publication-meta");

                    const fecha = new Date(publicacion.fechaCreacion);
                    meta.textContent =
                        `${publicacion.category} · ${fecha.toLocaleDateString("es-ES")}`;

                    encabezado.append(titulo, meta);

                    const contenido = document.createElement("p");
                    contenido.textContent = publicacion.content;

                    // Botón para editar.
                    const botonEditar = document.createElement("button");
                    botonEditar.type = "button";
                    botonEditar.textContent = "Editar";

                    botonEditar.addEventListener("click", () => {
                        const sesionActual = obtenerUsuarioActivo();

                        if (!sesionActual || sesionActual.id !== usuario.id) {
                            cerrarSesion();
                            window.location.href = "login.html";
                            return;
                        }

                        window.location.href =
                            `newPost.html?id=${encodeURIComponent(publicacion.id)}`;
                    });

                    // Botón para eliminar.
                    const botonBorrar = document.createElement("button");
                    botonBorrar.type = "button";
                    botonBorrar.textContent = "Eliminar";

                    botonBorrar.addEventListener("click", () => {
                        const confirmar = window.confirm(
                            "¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer."
                        );

                        if (!confirmar) {
                            return;
                        }

                        const sesionActual = obtenerUsuarioActivo();

                        if (!sesionActual || sesionActual.id !== usuario.id) {
                            cerrarSesion();
                            window.location.href = "login.html";
                            return;
                        }

                        const publicacionActual = obtenerTodasLasPublicaciones().find(
                            elemento => elemento.id === publicacion.id
                        );

                        if (
                            !publicacionActual ||
                            publicacionActual.usuarioId !== usuario.id
                        ) {
                            alert("No puedes eliminar esta publicación.");
                            mostrarPublicaciones();
                            return;
                        }

                        const eliminada = eliminarPublicacion(publicacion.id);

                        if (eliminada) {
                            mostrarPublicaciones();
                        } else {
                            alert("No se ha podido eliminar la publicación.");
                        }
                    });

                    const acciones = document.createElement("footer");
                    acciones.classList.add("publication-actions");
                    acciones.append(botonEditar, botonBorrar);

                    tarjeta.append(encabezado, contenido, acciones);
                    contenedorPublicaciones.appendChild(tarjeta);
                });
            }

            if (contenedorPublicaciones && mensajeSinPublicaciones) {
                mostrarPublicaciones();
            }

            // ------------------------------------
            // ELIMINAR CUENTA
            // ------------------------------------

            botonEliminar.addEventListener("click", () => {
                const confirmar = window.confirm(
                    "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
                );

                if (!confirmar) {
                    return;
                }

                const eliminado = eliminar(usuario.id);

                if (eliminado) {
                    cerrarSesion();
                    window.location.href = "login.html";
                }
            });
        }
    }
}

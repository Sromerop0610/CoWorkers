import {
    obtenerPorId,
    eliminar
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


            // Mostrar los datos del usuario.
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


            // Eliminar la cuenta.
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

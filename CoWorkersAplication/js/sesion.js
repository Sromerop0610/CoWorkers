
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

const COLECCION_USUARIOS = "usuarios";


// Obtener todos los usuarios guardados.
export function obtenerTodos() {

    const datos = localStorage.getItem(COLECCION_USUARIOS);

    if (!datos) {
        return [];
    }

    return JSON.parse(datos);
}


// Obtener un usuario por su identificador.
export function obtenerPorId(id) {

    const usuarios = obtenerTodos();

    return usuarios.find(usuario => usuario.id === id) || null;
}


// Registrar un usuario nuevo.
export function crear(dato) {

    const usuarios = obtenerTodos();

    const siguienteId = usuarios.reduce((mayorId, usuario) => {
        return Math.max(mayorId, usuario.id);
    }, 0) + 1;

    const nuevoUsuario = {
        id: siguienteId,
        ...dato
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        COLECCION_USUARIOS,
        JSON.stringify(usuarios)
    );

    return nuevoUsuario;
}

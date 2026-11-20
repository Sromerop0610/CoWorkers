
import { usuarios, publicaciones } from "./datos.js";
import { mostrarPublicaciones, mostrarDetallePublicacion } from "./ui.js";

const pagina = window.location.pathname;

if (pagina.endsWith("post.html")) {
    cargarDetallePublicacion();
} else {
    mostrarPublicaciones(publicaciones, usuarios);
}

function cargarDetallePublicacion() {
    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));

    const publicacion = publicaciones.find(post => post.id === id);

    if (!publicacion) {
        mostrarError();
        return;
    }

    const usuario = usuarios.find(user => user.id === publicacion.usuarioId);

    if (!usuario) {
        mostrarError();
        return;
    }

    mostrarDetallePublicacion(publicacion, usuario);
}

function mostrarError() {
    const titulo = document.querySelector("#post-title");
    const contenido = document.querySelector("#post-detail .post-description p");

    if (titulo) {
        titulo.textContent = "Publicación no encontrada";
    }

    if (contenido) {
        contenido.textContent = "La publicación que buscas no existe.";
    }
}

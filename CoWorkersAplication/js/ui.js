
function buscarUsuario(usuarioId, usuarios) {
    return usuarios.find(usuario => usuario.id === usuarioId);
}

function formatearFecha(fecha) {
    return new Date(fecha + "T00:00:00").toLocaleDateString("es-ES");
}

function crearTarjetaPublicacion(publicacion, usuario) {
    const article = document.createElement("article");
    article.classList.add("post");

    const titulo = document.createElement("h3");
    titulo.textContent = publicacion.titulo;

    const header = document.createElement("header");
    header.classList.add("post-user");

    const avatar = document.createElement("span");
    avatar.classList.add("user-image");
    avatar.textContent = usuario.avatar;

    const nombre = document.createElement("span");
    nombre.textContent = usuario.nombre;

    const profesion = document.createElement("p");
    profesion.textContent = usuario.profesion;

    header.append(avatar, nombre, profesion);

    const imagen = document.createElement("figure");
    imagen.classList.add("post-image");

    if (publicacion.imagen) {
        const img = document.createElement("img");
        img.src = publicacion.imagen;
        img.alt = publicacion.titulo;
        imagen.appendChild(img);
    } else {
        imagen.hidden = true;
    }

    const descripcion = document.createElement("section");
    descripcion.classList.add("post-description");

    const contenido = document.createElement("p");
    contenido.textContent = publicacion.contenido;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoría: " + publicacion.categoria;

    const fecha = document.createElement("time");
    fecha.textContent = formatearFecha(publicacion.fecha);
    fecha.dateTime = publicacion.fecha;

    descripcion.append(contenido, categoria, fecha);

    const footer = document.createElement("footer");
    footer.classList.add("post-actions");

    const likes = document.createElement("button");
    likes.type = "button";
    likes.textContent = "♡ " + publicacion.likes + " Likes";

    const enlace = document.createElement("a");
    enlace.href = "post.html?id=" + publicacion.id;
    enlace.textContent = "Ver publicación";

    footer.append(likes, enlace);

    article.append(titulo, header, imagen, descripcion, footer);

    return article;
}

export function mostrarPublicaciones(publicaciones, usuarios) {
    const contenedor = document.querySelector("#posts-container");

    if (!contenedor) {
        return;
    }

    publicaciones.forEach(publicacion => {
        const usuario = buscarUsuario(publicacion.usuarioId, usuarios);

        if (usuario) {
            const tarjeta = crearTarjetaPublicacion(publicacion, usuario);
            contenedor.appendChild(tarjeta);
        }
    });
}

export function mostrarDetallePublicacion(publicacion, usuario) {
    const titulo = document.querySelector("#post-title");
    const nombre = document.querySelector(".post-username");
    const avatar = document.querySelector("#post-detail .user-image");
    const contenido = document.querySelector("#post-detail .post-description p");
    const imagen = document.querySelector("#post-detail .post-image");
    const fecha = document.querySelector("#post-detail .post-time");
    const likes = document.querySelector("#post-detail .post-actions button");

    titulo.textContent = publicacion.titulo;
    nombre.textContent = usuario.nombre + " · " + usuario.profesion;
    avatar.textContent = usuario.avatar;
    contenido.textContent = publicacion.contenido;
    fecha.textContent = formatearFecha(publicacion.fecha);
    fecha.dateTime = publicacion.fecha;
    likes.textContent = "♡ " + publicacion.likes + " Likes";

    if (publicacion.imagen) {
        const img = document.createElement("img");
        img.src = publicacion.imagen;
        img.alt = publicacion.titulo;

        imagen.replaceChildren(img);
        imagen.hidden = false;
    } else {
        imagen.hidden = true;
    }
}

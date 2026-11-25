import {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    crearPublicacion
} from "./almacen.js";

import {
    obtenerUsuarioActivo,
    cerrarSesion
} from "./sesion.js";


// ------------------------------------
// FORMULARIO DE REGISTRO Y EDICIÓN
// ------------------------------------

const formularioRegistro = document.querySelector("#register-form");

if (formularioRegistro) {

    const campoNombre = document.querySelector("#username");
    const campoCorreo = document.querySelector("#email");
    const campoPrefijo = document.querySelector("#phone-prefix");
    const campoTelefono = document.querySelector("#phone");
    const campoPassword = document.querySelector("#password");
    const campoConfirmacion = document.querySelector("#confirm-password");
    const campoFecha = document.querySelector("#birthdate");
    const campoCondiciones = document.querySelector("#terms");

    const usuarioActivo = obtenerUsuarioActivo();
    let usuarioEnEdicion = usuarioActivo
        ? obtenerPorId(usuarioActivo.id)
        : null;

    // Si la sesión apunta a un usuario que ya no existe, se cierra.
    if (usuarioActivo && !usuarioEnEdicion) {
        cerrarSesion();
    }

    const modoEdicion = usuarioEnEdicion !== null;

    const campoPasswordContenedor = document.querySelector("#password-field");
    const campoConfirmacionContenedor = document.querySelector("#confirm-password-field");
    const campoCondicionesContenedor = document.querySelector("#terms-field");

    const titulo = document.querySelector("#register-title");
    const descripcion = document.querySelector("#register-description");
    const leyenda = document.querySelector("#register-legend");
    const botonEnviar = document.querySelector("#register-submit");
    const pieFormulario = document.querySelector("#register-footer");

    // Configurar el formulario según el modo.
    if (modoEdicion) {

        document.title = "Editar perfil | CO-WORKERS";

        titulo.textContent = "Editar perfil";
        descripcion.textContent = "Modifica los datos de tu cuenta.";
        leyenda.textContent = "Datos personales";
        botonEnviar.textContent = "Guardar cambios";

        campoNombre.value = usuarioEnEdicion.username;
        campoCorreo.value = usuarioEnEdicion.email;
        campoPrefijo.value = usuarioEnEdicion.phonePrefix || "+34";
        campoTelefono.value = usuarioEnEdicion.phone || "";
        campoFecha.value = usuarioEnEdicion.birthdate;

        campoPasswordContenedor.hidden = true;
        campoConfirmacionContenedor.hidden = true;
        campoCondicionesContenedor.hidden = true;

        campoPassword.required = false;
        campoConfirmacion.required = false;
        campoCondiciones.required = false;

        pieFormulario.hidden = true;
    }


    const camposRegistro = [
        campoNombre,
        campoCorreo,
        campoTelefono,
        campoFecha
    ];

    if (!modoEdicion) {
        camposRegistro.push(
            campoPassword,
            campoConfirmacion,
            campoCondiciones
        );
    }

    const camposTocados = new Set();


    // Fecha de nacimiento: no puede ser futura.
    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    campoFecha.max = `${anio}-${mes}-${dia}`;


    // Preparar la contraseña para no guardarla en texto plano.
    async function generarHashContrasena(contrasena) {

        const sal = crypto.getRandomValues(new Uint8Array(16));

        const clave = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(contrasena),
            "PBKDF2",
            false,
            ["deriveBits"]
        );

        const resultado = await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt: sal,
                iterations: 100000,
                hash: "SHA-256"
            },
            clave,
            256
        );

        return {
            passwordSalt: btoa(String.fromCharCode(...sal)),
            passwordHash: btoa(
                String.fromCharCode(...new Uint8Array(resultado))
            )
        };
    }


    // Validar los campos del formulario.
    function validarCampoRegistro(campo) {

        const valor = campo.type === "checkbox"
            ? campo.checked
            : campo.value.trim();

        if (campo.required && !valor) {
            return "Este campo es obligatorio.";
        }

        // Nombre de usuario.
        if (campo.id === "username") {

            if (valor.length < campo.minLength) {
                return `Debe tener al menos ${campo.minLength} caracteres.`;
            }

            if (valor.length > campo.maxLength) {
                return `No puede superar los ${campo.maxLength} caracteres.`;
            }
        }

        // Correo electrónico.
        if (campo.id === "email" && valor) {

            const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formatoEmail.test(valor)) {
                return "Introduce un correo electrónico válido.";
            }
        }

        // Teléfono.
        if (campo.id === "phone" && valor) {

            const formatoTelefono = new RegExp(campo.pattern);

            if (!formatoTelefono.test(valor)) {
                return "El teléfono debe tener exactamente 9 números.";
            }
        }

        // Contraseña.
        if (campo.id === "password" && valor) {

            if (valor.length < campo.minLength) {
                return `La contraseña debe tener al menos ${campo.minLength} caracteres.`;
            }

            if (!/[A-Z]/.test(valor)) {
                return "La contraseña debe contener al menos una mayúscula.";
            }

            if (!/[0-9]/.test(valor)) {
                return "La contraseña debe contener al menos un número.";
            }
        }

        // Confirmación de contraseña.
        if (campo.id === "confirm-password" && valor) {

            const password = campoPassword.value;

            if (valor !== password) {
                return "Las contraseñas no coinciden.";
            }
        }

        // Fecha de nacimiento.
        if (campo.id === "birthdate" && valor) {

            const [anioNacimiento, mesNacimiento, diaNacimiento] =
                valor.split("-").map(Number);

            let edad = hoy.getFullYear() - anioNacimiento;

            if (
                hoy.getMonth() + 1 < mesNacimiento ||
                (
                    hoy.getMonth() + 1 === mesNacimiento &&
                    hoy.getDate() < diaNacimiento
                )
            ) {
                edad--;
            }

            if (edad < 16) {
                return "Debes tener al menos 16 años.";
            }
        }

        // Condiciones de uso.
        if (campo.id === "terms" && !valor) {
            return "Debes aceptar las condiciones de uso.";
        }

        return "";
    }


    // Mostrar los errores de cada campo.
    function mostrarErrorRegistro(campo) {

        const mensaje = validarCampoRegistro(campo);
        const elementoError = document.querySelector(`#${campo.id}-error`);

        elementoError.textContent = mensaje;

        campo.setAttribute("aria-invalid", mensaje ? "true" : "false");

        return mensaje;
    }


    // Validar al salir de cada campo.
    camposRegistro.forEach(campo => {

        campo.addEventListener("blur", () => {

            camposTocados.add(campo);
            mostrarErrorRegistro(campo);
        });

        // Volver a validar mientras se escribe.
        campo.addEventListener("input", () => {

            if (camposTocados.has(campo)) {
                mostrarErrorRegistro(campo);
            }

            // Si cambia la contraseña, comprobar su confirmación.
            if (campo.id === "password") {

                if (camposTocados.has(campoConfirmacion)) {
                    mostrarErrorRegistro(campoConfirmacion);
                }
            }
        });

        campo.addEventListener("change", () => {

            if (camposTocados.has(campo)) {
                mostrarErrorRegistro(campo);
            }
        });
    });


    // Validar y guardar al enviar el formulario.
    formularioRegistro.addEventListener("submit", async evento => {

        evento.preventDefault();

        let primerCampoIncorrecto = null;

        // Validar todos los campos.
        camposRegistro.forEach(campo => {

            camposTocados.add(campo);

            const mensaje = mostrarErrorRegistro(campo);

            if (mensaje && !primerCampoIncorrecto) {
                primerCampoIncorrecto = campo;
            }
        });

        if (primerCampoIncorrecto) {
            primerCampoIncorrecto.focus();
            return;
        }


        // Recoger los datos del formulario.
        const username = campoNombre.value.trim();
        const email = campoCorreo.value.trim().toLowerCase();
        const phonePrefix = campoPrefijo.value;
        const phone = campoTelefono.value.trim();
        const birthdate = campoFecha.value;


        // Comprobar que el nombre y el correo no estén ocupados.
        const usuarios = obtenerTodos();

        const usuarioExiste = usuarios.some(usuario =>
            usuario.id !== (modoEdicion ? usuarioEnEdicion.id : null) &&
            usuario.username.toLowerCase() === username.toLowerCase()
        );

        const correoExiste = usuarios.some(usuario =>
            usuario.id !== (modoEdicion ? usuarioEnEdicion.id : null) &&
            usuario.email.toLowerCase() === email
        );

        if (usuarioExiste) {

            campoNombre.focus();

            document.querySelector("#username-error").textContent =
                "Este nombre de usuario ya está registrado.";

            campoNombre.setAttribute("aria-invalid", "true");

            return;
        }

        if (correoExiste) {

            campoCorreo.focus();

            document.querySelector("#email-error").textContent =
                "Este correo electrónico ya está registrado.";

            campoCorreo.setAttribute("aria-invalid", "true");

            return;
        }


        // MODO EDICIÓN: actualizar el usuario existente.
        if (modoEdicion) {

            const datosActualizados = {
                username,
                email,
                phonePrefix,
                phone,
                birthdate
            };

            const usuarioActualizado = actualizar(
                usuarioEnEdicion.id,
                datosActualizados
            );

            if (!usuarioActualizado) {
                alert("No se han podido guardar los cambios.");
                return;
            }

            // Actualizar los datos de la sesión.
            sessionStorage.setItem(
                "usuarioActivo",
                JSON.stringify({
                    id: usuarioActualizado.id,
                    username: usuarioActualizado.username,
                    email: usuarioActualizado.email
                })
            );

            alert("Los datos de tu perfil se han actualizado correctamente.");

            window.location.href = "profile.html";

            return;
        }


        // MODO REGISTRO: preparar y guardar la contraseña.
        try {

            const password = campoPassword.value;
            const datosContrasena = await generarHashContrasena(password);

            const nuevoUsuario = {
                username,
                email,
                phonePrefix,
                phone,
                passwordHash: datosContrasena.passwordHash,
                passwordSalt: datosContrasena.passwordSalt,
                birthdate
            };

            crear(nuevoUsuario);

            // Mostrar confirmación del registro.
            let mensajeExito = document.querySelector("#register-success");

            if (!mensajeExito) {

                mensajeExito = document.createElement("p");
                mensajeExito.id = "register-success";
                mensajeExito.setAttribute("role", "status");

                formularioRegistro.insertAdjacentElement(
                    "afterend",
                    mensajeExito
                );
            }

            mensajeExito.textContent = "Cuenta creada correctamente.";

        } catch (error) {

            document.querySelector("#password-error").textContent =
                "No se ha podido preparar la contraseña. Inténtalo de nuevo.";

            campoPassword.setAttribute("aria-invalid", "true");
            campoPassword.focus();
        }
    });
}


// ------------------------------------
// FORMULARIO DE PUBLICACIONES
// ------------------------------------

const formularioPublicacion = document.querySelector("#publication-form");

if (formularioPublicacion) {

    // Comprobar que hay un usuario con sesión iniciada.
    const usuarioActivoPublicacion = obtenerUsuarioActivo();

    const usuarioPublicacion = usuarioActivoPublicacion
        ? obtenerPorId(usuarioActivoPublicacion.id)
        : null;

    if (!usuarioPublicacion) {

        cerrarSesion();
        window.location.href = "login.html";

    } else {

        const titulo = document.querySelector("#publication-title");
        const categoria = document.querySelector("#publication-category");
        const contenido = document.querySelector("#publication-content");
        const imagen = document.querySelector("#publication-image");
        const visibilidad = formularioPublicacion.querySelector(
            '[name="visibility"], #visibility'
        );

        const camposPublicacion = [
            titulo,
            categoria,
            contenido
        ];

        const camposTocados = new Set();


        // Contador de caracteres de la descripción.
        const contador = document.querySelector("#publication-content-counter");

        function actualizarContador() {

            const cantidad = contenido.value.length;

            contador.textContent =
                `${cantidad} / ${contenido.maxLength} caracteres (mínimo ${contenido.minLength})`;
        }

        contenido.addEventListener("input", actualizarContador);

        actualizarContador();


        // Validar los campos de la publicación.
        function validarCampoPublicacion(campo) {

            const valor = campo.value.trim();

            if (campo.required && !valor) {
                return "Este campo es obligatorio.";
            }

            if (valor && campo.minLength > 0 && valor.length < campo.minLength) {
                return `Debe tener al menos ${campo.minLength} caracteres.`;
            }

            if (campo.maxLength > 0 && valor.length > campo.maxLength) {
                return `No puede superar los ${campo.maxLength} caracteres.`;
            }

            return "";
        }


        // Mostrar errores de la publicación.
        function mostrarErrorPublicacion(campo) {

            const mensaje = validarCampoPublicacion(campo);
            const elementoError = document.querySelector(`#${campo.id}-error`);

            elementoError.textContent = mensaje;

            campo.setAttribute("aria-invalid", mensaje ? "true" : "false");

            return mensaje;
        }


        // Validar los campos al salir de ellos.
        camposPublicacion.forEach(campo => {

            campo.addEventListener("blur", () => {

                camposTocados.add(campo);
                mostrarErrorPublicacion(campo);
            });

            // Volver a validar mientras se escribe.
            campo.addEventListener("input", () => {

                if (camposTocados.has(campo)) {
                    mostrarErrorPublicacion(campo);
                }
            });

            campo.addEventListener("change", () => {

                if (camposTocados.has(campo)) {
                    mostrarErrorPublicacion(campo);
                }
            });
        });


        // Vista previa de la imagen.
        let urlImagen = null;

        const vistaPrevia = document.createElement("img");

        vistaPrevia.alt = "Vista previa de la imagen seleccionada";
        vistaPrevia.hidden = true;
        vistaPrevia.classList.add("image-preview");

        imagen.insertAdjacentElement("afterend", vistaPrevia);


        // Validar la imagen seleccionada.
        function validarImagen() {

            const archivo = imagen.files[0];
            const elementoError = document.querySelector("#publication-image-error");

            if (urlImagen) {
                URL.revokeObjectURL(urlImagen);
                urlImagen = null;
            }

            vistaPrevia.hidden = true;
            vistaPrevia.removeAttribute("src");

            if (!archivo) {
                elementoError.textContent = "";
                imagen.setAttribute("aria-invalid", "false");
                return "";
            }

            // Comprobar el formato.
            const formatosPermitidos = ["image/jpeg", "image/png"];

            if (!formatosPermitidos.includes(archivo.type)) {
                const mensaje = "La imagen debe estar en formato JPG o PNG.";

                elementoError.textContent = mensaje;
                imagen.setAttribute("aria-invalid", "true");

                return mensaje;
            }

            // Comprobar el tamaño: máximo 5 MB.
            const tamanoMaximo = 5 * 1024 * 1024;

            if (archivo.size > tamanoMaximo) {
                const mensaje = "La imagen no puede superar los 5 MB.";

                elementoError.textContent = mensaje;
                imagen.setAttribute("aria-invalid", "true");

                return mensaje;
            }

            // Crear la vista previa.
            urlImagen = URL.createObjectURL(archivo);

            vistaPrevia.src = urlImagen;
            vistaPrevia.hidden = false;

            elementoError.textContent = "";
            imagen.setAttribute("aria-invalid", "false");

            return "";
        }


        imagen.addEventListener("change", () => {
            validarImagen();
        });


        // Convertir la imagen a Base64 para poder guardarla.
        function convertirImagenBase64(archivo) {

            return new Promise((resolve, reject) => {

                const lector = new FileReader();

                lector.onload = () => resolve(lector.result);
                lector.onerror = () => reject(lector.error);

                lector.readAsDataURL(archivo);
            });
        }


        // Validar y guardar la publicación.
        formularioPublicacion.addEventListener("submit", async evento => {

            evento.preventDefault();

            let primerCampoIncorrecto = null;

            // Validar todos los campos.
            camposPublicacion.forEach(campo => {

                camposTocados.add(campo);

                const mensaje = mostrarErrorPublicacion(campo);

                if (mensaje && !primerCampoIncorrecto) {
                    primerCampoIncorrecto = campo;
                }
            });

            // Comprobar también la imagen, si se ha seleccionado.
            const errorImagen = validarImagen();

            if (errorImagen && !primerCampoIncorrecto) {
                primerCampoIncorrecto = imagen;
            }

            // Enfocar el primer campo incorrecto.
            if (primerCampoIncorrecto) {
                primerCampoIncorrecto.focus();
                return;
            }


            // Comprobar que la sesión sigue correspondiendo al usuario.
            const sesionActual = obtenerUsuarioActivo();

            if (!sesionActual || sesionActual.id !== usuarioPublicacion.id) {
                cerrarSesion();
                window.location.href = "login.html";
                return;
            }


            try {

                // Convertir la imagen, si se ha seleccionado.
                let imagenBase64 = null;

                if (imagen.files[0]) {
                    imagenBase64 = await convertirImagenBase64(imagen.files[0]);
                }

                // Preparar los datos de la publicación.
                const nuevaPublicacion = {
                    usuarioId: usuarioPublicacion.id,
                    title: titulo.value.trim(),
                    category: categoria.value,
                    content: contenido.value.trim(),
                    image: imagenBase64,
                    visibility: visibilidad ? visibilidad.value : "",
                    fechaCreacion: new Date().toISOString()
                };

                // Guardar la publicación.
                crearPublicacion(nuevaPublicacion);

                alert("¡Tu publicación se ha creado correctamente!");

                formularioPublicacion.reset();

                actualizarContador();
                validarImagen();

            } catch (error) {

                alert("No se ha podido guardar la publicación. Inténtalo de nuevo.");
            }
        });
    }
}

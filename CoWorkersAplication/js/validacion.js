
// FORMULARIO DE REGISTRO

const formularioRegistro = document.querySelector("#register-form");

if (formularioRegistro) {

    const camposRegistro = [
        document.querySelector("#username"),
        document.querySelector("#email"),
        document.querySelector("#phone"),
        document.querySelector("#password"),
        document.querySelector("#confirm-password"),
        document.querySelector("#birthdate"),
        document.querySelector("#terms")
    ];

    const camposTocados = new Set();

    // Fecha de nacimiento: no puede ser futura.
    const fechaNacimiento = document.querySelector("#birthdate");
    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    fechaNacimiento.max = `${anio}-${mes}-${dia}`;

    // Validar campos del registro.
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

            const password = document.querySelector("#password").value;

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

    // Mostrar errores del registro.
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

                const confirmacion = document.querySelector("#confirm-password");

                if (camposTocados.has(confirmacion)) {
                    mostrarErrorRegistro(confirmacion);
                }
            }

        });

        campo.addEventListener("change", () => {

            if (camposTocados.has(campo)) {
                mostrarErrorRegistro(campo);
            }

        });

    });

    // Validar todos los campos al enviar.
    formularioRegistro.addEventListener("submit", evento => {

        evento.preventDefault();

        let primerCampoIncorrecto = null;

        camposRegistro.forEach(campo => {

            camposTocados.add(campo);

            const mensaje = mostrarErrorRegistro(campo);

            if (mensaje && !primerCampoIncorrecto) {
                primerCampoIncorrecto = campo;
            }

        });

        if (primerCampoIncorrecto) {
            primerCampoIncorrecto.focus();
        }

    });

}


// FORMULARIO DE PUBLICACIONES

const formularioPublicacion = document.querySelector("#publication-form");

if (formularioPublicacion) {

    const titulo = document.querySelector("#publication-title");
    const categoria = document.querySelector("#publication-category");
    const contenido = document.querySelector("#publication-content");
    const imagen = document.querySelector("#publication-image");

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


    // Validar todos los campos al enviar.
    formularioPublicacion.addEventListener("submit", evento => {

        evento.preventDefault();

        let primerCampoIncorrecto = null;

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
        }

    });

}

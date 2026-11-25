const formulario = document.querySelector("#register-form");

const campos = [
    document.querySelector("#username"),
    document.querySelector("#email"),
    document.querySelector("#phone"),
    document.querySelector("#password"),
    document.querySelector("#confirm-password"),
    document.querySelector("#birthdate"),
    document.querySelector("#terms")
];

const camposTocados = new Set();

// Fecha
const fechaNacimiento = document.querySelector("#birthdate");
const hoy = new Date();

const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");

fechaNacimiento.max = `${anio}-${mes}-${dia}`;


// Validacion y mensaje de error
function validarCampo(campo) {

    const valor = campo.type === "checkbox"
        ? campo.checked
        : campo.value.trim();

    // Comprobar campos obligatorios.
    if (campo.required && !valor) {
        return "Este campo es obligatorio.";
    }

    // Comprobar el nombre de usuario.
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

    // Comprobar el teléfono.
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

    // Comprobar que las contraseñas coinciden.
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

    // Comprobar las condiciones de uso.
    if (campo.id === "terms" && !valor) {
        return "Debes aceptar las condiciones de uso.";
    }

    return "";
}


// Mostrar o quitar el error de un campo.
function mostrarError(campo) {

    const mensaje = validarCampo(campo);
    const elementoError = document.querySelector(`#${campo.id}-error`);

    elementoError.textContent = mensaje;

    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");

    return mensaje;
}


// Validar un campo al salir de él.
campos.forEach(campo => {

    campo.addEventListener("blur", () => {

        camposTocados.add(campo);
        mostrarError(campo);

    });

    // Volver a validar mientras se escribe si ya se ha tocado.
    campo.addEventListener("input", () => {

        if (camposTocados.has(campo)) {
            mostrarError(campo);
        }

        // Si cambia la contraseña, volver a comprobar su confirmación.
        if (campo.id === "password") {

            const confirmacion = document.querySelector("#confirm-password");

            if (camposTocados.has(confirmacion)) {
                mostrarError(confirmacion);
            }
        }

    });

    campo.addEventListener("change", () => {

        if (camposTocados.has(campo)) {
            mostrarError(campo);
        }

    });

});


// Validar todos los campos al enviar el formulario.
formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    let primerCampoIncorrecto = null;

    campos.forEach(campo => {

        camposTocados.add(campo);

        const mensaje = mostrarError(campo);

        if (mensaje && !primerCampoIncorrecto) {
            primerCampoIncorrecto = campo;
        }

    });

    // Enfocar el primer campo que tenga un error.
    if (primerCampoIncorrecto) {
        primerCampoIncorrecto.focus();
    }

});

const formulario = document.querySelector("#login-form");

const campoIdentificador = document.querySelector("#login-identifier");
const campoContrasena = document.querySelector("#login-password");
const mostrarContrasena = document.querySelector("#show-password");

const errorIdentificador = document.querySelector("#identifier-error");
const errorContrasena = document.querySelector("#login-password-error");
const errorLogin = document.querySelector("#login-error");


// Convertir un texto Base64 en bytes.
function base64ABytes(texto) {
    return Uint8Array.from(atob(texto), caracter => caracter.charCodeAt(0));
}


// Convertir bytes a texto Base64.
function bytesABase64(bytes) {
    return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}


// Generar el hash utilizando el salt que ya tiene el usuario.
async function generarHashContrasena(contrasena, salt) {

    const datosContrasena = new TextEncoder().encode(contrasena);
    const saltBytes = base64ABytes(salt);

    const clave = await crypto.subtle.importKey(
        "raw",
        datosContrasena,
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBytes,
            iterations: 100000,
            hash: "SHA-256"
        },
        clave,
        256
    );

    return bytesABase64(hash);
}


// Mostrar u ocultar la contraseña.
mostrarContrasena.addEventListener("change", () => {
    campoContrasena.type = mostrarContrasena.checked
        ? "text"
        : "password";
});


// Procesar el inicio de sesión.
formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    errorIdentificador.textContent = "";
    errorContrasena.textContent = "";
    errorLogin.textContent = "";

    const identificador = campoIdentificador.value.trim().toLowerCase();
    const contrasena = campoContrasena.value;

    let formularioValido = true;

    if (identificador === "") {
        errorIdentificador.textContent = "Introduce tu usuario o correo electrónico.";
        formularioValido = false;
    }

    if (contrasena === "") {
        errorContrasena.textContent = "Introduce tu contraseña.";
        formularioValido = false;
    }

    if (!formularioValido) {
        return;
    }

    try {

        const datosGuardados = localStorage.getItem("usuarios");
        const usuarios = datosGuardados ? JSON.parse(datosGuardados) : [];

        const usuario = usuarios.find(usuario =>
            usuario.username.toLowerCase() === identificador ||
            usuario.email.toLowerCase() === identificador
        );

        if (!usuario) {
            errorLogin.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        const hashIntroducido = await generarHashContrasena(
            contrasena,
            usuario.passwordSalt
        );

        if (hashIntroducido !== usuario.passwordHash) {
            errorLogin.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        const usuarioActivo = {
            id: usuario.id,
            username: usuario.username,
            email: usuario.email
        };

        sessionStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioActivo)
        );

        window.location.href = "index.html";

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        errorLogin.textContent = "Ha ocurrido un error al iniciar sesión.";
    }
});

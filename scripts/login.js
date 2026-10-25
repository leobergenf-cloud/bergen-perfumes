/**
 * BERGEN PERFUMES - Manejador de Login y Autenticación
 */

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-login");
  if (!formulario) return;

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const errorCorreo = document.getElementById("error-correo");
    const errorPassword = document.getElementById("error-password");
    const errorGeneral = document.getElementById("error-general-login");

    const correo = correoInput ? correoInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    let valido = true;

    // Reset de errores
    if (errorCorreo) errorCorreo.style.display = "none";
    if (errorPassword) errorPassword.style.display = "none";
    if (errorGeneral) errorGeneral.style.display = "none";

    if (!correo) {
      if (errorCorreo) {
        errorCorreo.textContent = "Por favor ingresa tu correo electrónico.";
        errorCorreo.style.display = "block";
      }
      valido = false;
    }

    if (!password) {
      if (errorPassword) {
        errorPassword.textContent = "Por favor ingresa tu contraseña.";
        errorPassword.style.display = "block";
      }
      valido = false;
    }

    if (!valido) return;

    // 1. Verificar si es Administrador demo
    if (correo.toLowerCase() === "admin@admin.cl" && password === "admin") {
      localStorage.setItem("bergen_usuario_actual", JSON.stringify({
        nombre: "Administrador",
        correo: "admin@admin.cl",
        rol: "admin"
      }));

      mostrarToast("¡Bienvenido, Administrador!", "exito");
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 900);
      return;
    }

    // 2. Verificar en usuarios registrados en localStorage
    let usuariosRegistrados = [];
    try {
      const raw = localStorage.getItem("bergen_usuarios");
      usuariosRegistrados = raw ? JSON.parse(raw) : [];
    } catch (e) {
      usuariosRegistrados = [];
    }

    const usuarioEncontrado = usuariosRegistrados.find(
      u => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("bergen_usuario_actual", JSON.stringify({
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.correo,
        rol: "cliente"
      }));

      mostrarToast(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`, "exito");
      setTimeout(() => {
        window.location.href = "catalogo.html";
      }, 900);
      return;
    }

    // 3. Cliente Demo de prueba
    if (correo.toLowerCase() === "cliente@bergen.cl" && password === "12345678") {
      localStorage.setItem("bergen_usuario_actual", JSON.stringify({
        nombre: "Cliente Demo",
        correo: "cliente@bergen.cl",
        rol: "cliente"
      }));

      mostrarToast("¡Inicio de sesión exitoso!", "exito");
      setTimeout(() => {
        window.location.href = "catalogo.html";
      }, 900);
      return;
    }

    // Credenciales incorrectas
    if (errorGeneral) {
      errorGeneral.textContent = "Correo electrónico o contraseña incorrectos. Verifica tus datos o regístrate.";
      errorGeneral.style.display = "block";
    } else {
      mostrarToast("Credenciales incorrectas", "error");
    }
  });
});
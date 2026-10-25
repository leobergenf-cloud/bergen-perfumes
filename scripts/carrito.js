/**
 * BERGEN PERFUMES - Carrito de Compras & Checkout
 * Gestión de la página de carrito, cupones de descuento y simulador de compras.
 */

let descuentoAplicado = 0;
let codigoCuponActivo = "";

function renderizarPaginaCarrito() {
  const contenedorPrincipal = document.getElementById("carrito-contenido");
  if (!contenedorPrincipal) return;

  const carrito = typeof obtenerCarrito === "function" ? obtenerCarrito() : [];

  if (carrito.length === 0) {
    contenedorPrincipal.innerHTML = `
      <div class="carrito-vacio-seccion">
        <div class="carrito-vacio-icono">🛍️</div>
        <h2>Tu Carrito de Fragancias está Vacío</h2>
        <p>Aún no has agregado perfumes a tu selección. Explora nuestro catálogo y encuentra tu fragancia ideal.</p>
        <a href="catalogo.html" class="btn-hero-primario">Descubrir Perfumes</a>
      </div>
    `;
    return;
  }

  const base = typeof obtenerRutaBase === "function" ? obtenerRutaBase() : "./";
  let subtotal = 0;

  let filasHtml = carrito.map(item => {
    const itemTotal = item.precio * item.cantidad;
    subtotal += itemTotal;

    return `
      <tr>
        <td>
          <div class="item-producto-flex">
            <img src="${base}imagenes/${item.img}" alt="${item.nombre}" class="item-thumb">
            <div>
              <span class="item-marca">${item.marca || "Bergen"}</span>
              <a href="detalle_producto.html?id=${item.id}" class="item-nombre">${item.nombre}</a>
              <small style="color: var(--color-texto-apagado);">${item.volumen || ""}</small>
            </div>
          </div>
        </td>
        <td><strong>${formatearPrecio(item.precio)}</strong></td>
        <td>
          <div class="selector-cantidad" style="display: inline-flex;">
            <button type="button" class="btn-qty" onclick="modificarCantidadItem(${item.id}, -1)">-</button>
            <input type="number" class="input-qty" value="${item.cantidad}" readonly>
            <button type="button" class="btn-qty" onclick="modificarCantidadItem(${item.id}, 1)">+</button>
          </div>
        </td>
        <td><strong style="color: var(--color-primario);">${formatearPrecio(itemTotal)}</strong></td>
        <td>
          <button type="button" class="btn-eliminar-item" onclick="quitarItemCarrito(${item.id})" title="Eliminar perfume">
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join("");

  // Cálculo de envío y cupón
  const montoEnvioGratis = 60000;
  const calificaEnvioGratis = subtotal >= montoEnvioGratis;
  const costoEnvio = calificaEnvioGratis ? 0 : 3990;
  const faltaParaGratis = montoEnvioGratis - subtotal;
  const porcentajeGratis = Math.min(100, Math.round((subtotal / montoEnvioGratis) * 100));

  const montoDescuento = Math.round(subtotal * descuentoAplicado);
  const totalPagar = subtotal - montoDescuento + costoEnvio;

  contenedorPrincipal.innerHTML = `
    <div class="carrito-layout">
      <!-- Columna Izquierda: Tabla de Productos -->
      <div class="carrito-tabla-card">
        <div class="carrito-tabla-card-header">
          <h2>Perfumes en tu Carrito (${contarTotalItems()})</h2>
          <button onclick="vaciarCarritoCompleto()" style="background: none; border: none; color: #ef4444; font-size: 0.85rem; font-weight: 600; cursor: pointer;">
            Vaciar Carrito
          </button>
        </div>

        <!-- Barra de Progreso Envío Gratis -->
        <div class="envio-gratis-progress-box">
          <div class="envio-gratis-texto">
            ${calificaEnvioGratis 
              ? "🎉 ¡Felicitaciones! Tu pedido califica para <strong>ENVÍO GRATIS</strong> a todo Chile." 
              : `🚚 Te faltan <strong>${formatearPrecio(faltaParaGratis)}</strong> para obtener <strong>ENVÍO GRATIS</strong>.`}
          </div>
          <div class="envio-gratis-bar-bg">
            <div class="envio-gratis-bar-fill" style="width: ${porcentajeGratis}%;"></div>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="carrito-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              ${filasHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Columna Derecha: Resumen y Checkout -->
      <div class="resumen-pedido-card">
        <h3>Resumen del Pedido</h3>

        <div class="fila-total">
          <span>Subtotal fragancias:</span>
          <span>${formatearPrecio(subtotal)}</span>
        </div>

        ${descuentoAplicado > 0 ? `
          <div class="fila-total" style="color: var(--color-exito);">
            <span>Descuento cupón (${codigoCuponActivo}):</span>
            <span>-${formatearPrecio(montoDescuento)}</span>
          </div>
        ` : ""}

        <div class="fila-total">
          <span>Costo de despacho:</span>
          <span style="font-weight: 700; color: ${costoEnvio === 0 ? 'var(--color-exito)' : 'inherit'};">
            ${costoEnvio === 0 ? "GRATIS" : formatearPrecio(costoEnvio)}
          </span>
        </div>

        <div class="cupon-box">
          <input type="text" id="input-cupon" placeholder="Código de Cupón (Ej: BERGEN10)" value="${codigoCuponActivo}">
          <button type="button" onclick="aplicarCupon()">Aplicar</button>
        </div>
        <small style="color: var(--color-texto-apagado); display: block; margin-top: -10px; margin-bottom: 15px;">
          Usa el cupón <strong>BERGEN10</strong> para un 10% de descuento.
        </small>

        <div class="fila-total gran-total">
          <span>Total a Pagar:</span>
          <span>${formatearPrecio(totalPagar)}</span>
        </div>

        <button type="button" class="btn-checkout-principal" onclick="abrirModalCheckout(${subtotal}, ${costoEnvio}, ${montoDescuento}, ${totalPagar})">
          💳 Continuar al Pago
        </button>

        <a href="catalogo.html" class="btn-seguir-comprando">← Seguir comprando perfumes</a>
      </div>
    </div>
  `;
}

function modificarCantidadItem(id, cambio) {
  let carrito = typeof obtenerCarrito === "function" ? obtenerCarrito() : [];
  const index = carrito.findIndex(item => item.id === id);

  if (index !== -1) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    renderizarPaginaCarrito();
  }
}

function quitarItemCarrito(id) {
  let carrito = typeof obtenerCarrito === "function" ? obtenerCarrito() : [];
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito(carrito);
  renderizarPaginaCarrito();
  mostrarToast("Perfume eliminado del carrito", "info");
}

function vaciarCarritoCompleto() {
  if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
    guardarCarrito([]);
    renderizarPaginaCarrito();
    mostrarToast("Carrito vaciado");
  }
}

function aplicarCupon() {
  const input = document.getElementById("input-cupon");
  if (!input) return;
  const codigo = input.value.trim().toUpperCase();

  if (codigo === "BERGEN10") {
    descuentoAplicado = 0.10;
    codigoCuponActivo = "BERGEN10";
    mostrarToast("¡Cupón del 10% aplicado con éxito!", "exito");
    renderizarPaginaCarrito();
  } else if (codigo === "") {
    descuentoAplicado = 0;
    codigoCuponActivo = "";
    renderizarPaginaCarrito();
  } else {
    mostrarToast("Cupón inválido o expirado. Prueba con BERGEN10", "error");
  }
}

// --- MODAL DE CHECKOUT Y SIMULACIÓN DE COMPRA ---
let datosPagoActual = null;

function abrirModalCheckout(subtotal, envio, descuento, total) {
  datosPagoActual = { subtotal, envio, descuento, total };
  const modal = document.getElementById("modal-checkout");
  if (!modal) return;

  const usuario = typeof obtenerUsuarioActual === "function" ? obtenerUsuarioActual() : null;

  if (usuario) {
    const inputNombre = document.getElementById("checkout-nombre");
    const inputEmail = document.getElementById("checkout-email");
    if (inputNombre && !inputNombre.value) inputNombre.value = usuario.nombre || "";
    if (inputEmail && !inputEmail.value) inputEmail.value = usuario.correo || "";
  }

  const resumenTexto = document.getElementById("checkout-total-resumen");
  if (resumenTexto) {
    resumenTexto.textContent = formatearPrecio(total);
  }

  modal.classList.add("activo");
}

function cerrarModalCheckout() {
  const modal = document.getElementById("modal-checkout");
  if (modal) modal.classList.remove("activo");
}

function procesarPedidoFinal(event) {
  event.preventDefault();

  const nombre = document.getElementById("checkout-nombre").value.trim();
  const rut = document.getElementById("checkout-rut").value.trim();
  const email = document.getElementById("checkout-email").value.trim();
  const direccion = document.getElementById("checkout-direccion").value.trim();
  const comuna = document.getElementById("checkout-comuna").value.trim();
  const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value;

  if (!nombre || !rut || !email || !direccion || !comuna) {
    alert("Por favor completa todos los campos requeridos para el envío.");
    return false;
  }

  const carrito = typeof obtenerCarrito === "function" ? obtenerCarrito() : [];
  const numOrden = "BG-" + Math.floor(100000 + Math.random() * 900000);

  const nuevoPedido = {
    id: numOrden,
    cliente: nombre,
    rut: rut,
    correo: email,
    direccion: `${direccion}, ${comuna}`,
    metodoPago: metodoPago,
    items: [...carrito],
    total: datosPagoActual ? datosPagoActual.total : 0,
    fecha: new Date().toLocaleDateString("es-CL"),
    estado: "En preparación"
  };

  // Guardar pedido en localStorage
  let pedidos = [];
  try {
    const raw = localStorage.getItem("bergen_pedidos");
    pedidos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    pedidos = [];
  }

  pedidos.unshift(nuevoPedido);
  localStorage.setItem("bergen_pedidos", JSON.stringify(pedidos));

  // Vaciar carrito
  guardarCarrito([]);

  // Mostrar comprobante
  const modalBody = document.querySelector(".modal-caja");
  if (modalBody) {
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <span style="font-size: 3.5rem;">🎉</span>
        <h2 style="color: var(--color-primario); font-size: 1.8rem; margin: 15px 0 8px 0;">¡Compra Realizada con Éxito!</h2>
        <p style="color: var(--color-texto-secundario); font-size: 0.95rem; margin-bottom: 25px;">
          Gracias por confiar en Bergen Perfumes. Tu pedido ha sido confirmado.
        </p>

        <div style="background-color: #f9fafb; border: 1px solid var(--color-borde); border-radius: 8px; padding: 20px; text-align: left; margin-bottom: 25px;">
          <p><strong>N° de Orden:</strong> <span style="color: var(--color-dorado); font-weight: 800;">#${numOrden}</span></p>
          <p><strong>Destinatario:</strong> ${nombre}</p>
          <p><strong>Dirección de Entrega:</strong> ${direccion}, ${comuna}</p>
          <p><strong>Método de Pago:</strong> ${metodoPago}</p>
          <p><strong>Total Cancelado:</strong> ${formatearPrecio(nuevoPedido.total)}</p>
          <p><strong>Tiempo Estimado:</strong> 24 a 48 hrs hábiles a todo Chile</p>
        </div>

        <a href="catalogo.html" class="btn-hero-primario" style="display: inline-block;">Volver al Catálogo</a>
      </div>
    `;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarPaginaCarrito();
});

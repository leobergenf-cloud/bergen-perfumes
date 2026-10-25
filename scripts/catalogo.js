/**
 * BERGEN PERFUMES - Catálogo y Detalle de Producto
 * Implementación dinámica para renderizado de catálogo, filtros, ordenamiento y detalle.
 */

// Estado del catálogo
let filtroActivo = "todos";
let terminoBusqueda = "";
let ordenActivo = "destacado";

// Asegurar que PRODUCTOS_PERFUMES esté disponible
const catalogoData = typeof PRODUCTOS_PERFUMES !== "undefined" ? PRODUCTOS_PERFUMES : [];

function normalizarTexto(txt) {
  return (txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// --- RENDERIZADO DEL CATÁLOGO ---
function renderizarCatalogo(lista = catalogoData) {
  const contenedor = document.getElementById("catalogo-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--color-superficie); border-radius: 12px; border: 1px solid var(--color-borde-dorado);">
        <span style="font-size: 3rem; display: block; margin-bottom: 15px;">🔍</span>
        <h3 style="color: #ffffff; font-size: 1.4rem; margin-bottom: 8px;">No encontramos fragancias que coincidan</h3>
        <p style="color: var(--color-texto-secundario); margin-bottom: 20px;">Prueba buscando otra marca, nota olfativa o selecciona otra categoría.</p>
        <button onclick="limpiarFiltros()" class="btn-filtro activo" style="margin: 0 auto; padding: 10px 24px;">Ver todos los perfumes</button>
      </div>
    `;
    return;
  }

  const base = typeof obtenerRutaBase === "function" ? obtenerRutaBase() : "./";

  lista.forEach(producto => {
    const card = document.createElement("article");
    card.className = "tarjeta-perfume";

    card.innerHTML = `
      <span class="tarjeta-badge">${producto.concentracion}</span>
      <div class="tarjeta-imagen-box">
        <img src="${base}imagenes/${producto.img}" alt="${producto.nombre}" class="tarjeta-imagen" loading="lazy">
      </div>
      <div class="tarjeta-cuerpo">
        <span class="tarjeta-marca">${producto.marca}</span>
        <h3 class="tarjeta-nombre">${producto.nombre}</h3>
        <p class="tarjeta-detalles">${producto.volumen} • ${producto.familia}</p>
        <div class="tarjeta-precio">${formatearPrecio(producto.precio)}</div>
        <div class="tarjeta-acciones">
          <a href="${base}paginas/detalle_producto.html?id=${producto.id}" class="btn-accion-detalle">Ver Detalle</a>
          <button onclick="agregarAlCarroDesdeCatalogo(${producto.id})" class="btn-accion-carro">🛒 Agregar</button>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });

  actualizarResumenMiniCart();
}

// Agregar al carro y refrescar mini-cart
function agregarAlCarroDesdeCatalogo(id) {
  if (typeof agregarAlCarroGlobal === "function") {
    agregarAlCarroGlobal(id, 1);
  }
  actualizarResumenMiniCart();
}

// Actualizar barra lateral de resumen en catalogo.html
function actualizarResumenMiniCart() {
  const miniLista = document.getElementById("mini-cart-lista");
  const totalItemsElem = document.getElementById("mini-cart-items");
  const subtotalElem = document.getElementById("mini-cart-subtotal");
  const envioElem = document.getElementById("mini-cart-envio");
  const totalElem = document.getElementById("mini-cart-total");

  if (!miniLista) return;

  const carrito = typeof obtenerCarrito === "function" ? obtenerCarrito() : [];

  if (carrito.length === 0) {
    miniLista.innerHTML = `
      <div class="carrito-vacio-texto">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">🛒</span>
        Tu carrito está vacío.<br>Agrega una fragancia para comenzar.
      </div>
    `;
    if (totalItemsElem) totalItemsElem.textContent = "0";
    if (subtotalElem) subtotalElem.textContent = "$0";
    if (envioElem) envioElem.textContent = "$0";
    if (totalElem) totalElem.textContent = "$0";
    return;
  }

  let subtotal = 0;
  let itemsCount = 0;
  let html = "";

  carrito.forEach(item => {
    subtotal += item.precio * item.cantidad;
    itemsCount += item.cantidad;
    html += `
      <div class="mini-item">
        <div class="mini-item-info">
          <strong>${item.nombre}</strong>
          <span>${item.cantidad} x ${formatearPrecio(item.precio)}</span>
        </div>
        <div class="mini-item-precio">
          ${formatearPrecio(item.precio * item.cantidad)}
        </div>
      </div>
    `;
  });

  miniLista.innerHTML = html;

  const costoEnvio = subtotal >= 60000 ? 0 : 3990;
  const granTotal = subtotal + costoEnvio;

  if (totalItemsElem) totalItemsElem.textContent = itemsCount;
  if (subtotalElem) subtotalElem.textContent = formatearPrecio(subtotal);
  if (envioElem) envioElem.textContent = costoEnvio === 0 ? "GRATIS" : formatearPrecio(costoEnvio);
  if (totalElem) totalElem.textContent = formatearPrecio(granTotal);
}

// Filtrar catálogo por categoría o marca
function filtrarPorCategoria(categoria, btn) {
  filtroActivo = categoria;

  document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
  if (btn) btn.classList.add("activo");

  aplicarFiltrosYOrden();
}

// Búsqueda en vivo
function buscarFragancia(termino) {
  terminoBusqueda = normalizarTexto(termino);
  aplicarFiltrosYOrden();
}

// Ordenamiento
function cambiarOrden(orden) {
  ordenActivo = orden;
  aplicarFiltrosYOrden();
}

// Aplicación combinada de filtros, búsqueda y orden
function aplicarFiltrosYOrden() {
  let resultado = [...catalogoData];

  // Filtro de categoría o marca
  if (filtroActivo !== "todos") {
    const filtroNorm = normalizarTexto(filtroActivo);
    resultado = resultado.filter(p => {
      const catNorm = normalizarTexto(p.categoria);
      const marcaNorm = normalizarTexto(p.marca);

      if (filtroNorm === "hombre" || filtroNorm === "mujer" || filtroNorm === "unisex") {
        return catNorm === filtroNorm;
      }
      return marcaNorm.includes(filtroNorm) || catNorm.includes(filtroNorm);
    });
  }

  // Búsqueda textual
  if (terminoBusqueda) {
    resultado = resultado.filter(p => {
      const nombre = normalizarTexto(p.nombre);
      const marca = normalizarTexto(p.marca);
      const familia = normalizarTexto(p.familia);
      const desc = normalizarTexto(p.descripcion);
      return nombre.includes(terminoBusqueda) ||
             marca.includes(terminoBusqueda) ||
             familia.includes(terminoBusqueda) ||
             desc.includes(terminoBusqueda);
    });
  }

  // Ordenamiento
  if (ordenActivo === "precio-menor") {
    resultado.sort((a, b) => a.precio - b.precio);
  } else if (ordenActivo === "precio-mayor") {
    resultado.sort((a, b) => b.precio - a.precio);
  } else if (ordenActivo === "nombre") {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  renderizarCatalogo(resultado);
}

function limpiarFiltros() {
  filtroActivo = "todos";
  terminoBusqueda = "";
  ordenActivo = "destacado";

  const searchInput = document.getElementById("input-busqueda");
  if (searchInput) searchInput.value = "";

  const orderSelect = document.getElementById("select-orden");
  if (orderSelect) orderSelect.value = "destacado";

  document.querySelectorAll(".btn-filtro").forEach(b => {
    b.classList.toggle("activo", b.dataset.filtro === "todos");
  });

  aplicarFiltrosYOrden();
}

// --- PÁGINA DETALLE DE PRODUCTO (detalle_producto.html) ---
function mostrarProductoDetalle() {
  const contenedorDetalle = document.getElementById("producto");
  if (!contenedorDetalle) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"), 10) || 1;

  const producto = catalogoData.find(p => p.id === id);

  if (!producto) {
    contenedorDetalle.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; background: var(--color-superficie); border-radius: 12px; margin: 40px auto; max-width: 600px; border: 1px solid var(--color-borde-dorado);">
        <span style="font-size: 3rem;">⚠️</span>
        <h2 style="color: #ffffff; margin: 15px 0;">Perfume no encontrado</h2>
        <p style="color: var(--color-texto-secundario); margin-bottom: 25px;">La fragancia seleccionada no existe en nuestro catálogo.</p>
        <a href="catalogo.html" class="btn-hero-primario">Volver al Catálogo</a>
      </div>
    `;
    return;
  }

  const base = typeof obtenerRutaBase === "function" ? obtenerRutaBase() : "./";

  contenedorDetalle.innerHTML = `
    <!-- Migas de pan -->
    <nav class="migas-de-pan" aria-label="Migas de pan">
      <a href="${base}index.html">Inicio</a> /
      <a href="${base}paginas/catalogo.html">Catálogo</a> /
      <span style="color: #ffffff;">${producto.nombre}</span>
    </nav>

    <div class="detalle-producto-card">
      <div class="detalle-galeria">
        <span class="detalle-badge-top">${producto.concentracion}</span>
        <img class="imagen-detalle-zoom" src="${base}imagenes/${producto.img}" alt="${producto.nombre}">
      </div>

      <div class="detalle-info-box">
        <span class="detalle-marca">${producto.marca}</span>
        <h1 class="detalle-titulo">${producto.nombre}</h1>

        <div class="detalle-especificaciones">
          <span class="spec-pill">Volumen: ${producto.volumen}</span>
          <span class="spec-pill">Familia: ${producto.familia}</span>
          <span class="spec-pill">Para: ${producto.categoria}</span>
        </div>

        <div class="detalle-precio">${formatearPrecio(producto.precio)}</div>

        <div class="detalle-stock-status">
          <span class="detalle-stock-dot"></span>
          <span>Disponible (${producto.stock} unidades listas para despacho inmediato)</span>
        </div>

        <p class="detalle-descripcion">${producto.descripcion}</p>

        <!-- Pirámide Olfativa -->
        <div class="piramide-olfativa">
          <h4>Pirámide Olfativa</h4>
          <div class="nota-item">
            <strong>Notas de Salida:</strong> <span>${producto.notas.salida}</span>
          </div>
          <div class="nota-item">
            <strong>Notas de Corazón:</strong> <span>${producto.notas.corazon}</span>
          </div>
          <div class="nota-item">
            <strong>Notas de Fondo:</strong> <span>${producto.notas.fondo}</span>
          </div>
        </div>

        <!-- Fila de Compra -->
        <div class="detalle-compra-fila">
          <div class="selector-cantidad">
            <button type="button" class="btn-qty" onclick="cambiarCantidadDetalle(-1)">-</button>
            <input type="number" id="cantidad-detalle" class="input-qty" value="1" min="1" max="${producto.stock}" readonly>
            <button type="button" class="btn-qty" onclick="cambiarCantidadDetalle(1)">+</button>
          </div>
          <button type="button" class="btn-detalle-agregar" onclick="comprarDesdeDetalle(${producto.id})">
            🛒 Agregar al Carrito
          </button>
        </div>

        <div class="detalle-garantias">
          <div class="garantia-item">
            <span>🛡️</span>
            <span>Garantía de Originalidad</span>
          </div>
          <div class="garantia-item">
            <span>🚚</span>
            <span>Envío Gratis sobre $60.000</span>
          </div>
          <div class="garantia-item">
            <span>🔒</span>
            <span>Pago Seguro Webpay</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Fragancias Sugeridas -->
    <div style="margin-top: 50px;">
      <h3 style="color: #ffffff; font-size: 1.6rem; margin-bottom: 25px; font-weight: 800;">Otras Fragancias que te Podrían Gustar</h3>
      <div class="productos-grid" id="productos-sugeridos"></div>
    </div>
  `;

  renderizarSugeridos(producto.id);
}

function cambiarCantidadDetalle(cambio) {
  const input = document.getElementById("cantidad-detalle");
  if (!input) return;
  let valor = parseInt(input.value, 10) + cambio;
  if (valor < 1) valor = 1;
  if (valor > 10) valor = 10;
  input.value = valor;
}

function comprarDesdeDetalle(id) {
  const input = document.getElementById("cantidad-detalle");
  const cantidad = input ? parseInt(input.value, 10) : 1;
  if (typeof agregarAlCarroGlobal === "function") {
    agregarAlCarroGlobal(id, cantidad);
  }
}

function renderizarSugeridos(idActual) {
  const contenedor = document.getElementById("productos-sugeridos");
  if (!contenedor) return;

  const sugeridos = catalogoData.filter(p => p.id !== idActual).slice(0, 3);
  const base = typeof obtenerRutaBase === "function" ? obtenerRutaBase() : "./";

  contenedor.innerHTML = sugeridos.map(p => `
    <article class="tarjeta-perfume">
      <div class="tarjeta-imagen-box">
        <img src="${base}imagenes/${p.img}" alt="${p.nombre}" class="tarjeta-imagen">
      </div>
      <div class="tarjeta-cuerpo">
        <span class="tarjeta-marca">${p.marca}</span>
        <h4 class="tarjeta-nombre">${p.nombre}</h4>
        <div class="tarjeta-precio">${formatearPrecio(p.precio)}</div>
        <div class="tarjeta-acciones">
          <a href="${base}paginas/detalle_producto.html?id=${p.id}" class="btn-accion-detalle">Ver Detalle</a>
          <button onclick="agregarAlCarroDesdeCatalogo(${p.id})" class="btn-accion-carro">🛒 Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("catalogo-productos")) {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get("categoria");
    if (cat) {
      filtroActivo = cat;
      const matchingBtn = Array.from(document.querySelectorAll(".btn-filtro")).find(b => b.dataset.filtro === cat);
      if (matchingBtn) {
        document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
        matchingBtn.classList.add("activo");
      }
    }
    aplicarFiltrosYOrden();
  }

  if (document.getElementById("producto")) {
    mostrarProductoDetalle();
  }
});

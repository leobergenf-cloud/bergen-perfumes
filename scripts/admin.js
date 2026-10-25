/**
 * BERGEN PERFUMES - Panel de Administración
 * Métricas en tiempo real, gestión de pedidos e inventario.
 */

// Pedidos de prueba iniciales si aún no hay en localStorage
const PEDIDOS_INICIALES = [
  {
    id: "BG-918234",
    cliente: "María Juana López",
    rut: "18.345.678-9",
    correo: "maria.juana@correo.cl",
    direccion: "Av. Providencia 1234, Providencia",
    metodoPago: "Webpay Plus",
    items: [{ nombre: "Sauvage", cantidad: 1, precio: 124990 }],
    total: 124990,
    fecha: "24/10/2026",
    estado: "Enviado"
  },
  {
    id: "BG-827163",
    cliente: "Juan Carlos Bodoque",
    rut: "14.521.890-K",
    correo: "bodoque@titirilquen.cl",
    direccion: "Calle Falsa 123, Las Condes",
    metodoPago: "Transferencia",
    items: [{ nombre: "Khamrah", cantidad: 1, precio: 49990 }],
    total: 49990,
    fecha: "23/10/2026",
    estado: "Entregado"
  },
  {
    id: "BG-736291",
    cliente: "Francisca Silva",
    rut: "19.876.543-2",
    correo: "fran.silva@correo.com",
    direccion: "Ahumada 456, Santiago Centro",
    metodoPago: "Webpay Plus",
    items: [{ nombre: "Baccarat Rouge 540", cantidad: 1, precio: 289990 }],
    total: 289990,
    fecha: "25/10/2026",
    estado: "En preparación"
  }
];

function cargarDatosAdmin() {
  // Asegurar pedidos en localStorage
  let pedidos = [];
  try {
    const raw = localStorage.getItem("bergen_pedidos");
    pedidos = raw ? JSON.parse(raw) : null;
    if (!pedidos || pedidos.length === 0) {
      pedidos = PEDIDOS_INICIALES;
      localStorage.setItem("bergen_pedidos", JSON.stringify(pedidos));
    }
  } catch (e) {
    pedidos = PEDIDOS_INICIALES;
  }

  // Contar usuarios registrados
  let usuarios = [];
  try {
    const rawU = localStorage.getItem("bergen_usuarios");
    usuarios = rawU ? JSON.parse(rawU) : [];
  } catch (e) {
    usuarios = [];
  }

  // Métricas
  const totalVentas = pedidos.reduce((sum, p) => sum + (p.total || 0), 0);
  const totalPedidos = pedidos.length;
  const totalProductos = typeof PRODUCTOS_PERFUMES !== "undefined" ? PRODUCTOS_PERFUMES.length : 12;
  const totalClientes = usuarios.length + 3;

  const elemVentas = document.getElementById("admin-ventas-total");
  const elemPedidos = document.getElementById("admin-pedidos-total");
  const elemProductos = document.getElementById("admin-productos-total");
  const elemClientes = document.getElementById("admin-clientes-total");

  if (elemVentas) elemVentas.textContent = formatearPrecio(totalVentas);
  if (elemPedidos) elemPedidos.textContent = totalPedidos;
  if (elemProductos) elemProductos.textContent = totalProductos;
  if (elemClientes) elemClientes.textContent = totalClientes;

  // Renderizar tabla de pedidos
  const tablaCuerpo = document.getElementById("admin-tabla-pedidos-body");
  if (tablaCuerpo) {
    tablaCuerpo.innerHTML = pedidos.map(p => {
      const itemsTexto = Array.isArray(p.items) 
        ? p.items.map(it => `${it.nombre} (x${it.cantidad})`).join(", ") 
        : (p.perfume || "Perfume");

      const claseEstado = (p.estado || "").toLowerCase().includes("entrega") || (p.estado || "").toLowerCase().includes("envia") 
        ? "completado" 
        : "pendiente";

      return `
        <tr>
          <td><strong style="color: var(--color-dorado);">#${p.id}</strong></td>
          <td>${p.fecha || "Hoy"}</td>
          <td>
            <strong>${p.cliente}</strong><br>
            <small style="color: var(--color-texto-apagado);">${p.rut || ""}</small>
          </td>
          <td>${itemsTexto}</td>
          <td><strong style="color: var(--color-dorado);">${formatearPrecio(p.total)}</strong></td>
          <td>${p.metodoPago || "Webpay"}</td>
          <td><span class="badge-estado ${claseEstado}">${p.estado || "En preparación"}</span></td>
        </tr>
      `;
    }).join("");
  }

  // Renderizar tabla de inventario
  const tablaInvCuerpo = document.getElementById("admin-tabla-inventario-body");
  if (tablaInvCuerpo && typeof PRODUCTOS_PERFUMES !== "undefined") {
    tablaInvCuerpo.innerHTML = PRODUCTOS_PERFUMES.map(p => `
      <tr>
        <td>#${p.id}</td>
        <td><strong>${p.nombre}</strong></td>
        <td>${p.marca}</td>
        <td>${p.volumen}</td>
        <td>${p.concentracion}</td>
        <td><strong style="color: var(--color-dorado);">${formatearPrecio(p.precio)}</strong></td>
        <td><span style="font-weight: 700; color: ${p.stock > 10 ? 'var(--color-exito)' : 'var(--color-dorado)'};">${p.stock} un.</span></td>
      </tr>
    `).join("");
  }
}

function simularVentaRapida() {
  const nombresRandom = ["Camila Valenzuela", "Rodrigo Morales", "Ignacia Castro", "Gabriel Soto", "Valentina Riquelme"];
  const clienteRandom = nombresRandom[Math.floor(Math.random() * nombresRandom.length)];
  const perfumesRandom = typeof PRODUCTOS_PERFUMES !== "undefined" ? PRODUCTOS_PERFUMES : [];
  const perfume = perfumesRandom[Math.floor(Math.random() * perfumesRandom.length)] || { nombre: "Sauvage", precio: 124990 };

  const numOrden = "BG-" + Math.floor(100000 + Math.random() * 900000);

  const nuevaVenta = {
    id: numOrden,
    cliente: clienteRandom,
    rut: "19.555.444-3",
    correo: "cliente.test@bergen.cl",
    direccion: "Av. Las Condes 8900",
    metodoPago: "Webpay Plus",
    items: [{ nombre: perfume.nombre, cantidad: 1, precio: perfume.precio }],
    total: perfume.precio,
    fecha: new Date().toLocaleDateString("es-CL"),
    estado: "En preparación"
  };

  let pedidos = [];
  try {
    pedidos = JSON.parse(localStorage.getItem("bergen_pedidos")) || [];
  } catch (e) {
    pedidos = [];
  }

  pedidos.unshift(nuevaVenta);
  localStorage.setItem("bergen_pedidos", JSON.stringify(pedidos));

  cargarDatosAdmin();
  mostrarToast(`¡Nueva compra registrada: ${clienteRandom} ($${formatearPrecio(perfume.precio)})!`, "exito");
}

function restablecerDatosAdmin() {
  if (confirm("¿Deseas restablecer los pedidos a los valores iniciales de prueba?")) {
    localStorage.setItem("bergen_pedidos", JSON.stringify(PEDIDOS_INICIALES));
    cargarDatosAdmin();
    mostrarToast("Datos de prueba restablecidos");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarDatosAdmin();
});

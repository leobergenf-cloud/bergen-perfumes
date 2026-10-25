/**
 * BERGEN PERFUMES - Core Scripts
 * Base de datos oficial de perfumes (Diseñador & Árabes), navegación, carrito y sesiones.
 */

// Base de datos de productos oficial de Bergen Perfumes (12 Fragancias de Alta Gama)
const PRODUCTOS_PERFUMES = [
  {
    id: 1,
    slug: "polo-blue",
    nombre: "Polo Blue",
    marca: "Ralph Lauren",
    precio: 89990,
    categoria: "Hombre",
    familia: "Aromática Fougère",
    volumen: "125 ml",
    concentracion: "Eau de Parfum",
    img: "263-Polo-Blue.webp",
    destacado: true,
    stock: 15,
    descripcion: "Polo Blue Eau de Parfum es una fragancia elegante y fresca que combina la frescura del melón de Cavaillon con la intensidad de la gamuza y la madera de roble. Creada para el hombre moderno, dinámico y sofisticado.",
    notas: {
      salida: "Melón de Cavaillon, Mandarina, Pepino fresco",
      corazon: "Albahaca, Salvia clara, Geranio",
      fondo: "Gamuza lavada, Pachulí aterciopelado, Almizcle puro"
    }
  },
  {
    id: 2,
    slug: "polo-green",
    nombre: "Polo Green",
    marca: "Ralph Lauren",
    precio: 84990,
    categoria: "Hombre",
    familia: "Chipre Amaderada",
    volumen: "118 ml",
    concentracion: "Eau de Toilette",
    img: "267-Polo-Green.webp",
    destacado: true,
    stock: 12,
    descripcion: "El clásico legendario de Ralph Lauren. Polo Green celebra la elegancia tradicional con un toque masculino atemporal de notas boscosas, cuero noble y tabaco aromático.",
    notas: {
      salida: "Pino silvestre, Alcaravea, Cilantro, Bergamota",
      corazon: "Cuero noble, Clavel, Pimienta, Manzanilla",
      fondo: "Musgo de roble, Tabaco de Virginia, Pachulí, Cedro"
    }
  },
  {
    id: 3,
    slug: "polo-black",
    nombre: "Polo Black",
    marca: "Ralph Lauren",
    precio: 87990,
    categoria: "Hombre",
    familia: "Amaderada Aromática",
    volumen: "125 ml",
    concentracion: "Eau de Toilette",
    img: "269-Polo-Black.webp",
    destacado: false,
    stock: 18,
    descripcion: "Seductora, moderna y misteriosa. Polo Black es una fusión contemporánea de mango helado, abrótano plateado y pachulí negro que evoca la sofisticación de la noche urbana.",
    notas: {
      salida: "Mango helado crujiente, Salvia española, Mandarina verde",
      corazon: "Abrótano plateado, Hediona brillante, Notas acuáticas",
      fondo: "Pachulí noir, Madera de sándalo, Haba tonka dulce"
    }
  },
  {
    id: 4,
    slug: "polo-red",
    nombre: "Polo Red",
    marca: "Ralph Lauren",
    precio: 86990,
    categoria: "Hombre",
    familia: "Oriental Especiada",
    volumen: "125 ml",
    concentracion: "Eau de Parfum",
    img: "272-Polo-Red.webp",
    destacado: true,
    stock: 20,
    descripcion: "Pasión, adrenalina y velocidad en cada gota. Polo Red combina notas cítricas vibrantes con un corazón especiado y un fondo cálido de café tostado y maderas ambarinas.",
    notas: {
      salida: "Toronja roja vigorizante, Arándano rojo, Limón italiano",
      corazon: "Azafrán rojo picante, Salvia roja aromática, Lavanda",
      fondo: "Café tostado, Ámbar cálido, Madera de cedro rojo"
    }
  },
  {
    id: 5,
    slug: "polo-big-pony",
    nombre: "Big Pony 1",
    marca: "Ralph Lauren",
    precio: 74990,
    categoria: "Hombre",
    familia: "Cítrica Aromática",
    volumen: "100 ml",
    concentracion: "Eau de Toilette",
    img: "274-Big-Pony.webp",
    destacado: false,
    stock: 10,
    descripcion: "Energía pura y espíritu deportivo juvenil. Big Pony 1 se caracteriza por sus notas revitalizantes de lima fresca y madera de roble, perfecta para el uso diario y actividades al aire libre.",
    notas: {
      salida: "Lima ácida chispeante, Mandarina verde",
      corazon: "Notas ozónicas acuáticas, Albahaca azul",
      fondo: "Madera de roble blanco, Almizcle fresco"
    }
  },
  {
    id: 6,
    slug: "libre-ysl",
    nombre: "Libre",
    marca: "Yves Saint Laurent",
    precio: 115990,
    categoria: "Mujer",
    familia: "Floral Oriental",
    volumen: "90 ml",
    concentracion: "Eau de Parfum",
    img: "275-Libre.webp",
    destacado: true,
    stock: 14,
    descripcion: "El perfume icónico de la mujer libre, audaz y segura de sí misma. Una tensión sensual entre la elegancia de la lavanda francesa y la opulencia de la flor de azahar marroquí.",
    notas: {
      salida: "Aceite de mandarina, Lavanda francesa, Grosellas negras",
      corazon: "Jazmín sambac, Flor de azahar de Marruecos, Orquídea",
      fondo: "Vainilla de Madagascar, Cedro de Virginia, Ámbar gris"
    }
  },
  {
    id: 7,
    slug: "sauvage-dior",
    nombre: "Sauvage",
    marca: "Dior",
    precio: 124990,
    categoria: "Hombre",
    familia: "Cítrica Amaderada",
    volumen: "100 ml",
    concentracion: "Eau de Parfum",
    img: "sauvage.webp",
    destacado: true,
    stock: 18,
    descripcion: "Una creación inspirada en los grandes espacios abiertos bajo un cielo azul noche. La bergamota de Calabria se une a la sensualidad misteriosa del extracto de vainilla de Papúa Nueva Guinea.",
    notas: {
      salida: "Bergamota de Calabria, Pimienta de Sichuan",
      corazon: "Lavanda silvestre, Pimienta rosa, Anís estrellado, Nuez moscada",
      fondo: "Ambroxan potente, Vainilla de Papúa Nueva Guinea, Cedro noble"
    }
  },
  {
    id: 8,
    slug: "bleu-chanel",
    nombre: "Bleu de Chanel",
    marca: "Chanel",
    precio: 139990,
    categoria: "Hombre",
    familia: "Amaderada Aromática",
    volumen: "100 ml",
    concentracion: "Eau de Parfum",
    img: "bleu-chanel.webp",
    destacado: true,
    stock: 14,
    descripcion: "El elogio de la libertad masculina. Una fragancia atemporal y envolvente con acordes amaderados cautivadores, madera de cedro ambarina y sándalo de Nueva Caledonia.",
    notas: {
      salida: "Toronja (Pomelo), Limón italiano, Menta piperita, Pimienta rosa",
      corazon: "Jengibre estimulante, Nuez moscada, Jazmín puro",
      fondo: "Incienso místico, Vetiver noble, Cedro, Sándalo, Pachulí"
    }
  },
  {
    id: 9,
    slug: "khamrah-lattafa",
    nombre: "Khamrah",
    marca: "Lattafa (Árabe)",
    precio: 49990,
    categoria: "Unisex",
    familia: "Oriental Cálida Gourmand",
    volumen: "100 ml",
    concentracion: "Eau de Parfum",
    img: "khamrah.webp",
    destacado: true,
    stock: 22,
    descripcion: "La joya de la perfumería árabe que conquistó al mundo. Una mezcla embriagadora de canela dulce, dátiles aromáticos, praliné tostado y una rica base de vainilla y maderas preciosas.",
    notas: {
      salida: "Canela aromática, Nuez moscada, Bergamota dulce",
      corazon: "Dátiles acaramelados, Praliné suave, Nardo blanco",
      fondo: "Vainilla Bourbon, Haba tonka dulce, Benjuí, Ámbar cálido"
    }
  },
  {
    id: 10,
    slug: "club-de-nuit-intense",
    nombre: "Club de Nuit Intense",
    marca: "Armaf (Árabe)",
    precio: 54990,
    categoria: "Hombre",
    familia: "Chipre Frutal Ahumada",
    volumen: "105 ml",
    concentracion: "Eau de Parfum",
    img: "club-de-nuit.webp",
    destacado: true,
    stock: 19,
    descripcion: "Una de las fragancias masculinas más elogiadas y de mayor proyección del mundo árabe. Abre con notas frutales intensas de piña y limón, evolucionando a un corazón de abedul ahumado y fondo de almizcle.",
    notas: {
      salida: "Limón de Amalfi, Piña dulce, Grosellas negras, Manzana",
      corazon: "Abedul ahumado noble, Jazmín nocturno, Rosa suave",
      fondo: "Almizcle blanco, Ámbar gris, Pachulí noble, Vainilla"
    }
  },
  {
    id: 11,
    slug: "baccarat-rouge-540",
    nombre: "Baccarat Rouge 540",
    marca: "Maison Francis Kurkdjian",
    precio: 289990,
    categoria: "Unisex",
    familia: "Ámbar Floral Amaderada",
    volumen: "70 ml",
    concentracion: "Extrait de Parfum",
    img: "baccarat-rouge.webp",
    destacado: true,
    stock: 8,
    descripcion: "La máxima expresión del lujo olfativo contemporáneo. Una firma gráfica e increíblemente densa donde el jazmín Grandiflorum y el azafrán magnifican las facetas minerales del ámbar gris.",
    notas: {
      salida: "Almendra amarga, Azafrán dorado puro",
      corazon: "Jazmín Grandiflorum de Egipto, Madera de cedro rojo",
      fondo: "Ámbar gris mineral, Acorde amaderado noble, Almizcle"
    }
  },
  {
    id: 12,
    slug: "tobacco-vanille",
    nombre: "Tobacco Vanille",
    marca: "Tom Ford",
    precio: 249990,
    categoria: "Unisex",
    familia: "Oriental Especiada Cálida",
    volumen: "100 ml",
    concentracion: "Eau de Parfum",
    img: "tobacco-vanille.webp",
    destacado: false,
    stock: 10,
    descripcion: "Opulenta, cálida e icónica. Inspirada en los tradicionales clubes de caballeros ingleses, combina ricas hojas de tabaco aromático con notas golosas de vainilla dulce, cacao puro y frutos secos.",
    notas: {
      salida: "Hojas de tabaco noble, Notas especiadas cálidas",
      corazon: "Vainilla cremosa, Cacao, Haba tonka, Flor de tabaco",
      fondo: "Frutos secos confitados, Savia de madera dulce"
    }
  }
];

// Helper: Determinar si la página actual está dentro de la subcarpeta 'paginas/'
function esSubcarpeta() {
  const ruta = window.location.pathname.toLowerCase();
  return ruta.includes("/paginas/") || ruta.includes("\\paginas\\");
}

// Obtener ruta base relativa adecuada (./ o ../)
function obtenerRutaBase() {
  return esSubcarpeta() ? "../" : "./";
}

// Formatear precio en Pesos Chilenos (CLP)
function formatearPrecio(monto) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(monto);
}

// --- GESTIÓN DE SESIÓN DE USUARIO ---
function obtenerUsuarioActual() {
  try {
    const raw = localStorage.getItem("bergen_usuario_actual");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function cerrarSesion() {
  localStorage.removeItem("bergen_usuario_actual");
  mostrarToast("Has cerrado sesión exitosamente.");
  setTimeout(() => {
    const base = obtenerRutaBase();
    window.location.href = base + "index.html";
  }, 1000);
}

// --- GESTIÓN DEL CARRITO DE COMPRAS (LOCALSTORAGE) ---
function obtenerCarrito() {
  try {
    const raw = localStorage.getItem("bergen_carrito");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem("bergen_carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function contarTotalItems() {
  const carrito = obtenerCarrito();
  return carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

function actualizarContadorCarrito() {
  const badge = document.getElementById("cart-count-badge");
  if (badge) {
    const total = contarTotalItems();
    badge.textContent = total;
    badge.style.display = total > 0 ? "inline-flex" : "none";
  }
}

function agregarAlCarroGlobal(idProducto, cantidad = 1) {
  const producto = PRODUCTOS_PERFUMES.find(p => p.id === Number(idProducto));
  if (!producto) return;

  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === producto.id);

  if (index !== -1) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio,
      img: producto.img,
      volumen: producto.volumen,
      cantidad: cantidad
    });
  }

  guardarCarrito(carrito);
  mostrarToast(`¡${producto.nombre} agregado al carrito!`);
}

// Toast flotante de notificaciones
function mostrarToast(mensaje, tipo = "info") {
  let toastContainer = document.getElementById("bergen-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "bergen-toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${tipo}`;
  toast.innerHTML = `
    <span class="toast-icono">✨</span>
    <span class="toast-texto">${mensaje}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("mostrar"), 10);

  setTimeout(() => {
    toast.classList.remove("mostrar");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// --- INYECCIÓN DE HEADER Y FOOTER ---
function inyectarHeader() {
  const headerElem = document.getElementById("header");
  if (!headerElem) return;

  const base = obtenerRutaBase();
  const usuario = obtenerUsuarioActual();
  const totalItems = contarTotalItems();

  let linkUsuario = "";
  if (usuario) {
    const esAdmin = usuario.rol === "admin";
    linkUsuario = `
      <li class="menu-usuario">
        <span class="saludo-usuario">👤 ${usuario.nombre}</span>
        ${esAdmin ? `<a href="${base}paginas/admin.html" class="enlace-admin">Panel Admin</a>` : ""}
        <button onclick="cerrarSesion()" class="btn-logout" title="Cerrar Sesión">Salir</button>
      </li>
    `;
  } else {
    linkUsuario = `
      <li><a href="${base}paginas/login.html" class="btn-nav">Iniciar Sesión</a></li>
      <li><a href="${base}crearUsuario.html" class="btn-nav btn-nav-destacado">Registrarse</a></li>
    `;
  }

  headerElem.innerHTML = `
    <div class="top-bar-anuncio">
      <div class="contenedor flex-between">
        <span>🚚 Envío gratis por compras sobre $60.000 a todo Chile</span>
        <span>✨ 100% Fragancias Originales y de Diseñador</span>
      </div>
    </div>
    <div class="contenedor navbar-inner">
      <div class="logo">
        <a href="${base}index.html" class="logo-link">
          <img src="${base}imagenes/LogoPeque.jpg" alt="Bergen Perfumes Logo" class="logo-img">
          <span class="logo-texto">BERGEN <span>PERFUMES</span></span>
        </a>
      </div>

      <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menú" onclick="toggleMenuMovil()">
        <span></span><span></span><span></span>
      </button>

      <nav class="menu" id="menu-navegacion">
        <ul class="menu-izq">
          <li><a href="${base}index.html" class="nav-enlace">Inicio</a></li>
          <li><a href="${base}paginas/catalogo.html" class="nav-enlace">Catálogo</a></li>
          <li><a href="${base}index.html#nosotros" class="nav-enlace">Nosotros</a></li>
          <li><a href="${base}index.html#contacto" class="nav-enlace">Contacto</a></li>
        </ul>
        <ul class="menu-der">
          ${linkUsuario}
          <li>
            <a href="${base}paginas/carrito.html" class="btn-carrito" title="Ver Carrito">
              🛒 <span class="texto-carrito">Carrito</span>
              <span id="cart-count-badge" class="badge-carrito" style="${totalItems > 0 ? 'display:inline-flex' : 'display:none'}">${totalItems}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `;
}

function toggleMenuMovil() {
  const menu = document.getElementById("menu-navegacion");
  if (menu) {
    menu.classList.toggle("abierto");
  }
}

function inyectarFooter() {
  const footerElem = document.getElementById("footer");
  if (!footerElem) return;

  const base = obtenerRutaBase();

  footerElem.innerHTML = `
    <div class="contenedor footer-grid">
      <div class="footer-col">
        <div class="footer-logo">
          <img src="${base}imagenes/LogoPeque.jpg" alt="Bergen Perfumes" class="logo-img-footer">
          <h3>BERGEN PERFUMES</h3>
        </div>
        <p>Curaduría exclusiva de perfumería de diseñador y fragancias nicho del mundo árabe. Pasión, distinción y autenticidad en cada nota.</p>
        <div class="redes-sociales">
          <a href="https://www.instagram.com/bergenperfumes_chile?igsi=c2RhZWs4Mnk4cnhm" target="_blank" rel="noopener" class="insta" title="Instagram">
            📸 @bergenperfumes_chile
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h3>Explorar</h3>
        <ul class="footer-links">
          <li><a href="${base}index.html">Inicio</a></li>
          <li><a href="${base}paginas/catalogo.html">Catálogo Completo</a></li>
          <li><a href="${base}paginas/catalogo.html?categoria=Hombre">Perfumes para Hombre</a></li>
          <li><a href="${base}paginas/catalogo.html?categoria=Mujer">Perfumes para Mujer</a></li>
          <li><a href="${base}paginas/catalogo.html?categoria=Unisex">Perfumes Unisex & Nicho</a></li>
          <li><a href="${base}paginas/carrito.html">Mi Carrito de Compras</a></li>
        </ul>
      </div>

      <div class="footer-col" id="contacto">
        <h3>Contacto & Soporte</h3>
        <ul class="footer-info">
          <li><strong>📍 Ubicación:</strong> Santiago, Chile</li>
          <li><strong>📞 Teléfono:</strong> (+56) 9 1234 5678</li>
          <li><strong>✉️ Email:</strong> perfumes.bergen@gmail.com</li>
          <li><strong>⏰ Horario:</strong> Lun - Sáb: 10:00 a 20:00 hrs</li>
          <li><strong>🚚 Despacho:</strong> Mismo día comprando antes de las 12:00 PM</li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Suscríbete al Club Bergen</h3>
        <p>Recibe lanzamientos exclusivos, notas de cata olfativa y un <strong>10% de descuento</strong> con el cupón BERGEN10.</p>
        <form class="formulario-newsletter" onsubmit="suscribirNewsletter(event)">
          <input type="email" id="email-newsletter" placeholder="Tu correo electrónico" required>
          <button type="submit">Suscribirme</button>
        </form>
        <p id="msg-newsletter" class="msg-exito" style="display:none;"></p>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="contenedor flex-between">
        <p>&copy; ${new Date().getFullYear()} Bergen Perfumes SpA. Todos los derechos reservados.</p>
        <p class="medios-pago">🔒 Pagos 100% seguros vía Webpay Plus / Débito & Crédito</p>
      </div>
    </div>
  `;
}

function suscribirNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById("email-newsletter");
  const msg = document.getElementById("msg-newsletter");
  if (input && msg) {
    msg.textContent = "¡Gracias por unirte! Usa el cupón: BERGEN10";
    msg.style.display = "block";
    input.value = "";
    setTimeout(() => {
      msg.style.display = "none";
    }, 6000);
  }
}

// --- VALIDACIÓN DE RUT CHILENO (ALGORITMO MÓDULO 11) ---
function validarRutChileno(rutCompleto) {
  if (!rutCompleto) return false;
  let valor = rutCompleto.replace(/[\.\-\s]/g, "").toUpperCase();
  if (valor.length < 8 || valor.length > 9) return false;

  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1);

  if (!/^[0-9]+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado = "0";
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = resto.toString();

  return dv === dvEsperado;
}

// Formatear RUT automáticamente (ej: 12.345.678-K)
function formatearRut(rut) {
  let valor = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (valor.length <= 1) return valor;
  const dv = valor.slice(-1);
  let cuerpo = valor.slice(0, -1);
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return cuerpo + "-" + dv;
}

// --- VALIDACIÓN Y REGISTRO DE USUARIOS (crearUsuario.html) ---
function validarRegistro(event) {
  event.preventDefault();

  const rutInput = document.getElementById("rut");
  const nombreInput = document.getElementById("nombre");
  const apellidosInput = document.getElementById("apellidos");
  const correoInput = document.getElementById("correo");
  const claveInput = document.getElementById("clave");
  const clave2Input = document.getElementById("clave2");
  const direccionInput = document.getElementById("direccion");
  const errorGeneral = document.getElementById("error-registro-general");

  const rut = rutInput ? rutInput.value.trim() : "";
  const nombre = nombreInput ? nombreInput.value.trim() : "";
  const apellidos = apellidosInput ? apellidosInput.value.trim() : "";
  const correo = correoInput ? correoInput.value.trim() : "";
  const clave = claveInput ? claveInput.value : "";
  const clave2 = clave2Input ? clave2Input.value : "";
  const direccion = direccionInput ? direccionInput.value.trim() : "";

  function mostrarError(campoId, mensaje) {
    const errorSpan = document.getElementById(`error-${campoId}`);
    if (errorSpan) {
      errorSpan.textContent = mensaje;
      errorSpan.style.display = "block";
    }
  }

  function limpiarErrores() {
    document.querySelectorAll(".mensaje-error").forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });
    if (errorGeneral) {
      errorGeneral.style.display = "none";
      errorGeneral.textContent = "";
    }
  }

  limpiarErrores();
  let esValido = true;

  if (!rut) {
    mostrarError("rut", "Debe ingresar su RUT.");
    esValido = false;
  } else if (!validarRutChileno(rut)) {
    mostrarError("rut", "El RUT ingresado no es válido (Ej: 19.011.022-K).");
    esValido = false;
  }

  if (nombre.length < 2 || nombre.length > 50) {
    mostrarError("nombre", "El nombre debe tener entre 2 y 50 caracteres.");
    esValido = false;
  }

  if (apellidos.length < 2 || apellidos.length > 100) {
    mostrarError("apellidos", "Los apellidos deben tener entre 2 y 100 caracteres.");
    esValido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo) || !(correo.endsWith(".cl") || correo.endsWith(".com"))) {
    mostrarError("correo", "Ingrese un correo válido terminado en .cl o .com");
    esValido = false;
  }

  if (clave.length < 8) {
    mostrarError("clave", "La contraseña debe tener al menos 8 caracteres.");
    esValido = false;
  } else if (clave === clave.toLowerCase() || clave === clave.toUpperCase()) {
    mostrarError("clave", "Debe incluir al menos una letra mayúscula y una minúscula.");
    esValido = false;
  }

  if (clave !== clave2) {
    mostrarError("clave2", "Las contraseñas no coinciden.");
    esValido = false;
  }

  if (direccion.length < 5 || direccion.length > 120) {
    mostrarError("direccion", "La dirección debe tener entre 5 y 120 caracteres.");
    esValido = false;
  }

  if (!esValido) return false;

  let usuarios = [];
  try {
    const rawUsers = localStorage.getItem("bergen_usuarios");
    usuarios = rawUsers ? JSON.parse(rawUsers) : [];
  } catch (e) {
    usuarios = [];
  }

  if (usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase())) {
    mostrarError("correo", "Este correo ya se encuentra registrado. Inicia sesión.");
    return false;
  }

  const nuevoUsuario = {
    rut: rut,
    nombre: nombre,
    apellidos: apellidos,
    correo: correo,
    clave: clave,
    direccion: direccion,
    rol: "cliente",
    fechaRegistro: new Date().toISOString()
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("bergen_usuarios", JSON.stringify(usuarios));

  localStorage.setItem("bergen_usuario_actual", JSON.stringify({
    nombre: nombre,
    correo: correo,
    rol: "cliente"
  }));

  mostrarToast(`¡Bienvenido(a) a Bergen Perfumes, ${nombre}!`);

  const base = obtenerRutaBase();
  setTimeout(() => {
    window.location.href = base + "paginas/catalogo.html";
  }, 1200);

  return true;
}

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  inyectarHeader();
  inyectarFooter();
  actualizarContadorCarrito();

  const rutInput = document.getElementById("rut");
  if (rutInput) {
    rutInput.addEventListener("input", (e) => {
      e.target.value = formatearRut(e.target.value);
    });
  }
});

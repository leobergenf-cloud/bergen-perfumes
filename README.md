# 🌟 Bergen Perfumes - Plataforma E-Commerce de Alta Perfumería

> **Evaluación 1 - Fullstack II**  
> Proyecto web para tienda online de perfumes de diseñador y alta gama en Chile.

---

## 📋 Descripción del Proyecto

**Bergen Perfumes** es una aplicación web e-commerce enfocada en la venta y exhibición de perfumes de diseñador de marcas como Ralph Lauren e Yves Saint Laurent.

El proyecto cuenta con una arquitectura frontend limpia, modular y responsiva construida con **HTML5 semántico**, **CSS3 moderno (Flexbox, Grid y Variables CSS)** y **JavaScript vanilla** con persistencia en `localStorage`.

---

## ✨ Características Principales

### 1. 🏠 Página Principal (`index.html`)
- **Hero Banner de Lujo:** Presentación visual con llamados a la acción (CTA) directos.
- **Barra de Propuestas de Valor:** Beneficios de compra (Envío gratis sobre \$60.000, 100% originales, despacho express en RM, pago seguro).
- **Vitrina de Perfumes Más Deseados:** Tarjetas de fragancias con badges, precios en CLP, botón de vista rápida y agregar al carro.
- **Sección Sobre Nosotros:** Historia, garantías y enlaces a redes sociales oficiales.

### 2. 🛍️ Catálogo Interactivo (`paginas/catalogo.html`)
- **Renderizado Dinámico:** Generación de tarjetas a partir de un arreglo centralizado de productos.
- **Buscador en Tiempo Real:** Búsqueda predictiva por nombre de perfume, marca o notas olfativas.
- **Filtros por Categoría y Marca:** Hombre, Mujer, Ralph Lauren, Yves Saint Laurent.
- **Ordenamiento:** Precio (menor a mayor / mayor a menor) y alfabético (A-Z).
- **Mini-Resumen de Compra:** Barra lateral con cálculo reactivo de subtotal y envío.

### 3. 🔍 Detalle del Producto (`paginas/detalle_producto.html`)
- **Carga Dinámica por URL:** Uso de `URLSearchParams` para obtener el producto mediante `?id=X`.
- **Pirámide Olfativa Completa:** Desglose de Notas de Salida, Notas de Corazón y Notas de Fondo.
- **Selector de Cantidades:** Control de unidades con límite según stock disponible.
- **Garantías y Beneficios:** Sellos de autenticidad y despacho.
- **Recomendaciones Cruzadas:** Muestra fragancias similares sugeridas.

### 4. 🛒 Carrito de Compras & Checkout (`paginas/carrito.html`)
- **Gestión Completa de Carrito:** Incrementar, decrementar y eliminar productos.
- **Barra de Progreso para Envío Gratis:** Notificación dinámica de cuánto falta para calificar a despacho gratuito (\$60.000).
- **Sistema de Cupones de Descuento:** Aplica el cupón `BERGEN10` para obtener un 10% de descuento automático.
- **Simulador de Checkout:** Formulario de despacho con selección de comuna y medios de pago chilenos (Webpay Plus y Transferencia Bancaria).
- **Comprobante de Orden:** Genera un número de pedido único y guarda la transacción en `localStorage`.

### 5. 🔐 Autenticación y Registro (`paginas/login.html` & `crearUsuario.html`)
- **Validación de RUT Chileno (Algoritmo Módulo 11):** Verificación matemática del dígito verificador.
- **Validación de Contraseñas:** Mínimo 8 caracteres, combinación de mayúsculas y minúsculas, y confirmación idéntica.
- **Persistencia de Usuarios:** Registro guardado en `localStorage` con sesión persistente.
- **Header Reactivo:** Muestra el nombre del usuario conectado, avatar, enlace a panel admin y opción de cerrar sesión.

### 6. 📊 Panel de Administración (`paginas/admin.html`)
- **Métricas Clave en Vivo:** Ventas totales en CLP, número de pedidos, catálogo activo y clientes registrados.
- **Historial de Pedidos:** Tabla con detalle de cliente, fragancias compradas, medio de pago y estado.
- **Control de Inventario:** Listado de stock disponible por cada fragancia.
- **Simulador de Ventas:** Botón para simular ventas y verificar la reactividad del dashboard.

---

## 🔑 Cuentas de Acceso para Pruebas (Demo)

| Rol | Correo Electrónico | Contraseña | Destino tras Login |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@admin.cl` | `admin` | `paginas/admin.html` |
| **Cliente Demo** | `cliente@bergen.cl` | `12345678` | `paginas/catalogo.html` |
| **Nuevo Cliente** | *Cualquier correo registrado en `crearUsuario.html`* | *La elegida al registrar* | `paginas/catalogo.html` |

---

## 📂 Estructura del Proyecto

```text
Evaluacion1_Fullstack-main/
│
├── index.html                   # Página de Inicio
├── crearUsuario.html            # Formulario de Registro con RUT Módulo 11
├── vercel.json                  # Configuración oficial para despliegue en Vercel
├── package.json                 # Metadatos del proyecto y scripts npm
├── server.js                    # Servidor local sin dependencias (Node.js)
├── README.md                    # Documentación del proyecto
│
├── estilos/
│   ├── estilo.css               # Estilos globales, header, footer, hero y admin
│   ├── catalogo.css             # Estilos de catálogo, detalle de producto y carrito
│   └── estiloCrearUser.css      # Estilos del formulario de registro
│
├── paginas/
│   ├── admin.html               # Dashboard del Administrador
│   ├── catalogo.html            # Catálogo con filtros y búsqueda
│   ├── detalle_producto.html    # Ficha técnica del perfume y pirámide olfativa
│   ├── carrito.html             # Carrito de compras y simulador de pago
│   └── login.html               # Formulario de inicio de sesión
│
├── scripts/
│   ├── script.js                # Core: Base de datos, inyección header/footer, carrito global, RUT
│   ├── catalogo.js              # Lógica de filtros, búsqueda, detalle y sugerencias
│   ├── carrito.js               # Gestión de carrito, cupones y checkout
│   ├── login.js                 # Autenticación y roles de usuario
│   └── admin.js                 # Métricas y registro de órdenes
│
└── imagenes/                    # Imágenes y logos de alta calidad
    ├── 263-Polo-Blue.webp
    ├── 267-Polo-Green.webp
    ├── 269-Polo-Black.webp
    ├── 272-Polo-Red.webp
    ├── 274-Big-Pony.webp
    ├── 275-Libre.webp
    ├── delivery-truck.webp
    ├── Logo.webp
    ├── LogoPeque.jpg
    └── fondo.png
```

---

## ☁️ Integración y Despliegue en Vercel

El proyecto incluye el archivo [`vercel.json`](./vercel.json) preconfigurado para Vercel:

### Opción 1: Conectar con GitHub (Recomendado)
1. Sube los cambios a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "Integración con Vercel y mejoras completas"
   git push origin main
   ```
2. Entra a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New..."** → **"Project"**.
4. Selecciona tu repositorio `Evaluacion1_Fullstack`.
5. En *Framework Preset*, déjalo en **Other** (el `vercel.json` se encarga de todo).
6. Presiona **Deploy**. ¡En menos de 1 minuto tendrás tu enlace público `https://tu-proyecto.vercel.app` para ver y compartir las páginas!

### Opción 2: Despliegue directo por terminal con Vercel CLI
En la terminal de la carpeta del proyecto, ejecuta:
```bash
npm run deploy
```
o
```bash
npx vercel
```
Sigue las instrucciones en pantalla para iniciar sesión en Vercel y desplegarlo al instante.

---

## 💻 Cómo Ver las Páginas Localmente

### Opción A: Servidor Local Integrado (Recomendado)
Ejecuta en tu terminal:
```bash
node server.js
```
o también:
```bash
npm start
```
Esto abrirá automáticamente en tu navegador:  
👉 **`http://localhost:3000`**

### Opción B: Extensión Live Server de VS Code
Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

### Opción C: Doble Clic Directo
Haz doble clic sobre `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari). Todas las rutas son compatibles con `file:///`.
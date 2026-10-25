/**
 * BERGEN PERFUMES - Servidor de Desarrollo Local
 * Cero dependencias externas (usa módulos nativos de Node.js).
 * Ejecutar con: node server.js
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const REDIRECTS = {
  "/catalogo": "/paginas/catalogo.html",
  "/carrito": "/paginas/carrito.html",
  "/login": "/paginas/login.html",
  "/admin": "/paginas/admin.html",
  "/registro": "/crearUsuario.html"
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  // Redirecciones amigables
  if (REDIRECTS[pathname]) {
    res.writeHead(302, { Location: REDIRECTS[pathname] });
    return res.end();
  }

  // Si piden raíz, servir index.html
  if (pathname === "/") {
    pathname = "/index.html";
  }

  const safePath = path.normalize(path.join(BASE_DIR, pathname));

  // Seguridad: evitar directory traversal
  if (!safePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("403 - Acceso Denegado");
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Intentar agregar .html si no tiene extensión
      if (!path.extname(safePath)) {
        const htmlPath = safePath + ".html";
        if (fs.existsSync(htmlPath)) {
          return serveFile(htmlPath, res);
        }
      }

      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #0C4550;">404 - Página no encontrada</h1>
          <p>No se encontró la ruta: <code>${pathname}</code></p>
          <a href="/" style="color: #D4AF37; font-weight: bold;">Volver al Inicio</a>
        </div>
      `);
    }

    serveFile(safePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("500 - Error interno del servidor");
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": ext === ".webp" || ext === ".jpg" ? "public, max-age=86400" : "no-cache"
    });
    res.end(data);
  });
}

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log("==================================================");
  console.log(" ✨ BERGEN PERFUMES - SERVIDOR LOCAL EN LÍNEA");
  console.log(` 🌐 URL: ${url}`);
  console.log(" 🛑 Para detener el servidor presiona Ctrl + C");
  console.log("==================================================");

  // Abrir navegador en Windows automáticamente
  if (process.platform === "win32") {
    exec(`start ${url}`);
  }
});

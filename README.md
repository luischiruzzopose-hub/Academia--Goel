# Academia de Choferes Goel — página web

Sitio estático (HTML + CSS + JavaScript, sin instalar nada), pensado primero para celulares.

## Qué hay en la carpeta

| Archivo / carpeta | Para qué sirve |
|---|---|
| `index.html` | Página principal |
| `simulacro.html` | Simulacro del examen teórico |
| `css/estilos.css` | Colores, letras y diseño (los colores están arriba de todo, en `:root`) |
| `js/simulacro.js` | Funcionamiento del simulacro (10 preguntas fijas + 20 al azar) |
| `data/preguntas.json` | Las 91 preguntas del simulacro y sus respuestas |
| `img/` | Logo, portada, autos, alumnos y señales |
| `docs/Guia-Nacional-de-Conduccion.pdf` | Manual de conducción |

## Publicarla gratis con GitHub Pages

1. Entrá a <https://github.com> y creá una cuenta (o iniciá sesión).
2. Arriba a la derecha: **+ → New repository**. Nombre: `academia-goel`. Dejalo **Public** y tocá **Create repository**.
3. En el repositorio nuevo, tocá **uploading an existing file**.
4. Descomprimí el zip en tu computadora y **arrastrá todo el contenido de la carpeta** `academia-goel` (no la carpeta en sí: `index.html` tiene que quedar en la raíz). Tocá **Commit changes**.
5. Andá a **Settings → Pages**. En *Source* elegí **Deploy from a branch**, rama **main**, carpeta **/ (root)** y tocá **Save**.
6. Esperá 1 o 2 minutos y recargá: arriba aparece la dirección, del estilo `https://TU-USUARIO.github.io/academia-goel/`.

Para cambiar algo después: abrí el archivo en GitHub, tocá el lápiz ✏️, editá y **Commit changes**. En un minuto se actualiza.

### Dominio propio (opcional)
Si compran un dominio (por ejemplo `academiagoel.com.uy`), se configura en **Settings → Pages → Custom domain**.

## Cambios comunes

- **Precios, textos o teléfonos:** en `index.html` (buscá el texto con Ctrl+F).
- **Número de WhatsApp:** buscá `wa.me/59892530639` en `index.html` y `simulacro.html`.
- **Cantidad de preguntas del simulacro:** arriba de `js/simulacro.js` (`FIJAS` y `ALEATORIAS`). Las fijas son las primeras del archivo `data/preguntas.json`.
- **Agregar una pregunta:** en `data/preguntas.json`, copiá un bloque y cambiá el texto. `"c"` es la respuesta correcta contando desde 0 (0 = A, 1 = B, 2 = C…).
- **Fotos de alumnos:** reemplazá los archivos en `img/alumnos/` con el mismo nombre (ideal: verticales, unos 600 px de ancho).

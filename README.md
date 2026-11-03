# AC4 Group — sitio web

Landing one-page (ES / EN) y páginas legales de AC4 Group. Vite + React + TypeScript + Tailwind CSS v4.
Publicado en GitHub Pages: https://leunamzerep.github.io/AC4GROUP/ · Mantenimiento: Zumia Solutions.

## Correr en local

Probado con Node 24 y npm 11.

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173/AC4GROUP/
npm run build      # genera dist/ (HTML prerenderizado de cada página)
npm run preview    # sirve dist/ en http://localhost:4173/AC4GROUP/
npm run lint
```

## Dónde editar

| Qué | Dónde |
|---|---|
| Textos de la landing (español) | `src/content/es.json` |
| Textos de la landing (inglés) | `src/content/en.json` (debe tener la misma estructura que `es.json`) |
| **Precios y características de los paquetes** | `src/content/es.json` y `en.json` → `packages.plans` (`price`, `features`) |
| Mensaje de WhatsApp | `whatsappMessage` en `es.json` y `en.json` |
| Teléfono, correo, Instagram, **Facebook**, crédito | `src/content/site.ts` (si `facebook` queda vacío, el botón no se muestra) |
| Título y descripción para Google | `seo` en `es.json` y `en.json` |
| Términos y Política de Privacidad | `src/content/legal/{es,en}/*.md` (la fecha va en la línea `META: updated=...` de cada archivo) |
| Logo de AMAB y ondas | `src/assets/img/` y `src/content/images.ts` |
| Colores, tipografías y espacios | `src/styles/ds/*.css` (design system) |

Los textos legales y las traducciones al inglés están pendientes de revisión: ver `docs/TRADUCCIONES_REVISAR.md`.

## Animaciones

Todas las duraciones y curvas están en **`src/motion.ts`** (aparición al hacer scroll, hover, brillo del botón,
haz del proceso, contador, aurora). Cambia los números ahí y vuelve a compilar.
Con "reducir movimiento" activado en el sistema, el sitio no se desplaza: solo cambia la opacidad.

## Privacidad

El sitio no usa cookies, píxeles, analítica ni recursos de terceros (fuentes e íconos van incluidos).
Lo único que se guarda en el navegador es la preferencia de idioma (`localStorage`, clave `ac4-lang`).
Si agregas algo que cargue recursos externos, también hay que actualizar la Política de Privacidad.

## Cómo funciona el prerender

`npm run build` compila el sitio, compila la versión de servidor y ejecuta `scripts/prerender.mjs`, que escribe
un `index.html` por ruta (`/`, `/en/`, `/terminos/`, `/privacidad/`, `/en/terms/`, `/en/privacy/`), el `404.html`,
`sitemap.xml` y `robots.txt`. Para agregar una página nueva: crea la ruta en `src/i18n.ts` (`PATHS`) y su
componente en `src/pages/`.

## Despliegue

El sitio se publica solo con GitHub Actions (`.github/workflows/deploy.yml`) cada vez que se hace push a `main`
(también se puede lanzar a mano en la pestaña Actions → "Run workflow"). El workflow instala con `npm ci`,
corre `npm run lint` y `npm run build`, y publica `dist/`.

Primera vez (una sola vez, en GitHub): crear el repositorio `AC4GROUP` (mayúsculas incluidas) y, en
Settings → Pages → Source, elegir **GitHub Actions**. La base `'/AC4GROUP/'` está en `vite.config.ts`;
si cambia el nombre del repo o el dominio, hay que actualizarla y también `SITE.url` en `src/content/site.ts`
y `SITE_URL` en `scripts/prerender.mjs`.

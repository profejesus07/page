# Profe Jesús Álvarez — Sitio web

Homepage del espacio educativo personal de Jesús Álvarez: contenidos académicos, gamificación,
recursos digitales y plataforma de exámenes.

## Stack

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS v4** (configuración por CSS en `src/index.css`, sin `tailwind.config.js`)
- **React Router** — rutas ya preparadas para las futuras secciones
- **lucide-react** para iconografía

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # type-check + build de producción
npm run preview  # sirve el build de producción localmente
npm run lint     # oxlint
```

## Estructura

```
src/
  assets/images/     imágenes del sitio (avatar, etc.)
  components/
    layout/           Header, Footer, Layout, ScrollToTop
    home/              secciones de la homepage (Hero, CategoryCards, Services, About, BlogPreview)
    ui/                piezas reutilizables (Button, Container, FadeIn, SectionHeading)
    icons/             iconos SVG propios (redes sociales)
  data/                contenido editable: categorías, servicios, blog, navegación, enlaces
  pages/               páginas ruteadas (HomePage, ComingSoonPage, NotFoundPage)
  types/               tipos compartidos de contenido
```

## Editar contenido

Todo el contenido de la homepage vive en `src/data/*.ts` (nada está "hardcodeado" en los
componentes):

- `siteLinks.ts` — **enlaces externos** (redes sociales). Vienen vacíos a propósito; mientras un
  campo quede en `""` el ícono se muestra deshabilitado en el Footer. Rellena aquí las URLs reales.
- `categories.ts`, `services.ts`, `blogPosts.ts`, `navigation.ts`, `social.ts` — textos, iconos y
  enlaces internos de cada sección.

`blogPosts.ts` está tipado para poder reemplazarse más adelante por el resultado de una consulta a
un CMS o base de datos sin tocar `BlogPreview.tsx`.

## Arquitectura preparada para crecer

Las rutas `/contenidos`, `/gamificacion`, `/recursos`, `/examenes`, `/servicios`, `/blog`,
`/login` y `/admin` ya existen en `src/App.tsx` (con una página "Próximamente" de por medio) para
que cada una se reemplace por su implementación real sin reestructurar el ruteo ni el layout.

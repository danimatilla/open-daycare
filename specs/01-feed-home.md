# SPEC 01 — Home: feed de la sala

> **Estado:** Implemented
> **Depende de:** —
> **Fecha:** 2026-11-19
> **Objetivo:** Reemplazar la home de Next.js por el feed de la sala Soles, replicando el mockup `references/screens/feed.dc.html` con datos mock en memoria y soporte responsive.

## Por qué existe esta spec

El repo sigue en estado create-next-app. Esta spec establece la primera pantalla real y, con ella, el sistema visual base (paleta, tipografías, layout y navegación) que reutilizarán las pantallas futuras.

## Scope

**In:**

- Home en `/` (`app/page.tsx`) con sidebar, CTA de composición, encabezado de sección y los 3 posts del mockup.
- Tokens visuales de la paleta en `app/globals.css`.
- Fredoka (títulos) y Nunito (cuerpo) vía `next/font/google`, aplicadas globalmente.
- `lang="es"` y metadata `OpenDayCare`.
- Desktop fiel al mockup desde 1024px: sidebar de 248px, contenido centrado de 760px, scroll interno.
- Móvil por debajo de 1024px: top bar con logo, avatar, logout y hamburguesa; drawer lateral con CTA y navegación.
- Drawer accesible: overlay, cierre con Escape, clic afuera y botón de cerrar, bloqueo de scroll, `aria-expanded`/`aria-modal`, foco inicial en cerrar, trap de Tab y restauración de foco al disparador.
- Datos mock tipados en `app/lib/feed.ts` y navegación en `app/lib/navigation.ts`.
- Enlaces del mockup inertes con `href="#"`; no se crean rutas nuevas.
- Render estático: todo server component salvo el drawer.

**Fuera de alcance (para futuras specs):**

- Autenticación, login, sesión y permisos.
- Base de datos, API routes, server actions y persistencia.
- Likes, comentarios y edición interactivos; los contadores quedan estáticos.
- Pantallas de crear publicación, niños, avisos, mi cuenta, detalle y foto.
- Imágenes reales: el post de actividad conserva el placeholder punteado.
- Modo oscuro.
- Fecha dinámica: el subtítulo usa el texto fijo del mockup.
- Tests automatizados (el repo no tiene runner).

## Data model

```ts
// app/lib/feed.ts
export type PostKind = "achievement" | "activity" | "announcement";
export type AuthorVariant = "child" | "system";

export type FeedPost = {
  id: string;
  kind: PostKind;
  authorName: string;
  authorInitials: string;
  authorVariant: AuthorVariant;
  time: string;          // "14:20"
  audience: string;      // "Para: familia de Mateo"
  body: string;
  photoLabel?: string;   // "Foto · pintando con témperas"
  likes: number;
  comments: number;
};

export const teacher = {
  name: "Caro Giménez",
  initials: "C",
  role: "Maestra · Soles",
  room: "Sala Soles",
  greeting: "Buenas, Caro",
  summary: "12 niños · martes 17 jun",
};

export const feedPosts: FeedPost[] = [
  // achievement, activity and announcement posts copied from the mockup
];
```

```ts
// app/lib/navigation.ts
export type NavIconName = "home" | "children" | "bell" | "user";

export type NavItem = {
  id: "feed" | "children" | "notices" | "account";
  label: string;
  icon: NavIconName;
  active?: boolean;
};

export const navItems: NavItem[] = [
  { id: "feed", label: "Feed", icon: "home", active: true },
  { id: "children", label: "Niños", icon: "children" },
  { id: "notices", label: "Avisos", icon: "bell" },
  { id: "account", label: "Mi cuenta", icon: "user" },
];
```

Convenciones:

- Los tipos y sus valores son en inglés; las etiquetas visibles en español (`LOGRO`, `ACTIVIDAD`, `ANUNCIO`) viven en el mapa de `PostKindBadge`.
- Los estilos por `kind` y por `authorVariant` se resuelven con mapas de clases Tailwind completas, nunca con template strings, para que el scanner las detecte.
- Los colores viven como tokens en `@theme inline` (`--color-cream`, `--color-surface`, `--color-ink`, `--color-brand`, `--color-coral`, `--color-line`, tokens por tipo de post y avatar).
- El texto "12 niños · martes 17 jun" y los contadores quedan fijos por decisión explícita.

## Implementation plan

1. **Base visual.** En `app/globals.css`, reemplazar el tema de create-next-app por los tokens de la paleta, el fondo `#F6ECDF`, tipografía base Nunito y scrollbar del mockup; eliminar el bloque `prefers-color-scheme: dark`. En `app/layout.tsx`, cargar Fredoka y Nunito con `next/font/google` (`variable: --font-fredoka` / `--font-nunito`), poner `lang="es"` y actualizar metadata. Verificación: `npm run dev` muestra fondo crema y ambas fuentes.

2. **Datos mock.** Crear `app/lib/feed.ts` y `app/lib/navigation.ts` con los tipos, `teacher`, `feedPosts` y `navItems` del mockup.

3. **Iconos.** Crear `app/components/icons.tsx` con los SVG reutilizables (sol, plus, home, niños, campana, usuario, logout, corazón, comentario, cámara, imagen, megáfono, menú, cerrar), todos con `className` y `aria-hidden`.

4. **Sidebar desktop.** Crear `app/components/Sidebar.tsx`: logo + Sala Soles, CTA "Nueva publicación", navegación con Feed activo y bloque de perfil con logout. Visible solo desde `lg` (`hidden lg:flex`), sticky a `h-dvh`.

5. **Feed.** Crear `app/components/PostComposer.tsx`, `app/components/PostCard.tsx` y `app/components/PostKindBadge.tsx`. En `app/page.tsx`, montar el saludo, el composer, el separador "PUBLICADO HOY" y el listado de los 3 posts, con el ancho de 760px y el padding del mockup. Verificación: desktop completo sin errores de consola.

6. **Móvil.** Crear `app/components/MobileNavigation.tsx` (`"use client"`): top bar sticky (`lg:hidden`) con logo, avatar, logout y hamburguesa, más drawer lateral con overlay, CTA y navegación. Implementar estado abierto/cerrado, Escape, clic en overlay, scroll lock, foco inicial, trap de Tab y restauración de foco. Ajustar en `app/page.tsx` el shell (`min-h-dvh`, main con `lg:h-dvh lg:overflow-y-auto`) y los paddings responsive. Verificación: a 390px no hay scroll horizontal y el drawer cumple todas las interacciones.

7. **Verificación visual.** Ejecutar `npm run lint`, `npx tsc --noEmit` y `npm run build`. Con Playwright, guardar `.playwright-mcp/home-desktop.png` (1440×900), `.playwright-mcp/home-mobile.png` (390×844) y `.playwright-mcp/home-mobile-drawer.png`, y corregir diferencias de spacing, colores y tipografía contra el mockup.

## Acceptance criteria

- [x] `/` renderiza el feed con sidebar de 248px y contenido de 760px a 1024px de ancho o más.
- [x] A 390px de ancho se ve la top bar con logo, avatar, logout y hamburguesa, sin scroll horizontal.
- [x] El drawer abre desde la izquierda y muestra el CTA y los 4 ítems de navegación.
- [x] El drawer se cierra con Escape, con el botón de cerrar y con clic en el overlay.
- [x] Con el drawer abierto el fondo no scrollea y el foco queda atrapado dentro.
- [x] Se muestran los 3 posts con su tipo, autor, hora, audiencia, texto y contadores; el de actividad incluye el placeholder "Foto · pintando con témperas".
- [x] Los títulos usan Fredoka y el cuerpo Nunito; la paleta coincide con `#F6ECDF`, `#FFFDF9`, `#3F362E`, `#D9583C`; no quedan Geist ni estilos de tema oscuro.
- [x] Todos los enlaces placeholder usan `href="#"`; no existe ninguna ruta nueva además de `/`.
- [x] Likes y comentarios son texto estático, sin handlers.
- [x] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [x] Existen las tres capturas en `.playwright-mcp/` y no muestran diferencias de layout, color ni tipografía contra `references/screens/feed.dc.html`.

## Decisions

- **Sí:** componentizar (`Sidebar`, `MobileNavigation`, `PostComposer`, `PostCard`, `PostKindBadge`, `icons`) con datos en `app/lib/`. La home queda legible y lista para enchufar datos reales sin reescribir el markup.
- **No:** todo inline en `page.tsx`. Sería fiel al HTML pero repetitivo y difícil de mantener.
- **Sí:** Tailwind v4 con tokens en `globals.css`. Es el setup del repo (sin `tailwind.config.*`) y centraliza la paleta.
- **No:** inline styles o CSS Modules. Duplicarían valores por componente.
- **Sí:** enlaces inertes con `href="#"` y `aria-disabled`. Evita inventar rutas antes de sus specs.
- **No:** páginas placeholder. Generarían código muerto.
- **Sí:** drawer hamburguesa en móvil, con top bar de avatar + logout (decisión del usuario).
- **Sí:** implementación accesible del drawer (Escape, overlay, scroll lock, foco y trap de Tab). Es barato ahora y evita retrabajo.
- **Sí:** página estática con un único client component. No hay estado de datos que justifique más.
- **No:** likes o comentarios interactivos. Fuera del alcance sin persistencia.
- **Sí:** texto fijo "12 niños · martes 17 jun". Decisión del usuario; una spec futura lo hará dinámico.
- **Sí:** Fredoka + Nunito con `next/font/google`, auto-hospedadas en build.
- **No:** modo oscuro. El mockup es light-only.
- **Sí:** capturas Playwright como verificación visual.
- **No:** tests automatizados. No hay runner instalado y la spec es de UI estática.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| `next/font/google` requiere red durante el build | Verificarlo en el paso 1; si el entorno es offline, bajar los `.woff2` y usar `next/font/local`. |
| `100vh` en móvil salta con la barra del navegador | Usar `min-h-dvh`/`h-dvh` y probar a 390×844. |
| `cacheComponents` y `partialPrefetching` activos | La home no usa `cookies()`, `headers()` ni fetch; queda estática sin necesidad de Suspense. |
| Tailwind no genera clases armadas dinámicamente | Mapas de clases completas por `kind`/`avatar`, sin interpolación. |
| El texto "martes 17 jun" queda desactualizado | Aceptado: es contenido mock; se reemplaza cuando existan datos reales. |

## What is **not** in this spec

- Autenticación, sesión y permisos.
- Base de datos y persistencia.
- Likes, comentarios y edición funcionales.
- Pantallas distintas de `/`.
- Fecha y contadores dinámicos.
- Modo oscuro.
- Tests automatizados.

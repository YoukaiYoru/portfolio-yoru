# Edward Oliva — Portfolio

Portfolio inspirado en la interfaz de Final Fantasy VII Remake. Está construido con Astro, Vue, Tailwind CSS v4 y TresJS.

## Comandos

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Estructura

```text
src/
├── assets/
│   ├── icons/        # SVG usados por la interfaz
│   └── images/       # Imágenes procesadas por Astro
├── components/
│   ├── about/        # Retrato, HUD y habilidades
│   ├── common/       # Reproductor, reloj y controles compartidos
│   ├── content/      # Tarjetas de proyectos, experiencia y contacto
│   ├── game/         # Marco visual, menú, materia y paneles FFVII
│   └── home/         # Escena 3D y menú de inicio
├── data/             # Contenido reemplazable del portfolio
├── layouts/          # Layout de inicio y layout interno
├── pages/            # Rutas de Astro
└── styles/           # Tema Tailwind y estilos base globales
```

Los recursos estáticos que deben conservar su URL pública viven en `public/`. La carpeta `FF UI Figma/` contiene únicamente referencias de diseño; el código de producción no importa archivos desde ella.

## Estilos

Los tokens de color y tipografía están definidos mediante `@theme` en `src/styles/global.css`. Se prefieren utilidades Tailwind para layout, responsive, espaciado, tipografía y estados. El CSS encapsulado de cada componente se reserva para pseudo-elementos, máscaras, SVG y fondos multicapa donde una utilidad arbitraria sería menos legible.

El contenido editable se centraliza en `src/data/portfolio.ts`.

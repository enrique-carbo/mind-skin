# MindSkin

> Herramienta digital minimalista para gestionar el estrés y la ansiedad que impactan negativamente en la salud de la piel.

MindSkin es una aplicación web construida con **Astro 6**, **React 19**, **Tailwind CSS 4** y desplegada en **Cloudflare Pages**. Ofrece meditación guiada, ejercicios de respiración, registro de estado de ánimo y contenido educativo psicodermatológico, todo con un enfoque minimalista y respetuoso de la privacidad (los datos se almacenan localmente).

## 🚀 Tecnologías principales

- [Astro 6](https://astro.build/) – Framework web con islas de componentes.
- [React 19](https://react.dev/) – Componentes interactivos.
- [Tailwind CSS 4](https://tailwindcss.com/) – Estilos utilitarios modernos.
- [Lucide React](https://lucide.dev/) – Iconos consistentes.
- [Cloudflare Pages](https://pages.cloudflare.com/) – Hosting y despliegue continuo.
- [pnpm](https://pnpm.io/) – Gestor de paquetes (requerido).

## 📦 Requisitos previos

- Node.js **>=22.12.0** (recomendado usar la versión LTS)
- pnpm (el proyecto lo exige mediante `preinstall`)

## 🛠️ Instalación y desarrollo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/mindskin.git
   cd mindskin
   ```

2. Instala dependencias:
   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

4. Abre [http://localhost:4321](http://localhost:4321) para ver la app.

## 🧱 Estructura del proyecto

```
mindskin/
├── public/              # Archivos estáticos (logo.svg, favicon, etc.)
├── src/
│   ├── assets/          # Imágenes, fuentes (si las hay)
│   ├── components/
│   │   ├── react/       # Componentes React
│   │   │   ├── ui/      # Componentes base (Button, Card, Badge, Progress)
│   │   │   ├── utils/   # Helpers (localStorage, sonidos, constantes)
│   │   │   ├── MindSkinApp.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MeditationSection.tsx
│   │   │   ├── BreathingSection.tsx
│   │   │   ├── MoodSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── StopExercise.tsx
│   │   │   ├── BodyScan.tsx
│   │   │   ├── Grounding54321.tsx
│   │   │   └── DynamicIcon.tsx
│   │   └── (otros componentes Astro)
│   ├── layouts/
│   │   └── Layout.astro # Layout principal con metadatos y fuentes
│   ├── pages/
│   │   └── index.astro  # Página principal
│   └── styles/
│       └── globals.css  # Tailwind y estilos globales
├── astro.config.mjs     # Configuración de Astro, fuentes y adapter Cloudflare
├── tailwind.config.js   # (opcional, con Tailwind 4 se usa CSS en su lugar)
├── package.json
└── README.md
```

## 🧠 Funcionalidades

### 🧘 Meditación
- Temporizador con duración personalizable (1, 5, 10, 20 minutos).
- Sonido de campana tibetana al inicio y al final.
- Pausa y reinicio.

### 🌬️ Respiración de caja (4-4-4-4)
- Animación visual guiada.
- Contador de ciclos completados.
- Ejercicios complementarios: **STOP**, **Body Scan** y **Grounding 5-4-3-2-1**.

### 😊 Registro de estado de ánimo
- Selección diaria (5 niveles, con iconos de Lucide).
- Visualización de los últimos 7 días con barras de progreso.
- Tendencia (mejorando, estable, necesita atención).
- Datos guardados **solo en el dispositivo** (localStorage).

### 📚 Educación psicodermatológica
- 6 tarjetas educativas con información científica y tips prácticos.
- Navegación por carrusel o vista general.
- Aviso médico complementario.

## 🎨 Personalización de estilos

El proyecto usa **Tailwind CSS 4** con configuración basada en CSS. Para modificar colores, fuentes o temas, edita `src/styles/globals.css` dentro de la directiva `@theme`:

```css
@theme {
  --font-sans: var(--font-geist-sans, system-ui, sans-serif);
  --font-mono: var(--font-geist-mono, monospace);
  /* Añade aquí tus variables de color, etc. */
}
```

Las fuentes **Geist** y **Geist Mono** se cargan mediante la API de fuentes de Astro (provider de Google Fonts) y se sirven localmente.

## 🚢 Despliegue en Cloudflare Pages

El proyecto está preparado para desplegarse en Cloudflare Pages con el adapter `@astrojs/cloudflare`.

1. Conecta tu repositorio a Cloudflare Pages.
2. Configura los siguientes valores:
   - **Framework preset**: `Astro`
   - **Comando de construcción**: `pnpm build`
   - **Directorio de salida**: `dist`
3. (Opcional) Añade variables de entorno si son necesarias.
4. Haz clic en **Deploy**.

El sitio se generará como estático + funciones edge (si usas SSR, aunque en este caso es mayormente estático). La app es completamente funcional sin servidor.

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Genera la build de producción en `dist/` |
| `pnpm preview` | Previsualiza la build localmente |
| `pnpm generate-types` | Genera tipos de Cloudflare (Wrangler) |
| `pnpm astro` | Ejecuta comandos de Astro (ej. `astro add`) |

## 🔒 Privacidad

- No se envía ningún dato a servidores externos.
- El registro de estado de ánimo se almacena **exclusivamente en el almacenamiento local del navegador**.
- No hay cookies ni trackers.

---

Desarrollado con ❤️ para el cuidado de la piel y la mente.

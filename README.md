# 🚀 GTN - Laboratorio de Frontend Avanzado
> **Gestoría Técnica Notarial · Fase 1: Tooling de Nueva Generación & Design Systems**

Sistema de gestión, normalización de documentos y soporte técnico para escribanías. Este repositorio documenta el aprendizaje, la arquitectura y el despliegue del entorno de desarrollo profesional utilizando **Vite** y **Tailwind CSS v4**.

---

## 🛠️ Stack Tecnológico & Arquitectura

* **Entorno de Ejecución:** Node.js (con especificación de módulos nativos `ESModules` via `"type": "module"`).
* **Empaquetador / Build Tool:** [Vite v8+](https://vitejs.dev/) (Compilación instantánea basada en ES Modules nativos y transformaciones en caliente con HMR).
* **Framework de Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Motor Oxide nativo + tokens de diseño personalizados via `@theme`).
* **Control de Versiones:** Git & GitHub Codespaces.

---

## 📂 Anatomía del Proyecto

```text
gtn-frontend-lab/
├── node_modules/       # Dependencias instaladas por npm (no se suben al repo)
├── public/             # Recursos estáticos crudos
├── src/                # Código fuente principal
│   ├── main.js         # Lógica interactiva de UI (Toggle de tema)
│   └── style.css       # Estilos globales, tokens de diseño y componentes (@apply / variables CSS)
├── dist/               # Paquete compilado de producción (generado via npm run build)
├── index.html          # Punto de entrada principal con script Anti-FOUC en <head>
├── package.json        # Manifiesto de dependencias, tipos y scripts
├── vite.config.js      # Configuración de plugins de Vite
└── README.md           # Documentación técnica del laboratorio
```

## 📋 Bitácora de laboratorios

### 🔬 Laboratorio 1.1: Entorno Unificado & Primeras Maquetaciones

#### Objetivos Logrados
* [x] **Migración de maquetas estáticas** a un entorno unificado impulsado por Vite.
* [x] **Configuración del punto de entrada `index.html`** con consumo síncrono del CSS compilado.
* [x] **Creación de una interfaz de tres secciones** en un mismo workspace:
  * **Hero / Presentación:** Tarjeta de identificación del sistema GTN con badges de estado.
  * **Módulo de Ingreso:** Formulario de alta de trámites notariales (Digitalización, VUCE, Resguardo).
  * **Dashboard de Métricas:** Métricas rápidas y tabla semántica adaptativa (`overflow-x-auto`) de expedientes.
* [x] **Validación del ciclo de vida de producción:** generación y verificación de la carpeta `/dist`.

#### Post-Mortem Técnico: Incompatibilidad de Sintaxis de Color & Variables OKLCH
* **El Problema:** Las utilidades de color nativas de Tailwind v4 (`.bg-slate-800`, `.text-blue-500`) fallaban visualmente: la tarjeta se renderizaba blanca con texto invisible por reglas CSS tachadas en la inspección de elementos.
* **Causa Raíz:** Tailwind v4 migró su paleta nativa al espacio de color `oklch()`. Si el entorno de renderizado no resuelve bien `oklch()` combinado con opacidades dinámicas, el navegador descarta la regla por invalidez.
* **Solución Aplicada:** Definición de *Design Tokens* explícitos en `src/style.css` usando `@theme` con valores Hexadecimales estables (`#0f172a`, `#1e293b`, `#3b82f6`).

---

### 🎨 Laboratorio 1.2: Design System Corporativo, Accesibilidad y Modo Oscuro Nativo

#### Objetivos Logrados
* [x] **Ajuste fino de jerarquía tipográfica y legibilidad:** Definición e implementación de escalas de grises precisas en etiquetas y formularios mediante valores arbitrarios (`text-[#cbd5e1]`) y clases de Tailwind (`text-slate-300` / `text-slate-400`).
* [x] **Refinamiento visual de componentes de UI:** Corrección de opacidades en bordes de botones e íconos (`border-gtn-brand/30` -> uso de tonos sólidos/definidos) evitando la mezcla deslavada con fondos oscuros.
* [x] **Estandarización del soporte para componentes nativos del SO:** Configuración del esquema oscuro nativo para elementos fuera de la cascada estándar de CSS (`<select>`, `<option>`, *scrollbars*).
* [x] **Verificación del bundle final de producción:** Ejecución exitosa de audit con `npm run build` y previsualización aislada con `npm run preview`.

#### Post-Mortem Técnico: Renderizado OS-Level & Transparencias de Bordes
1. **Comportamiento del `<option>` y `<select>` nativo:**
   * **Diagnóstico:** Se observó que las etiquetas `<option>` ignoraban la clase `text-white` en algunos navegadores/SO, forzando un desplegable blanco con texto negro.
   * **Causa:** Los menús desplegables del elemento `<select>` nativo son renderizados directamente por el sistema operativo, no por el motor de diseño del navegador.
   * **Solución Estándar:** Inclusión de `:root { color-scheme: dark; }` en `src/style.css`. Esta directiva le indica oficialmente al navegador y al sistema operativo que la aplicación requiere la paleta oscura nativa para todos sus controles de formulario.
2. **Deslavado de bordes por opacidad (`/30`):**
   * **Diagnóstico:** Los bordes de contenedores pequeños e íconos se percibían blanquecinos o desproporcionados en contraste con el fondo.
   * **Causa:** Aplicar transparencia porcentual a un color base claro sobre fondos oscuros diluye la saturación y genera un efecto de luz parásita (*blending*).
   * **Solución:** Reemplazo de transparencias dinámicas por tokens directos de borde (`border-gtn-border`) o colores HEX explícitos para mayor definición.

---

### 🌓 Laboratorio 1.3: Abstracción de Componentes, Tokens Semánticos Dinámicos y Persistencia de Tema

#### Objetivos Logrados
* [x] **Implementación del Interruptor de Tema (Dark / Light Mode):** Incorporación de un botón toggle con estado dinámico en el encabezado principal (`#theme-toggle`).
* [x] **Reestructuración de Tokens de Diseño por Variables CSS Dinámicas:** Configuración de paletas paralelas en `:root` (Modo Claro) y `.dark` (Modo Oscuro) dentro de `src/style.css`.
* [x] **Abstracción de Clases Repetitivas con `@apply`:** Creación de las utilidades semánticas `.gtn-input` y `.gtn-card` para reducir duplicación de clases de utilidades en el HTML.
* [x] **Desacoplamiento de Componentes de Acción (`.btn-primary`):** Eliminación de condicionales rígidos de `@apply` a favor del consumo de variables CSS nativas que responden automáticamente al esquema de color activo.
* [x] **Prevención Total del Pestañeo de Carga (FOUC):** Implementación de la estrategia de script bloqueante inyectado síncronamente en el `<head>` antes del pintado del DOM.
* [x] **Persistencia de Preferencia de Usuario:** Almacenamiento de la selección de tema en `localStorage` con lectura prioritaria sobre el esquema por defecto del sistema operativo (`prefers-color-scheme`).

#### Post-Mortem Técnico: Incidentes de Arquitectura y Soluciones Aplicadas

##### 1. Pérdida de Estado `:hover` y Visibilidad del Botón "Registrar Trámite" en Modo Claro
* **Diagnóstico del Incidente:**
  Al abstraer la clase `.btn-primary` usando la directiva `@apply` combinada con modificadores de opacidad (`bg-slate-900/90`), modificadores de estado (`hover:`) y especificadores de modo (`dark:`), se observó que el botón perdía interacción en `:hover` o desaparecía completamente en modo claro (texto blanco sobre fondo claro o falta de contraste en bordes).
* **Causa Raíz:**
  En Tailwind CSS v4, intentar procesar modificadores compuestos multidimensionales (`hover:` + `dark:` + opacidades con barra `/`) dentro de una sola directiva `@apply` genera conflictos de especificidad en la hoja de estilos compilada. Cuando el motor evalúa la cascada, las utilidades aplicadas sobreescriben parcialmente los estados de hover o no recalculan las transparencias al cambiar la clase del ancestro `<html>`.
* **Solución Profesional (Arquitectura basada en Tokens CSS):**
  Se desacopló la lógica visual del botón de la directiva `@apply` para colores y estados. En su lugar, se definieron tokens dinámicos en `:root` y `.dark`:
  ```css
   :root {
   --btn-bg: #0f172a;
   --btn-bg-hover: #1e293b;
   --btn-text: #38bdf8;
   --btn-text-hover: #ffffff;
   --btn-border: rgba(56, 189, 248, 0.4);
   --btn-border-hover: #38bdf8;
   --btn-shadow-hover: rgba(56, 189, 248, 0.2);
   }
```
La regla `.btn-primary` en `@layer components` pasó a consumir directamente `var(--btn-bg)`, `var(--btn-text)` y `var(--btn-border)` mediante CSS estándar. De esta forma, el componente `.btn-primary` es agnóstico al tema activo y el estado `:hover` se ejecuta de forma uniforme y sin fallas en ambos modos.

##### 2. Pestañeo de Carga o _Flash of Unstyled Content_ (FOUC / Flash of Wrong Theme)
* **Diagnóstico del Incidente:**
  Al recargar la página teniendo seleccionado el Modo Oscuro (o estando en un entorno con preferencia guardada), la pantalla parpadeaba mostrando una fracción de segundo la interfaz en Modo Claro antes de aplicar los estilos oscuros definitivos.
* **Causa Raíz:**
  Ocurre debido al orden de ejecución en la tubería de renderizado del navegador (*Critical Rendering Path*):
  1. Si la etiqueta `<html>` no tiene declarada la clase `class="dark"` de forma predeterminada, el navegador procesa el HTML y CSS iniciales y realiza el primer pintado (*First Contentful Paint*) en Modo Claro.
  2. Los scripts cargados mediante `<script type="module" src="...">` al final del documento se ejecutan de forma asíncrona/diferida (*deferred*), es decir, **después** de que el navegador ya dibujó los primeros píxeles en pantalla.
  3. Cuando `src/main.js` finalmente se ejecutaba, leía el `localStorage`, agregaba la clase `.dark` a `<html>` y forzaba un segundo pintado (*repaint/reflow*), causando el parpadeo visual perceptible (FOUC).
* **Solución Profesional (Inlined Anti-FOUC Script en el `<head>`):**
  Se incorporó una función autoejecutable (IIFE) en un bloque `<script>` de línea dentro de la etiqueta `<head>` del documento `index.html`, ubicada antes de la importación de la hoja de estilos:
  ```html
   <script>
   (function() {
      const savedTheme = localStorage.getItem('gtn-theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   })();
   </script>
```
Al ejecutarse de forma bloqueante e inmediata durante el parsing del `<head>` (que toma menos de 1 milisegundo), el navegador determina la presencia de la clase `.dark` en `<html>` antes de realizar cualquier renderizado. Para cuando el cuerpo de la página (`<body>`) se dibuja, el esquema visual aplicado es directamente el correcto.

### ⚡ Comandos del Proyecto

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor local de desarrollo con recarga en caliente (HMR). |
| `npm run build` | Compila, purga y minifica el código para producción dentro de la carpeta `/dist`. |
| `npm run preview` | Levanta un servidor estático local para verificar el resultado final de `/dist` pre-despliegue. |

---

### 🚀 Próximos Pasos (Fase 2 · Lógica e Interacción con JavaScript)
* [ ] **Fundamentos de JavaScript para UI:** manipulación limpia del DOM y eventos.
* [ ] **Captura de Formularios:** procesamiento de los campos del protocolo GTN.
* [ ] **Renderizado Dinámico:** inserción y actualización de filas de trámites en la tabla.
* [ ] **Validación y Persistencia:** aseguramiento de datos y almacenamiento local de expedientes.
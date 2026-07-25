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
│   ├── main.js         # Punto de entrada de JavaScript
│   └── style.css       # Estilos globales y tokens de diseño (@theme)
├── dist/               # Paquete compilado de producción (generado via npm run build)
├── index.html          # Punto de entrada principal del proyecto (raíz)
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
1. **El Problema:** Las utilidades de color nativas de Tailwind v4 (`.bg-slate-800`, `.text-blue-500`) fallaban visualmente: la tarjeta se renderizaba blanca con texto invisible por reglas CSS tachadas en la inspección de elementos.
2. **Causa Raíz:** Tailwind v4 migró su paleta nativa al espacio de color `oklch()`. Si el entorno de renderizado no resuelve bien `oklch()` combinado con opacidades dinámicas, el navegador descarta la regla por invalidez.
3. **Solución Aplicada:** Definición de *Design Tokens* explícitos en `src/style.css` usando `@theme` con valores Hexadecimales estables (`#0f172a`, `#1e293b`, `#3b82f6`).

---

### 🎨 Laboratorio 1.2: Design System Corporativo, Accesibilidad y Modo Oscuro Nativo

#### Objetivos Logrados
* [x] **Ajuste fino de jerarquía tipográfica y legibilidad:** Definición e implementación de escalas de grises precisas en etiquetas y formularios mediante valores arbitrarios (`text-[#cbd5e1]`) y clases de Tailwind (`text-slate-300` / `text-slate-400`).
* [x] **Refinamiento visual de componentes de UI:** Corrección de opacidades en bordes de botones e íconos (`border-gtn-brand/30` -> uso de tonos sólidos/definidos) evitando la mezcla deslavada con fondos oscuros.
* [x] **Estandarización del soporte para componentes nativos del SO:** Configuración del esquema oscuro nativo para elementos fuera de la cascada estándar de CSS (`<select>`, `<option>`, *scrollbars*).
* [x] **Verificación del bundle final de producción:** Ejecución exitosa de audit con `npm run build` y previsualización aislada con `npm run preview`.

#### Post-Mortem Técnico: Renderizado OS-Level & Transparencias de Bordes
1. **Comportamiento del `<option>` y `<select>` nativo:** 
   * *Diagnóstico:* Se observó que las etiquetas `<option>` ignoraban la clase `text-white` en algunos navegadores/SO, forzando un desplegable blanco con texto negro.
   * *Causa:* Los menús desplegables del elemento `<select>` nativo son renderizados directamente por el sistema operativo, no por el motor de diseño del navegador.
   * *Solución Estándar:* Inclusión de `:root { color-scheme: dark; }` en `src/style.css`. Esta directiva le indica oficialmente al navegador y al sistema operativo que la aplicación requiere la paleta oscura nativa para todos sus controles de formulario.
2. **Deslavado de bordes por opacidad (`/30`):**
   * *Diagnóstico:* Los bordes de contenedores pequeños e íconos se percibían blanquecinos o desproporcionados en contraste con el fondo.
   * *Causa:* Aplicar transparencia porcentual a un color base claro sobre fondos oscuros diluye la saturación y genera un efecto de luz parásita (*blending*).
   * *Solución:* Reemplazo de transparencias dinámicas por tokens directos de borde (`border-gtn-border`) o colores HEX explícitos para mayor definición.

---

## ⚡ Comandos del Proyecto

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor local de desarrollo con recarga en caliente (*HMR*). |
| `npm run build` | Compila, purga y minifica el código para producción dentro de la carpeta `/dist`. |
| `npm run preview` | Levanta un servidor estático local para verificar el resultado final de `/dist` pre-despliegue. |

---

## 🚀 Próximos Pasos (Fase 1 · Módulo 1.3)
* [ ] **Modularización e Interacción:** separación del formulario y la tabla en componentes lógicos.
* [ ] **Manejo de estado básico en JS:** captura e inserción dinámica de trámites notariales en la tabla.
* [ ] **Validación de entradas:** feedback visual inmediato para campos obligatorios del protocolo GTN.
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

## 📋 Bitácora del Laboratorio 1.1: Entorno Unificado

### Objetivos Logrados
* [x] **Migración de maquetas estáticas** a un entorno unificado impulsado por Vite.
* [x] **Configuración del punto de entrada `index.html`** con consumo síncrono del CSS compilado.
* [x] **Creación de una interfaz de tres secciones** en un mismo workspace:
  * **Hero / Presentación:** Tarjeta de identificación del sistema GTN con badges de estado.
  * **Módulo de Ingreso:** Formulario de alta de trámites notariales (Digitalización, VUCE, Resguardo).
  * **Dashboard de Métricas:** Métricas rápidas y tabla semántica adaptativa (`overflow-x-auto`) de expedientes.
* [x] **Validación del ciclo de vida de producción:** generación y verificación de la carpeta `/dist`.
## 🔬 Post-Mortem Técnico: Incompatibilidad de Sintaxis de Color & Variables OKLCH

### 1. El Problema
Durante el setup inicial, las utilidades de color de Tailwind v4 (`.bg-slate-800`, `.text-blue-500`) fallaban visualmente: la tarjeta se renderizaba blanca con texto invisible. En el inspector de elementos (`F12`), las reglas de background aparecían **completamente tachadas**.

### 2. Causa Raíz
Tailwind CSS v4 migró su paleta nativa al espacio de color moderno `oklch()` (ej. `--color-slate-800: oklch(0.279 0.041 260.031)`). Si el entorno gráfico o navegador donde se renderiza la vista previa no logra resolver la función `oklch()` combinada con opacidad en variables dinámicas, el motor de estilos del navegador declara la regla CSS como inválida y la descarta por completo.

### 3. Solución Aplicada (Práctica Profesional de Design Systems)
Se definieron *Design Tokens* explícitos dentro de `src/style.css` usando la directiva `@theme`, asignando valores **Hexadecimales** tradicionales (`#0f172a`, `#1e293b`, `#3b82f6`):

```css
@import "tailwindcss";

@theme {
  --color-slate-900: #0f172a;
  --color-slate-800: #1e293b;
  --color-slate-700: #334155;
  --color-slate-400: #94a3b8;
  --color-slate-100: #f1f5f9;
  --color-blue-600: #2563eb;
  --color-blue-500: #3b82f6;
  --color-blue-400: #60a5fa;
}
```
Esto garantizó compatibilidad universal al 100% en cualquier navegador, sirviendo como base sólida para el Branding del sistema.
## ⚡ Comandos del Proyecto

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor local de desarrollo con recarga en caliente (*HMR*). |
| `npm run build` | Compila, purga y minifica el código para producción dentro de la carpeta `/dist`. |
| `npm run preview` | Levanta un servidor estático local para verificar el resultado final de `/dist` pre-despliegue. |

---

## 🚀 Próximos Pasos (Fase 1 · Módulo 1.2)
* [ ] **Tailwind CSS Avanzado & Personalización Corporativa:** extensión del sistema de diseño.
* [ ] **Utilidades personalizadas y variantes de estado:** patrones reusables y estados dinámicos (`hover`, `focus`, `active`).
* [ ] **Maquetado de componentes interactivos:** diseño de flujos y estados focales accesibles para el workspace notarial.

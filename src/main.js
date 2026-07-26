// LÓGICA DEL INTERRUPTOR DE TEMA (DARK / LIGHT MODE)

const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const themeToggleText = document.getElementById('theme-toggle-text');

// 1. Sincronizar la UI del botón con la clase que el script del <head> ya aplicó
const isDarkInitial = document.documentElement.classList.contains('dark');
updateUI(isDarkInitial ? 'dark' : 'light');

// 2. Función auxiliar para actualizar ícono y texto del botón
function updateUI(theme) {
  if (theme === 'dark') {
    if (themeToggleIcon) themeToggleIcon.textContent = '🌙';
    if (themeToggleText) themeToggleText.textContent = 'Modo Oscuro';
  } else {
    if (themeToggleIcon) themeToggleIcon.textContent = '☀️';
    if (themeToggleText) themeToggleText.textContent = 'Modo Claro';
  }
}

// 3. Listener para alternar tema al hacer clic
themeToggleBtn?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  const newTheme = isDark ? 'dark' : 'light';
  
  localStorage.setItem('gtn-theme', newTheme);
  updateUI(newTheme);
});
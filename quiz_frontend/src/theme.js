//
// PUBLIC THEME CONSTANTS AND UTILITIES
//

// PUBLIC_INTERFACE
export const COLORS = {
  primary: '#007bff',
  accent: '#ffc107',
  secondary: '#6c757d',
  bg: '#ffffff',
  bgSoft: '#f8f9fa',
  text: '#212529',
  textMuted: '#6c757d',
  border: '#e9ecef',
};

// PUBLIC_INTERFACE
export const LIGHT_THEME = {
  ...COLORS,
  name: 'light',
};

// PUBLIC_INTERFACE
export const applyThemeToDocument = (theme = LIGHT_THEME) => {
  /** Apply CSS variables to document root for theming */
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-bg', theme.bg);
  root.style.setProperty('--color-bg-soft', theme.bgSoft);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-text-muted', theme.textMuted);
  root.style.setProperty('--color-border', theme.border);
};

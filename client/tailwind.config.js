/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: {
      light: {
        "primary": "#3b82f6",
        "secondary": "#64748b",
        "accent": "#f59e0b",
        "neutral": "#374151",
        "base-100": "#ffffff",
        "base-200": "#f8fafc",
        "base-300": "#f1f5f9",
        "base-content": "#1e293b",
      },
      dark: {
        "primary": "#60a5fa",
        "secondary": "#94a3b8",
        "accent": "#fbbf24",
        "neutral": "#64748b",
        "base-100": "#1a1a1a",
        "base-200": "#2a2a2a",
        "base-300": "#3a3a3a",
        "base-content": "#f8fafc",
      }
    },
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}
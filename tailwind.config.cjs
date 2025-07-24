/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {
            colors: {
                // Haupt-Palette in Grautönen
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
                // Semantische Mapping-Klassen für Theme-Verwendung
                background: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                primary: 'var(--color-primary)',
                border: 'var(--color-border)',
                text: 'var(--color-text)',
                muted: 'var(--color-muted)',
            },
        },
    },
    plugins: [],
}

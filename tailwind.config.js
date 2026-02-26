/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00E676',
                'bg-dark': '#121212',
                'bg-card': 'rgba(255, 255, 255, 0.05)',
                'text-main': '#ffffff',
                'text-muted': '#a0a0a0',
                muted: '#a0a0a0',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            borderRadius: {
                '12': '12px',
                '16': '16px',
            },
            backdropBlur: {
                '12': '12px',
            },
        },
    },
    plugins: [],
}

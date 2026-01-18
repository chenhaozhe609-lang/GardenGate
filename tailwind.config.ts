import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                deepNavy: '#0A0E27',
                charcoal: '#111111',
                neonGreen: '#39FF14',
                neonPink: '#FF10F0',
                neonBlue: '#00F0FF',
                neonYellow: '#FFFF00',
            },
            fontFamily: {
                sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
                serif: ['Noto Serif SC', 'Georgia', 'serif'],
            },
            spacing: {
                'minTouch': '44px',
            },
            fontSize: {
                'impact': ['72px', { lineHeight: '1.1' }],
                'hero': ['48px', { lineHeight: '1.2' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
export default config;

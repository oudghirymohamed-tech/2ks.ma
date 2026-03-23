import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                canvas: '#F5F0E8',
                ink: '#101828',
                emergency: '#C0392B',
                call: '#1A8A3A',
                minor: '#7D1E6B',
                allergy: '#F2994A',
                shell: '#0D1117'
            },
            boxShadow: {
                soft: '0 20px 45px rgba(16, 24, 40, 0.08)',
                panel: '0 16px 32px rgba(16, 24, 40, 0.12)'
            },
            backgroundImage: {
                grid: 'radial-gradient(circle at 1px 1px, rgba(16,24,40,0.08) 1px, transparent 0)'
            },
            borderRadius: {
                '4xl': '2rem'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                arabic: ['Noto Sans Arabic', 'sans-serif']
            }
        }
    },
    plugins: []
} satisfies Config;

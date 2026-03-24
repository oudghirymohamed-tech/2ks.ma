import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ice: '#D6E6F3',
                powder: '#A6C5D7',
                sapphire: '#0F52BA',
                navy: '#000926',
                emergency: '#cc2c1a',
                call: '#1A8A3A',
                canvas: '#D6E6F3',
                ink: '#000926',
                shell: '#000926',
                allergy: '#A6C5D7',
                minor: '#0F52BA',
                slate: {
                    50: '#F3F8FC',
                    100: '#D6E6F3',
                    200: '#C1D9E9',
                    300: '#A6C5D7',
                    400: '#84ABC5',
                    500: '#5F8FB4',
                    600: '#366EA5',
                    700: '#0F52BA',
                    800: '#083A87',
                    900: '#000926',
                    950: '#000926'
                },
                emerald: {
                    50: '#EAF7EE',
                    100: '#D2EEDD',
                    200: '#A5DEBB',
                    300: '#73CD95',
                    400: '#47B874',
                    500: '#2EA45A',
                    600: '#1A8A3A',
                    700: '#156D2F',
                    800: '#0F5526',
                    900: '#0A3F1B',
                    950: '#072B13'
                },
                amber: {
                    50: '#FDF0EE',
                    100: '#FADBD6',
                    200: '#F3B8AF',
                    300: '#EB9184',
                    400: '#E26A5A',
                    500: '#D74A3C',
                    600: '#C0392B',
                    700: '#982D23',
                    800: '#77241D',
                    900: '#5C1C17',
                    950: '#3E120F'
                },
                orange: {
                    50: '#FDF0EE',
                    100: '#FADBD6',
                    200: '#F3B8AF',
                    300: '#EB9184',
                    400: '#E26A5A',
                    500: '#D74A3C',
                    600: '#C0392B',
                    700: '#982D23',
                    800: '#77241D',
                    900: '#5C1C17',
                    950: '#3E120F'
                }
            },
            boxShadow: {
                soft: '0 20px 45px rgba(0, 9, 38, 0.12)',
                panel: '0 16px 32px rgba(0, 9, 38, 0.2)'
            },
            backgroundImage: {
                grid: 'radial-gradient(circle at 1px 1px, rgba(15,82,186,0.12) 1px, transparent 0)'
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

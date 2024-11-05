import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  safelist: [
    'grid-cols-12',
    'grid-cols-11',
    'grid-cols-10',
    'grid-cols-9',
    'grid-cols-8',
    'grid-cols-7',
    'grid-cols-6',
    'grid-cols-5',
    'grid-cols-4',
    'grid-cols-3',
    'grid-cols-2',
    'grid-cols-1',
    'col-span-12',
    'col-span-11',
    'col-span-10',
    'col-span-9',
    'col-span-8',
    'col-span-7',
    'col-span-6',
    'col-span-5',
    'col-span-4',
    'col-span-3',
    'col-span-2',
    'col-span-1',
    'col-span-10',
    'col-span-9',
  ],
  important: true,
  darkMode: 'selector',
  plugins: [],
} satisfies Config;

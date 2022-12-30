/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      lineClamp: {10: '10'},
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    ({addComponents}) => {
      addComponents({
        '.card-primary': {
          '@apply rounded-lg border border-gray-200 p-4 transition-shadow duration-150 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-800':
            {},
        },
        '.flex-center-between': {
          // '@apply flex items-center justify-between gap-4': {},
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          gap: '1rem',
        },
      });
    },
  ],
};

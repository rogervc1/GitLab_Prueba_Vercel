import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                institutional: {
                    50: '#f4faf4',
                    100: '#e6f3e7',
                    200: '#cde7cf',
                    300: '#a4d3aa',
                    400: '#74b87f',
                    500: '#469c59',
                    600: '#257f3d',
                    700: '#006633',
                    800: '#00542c',
                    900: '#004b26',
                    950: '#002d17',
                },
                graphite: {
                    50: '#f7f8fa',
                    100: '#edf0f3',
                    200: '#d9dfe6',
                    300: '#b7c1cc',
                    400: '#909fad',
                    500: '#708090',
                    600: '#596879',
                    700: '#495463',
                    800: '#3f4853',
                    900: '#373e48',
                    950: '#111827',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                soft: '0 18px 45px rgba(16, 41, 56, 0.10)',
            },
        },
    },

    plugins: [forms],
};

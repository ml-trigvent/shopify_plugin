/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shopify: {
                    green: '#008060',
                    darkgreen: '#004c3f',
                    lightgreen: '#e3f1ed',
                },
            },
        },
    },
    plugins: [],
}

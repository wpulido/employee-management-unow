// tailwind.config.js
const flowbite = require("flowbite-react/tailwind");

export default {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        flowbite.plugin(),
    ],
};

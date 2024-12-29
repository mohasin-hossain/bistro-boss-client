/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'featured-image': 'url(./src/assets/home/featured.jpg)',
        "form-image": 'url(./src/assets/others/authentication.png)',
      },
      fontFamily: {
        cinzel: '"Cinzel", serif',
        inter: '"Inter", sans-serif',
      }
    },
  },
  plugins: [
    daisyui,
  ],
};


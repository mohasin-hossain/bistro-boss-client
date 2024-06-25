/** @type {import('tailwindcss').Config} */
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
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


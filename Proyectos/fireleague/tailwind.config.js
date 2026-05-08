/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          50: '#F9FAFB', // Very light gray for backgrounds
          100: '#F3F4F6', // Slightly darker for sections
          200: '#E5E7EB', // Borders
          900: '#111827', // Almost black text
          800: '#1F2937', // Dark gray text
          600: '#4B5563', // Secondary text
        },
        primary: {
          DEFAULT: '#FF8000', // Puto naranja vibrante
          dark: '#E67300',
          light: '#FFA64D',
        },
        secondary: {
          DEFAULT: '#FF9500', // Cambiado a otro tono de naranja para coherencia
          dark: '#CC7700',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#FF3300', // Un naranja-rojo muy vibrante para que no parezca marrón
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

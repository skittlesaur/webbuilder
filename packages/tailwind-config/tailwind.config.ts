import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", './mdx-components.tsx'],
  theme: {
    extend: {
      colors: {
        background: '#040711',
        text: '#F9FAFB',
        secondary: '#1F2937',
        border: '#1F2937',
        accent: '#121825',
        primary: {
          DEFAULT: '#923FDE',
          50: '#faf6fe',
          100: '#f3e9fe',
          200: '#e9d8fc',
          300: '#d8b9f9',
          400: '#c08cf4',
          500: '#a85fed',
          600: '#923fde',
          700: '#7b2cbf',
          800: '#6a2a9f',
          900: '#572380',
          950: '#3a0d5e',
        }
      }
    },
  },
  plugins: [],
}
export default config

/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
   
  ],
  theme: {
    extend: {
      colors: {
        "bgreen": "#006D3B",   
        "bleaf": "#8BC34A",    
        "bsand": "#E3D9C6",    
        "bblack": "#2E2E2E",  
        "bgold": "#D4AF37", 
      },
    },
  },
  plugins: [],
};

export default config
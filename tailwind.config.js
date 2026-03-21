/** @type {import('tailwindcss').Config} */
export default {
  // 1. CONTENT OPTIMIZATION
  // Ensure you are only scanning the files that actually contain Tailwind classes.
  // Avoid using global wildcards like "./**/*.{js,jsx}" if you have a large 'node_modules' or 'dist' folder.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // 2. LUXURY COLOR PALETTE (Lombok Perfect Branding)
      colors: {
        'brand-green': '#042D20',
        'brand-dark': '#021811',
        'brand-gold': '#C19B6E',
      },
      fontFamily: {
        // Match your serif italic luxury aesthetic
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['"Inter"', 'sans-serif'],
      },
      // 3. LIMITING TRANSITIONS
      // If you are using GSAP for most animations, you can disable 
      // some Tailwind transition defaults to save processing time.
      transitionProperty: {
        'spacing': 'margin, padding',
      }
    },
  },

  // 4. PLUGIN CHECK
  // Remove any unused plugins. Avoid "tailwind-scrollbar" or 
  // complex typography plugins if you aren't using them extensively.
  plugins: [],

  // 5. PERFORMANCE HACK
  // Disable features you aren't using to shrink the generated CSS file.
  corePlugins: {
    float: false,
    objectFit: true, // Keep for your visual journal images
    objectPosition: true,
  }
}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
    },
  },

  css: {
    lightningcss: {
      targets: { safari: 13, ios: 13 },
    },
    devSourcemap: false,
  },

  build: {
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // --- THE UNIVERSAL FUNCTION FIX ---
        manualChunks(id) {
          // If the module is in node_modules, we split it
          if (id.includes('node_modules')) {
            // Group animation libraries
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animations';
            }
            // Group UI/Framework libraries
            if (id.includes('swiper') || id.includes('react-helmet-async')) {
              return 'vendor-ui';
            }
            // All other node_modules go to a generic vendor chunk
            return 'vendor';
          }
        },
        // --- END FIX ---

        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
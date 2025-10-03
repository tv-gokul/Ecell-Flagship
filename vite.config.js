import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: 'production', // Explicitly set production mode
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Optimize image file naming
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Manual chunk splitting for better caching and loading
        manualChunks: {
          // Core vendor chunks
          'react-vendor': ['react', 'react-dom'],
          // WebGL library - separate for deferred loading
          'ogl': ['ogl'],
          // Gesture library for gallery
          'use-gesture': ['@use-gesture/react'],
        }
      },
      // Enable tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Use esbuild for minification with aggressive settings
    minify: 'esbuild',
    target: 'es2015', // Target modern browsers for better optimization
    // Enable source map for debugging but keep small
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize image assets
  assetsInclude: ['**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg'],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['ogl'], // Exclude heavy WebGL from eager optimization
  },
  // Define production environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': false,
  },
})

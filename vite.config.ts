import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@assets': path.resolve(__dirname, 'src/assets'),    
      '@styles': path.resolve(__dirname, 'src/styles'),    
    },
  },
});
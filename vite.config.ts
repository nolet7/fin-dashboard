import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Make environment variables available to the client
    'import.meta.env.VITE_DB_HOST': JSON.stringify(process.env.VITE_DB_HOST),
    'import.meta.env.VITE_DB_PORT': JSON.stringify(process.env.VITE_DB_PORT),
    'import.meta.env.VITE_DB_NAME': JSON.stringify(process.env.VITE_DB_NAME),
    'import.meta.env.VITE_DB_USER': JSON.stringify(process.env.VITE_DB_USER),
    'import.meta.env.VITE_DB_PASSWORD': JSON.stringify(process.env.VITE_DB_PASSWORD),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

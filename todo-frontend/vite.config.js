import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/ZenTasker-Todo/",
  plugins: [react()],
});


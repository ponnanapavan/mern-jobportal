import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
 
    proxy: {
      '/api': {
        target: 'https://mern-jobportal-2.onrender.com/',  // Proxy target (backend)
        changeOrigin: true,  // Change the origin of the request to the target URL
        secure: false,  // If the target uses HTTPS but the cert is self-signed, this prevents SSL issues
      },
    },
  },
});

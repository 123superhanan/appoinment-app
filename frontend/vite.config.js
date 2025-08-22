import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend runs here
    proxy: {
      "/api": {
        target: "http://localhost:4000", // backend server
        changeOrigin: true, // fixes CORS + host issues
        secure: false, // if using https locally
      },
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "http://localhost:4000", // Your backend port
//         changeOrigin: true,
//       },
//     },
//   },
// });

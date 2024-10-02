import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  
  // https://vitejs.dev/config/
  export default defineConfig({
      plugins: [react()],
      resolve: {
          alias: {
              '@material-ui/core': '@material-ui/core/es',
          },
      },
  });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: '', // Dôležité pre správne vloženie assetov
    plugins: [react()],
    resolve: {
        alias: {
            '@material-ui/core': '@material-ui/core/es',
        },
    },
    build: {
        // Zvýšenie limitu prinúti Vite vložiť všetky obrázky ako Base64 priamo do JS.
        // Tým sa odstráni problém s externými cestami.
        assetsInlineLimit: 100000000, 
        target: 'esnext',
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});

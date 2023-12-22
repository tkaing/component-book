import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.jsx'),
            name: 'component-book',
            fileName: 'index'
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React'
                }
            }
        }
    },
    plugins: [react()],
    define: {
        'process.env': {
            NODE_ENV: process.env.NODE_ENV,
            SHARED_APP: 'appfront'
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
          },
    },
    assetsInclude: ['**/*.html'],
});

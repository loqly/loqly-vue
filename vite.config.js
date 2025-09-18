import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'LoqlyVue',
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: 'index.es.js',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: 'index.cjs.js',
          exports: 'named',
        },
        {
          format: 'umd',
          name: 'LoqlyVue',
          dir: 'dist',
          entryFileNames: 'index.umd.js',
          globals: { vue: 'Vue' },
        },
      ],
    },
  },
})

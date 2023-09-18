import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'packages'),
      },
    ],
  },
  plugins: [babel({
    babelConfig: {
      babelrc: false,
      configFile: true,
    },
  })],
})

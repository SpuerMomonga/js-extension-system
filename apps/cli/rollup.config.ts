import { createRequire } from 'node:module'
import resolve from '@rollup/plugin-node-resolve'
import ts from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import rm from 'rollup-plugin-rm'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]

export default defineConfig([
  {
    input: ['index.ts', 'src/raykit.ts', 'src/raykit-extension.ts'],
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/lib-[hash].js',
        format: 'es',
      },
    ],
    external,
    plugins: [
      rm('dist', 'buildStart'),
      ts(),
      resolve(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts(), rm('dist/types', 'buildEnd')],
  },
])

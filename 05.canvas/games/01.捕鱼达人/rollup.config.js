import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
export default {
  input: './lib/index.js',
  output: {
    format: 'umd',
    name: 'Canvas',
    file: 'dist/canvas.js',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    json({
      exclude: 'node_modules/**'
    })
  ]
}
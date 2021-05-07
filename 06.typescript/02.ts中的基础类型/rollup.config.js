import { nodeResolve } from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import path from 'path'
export default {
  input: path.resolve(__dirname, 'index.ts'),
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      port: 3000,
      open: true,
      contentBase: '',
      openPage: '/public/index.html'
    })
  ]
}
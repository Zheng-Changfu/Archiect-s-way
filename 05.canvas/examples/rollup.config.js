import babel from 'rollup-plugin-babel'
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
    })
  ]
}
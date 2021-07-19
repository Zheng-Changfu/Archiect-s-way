const AutoPreFixer = require('autoprefixer')
module.exports = {
  plugins: [
    AutoPreFixer({
      overrideBrowserslist: 'last 10 version'
    })
  ]
}
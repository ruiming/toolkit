const path = require('path')
const requireDirectory = require('./lib/require-directory')

const { lib } = requireDirectory('./lib/**/*.js', {
  root: path.resolve(__dirname, '..')
})

module.exports = lib

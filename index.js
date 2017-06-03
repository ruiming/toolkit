const requireDirectory = require('./lib/require-directory')

const { lib } = requireDirectory('./lib/**/*.js', {
  root: __dirname
})

module.exports = lib

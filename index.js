const requireDirectory = require('./lib/require-directory')

const { lib } = requireDirectory('./lib/**/*.js')

module.exports = lib

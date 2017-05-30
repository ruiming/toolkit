const humps = require('humps')
const requireDirectory = require('./lib/require-directory')

const { lib } = humps.camelizeKeys(requireDirectory('./lib/**/*.js'))

module.exports = lib

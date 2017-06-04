import requireDirectory = require('./lib/require-directory')

const { lib } = requireDirectory('./lib/**/*.js', { // TODO: ts do not handle the path
  root: __dirname
})

export = lib

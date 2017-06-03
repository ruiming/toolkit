const path = require('path')
const glob = require('glob')
const humps = require('humps')

const _cacheModuleList = new Map()

/**
 * 递归解析路径 src 下的所有模块
 * @param {String} src
 * @param {Object} options { esm, construct }
 * src 格式同 glob
 */
module.exports = function (src, options = {}) {
  if (_cacheModuleList.has(src)) {
    return _cacheModuleList.get(src)
  }
  const moduleList = {}
  const fromSrc = process.cwd() || options.root
  const pathList = glob.sync(src, {
    cwd: fromSrc
  }).map(item => item.split(path.sep)).sort()
  pathList.forEach(items => items.reduce((pre, next) => {
    if (next === '.') {
      return pre
    }
    if (/\.js/.test(next)) {
      const pkg = options.esm ? require(path.join(fromSrc, items.join(path.sep))).default : require(path.join(fromSrc, items.join(path.sep)))
      // eslint-disable-next-line
      pre[humps.camelize(path.basename(next, '.js'))] = options.construct ? new pkg() : pkg
    } else {
      pre[next] = pre[next] || {}
      return pre[next]
    }
  }, moduleList))
  _cacheModuleList.set(src, moduleList)
  return moduleList
}

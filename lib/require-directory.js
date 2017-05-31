const path = require('path')
const glob = require('glob')
const humps = require('humps')
const callsite = require('callsite')

const _cacheModuleList = new Map()

/**
 * 递归解析路径 src 下的所有模块
 * @param {String} src
 * src 格式同 glob
 */
module.exports = function (src) {
  if (_cacheModuleList.has(src)) {
    return _cacheModuleList.get(src)
  }
  const moduleList = {}
  const fromSrc = path.resolve(callsite()[1].getFileName(), '..')
  const pathList = glob.sync(src, {
    cwd: fromSrc
  }).map(item => item.split(path.sep)).sort()
  pathList.forEach(items => items.reduce((pre, next) => {
    if (next === '.') {
      return pre
    }
    if (/\.js/.test(next)) {
      pre[humps.camelize(path.basename(next, '.js'))] = require(path.join(fromSrc, items.join(path.sep)))
    } else {
      pre[next] = pre[next] || {}
      return pre[next]
    }
  }, moduleList))
  _cacheModuleList.set(src, moduleList)
  return moduleList
}

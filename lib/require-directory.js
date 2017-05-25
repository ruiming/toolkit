const path = require('path')
const glob = require('glob')

const _cacheModuleList = new Map()

/**
 * 递归解析路径 src 下的所有模块
 * @param {String} src
 * src 格式同 glob
 */
module.exports = function rq (src) {
  if (_cacheModuleList.has(src)) {
    return _cacheModuleList.get(src)
  }
  const moduleList = {}
  const pathList = glob.sync(src).map(item => item.split(path.sep)).sort()
  console.log(pathList)
  pathList.forEach(items => items.reduce((pre, next) => {
    if (next === '.') {
      return pre
    }
    if (/\.js/.test(next)) {
      // FIX: need callsite
      pre[path.basename(next, '.js')] = require(items.join(path.sep))
    } else {
      pre[next] = pre[next] || {}
      return pre[next]
    }
  }, moduleList))
  _cacheModuleList.set(src, moduleList)
  return moduleList
}

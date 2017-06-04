import * as glob from 'glob'
import * as humps from 'humps'
import * as path from 'path'

const _cacheModuleList = new Map<string, any>()

function requireDirectory (src: string, options?: {
  root?: string
  esm?: boolean
  construct?: boolean
}) {
  if (_cacheModuleList.has(src)) {
    return _cacheModuleList.get(src)
  }
  const moduleList = {}
  const fromSrc = options.root || process.cwd()
  const pathList = glob.sync(src, {
    cwd: fromSrc
  }).map(item => item.split(path.sep)).sort()
  pathList.forEach(items => items.reduce((pre, next) => {
    if (next === '.') {
      return pre
    }
    if (/\.js/.test(next)) {
      const pkg = options.esm ? require(path.join(fromSrc, items.join(path.sep))).default
        : require(path.join(fromSrc, items.join(path.sep)))
      pre[humps.camelize(path.basename(next, '.js'))] = options.construct ? new pkg() : pkg
    } else {
      pre[next] = pre[next] || {}
      return pre[next]
    }
  }, moduleList))
  _cacheModuleList.set(src, moduleList)
  return moduleList
}

export {
  requireDirectory as default,
  requireDirectory
}

class Injector {
  constructor (option = {}) {
    this.container = new Map()
    this.STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
    this.ARGUMENT_NAMES = /([^\s,]+)/g
  }

  set (key, val) {
    this.container.set(key, val)
  }

  get (key) {
    return this.container.get(key)
  }

  getParamsNames (func) {
    const fnStr = func.toString().replace(this.STRIP_COMMENTS, '')
    const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(this.ARGUMENT_NAMES)
    return result || []
  }

  resolve (denpendencies, func) {
    if (func === undefined) {
      func = denpendencies
      denpendencies = Array.from(this.container.keys())
    }
    if (!Array.isArray(denpendencies)) throw new TypeError('First argument of resolve must be an Array')
    if (!(func instanceof Function)) return function () {}
    const self = this
    const args = []
    const paramNames = this.getParamsNames(func)
    return function () {
      const a = Array.prototype.slice.call(arguments, 0)
      console.log(paramNames, a)
      for (const paramName of paramNames) {
        args.push((denpendencies.includes(paramName) && self.container.get(paramName)) || a.shift())
      }
      return new.target ? Reflect.construct(func, args) : Reflect.apply(func, this, args)
    }
  }
}

const container = new Injector()  // global injector instance

function inject (...items) {  // decorator
  return function (target, key, descriptor) {
    if (descriptor && descriptor.value instanceof Function) {
      descriptor.value = items.length ? container.resolve(items, descriptor.value) : container.resolve(descriptor.value)
    } else {
      target = items.length ? container.resolve(items, target) : container.resolve(target)
      return target
    }
  }
}

module.exports = {
  Injector,
  container,
  inject
}

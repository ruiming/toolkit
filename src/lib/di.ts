class Injector {

  private STRIP_COMMENTS: RegExp
  private ARGUMENT_NAMES: RegExp
  private container: Map<string | symbol, any>

  constructor (option = {}) {
    this.container = new Map()
    this.STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
    this.ARGUMENT_NAMES = /([^\s,]+)/g
  }

  public set (key: string | symbol, val: any) {
    this.container.set(key, val)
  }

  public get (key: string | symbol) {
    return this.container.get(key)
  }

  public getParamsNames (func: (...args: any[]) => any) {
    const fnStr = func.toString().replace(this.STRIP_COMMENTS, '')
    const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(this.ARGUMENT_NAMES)
    return result || []
  }

  public resolve (func: (...args: any[]) => any): (...args: any[]) => any
  public resolve (denpendencies: string[], func: (...args: any[]) => any): (...args: any[]) => any
  public resolve (funcOrDependencies: ((...args: any[]) => any) | string[], funcOrUndefined?: (...args: any[]) => any): (...args: any[]) => any {
    let denpendencies: Array<string|symbol>
    let func: () => any
    if (Array.isArray(funcOrDependencies)) {
      denpendencies = funcOrDependencies
      func = funcOrUndefined
    } else if (funcOrDependencies instanceof Function) {
      denpendencies = Array.from(this.container.keys())
      func = funcOrDependencies
    }
    const self = this
    const args = []
    const paramNames = this.getParamsNames(func)
    return function () {
      const a = Array.prototype.slice.call(arguments, 0)
      for (const paramName of paramNames) {
        args.push((denpendencies.includes(paramName) && self.container.get(paramName)) || a.shift())
      }
      return new.target ? Reflect.construct(func, args) : Reflect.apply(func, this, args)
    }
  }
}

const container = new Injector()  // global injector instance

function inject (...items: string[]) {  // decorator
  return (target, key, descriptor) => {
    if (descriptor && descriptor.value instanceof Function) {
      descriptor.value = items.length ? container.resolve(items, descriptor.value) : container.resolve(descriptor.value)
    } else {
      target = items.length ? container.resolve(items, target) : container.resolve(target)
      return target
    }
  }
}

export {
  Injector as default,
  Injector,
  container,
  inject
}

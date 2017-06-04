"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Injector {
    constructor(option = {}) {
        this.container = new Map();
        this.STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        this.ARGUMENT_NAMES = /([^\s,]+)/g;
    }
    set(key, val) {
        this.container.set(key, val);
    }
    get(key) {
        return this.container.get(key);
    }
    getParamsNames(func) {
        const fnStr = func.toString().replace(this.STRIP_COMMENTS, '');
        const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(this.ARGUMENT_NAMES);
        return result || [];
    }
    resolve(funcOrDependencies, funcOrUndefined) {
        let denpendencies;
        let func;
        if (Array.isArray(funcOrDependencies)) {
            denpendencies = funcOrDependencies;
            func = funcOrUndefined;
        }
        else if (funcOrDependencies instanceof Function) {
            denpendencies = Array.from(this.container.keys());
            func = funcOrDependencies;
        }
        const self = this;
        const args = [];
        const paramNames = this.getParamsNames(func);
        return function () {
            const a = Array.prototype.slice.call(arguments, 0);
            for (const paramName of paramNames) {
                args.push((denpendencies.includes(paramName) && self.container.get(paramName)) || a.shift());
            }
            return new.target ? Reflect.construct(func, args) : Reflect.apply(func, this, args);
        };
    }
}
exports.default = Injector;
exports.Injector = Injector;
const container = new Injector(); // global injector instance
exports.container = container;
function inject(...items) {
    return (target, key, descriptor) => {
        if (descriptor && descriptor.value instanceof Function) {
            descriptor.value = items.length ? container.resolve(items, descriptor.value) : container.resolve(descriptor.value);
        }
        else {
            target = items.length ? container.resolve(items, target) : container.resolve(target);
            return target;
        }
    };
}
exports.inject = inject;
//# sourceMappingURL=di.js.map
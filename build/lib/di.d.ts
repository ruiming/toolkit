declare class Injector {
    private STRIP_COMMENTS;
    private ARGUMENT_NAMES;
    private container;
    constructor(option?: {});
    set(key: string | symbol, val: any): void;
    get(key: string | symbol): any;
    getParamsNames(func: (...args: any[]) => any): RegExpMatchArray;
    resolve(func: (...args: any[]) => any): (...args: any[]) => any;
    resolve(denpendencies: string[], func: (...args: any[]) => any): (...args: any[]) => any;
}
declare const container: Injector;
declare function inject(...items: string[]): (target: any, key: any, descriptor: any) => any;
export { Injector as default, Injector, container, inject };

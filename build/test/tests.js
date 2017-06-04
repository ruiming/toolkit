"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_typescript_1 = require("mocha-typescript");
const path = require("path");
const arrange = require("../lib/arrange");
const di = require("../lib/di");
const iota = require("../lib/iota");
const requireDirectory = require("../lib/require-directory");
let Arrange = class Arrange {
    test1() {
        chai_1.assert.deepEqual(arrange([[1, 2], [3, 4, 5]]), [[1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]]);
    }
    test2() {
        chai_1.assert.deepEqual(arrange([[], []]), []);
    }
    test3() {
        chai_1.assert.deepEqual(arrange([]), []);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Arrange.prototype, "test1", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Arrange.prototype, "test2", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Arrange.prototype, "test3", null);
Arrange = __decorate([
    mocha_typescript_1.suite
], Arrange);
let Di = class Di {
    test1() {
        const injector = new di.Injector();
        injector.set('test1', 123);
        injector.set('test2', 345);
        chai_1.assert.equal(injector.get('test1'), 123);
        chai_1.assert.equal(injector.get('test2'), 345);
        const testFn = (test1, test2) => test1 + test2;
        chai_1.assert.deepEqual(injector.getParamsNames(testFn), ['test1', 'test2']);
        chai_1.assert.equal(injector.resolve(testFn)(), 468);
        chai_1.assert.equal(injector.resolve(['test1', 'test2'], testFn)(), 468);
        chai_1.assert.equal(injector.resolve(['test1', 'test2'], testFn)(1, 2), 468);
        chai_1.assert.equal(injector.resolve(['test1'], testFn)(1, 2), 124);
        const testFn2 = (test1, test3) => test1 + test3;
        chai_1.assert.isNaN(injector.resolve(testFn2)());
        chai_1.assert.isNaN(injector.resolve(['test1', 'test3'], testFn2)());
        chai_1.assert.equal(injector.resolve(['test1', 'test3'], testFn2)(1, 2), 124);
        di.container.set('test1', 111);
    }
    test2() {
        chai_1.assert.equal(di.container.get('test1'), 111);
        di.container.set('test2', 123);
        chai_1.assert.equal(di.container.get('test2'), 123);
    }
    test3() {
        di.container.set('test1', 111);
        di.container.set('test2', 123);
        class Test1 {
            constructor(test1, test2) {
                this.test3 = test1 + test2;
            }
            echo() {
                return this.test3;
            }
        }
        const Test2 = di.inject('test1', 'test2')(Test1, undefined, undefined);
        const test2 = new Test2();
        chai_1.assert.equal(test2.echo(), 234);
        const Test3 = di.inject()(Test1, undefined, undefined);
        const test3 = new Test3();
        chai_1.assert.equal(test3.echo(), 234);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Di.prototype, "test1", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Di.prototype, "test2", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Di.prototype, "test3", null);
Di = __decorate([
    mocha_typescript_1.suite
], Di);
let Iota = class Iota {
    test1() {
        return __awaiter(this, void 0, void 0, function* () {
            chai_1.assert.equal(iota(), 0);
            chai_1.assert.equal(iota(), 1);
            chai_1.assert.equal(iota(), 2);
            yield new Promise(resolve => setTimeout(() => {
                chai_1.assert.equal(iota(), 0);
                chai_1.assert.equal(iota(), 1);
                resolve();
            }, 0));
            chai_1.assert.equal(iota(), 0);
            chai_1.assert.equal(iota(10), 10);
            chai_1.assert.equal(iota(), 11);
        });
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Iota.prototype, "test1", null);
Iota = __decorate([
    mocha_typescript_1.suite
], Iota);
let RequireDirectory = class RequireDirectory {
    test1() {
        const { lib } = requireDirectory('./lib/**/*.js', {
            root: path.resolve(__dirname, '..')
        });
        chai_1.assert.equal(lib.di, di);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequireDirectory.prototype, "test1", null);
RequireDirectory = __decorate([
    mocha_typescript_1.suite
], RequireDirectory);
//# sourceMappingURL=tests.js.map
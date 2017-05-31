const { di } = require('..')

const assert = require('chai').assert

describe('Test di', () => {
  it('Test Injector', async () => {
    const injector = new di.Injector()
    injector.set('test1', 123)
    injector.set('test2', 345)
    assert.equal(injector.get('test1'), 123)
    assert.equal(injector.get('test2'), 345)
    const testFn = function (test1, test2) { return test1 + test2 }
    assert.deepEqual(injector.getParamsNames(testFn), ['test1', 'test2'])
    assert.equal(injector.resolve(testFn)(), 468)
    assert.equal(injector.resolve(['test1', 'test2'], testFn)(), 468)
    assert.equal(injector.resolve(['test1', 'test2'], testFn)(1, 2), 468)
    assert.equal(injector.resolve(['test1'], testFn)(1, 2), 124)
    const testFn2 = function (test1, test3) { return test1 + test3 }
    assert.isNaN(injector.resolve(testFn2)())
    assert.isNaN(injector.resolve(['test1', 'test3'], testFn2)())
    assert.equal(injector.resolve(['test1', 'test3'], testFn2)(1, 2), 124)
    di.container.set('test1', 111)
  })
  it('Test container', async () => {
    assert.equal(di.container.get('test1'), 111)
    di.container.set('test2', 123)
    assert.equal(di.container.get('test2'), 123)
  })
  it.only('Test inject', async () => {
    di.container.set('test1', 111)
    di.container.set('test2', 123)
    class Test1 {
      constructor (test1, test2) {
        this.test3 = test1 + test2
      }
      echo () {
        return this.test3
      }
      echo2 (test1, xxx, test2) {
        console.log(test1, xxx)
        return test1 + xxx + test2
      }
    }
    const test1 = new Test1()
    const Test2 = di.inject('test1', 'test2')(Test1, undefined, undefined)
    const test2 = new Test2()
    assert.equal(test2.echo(), 234)
    const Test3 = di.inject()(Test1, undefined, undefined)
    const test3 = new Test3()
    assert.equal(test3.echo(), 234)
    assert.equal(test1.echo2(1), 235)
  })
})

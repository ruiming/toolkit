import { assert } from 'chai'
import { suite, test } from 'mocha-typescript'
import * as path from 'path'
import arrange = require('../lib/arrange')
import di = require('../lib/di')
import iota = require('../lib/iota')
import requireDirectory = require('../lib/require-directory')

@suite class Arrange {
  @test test1 () {
    assert.deepEqual(arrange([[1, 2], [3, 4, 5]]), [ [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ] ])
  }
  @test test2 () {
    assert.deepEqual(arrange([[], []]), [])
  }
  @test test3 () {
    assert.deepEqual(arrange([]), [])
  }
}

@suite class Di {
  @test test1 () {
    const injector = new di.Injector()
    injector.set('test1', 123)
    injector.set('test2', 345)
    assert.equal(injector.get('test1'), 123)
    assert.equal(injector.get('test2'), 345)
    const testFn = (test1: number, test2: number) => test1 + test2
    assert.deepEqual(injector.getParamsNames(testFn), ['test1', 'test2'])
    assert.equal(injector.resolve(testFn)(), 468)
    assert.equal(injector.resolve(['test1', 'test2'], testFn)(), 468)
    assert.equal(injector.resolve(['test1', 'test2'], testFn)(1, 2), 468)
    assert.equal(injector.resolve(['test1'], testFn)(1, 2), 124)
    const testFn2 = (test1, test3) => test1 + test3
    assert.isNaN(injector.resolve(testFn2)())
    assert.isNaN(injector.resolve(['test1', 'test3'], testFn2)())
    assert.equal(injector.resolve(['test1', 'test3'], testFn2)(1, 2), 124)
    di.container.set('test1', 111)
  }
  @test test2 () {
    assert.equal(di.container.get('test1'), 111)
    di.container.set('test2', 123)
    assert.equal(di.container.get('test2'), 123)
  }
  @test test3 () {
    di.container.set('test1', 111)
    di.container.set('test2', 123)
    class Test1 {
      private test3: number
      constructor (test1, test2) {
        this.test3 = test1 + test2
      }
      echo () {
        return this.test3
      }
    }
    const Test2 = di.inject('test1', 'test2')(Test1, undefined, undefined)
    const test2 = new Test2()
    assert.equal(test2.echo(), 234)
    const Test3 = di.inject()(Test1, undefined, undefined)
    const test3 = new Test3()
    assert.equal(test3.echo(), 234)
  }
}

@suite class Iota {
  @test async test1 () {
    assert.equal(iota(), 0)
    assert.equal(iota(), 1)
    assert.equal(iota(), 2)
    await new Promise(resolve => setTimeout(() => {
      assert.equal(iota(), 0)
      assert.equal(iota(), 1)
      resolve()
    }, 0))
    assert.equal(iota(), 0)
    assert.equal(iota(10), 10)
    assert.equal(iota(), 11)
  }
}

@suite class RequireDirectory {
  @test test1 () {
    const { lib } = requireDirectory('./lib/**/*.js', {
      root: path.resolve(__dirname, '..')
    })
    assert.equal(lib.di, di)
  }
}

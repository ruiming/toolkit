const { exclude } = require('..')
const assert = require('chai').assert

describe('Test iota', () => {
  it('', async () => {
    const testObj = {
      a: 1,
      b: 2,
      c: 3
    }
    assert.deepEqual(exclude(testObj, 'a', 'b'), { c: 3 })
  })
})

const { iota } = require('..')
const assert = require('chai').assert

describe('Test iota', () => {
  it('', async () => {
    assert.equal(iota(), 0)
    assert.equal(iota(), 1)
    assert.equal(iota(), 2)
    await new Promise(resolve => setTimeout(() => {
      assert.equal(iota(), 0)
      assert.equal(iota(), 1)
      resolve()
    }))
    assert.equal(iota(), 0)
    assert.equal(iota(10), 10)
    assert.equal(iota(), 11)
  })
})

const { arrange } = require('..')
const assert = require('chai').assert

describe('Test arrange', () => {
  it('', async () => {
    const arr1 = [[1, 2], [3, 4, 5]]
    const expectResult = [
      { '0': 1, '1': 3 },
      { '0': 1, '1': 4 },
      { '0': 1, '1': 5 },
      { '0': 2, '1': 3 },
      { '0': 2, '1': 4 },
      { '0': 2, '1': 5 }
    ]
    assert.deepEqual(arrange(arr1), expectResult)

    const arr2 = [[], []]
    assert.deepEqual(arrange(arr2), [])
  })
})

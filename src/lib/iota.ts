import * as callerCallsite from 'callsite'

let base = 0
let preContext: string

function iota (start?: number) {
  if (callerCallsite()[1].getMethodName() !== preContext) {
    preContext = callerCallsite()[1].getMethodName()
    base = 0
  }
  if (Number.isInteger(start)) {
    base = start
  }
  return base++
}

export {
  iota as default,
  iota
}

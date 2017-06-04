"use strict";
const callerCallsite = require("callsite");
let base = 0;
let preContext;
function iota(start) {
    if (callerCallsite()[1].getMethodName() !== preContext) {
        preContext = callerCallsite()[1].getMethodName();
        base = 0;
    }
    if (Number.isInteger(start)) {
        base = start;
    }
    return base++;
}
module.exports = iota;
//# sourceMappingURL=iota.js.map
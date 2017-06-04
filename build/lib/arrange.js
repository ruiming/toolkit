"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 全排列二维数组
 * @param routes 二维数组
 * @param index
 */
function arrange(routes, index = 0) {
    const len = routes.length;
    const items = [];
    for (const val of routes[index] || []) {
        if (index === len - 1) {
            items.push(val);
        }
        else {
            let count = index;
            for (const item of arrange(routes, ++count)) {
                items.push([val, item]);
            }
        }
    }
    return items;
}
exports.default = arrange;
exports.arrange = arrange;
//# sourceMappingURL=arrange.js.map
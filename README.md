## 实用工具函数
1. arrange

   全排列二维数组

   ```javascript
   const { arrange } = require('./lib/toolkit')
   console.log(arrange[[1, 2,], [3, 4, 5]])
   // output:
   [ { '0': 1, '1': 3 },
     { '0': 1, '1': 4 },
     { '0': 1, '1': 5 },
     { '0': 2, '1': 3 },
     { '0': 2, '1': 4 },
     { '0': 2, '1': 5 } ]
   ```

2. cut

   删除数组中的某一项

   ```javascript
   const { cut } = require('./lib/toolkit')
   const arr = [0, 1, 2, 3, 4, 5]
   console.log(cut(arr, 2))
   // output:
   [0, 1, 3, 4, 5]
   ```

3. require-directory

   递归加载模块

   ```javascript
   const requireDirectory = require('./lib/require-directory')
   const { lib } = requireDirectory('./lib/**/*.js')
   console.log(lib)
   // output:
   { arrange: [Function: arrange],
     callsite: [Function],
     cut: [Function],
     'require-directory': [Function] }
   ```

4. iota

  类似 Go 中的 iota


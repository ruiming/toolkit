module.exports = function (arr, index) {
  const items = Array.prototype.concat(arr.slice(0, index), arr.slice(index + 1, arr.length))
  return items
}

module.exports = function (obj, ...items) {
  const response = {}
  for (const key of Object.keys(obj)) {
    if (items.includes(key)) {
      continue
    } else {
      response[key] = obj[key]
    }
  }
  return response
}

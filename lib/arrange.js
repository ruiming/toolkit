module.exports = arrange

function arrange (routes, index = 0) {
  const len = Object.keys(routes).length
  const key = Object.keys(routes)[index]
  const items = []
  for (const val of routes[key]) {
    if (index === len - 1) {
      items.push({ [key]: val })
    } else {
      let count = index
      for (const item of arrange(routes, ++count)) {
        items.push(Object.assign({ [key]: val }, item))
      }
    }
  }
  return items
}

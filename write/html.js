const fs = require('fs')
const path = require('path')
const pbPath = path.resolve(__dirname, '../html')
const writeHTML = function (name, data) {
  fs.writeFileSync(path.resolve(pbPath, name), data)
}

const readHTML = function (name) {
  return fs.readFileSync(path.resolve(pbPath, name)).toString()
}

module.exports = {
  writeHTML,
  readHTML
}
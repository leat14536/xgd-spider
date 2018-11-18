const xlsx = require('node-xlsx')
const fs = require('fs')

function writeXlsx(path, data) {
  const buffer = xlsx.build(data)
  fs.writeFileSync(path, buffer)
}

module.exports = {
  writeXlsx
}
const request = require('https').request
const url = require('url')

module.exports.get = function (path) {
  return new Promise((resolve, reject) => {
    request(url.parse(path), res => {
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks).toString()))
    }).end()
  })
} 
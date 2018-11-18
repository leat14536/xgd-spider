process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const config = require('./config')
const {
  spideStart, 
  getAllLinksDetail, 
  handleSheet
} = require('./spider')
const {writeHTML} = require('./write/html')
const {writeXlsx} = require('./write/xlsx')

async function start() {
  for (let i = 0, l = config.length; i < l; i++) {
    const item = config[i]
    let entry = item.entry
    const times = item.times
    for (let j = 0, lj = times.length; j < lj; j++) {
      const ret = await spideStart(entry, ...times[j].map(t => (new Date(t)).getTime()))
      writeHTML(`./${item.prefix}${j+1}.json`, JSON.stringify(ret, null, 2))
      const data = await getAllLinksDetail(ret.data)
      const sheet = handleSheet(data)
      writeXlsx(`${item.publicPath}/${item.prefix}${j + 1}.xlsx`, [sheet])
      entry = ret.next
    }
  }
}

start().catch(e => {
  console.log(e)
})
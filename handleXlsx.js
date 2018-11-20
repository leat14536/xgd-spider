const fs = require('fs')
const pbPath = './news'
const list = fs.readdirSync(pbPath)
const xlsx = require('node-xlsx')
const {writeXlsx} = require('./write/xlsx')
list.filter(name => name[0] !== '.').forEach(name => {
  const xlsxData = xlsx.parse(`${pbPath}/${name}`)
  
  const arr = xlsxData[0].data.slice(1)

  const sourceMap = {}
  arr.forEach(item => {
    const source = item[1] || '无来源'
    if (!sourceMap[source]) {
      sourceMap[source] = [item]
    } else {
      sourceMap[source].push(item)
    }
  })
  
  xlsxData.push({
    name: '来源统计',
    data: [
      ['来源', '数量'],
      ...Object.entries(sourceMap).map(item => ([item[0], item[1].length]))
    ]
  })
  
  const authorMap = {} 
  Object.entries(sourceMap).forEach(item => {
    item[1].forEach(item => {
      const author = item[3] || '无作者'
      if (author in authorMap)  {
        authorMap[author].push(item)
      } else {
        authorMap[author] = item
      }
    })
  })
  
  xlsxData.push({
    name: '作者统计',
    data: [
      ['作者', '数量', '来源'],
      ...Object.entries(authorMap).map(item => {
        return [item[0], item[1].length, item[1][1]]
      })
    ]
  })
  
  writeXlsx(`${pbPath}/tj-${name}.xlsx`, xlsxData)
})
const {get} = require('./request')
const {writeHTML, readHTML} = require('../write/html')
const cheerio = require('cheerio')
const url = require('url')

// 获取在时间段内的所有链接
// 返回最后一页的html和所有去重链接
const spideStart = async function (entry, start, end) {
  const links = new Set()
  const next = await spide(entry)
  
  return {
    next,
    data: Array.from(links)
  }

  async function spide(next) {
    let flag = true
    let html
    console.log(next)
    try {
      html = await get(next)
    } catch (e) {
      html = await get(next)
    }
    // const html = readHTML('1.html')
    const $ = cheerio.load(html)
  
    // 遍历数据并set到links上
    $('.list-l ul li').each(function () {
      const fl = $(this).find('.fl')
      const dateStr = fl.find('.year').text() + '-' + fl.find('.day').text()
      const time = (new Date(dateStr)).getTime()
      if (time >= start && time < end) {
        const link = $(this).find('.fr a').attr('href')
        links.add(url.resolve(next, link))
      } else if (time < start) {
        flag = false
        return false
      }
    })

    if (flag) {
      // 爬下一页
      return await spide(url.resolve(next, $('.Next').attr('href')))
    } else {
      // 返回当前页link
      return next
    }
  }
}

// 传入links 返回链接内的详细数据
const reg = /发布时间：(.*)作者：(.*)来源：(.*)/
const linkReg = /https:\/\/news.nwpu.edu.cn\/info\/\d{4}\/\d*.htm/
const getAllLinksDetail = async function (links) {
  const data = []
  for (let i = 0, l = links.length; i < l; i+=2) {
    // await Promise.all(
    //   [
    const pm1 = handleLink(links[i])
    const pm2 = handleLink(links[i + 1])
    await pm1
    await pm2
    //     handleLink(links[i + 2]),
    //     handleLink(links[i + 3]),
    //     handleLink(links[i + 4])
    //   ]
    // )
  }

  return data

  async function handleLink (link) {
    if (!link) return
    let html
    if (!linkReg.test(link)) {
      data.push({
        link,
        auths: '宣传部',
        title: '出错, 可能是外链'
      })
      return
    }
    console.log(link)
    try {
      html = await get(link)
    } catch (e) {
      try {
        html = await get(link)
      } catch (e) {
        data.push({
          link,
          auths: '宣传部',
          title: '出错, 可能是外链'
        })
        return
      }
    }
    
    // const html = readHTML('2.html')
    const $ = cheerio.load(html)
    const str = $('.time span').slice(0, 3).text().trim()
    const title = $('h5').text()
    if (reg.test(str)) {
      const ret = reg.exec(str)
      data.push({
        time: ret[1],
        auths: ret[2],
        sources: ret[3],
        str,
        link,
        title
      })
    } else {
      data.push({
        str,
        link,
        title
      })
    }
  }
}

function handleSheet (data) {
  // 新闻列表
  const sheet = {
    name: '新闻列表', 
    data: [
      ['新闻标题', '来源1', '所有来源', '作者1', '所有作者', '时间', '链接']
    ]
  }
  // 作者
  data.forEach(item => {
    sheet.data.push([
      item.title,
      item.sources && item.sources.split(' ')[0] || '宣传部',
      item.sources,
      item.auths && item.auths.split(' ')[0],
      item.auths,
      item.time,
      item.link
    ])
  })

  return sheet
}

module.exports = {
  spideStart,
  getAllLinksDetail,
  handleSheet
}
const path = require('path')
module.exports = [
  {
    // 从哪里开始爬
    entry: 'https://news.nwpu.edu.cn/gdyw/1192.htm',
    // 生成excel的目录
    publicPath: path.resolve(__dirname, '../news'),
    // 生成的表格文件前缀
    prefix: 'news-',
    // 需要扫描的时间, 一个时间段一个文件
    // '2018-10-01', '2018-11-01'
    // 代表从2018-10-01扫描到2018-11-01之前
    // 不会扫描2018-11-01当天
    // 连续请按照时间倒序填写
    // 数据有交集需要分次扫描
    times: [
      // ['2018-9-1', '2018-10-1'],
      // ['2018-8-1', '2018-9-1'],
      // ['2018-7-1', '2018-8-1'],
      // ['2018-6-1', '2018-7-1'],
      // ['2018-5-1', '2018-6-1'],
      // ['2018-4-1', '2018-5-1'],
      // ['2018-3-1', '2018-4-1'],
      // ['2018-2-1', '2018-3-1'],
      ['2018-1-1', '2018-2-1']
    ]
  },
  // {
  //   entry: 'https://news.nwpu.edu.cn/xyxw/1776.htm',
  //   publicPath: path.resolve(__dirname, '../active'),
  //   prefix: 'active-',
  //   times: [
  //     ['2018-9-1', '2018-10-1'],
  //     ['2018-8-1', '2018-9-1'],
  //     ['2018-7-1', '2018-8-1'],
  //     ['2018-6-1', '2018-7-1'],
  //     ['2018-5-1', '2018-6-1'],
  //     ['2018-4-1', '2018-5-1'],
  //     ['2018-3-1', '2018-4-1'],
  //     ['2018-2-1', '2018-3-1'],
  //     ['2018-1-1', '2018-2-1']
  //   ]
  // }
]
// Array.apply(null, {length: 10}).map((_, i) => `['2018-${i + 1}-1', '2018-${i+2}-1']`).reverse().forEach(item => console.log(item))

const str = '发布时间：2018-11-05 16:25:35作者：王莹 郭友军来源：纪委办公室\n     '
const reg = /发布时间：(.*)作者：(.*)来源：(.*)\s+/
console.log(reg.exec(str))
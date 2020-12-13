function time(num) {
  num = parseInt(num)
  let str = ""
  if (num <= 0) return 0
  // 少于一分钟
  if (num < 60) {
    // if ((num += ''.length) === 1) {
    //   str += "0"
    // }
    str = str + num + "秒"
    return str
  }
  // 少于一小时
  if (num < 3600) {
    let min, sec
    min = Math.floor(num / 60)
    sec = Math.floor(num - min * 60)
    str = str + min + "分" + sec + "秒"
    return str
  }
  // 大于一小时
  if (num > 3600) {
    let hour, min, sec
    hour = Math.floor(num / 3600)
    min = Math.floor((num - hour * 3600) / 60)
    sec = Math.floor((num - hour * 3600 - min * 60))
    str = str + hour + "小时" + min + "分" + sec + "秒"
    return str
  }
}

export default time
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export function downloadExcel(dataArr, nameArr, excelName) {
  // dataArr二维数组，存放导出数据，不可为空
  // nameArr一维数组， 允许空数组（默认sheet）
  // excelName, 导出excel文件名，不允许为空
  const defaultCellStyle = { font: { name: '', sz: 11, color: 'FF00FF88' }, fill: { fgColor: { rgb: 'FFFFAA00' } } }
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle, showGridLines: false }
  const wb = { SheetNames: [], Sheets: {}, Props: {} }
  for (let i = 0; i < dataArr.length; i++) {
    wb.SheetNames[i] = nameArr[i] ? nameArr[i] : 'Sheet' + (i + 1)
    let data = dataArr[i]
    wb.Sheets[wb.SheetNames[i]] = XLSX.utils.json_to_sheet(data)
  }
  let tmpDown = new Blob([s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
  FileSaver.saveAs(tmpDown, excelName + '.xlsx')
}
export function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  } else {
    let buf = new Array(s.length)
    for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
}


//导入excel
export function onImportExcel(files) {
  console.log(this)
  // 获取上传的文件对象
  // const { files } = file.target;
  // 通过FileReader对象读取文件
  const fileReader = new FileReader();
  let func = (event) => {
    try {
      const { result } = event.target;
      // 以二进制流方式读取得到整份excel表格对象
      const workbook = XLSX.read(result, { type: 'binary' });
      // 存储获取到的数据
      let data = [];
      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        // esline-disable-next-line
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      // 最终获取到并且格式化后的 json 数据
      // const uploadData = data.map(item => {
      //   return {
      //     id: Number(item['人员ID']),
      //     name: item['姓名'],
      //     idType: this.findIdType(item['证件类型'], 'string'),
      //     credentialsId: item['证件号码'],
      //     tel: item['固定电话'],
      //     mobile: item['移动电话']
      //   }
      //   console.log(item)
      // })
      message.success('上传成功！') //这里用了antd中的message组件
      return data
    } catch (e) {
      // 这里可以抛出文件类型错误不正确的相关提示
      return message.error('文件类型不正确！');
    }
  };
  fileReader.onload = func
  // 以二进制方式打开文件  ;
  fileReader.readAsBinaryString(files[0])
}
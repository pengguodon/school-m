import request from 'utils/request'

export default {
  // 获取班级聊天记录
  classChatHistoryMsg(queryObj){
    return request({
      url: `/serviceadmin/mmyj-clchat/`,
      method: 'post',
      data: {
        "clId": queryObj.clId,
        "gmtCreate": queryObj.selectDate
      }
    })
  },

 
}
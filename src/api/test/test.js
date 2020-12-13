import request from 'utils/request'

export default {
  // 获取测验列表
  getListTest(crId) {
    return request({
      url: `/serviceadmin/mmyj-test/list/${crId}`,
      method: 'get'
    })
  },
  // 获取测验信息
  getTestInfo(id) {
    return request({
      url: `/serviceadmin/mmyj-test/one/${id}`,
      method: 'get'
    })
  },
  // 获取测验成绩列表
  getTestScoreList(id) {
    return request({
      url: `/serviceadmin/mmyj-test/score/${id}`,
      method: 'get'
    })
  }
}
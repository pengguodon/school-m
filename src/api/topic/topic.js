import request from 'utils/request'

export default {
  // 获取测验答题列表
  getTopicList(id) {
    return request({
      url: `/serviceadmin/mmyj-topic/NoAnswer/${id}`,
      method: 'get'
    })
  },
  // 获取个人测验答题信息
  getTopicList2(id) {
    return request({
      url: `/serviceadmin/mmyj-topic/${id}`,
      method: 'get'
    })
  }
}
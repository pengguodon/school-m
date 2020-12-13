import request from 'utils/request'

export default {
  // 根据 测验id && 学生id获取成绩列表
  getListScore(tsId) {
    return request({
      url: `/serviceadmin/mmyj-score/list/${tsId}`,
      method: 'get'
    })
  },

  // 根据 测验id && 学生id获取成绩列表
  postScore(scoreQuery, tsId) {
    return request({
      url: `/serviceadmin/mmyj-score/${tsId}`,
      method: 'post',
      data: scoreQuery
    })
  },
  // 根据 测验id && 学生id个人获取成绩信息
  getScoreInfoByOne(stId, tsId) {
    return request({
      url: `/serviceadmin/mmyj-score/one/${stId}/${tsId}`,
      method: 'get'
    })
  }
}
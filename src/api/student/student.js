import request from 'utils/request'

export default {
  studentLogin(id, password){
    return request({
      url: `/serviceadmin/mmyj-student/login`,
      method: 'post',
      data: {
        id,
        password
      }
    })
  },

  getStudentInfo(){
    return request({
      url: `/serviceadmin/mmyj-student/getLoginInfo`,
      method: 'get'
    })
  },

  checkStudentPassword(password){
    return request({
      url: `/serviceadmin/mmyj-student/checkPassword/${password}`,
      method: 'get'
    })
  },

  updateStudentPassword(oldPassword, newPassword, stId){
    return request({
      url: `/serviceadmin/mmyj-student/updatePassword`,
      method: 'post',
      data: {
        newPassword,
        oldPassword
      }
    })
  },

  updateStudentAvatar(url){
    return request({
      url: `/serviceadmin/mmyj-student/updateAvatar`,
      method: 'post',
      data: {
        "stAvatar": url
      }
    })
  },

  updateStudentNo(no){
    return request({
      url: `/serviceadmin/mmyj-student/updateNo`,
      method: 'post',
      data: {
        "stNo": no
      }
    })
  }
}
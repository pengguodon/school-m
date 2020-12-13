import request from 'utils/request'

export default {

  // 获取id课程信息
  getCourseInfo(id){
    return request({
      url: `/serviceadmin/mmyj-course/one/${id}`,
      method: 'get'
    })
  },
  
  // 学生添加课程
  bindingCourse(stCourse){
    return request({
      url: `/serviceadmin/mmyj-stcourse/`,
      method: 'post',
      data: stCourse
    })
  },

   // 学生获取课程
   getCourseList(){
    return request({
      url: `/serviceadmin/mmyj-stcourse`,
      method: 'get'
    })
  },
  // 获取加入课程的学生们
  getCourseStudentList(id){
    return request({
      url: `/serviceadmin/mmyj-course/studentList/${id}`,
      method: 'get'
    })
  }
}
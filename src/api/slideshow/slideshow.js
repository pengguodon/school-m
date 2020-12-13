import request from 'utils/request'

export default {

  // 获取轮播图列表
  slideshowList(){
    return request({
      url: `/serviceadmin/mmyj-slideshow/list`,
      method: 'get'
    })
  }
  
}
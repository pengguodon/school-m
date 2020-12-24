import axois from 'axios'
import { getStudentToken } from 'utils/auth'
import { getUrl } from 'utils/baseUrl'

import { Toast } from 'antd-mobile';

// 创建axois实例
const service = axois.create({
  baseURL: getUrl(), // api的 base_url
  timeout: 5000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    if(getStudentToken()){
      config.headers['student-token'] = getStudentToken()
    }
    Toast.loading('加载中', 0)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code非20000是抛错
     */
    const res = response.data
    if(res.code !== 20000){
      Toast.fail(res.message, 3);
      return Promise.reject('error')
    }else {
      Toast.hide()
      return response.data
    }
  },
  err => {
    Toast.fail("请求超时，请稍后再试", 3);
    // console.log('错误:' + err)
    return Promise.reject(err)
  }
)

export default service
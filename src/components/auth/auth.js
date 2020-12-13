import React from 'react'

import {  Redirect , withRouter} from 'react-router-dom'

// token工具
import { getStudentToken, removeStudentToken } from 'utils/auth'

// 请求学生数据对象
import MyStudent from 'api/student/student'

// redux
import { connect } from 'react-redux'
import { setUserINFO } from 'myredux/myRedux'

// antd
import { Toast } from 'antd-mobile';


class Auth extends React.Component{

  state = {
    isLogin: false
  }

  componentDidMount(){
    this.init()
  }

  init(){
    // 获取token,校验身份是否登录
    let token = getStudentToken()
    // 如果已登陆, 跳转
    if (token) {
      // 获取设置学生信息
      MyStudent.getStudentInfo().then((res) => {
        // 查询失败
        if(!res.data.info){
          removeStudentToken()
          Toast.info('认证失败，请重新登录！', 1)
          return this.props.history.push("/login")
        }
        // 查询成功
        this.props.changeUserInfo({
          ...res.data.info
        })
        this.setState({
          isLogin: true
        })
      })
    }else{
      if(this.props.defend){
        Toast.info('认证失败，请登录！', 1)
        return this.props.history.push("/login")
      }
    }
  }

  render(){
    return (
      this.state.isLogin ? <Redirect to="/index"></Redirect> : null
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userData => {
      dispatch(setUserINFO(userData))
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Auth))
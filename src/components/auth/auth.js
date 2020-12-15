import React from 'react'

import { Redirect, withRouter } from 'react-router-dom'

// token工具
import { getStudentToken, removeStudentToken } from 'utils/auth'

// 请求学生数据对象
import MyStudent from 'api/student/student'

// redux
import { connect } from 'react-redux'
import { setUserINFO } from 'myredux/myRedux'
import { setClassRecvmsg } from 'myredux/myRedux'


// antd
import { Toast } from 'antd-mobile';

// socket.io
import { io } from 'socket.io-client';
import { getUrl } from 'utils/nodeBaseUrl'


class Auth extends React.Component {

  componentWillUnmount(){
    // 断开连接
    if(this.socket){
      this.socket.close()
    }
  }

  state = {
    isLogin: false
  }

  componentDidMount() {
    this.init()
  }

  startClassMsgListener(classId) {
    // 开启即时通讯监听
    this.socket = io(getUrl())
    this.socket.on('recvmsg' + classId, (data) => {
      this.props.addClassRecvmsg(data)
    })
  }

  init() {
    // 获取token,校验身份是否登录
    let token = getStudentToken()
    // 如果已登陆, 跳转
    if (token) {
      // 获取设置学生信息
      MyStudent.getStudentInfo().then((res) => {
        // 查询失败
        if (!res.data.info) {
          removeStudentToken()
          Toast.info('认证失败，请重新登录！', 1)
          return this.props.history.push("/login")
        }
        // 查询成功
        this.props.changeUserInfo({
          ...res.data.info
        })

        // 开始监听即时通讯
        this.startClassMsgListener(res.data.info.clId)

        this.setState({
          isLogin: true
        })
      })
    } else {
      if (this.props.defend) {
        Toast.info('认证失败，请登录！', 1)
        return this.props.history.push("/login")
      }
    }
  }

  render() {
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
    },
    addClassRecvmsg: msgInfo => {
      dispatch(setClassRecvmsg(msgInfo))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))
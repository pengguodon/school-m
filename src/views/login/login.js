import React from 'react'
import { withRouter } from 'react-router-dom'
import './login.css'

import { List, InputItem, WhiteSpace, Button, Modal } from 'antd-mobile';
import IconFont from 'utils/iconfont'

// MD5加密工具
import myEncrypt from 'utils/myMd5'

// 请求学生数据对象
import MyStudent from 'api/student/student'

// token工具
import { setStudentToken } from 'utils/auth'

// redux
import { connect } from 'react-redux'
import { setUserINFO, setTourist } from 'myredux/myRedux'

import Auth from 'components/auth/auth'

import HighBox from 'components/highBox/highBox'


const alert = Modal.alert;

const touristIcon = <IconFont style={
  {
    fontSize: 20,
  }
} type="icon-youkefangwen" />

// 显示警告弹框
const showAlert = () => {
  alert('警告', '输入的内容不能为空', [
    { text: '知道了' },
  ])
};

class Login extends React.Component {
  state = {
    id: "",
    password: "",
  }

  // 登陆按钮点击处理
  loginBtnHandle() {
    if (!this.state.id || !this.state.password) {
      return showAlert()
    }
    MyStudent.studentLogin(this.state.id, myEncrypt(this.state.password)).then((res) => {
      // 登陆成功：设置cookie(token)
      setStudentToken(res.data.token)

      // 获取学生信息
      MyStudent.getStudentInfo().then((res) => {
        this.props.changeUserInfo({
            ...res.data.info
        })
      })
      this.props.setTourist(false)
      this.props.history.push('/course');
    })
  }

  // 输入框改变函数
  inputChange(v, type) {
    this.setState({
      [type]: v
    })
  }

  go_to_tourist(){
    this.props.setTourist(true)
    this.props.history.push('/index');
  }

  render() {
    return (
      <div className="login">
        <Auth defend={false} />
        <div className='login-logo'>
          <img src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/Logo.png"} width="100" height="100" alt="logo" />
        </div>
        <div className="login-input">
          <List>
            <form>
              <WhiteSpace />
              <WhiteSpace />
              <InputItem
                ref="account"
                clear
                placeholder="请输入账号"
                autoComplete="off"
                value={this.state.id}
                onChange={(v) => { this.inputChange(v, "id") }}
                maxLength={32}
              >账号</InputItem>
              <WhiteSpace />
              <WhiteSpace />
              <InputItem
                ref="password"
                type="password"
                placeholder="请输入密码"
                autoComplete="off"
                value={this.state.password}
                onChange={(v) => { this.inputChange(v, "password") }}
                maxLength={32}
                clear
              >密码</InputItem>
            </form>
          </List>
        </div>
        <div className="login-submit myBtnWapper">
          <Button type="primary" onClick={() => { this.loginBtnHandle() }}>登录</Button>
        </div>
        <HighBox/>
        <div style={{textAlign: "center"}}>
          <Button icon={touristIcon} inline  onClick={() => { this.go_to_tourist() }}>游客模式进入</Button>
        </div>
        <HighBox/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userData => {
      dispatch(setUserINFO(userData))
    },
    setTourist: flag => {
      dispatch(setTourist(flag))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
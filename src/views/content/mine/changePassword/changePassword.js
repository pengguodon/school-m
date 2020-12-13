import React from 'react'

import './changePassword.css'

import { Result, InputItem, List, WhiteSpace, Button, Icon } from 'antd-mobile';

import MyStudent from 'api/student/student'

import myEncrypt from 'utils/myMd5'

import { Toast } from 'antd-mobile';

import { connect } from 'react-redux'
import { setUserINFO } from 'myredux/myRedux'

import { withRouter } from 'react-router-dom'

import { removeStudentToken } from 'utils/auth'

import info from 'vo/redux_userinfo'

import NavBar from 'components/navBar/navBar'

class ChangePassword extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    loading: false,
    first: true,
    verify: false
  }

  componentDidMount() {
    this.init()
  }

  init() {
  }

  // 输入框回调函数
  inputChange(v, type) {
    this.setState({
      [type]: v
    })
  }

  // 检测旧密码函数
  checkBtnHandle() {
    if (this.state.oldPassword === "") {
      return Toast.fail("旧密码不能为空", 3);
    }
    MyStudent.checkStudentPassword(myEncrypt(this.state.oldPassword)).then((res) => {
      // 验证成功!
      this.setState({
        first: false,
        verify: true
      })
    }).catch((e) => {
      // 验证失败!
      this.setState({
        first: false
      })
    })
  }

  // 修改密码
  changeBtnHandle() {
    if (this.state.newPassword === "") {
      return Toast.fail("新密码不能为空", 3);
    }

    MyStudent.updateStudentPassword(myEncrypt(this.state.oldPassword), myEncrypt(this.state.newPassword)).then((res) => {
      // 修改成功！
      // 清除状态重新登录
      Toast.success("密码修改成功！请重新登录", 2);
      removeStudentToken()
      this.props.changeUserInfo({
        ...info
      })
      this.props.history.push("/login")
    })
  }

  render() {
    return (
      <div className='changePassword'>
        <NavBar title="修改密码" back={true} url="/mine"/>
        <form>
        {
          this.state.first ?
            <div className="checkPassWord">
              <Result
                img={<img src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/warn.svg"} className="spe am-icon am-icon-md" alt="" />}
                message="请在下方输入旧密码进行验证"
              />
              <List>
                <div className="oldPassword">
                  <InputItem
                    type="password"
                    ref="oldPassword"
                    clear
                    placeholder="点击这里进行输入"
                    autoComplete="off"
                    value={this.state.oldPassword}
                    onChange={(v) => { this.inputChange(v, "oldPassword") }}
                    maxLength={32}
                  >旧密码</InputItem>
                </div>
              </List>

              <WhiteSpace size="xl" />

              <div className="check-submit myBtnWapper">
                <Button key="oldBtn" type="primary" onClick={() => {
                  this.checkBtnHandle()
                }} loading={this.state.loading ? true : false}>进行验证</Button>
              </div>

            </div>
            :
            this.state.verify ?
              (
                <div>
                  <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                    title="验证成功"
                    message="请在下方输入新密码"
                  />
                  <List>
                    <div className="oldPassword">
                      <InputItem
                        type="password"
                        ref="newPassword"
                        clear
                        placeholder="点击这里进行输入"
                        autoComplete="off"
                        value={this.state.newPassword}
                        onChange={(v) => { this.inputChange(v, "newPassword") }}
                        maxLength={32}
                      >新密码</InputItem>
                    </div>
                  </List>
                  <div className="myBtnWapper">
                    <Button key="newBtn" type="primary" onClick={() => {
                      this.changeBtnHandle()
                    }}>确定修改</Button>
                  </div>
                </div>
              )
              :
              <Result
                img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
                title="验证失败"
                message="旧密码不对！请稍后再试！"
              />
        }
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userData => {
      dispatch(setUserINFO(userData))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ChangePassword))
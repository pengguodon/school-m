import React from 'react'

import './mineIndex.css'
import { List } from 'antd-mobile';
import { ActionSheet } from 'antd-mobile';
import { connect } from 'react-redux'
import { setUserINFO } from 'myredux/myRedux'
import { removeStudentToken } from 'utils/auth'
import { withRouter } from 'react-router-dom'

import info from 'vo/redux_userinfo'
import NavBar from 'components/navBar/navBar'
import MineInfo from './mineInfo/mineInfo'

const Item = List.Item;

// 修正了iOS上触摸滚动背景页的问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class MineIndex extends React.Component {

  // 路由函数
  pushHandle(path) {
    this.props.history.push("mine/" + path)
  }

  // 万金尤解决报错
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  // 退出操作
  showActionSheet = () => {
    const BUTTONS = ['退出', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // 退出操作
          // 1. 清除cookie
          removeStudentToken()
          // 2. 清除redux
          this.props.changeUserInfo({
            ...info
          })
          this.props.history.push("/login")
        }
      });
  }
  state = {
    disabled: false,
  }
  render() {
    return (
      <div className="mineIndex">
        <NavBar title="我的主页" />
        <MineInfo/>
        <List className="mineIndex-nav-list">
          <Item
            thumb="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/icon/mine/%E4%BF%AE%E6%94%B9.png"
            arrow="horizontal"
            onClick={() => { this.pushHandle("ChangeAvatar") }}
          >
            更改头像
          </Item>
          <Item
            thumb="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/icon/mine/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81.png"
            arrow="horizontal"
            onClick={() => { this.pushHandle("changePassword") }}
          >
            修改密码
          </Item>
          <Item
            thumb="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/icon/mine/about.png"
            arrow="horizontal"
            onClick={() => { this.pushHandle("about") }}
          >
            关于我们
          </Item>
          <Item
            thumb="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/icon/mine/%E9%80%80%E5%87%BA.png"
            arrow="horizontal"
            onClick={() => { this.showActionSheet() }}
          >
            退出登陆
          </Item>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userData => {
      dispatch(setUserINFO(userData))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MineIndex))
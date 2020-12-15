import React from 'react'

import './classChat.css'

import { io } from 'socket.io-client';

import { connect } from 'react-redux'
import { setClassRecvmsgRead } from 'myredux/myRedux'
import { withRouter } from 'react-router-dom'


import NavBar from 'components/navBar/navBar'

import { InputItem, Toast, Grid } from 'antd-mobile';

import BetterScroll from 'better-scroll'
import { getUrl } from 'utils/nodeBaseUrl'

import uuid from 'utils/uuid'

class ClassChat extends React.Component {
  state = {
    recvmsg: [],
    sendmsg: "",
    showEmoji: false
  }

  componentDidMount() {
    this.init()
    this.fixCarousel()
  }

  fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}

  componentDidUpdate() {
    this.bs.refresh()
  }

  init() {
    this.socket = io(getUrl());
    this.readMsgCB()
    this.n3ScInit()
    this.byToBottom()

    if (!this.props.userInfo.clId) {
      return Toast.fail('会话信息丢失，请重新进入', 3, () => {
        this.props.history.push('/mine')
      })
    }
    this.socket.on('recvmsg' + this.props.userInfo.clId, (data) => {
      Toast.info('您有新的聊天消息', 1, null, false);
    })
  }

  componentWillUnmount() {
    // this.readMsgCB()
    this.clearMsgCB()
    // 断开连接
    if (this.socket) {
      this.socket.close()
    }
  }

  n3ScInit() {
    this.bs = new BetterScroll('#classChat-content-id', {
      zoom: true,
      scrollbar: true,
    })
  }

  clearMsgCB() {
    this.props.setClassRecvmsgRead([])
  }

  // 修改未读消息状态
  readMsgCB() {
    // 把所有消息变为已读
    let newMsgObj = this.props.classRecvmsg.map(v => {
      return {
        ...v,
        read: 1
      }
    })
    this.props.setClassRecvmsgRead(newMsgObj)
  }

  // 回滚到底部
  byToBottom() {
    let el = document.getElementsByClassName("classChat-content-list-bottom")[0]
    this.bs.scrollToElement(el)
  }

  sendMsg() {
    // 滚动到底部
    if (this.state.sendmsg === "") {
      return Toast.fail('发送的内容不能为空', 1, null, false);
    }
    const { userInfo } = this.props
    let msgObj = {
      formId: userInfo.stId,
      clId: userInfo.clId,
      msg: this.state.sendmsg,
      name: userInfo.stName,
      formAvImg: userInfo.stAvatar,
      flag: uuid()
    }
    this.socket.emit("sendmsg", msgObj, (data) => {
      if (data.status === "ok") {
        this.byToBottom()
      }
    })
    this.setState({
      sendmsg: ""
    })
    // 聚焦
    this.refs.myInput.focus()
  }

  // 输入框改变函数
  inputChange(v, type) {
    this.setState({
      [type]: v
    })
  }

  createCard() {
    return this.props.classRecvmsg.map(v => {
      if (v.formId === this.props.userInfo.stId) {
        // 自己发的消息
        return (
          <div className="classChat-content-right clearfix" key={v.flag}>
            <div className="classChat-content-right-content clearfix">
              <div className="classChat-content-right-content-av">
                <img width="40px" src={v.formAvImg} alt="" />
              </div>
              <div className="classChat-content-right-content-name">
                我
            </div>
              <div className="classChat-content-right-content-desc">
                {v.msg}
              </div>
            </div>
          </div>
        )
      } else {
        // 别人发的
        return (
          <div className="classChat-content-left clearfix" key={v.flag}>
            <div className="classChat-content-left-content clearfix">
              <div className="classChat-content-left-content-av">
                <img width="40px" src={v.formAvImg} alt="" />
              </div>
              <div className="classChat-content-left-content-name">
                {v.name}
              </div>
              <div className="classChat-content-left-content-desc">
                {v.msg}
              </div>
            </div>
          </div>
        )
      }
    })
  }

  render() {
    const { userInfo } = this.props
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))
    return (
      <div className='classChat'>
        <NavBar title={userInfo.clName + " - 聊天室"} back={true} url="/mine" />
        <div className="classChat-content" ref="content">
          <div id="classChat-content-id">
            <div className="classChat-content-list">
              {this.createCard()}
              <div className="classChat-content-list-bottom" style={{ height: "50px" }}></div>
            </div>
          </div>
        </div>
        {
          this.state.showEmoji ? 
          <div className="emoji-wrap noSelect">
          <Grid
            data={emoji}
            columnNum={8}
            carouselMaxRow={3}
            isCarousel={true}
            onClick={el => {
              this.setState({
                sendmsg: this.state.sendmsg + el.text
              })
              this.refs.myInput.focus()

            }}
          />
        </div>:null
        }
       
        <div className="classChat-input-wrap">
          <div className="classChat-input-wrap-input">
            <div>
              <InputItem
                onFocus={() => { this.byToBottom() }}
                ref="myInput"
                value={this.state.sendmsg}
                onChange={(v) => { this.inputChange(v, "sendmsg") }}
                
              />
            </div>
          </div>

          <div className="classChat-input-wrap-right">
            <span className="classChat-input-wrap-right-face" role="img" aria-label="" onClick={()=>{
              this.setState({showEmoji: !this.state.showEmoji})
              this.fixCarousel()
              }}>😀</span>
            <span className="classChat-input-wrap-right-btn">
              <span className="classChat-input-wrap-right-btn-send" onClick={() => { this.sendMsg() }}>发送</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    classRecvmsg: state.classRecvmsg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClassRecvmsgRead: msgInfo => {
      dispatch(setClassRecvmsgRead(msgInfo))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassChat))
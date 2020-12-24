import React from 'react'

import './classChatIndex.css'

import { io } from 'socket.io-client';

import { connect } from 'react-redux'
import { setClassRecvmsgRead } from 'myredux/myRedux'
import { withRouter } from 'react-router-dom'

import NavBar from 'components/navBar/navBar'

import { InputItem, Toast, Grid } from 'antd-mobile';

import RightContent from './rightContent/rightContent'

import BetterScroll from 'better-scroll'
import { getUrl } from 'utils/nodeBaseUrl'

class ClassChatIndex extends React.Component {
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
    this.readMsgCB()
    // this.clearMsgCB() // 清除消息
    // 断开连接
    if (this.socket) {
      this.socket.close()
    }
  }

  n3ScInit() {
    this.bs = new BetterScroll('#ClassChatIndex-content-id', {
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
    let el = document.getElementsByClassName("ClassChatIndex-content-list-bottom")[0]
    this.bs.scrollToElement(el)
  }

  sendMsg() {
    // 滚动到底部
    if (this.state.sendmsg === "") {
      return Toast.fail('发送的内容不能为空', 1, null, false);
    }
    const { userInfo } = this.props
    let msgObj = {
      stId: userInfo.stId,
      clId: userInfo.clId,
      clMsg: this.state.sendmsg,
      name: userInfo.stName,
      formAvImg: userInfo.stAvatar,
    }
    this.socket.emit("sendmsg", msgObj, (data) => {
      if (data.status === "ok") {
        this.byToBottom()
      }else{
        // 发送不成功
        Toast.fail('发送失败！', 1);
      }
    })
    this.setState({
      sendmsg: "",
      showEmoji: false
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
      if (v.stId === this.props.userInfo.stId) {
        // 自己发的消息
        return (
          <div className="ClassChatIndex-content-right clearfix" key={v.id}>
            <div className="ClassChatIndex-content-right-content clearfix">
              <div className="ClassChatIndex-content-right-content-av">
                <img width="40px" src={v.formAvImg} alt="" />
              </div>
              <div className="ClassChatIndex-content-right-content-name">
                我
            </div>
              <div className="ClassChatIndex-content-right-content-desc">
                {v.clMsg}
              </div>
            </div>
          </div>
        )
      } else {
        // 别人发的
        return (
          <div className="ClassChatIndex-content-left clearfix" key={v.id}>
            <div className="ClassChatIndex-content-left-content clearfix">
              <div className="ClassChatIndex-content-left-content-av">
                <img width="40px" src={v.formAvImg} alt="" />
              </div>
              <div className="ClassChatIndex-content-left-content-name">
                {v.name}
              </div>
              <div className="ClassChatIndex-content-left-content-desc">
                {v.clMsg}
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
      <div className='ClassChatIndex'>
        <NavBar title={userInfo.clName + " - 聊天室"} back={true} url="/mine" rightContent={RightContent}/>
        <div className="ClassChatIndex-content" ref="content">
          <div id="ClassChatIndex-content-id">
            <div className="ClassChatIndex-content-list">
              {this.createCard()}
              <div className="ClassChatIndex-content-list-bottom" style={{ height: "50px" }}></div>
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
       
        <div className="ClassChatIndex-input-wrap">
          <div className="ClassChatIndex-input-wrap-input">
            <div>
              <InputItem
               maxLength="250"
                onFocus={() => { this.byToBottom() }}
                ref="myInput"
                value={this.state.sendmsg}
                onChange={(v) => { this.inputChange(v, "sendmsg") }}
              />
            </div>
          </div>

          <div className="ClassChatIndex-input-wrap-right">
            <span className="ClassChatIndex-input-wrap-right-face" role="img" aria-label="" onClick={()=>{
              this.setState({showEmoji: !this.state.showEmoji})
              this.refs.myInput.focus()
              this.fixCarousel()
              }}>😀</span>
            <span className="ClassChatIndex-input-wrap-right-btn">
              <span className="ClassChatIndex-input-wrap-right-btn-send" onClick={() => { this.sendMsg() }}>发送</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassChatIndex))
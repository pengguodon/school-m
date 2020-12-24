import React from 'react'

import './msgChat.css'

import BetterScroll from 'better-scroll'
import { connect } from 'react-redux'

class MsgChat extends React.Component{

  state = {
    data: []
  }

  componentDidUpdate(){
    this.bs.refresh()
  }

  n3ScInit() {
    this.bs = new BetterScroll('.msgChat-wrapper', {
      zoom: true,
      scrollbar: true,
    })
  }

  componentDidMount(){
    this.init()
  }

  init(){
    this.setState({
      data: [...this.props.data]
    })
    this.n3ScInit()
  }

  createCard() {
    return this.props.data.map(v => {
      if (v.stId === this.props.userInfo.stId) {
        // 自己发的消息
        return (
          <div className="msgChat-content-right clearfix" key={v.clChatId}>
            <div className="msgChat-content-right-content clearfix">
              <div className="msgChat-content-right-content-av">
                <img width="40px" src={v.stAvatar} alt="" />
              </div>
              <div className="msgChat-content-right-content-name">
              {v.gmtCreate} 我 
            </div>
              <div className="msgChat-content-right-content-desc">
                {v.clMsg}
              </div>
            </div>
          </div>
        )
      } else {
        // 别人发的
        return (
          <div className="msgChat-content-left clearfix" key={v.clChatId}>
            <div className="msgChat-content-left-content clearfix">
              <div className="msgChat-content-left-content-av">
                <img width="40px" src={v.stAvatar} alt="" />
              </div>
              <div className="msgChat-content-left-content-name">
                {v.gmtCreate} {v.stName}
              </div>
              <div className="msgChat-content-left-content-desc">
                {v.clMsg}
              </div>
            </div>
          </div>
        )
      }
    })
  }

  render(){
    return (
      <div className='msgChat'>
        <div className="msgChat-wrapper">
            <div className="msgChat-content">
              {this.createCard()}
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  }
}

export default connect(mapStateToProps)(MsgChat)
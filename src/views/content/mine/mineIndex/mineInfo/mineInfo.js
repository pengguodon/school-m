import React from 'react'

import './mineInfo.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ChangeStNo from './changeStNo/changeStNo'

class MineInfo extends React.Component {
  goto_changeAavatar(){
    this.props.history.push("/mine/ChangeAvatar")
  }

  render() {
    return (
      <div className='mineInfo'>
          <div className="mineInfo-bg"></div>
          <div className="mineInfo-wrap">
            <div className="mineInfo-info">
              <div className="mineInfo-info-avatar">
                <img onClick={()=>{this.goto_changeAavatar()}} width="80" height="80" src={this.props.userInfo.stAvatar} alt="" />
              </div>
              <div className="mineInfo-info-desc">
                <div className="mineInfo-info-desc-username">{this.props.userInfo.stName}</div>
                <div className="mineInfo-info-desc-className">
                  班级：{this.props.userInfo.clName}
                  <ChangeStNo/>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

export default withRouter(connect(mapStateToProps, null)(MineInfo))
import React from 'react'

import './back.css'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setTourist } from 'myredux/myRedux'

class Back extends React.Component {
  go_to_login(){
    this.props.changeTourist(false)
    this.props.history.push("/login")
  }

  render() {
    return (
      <div className='back' onClick={()=>{this.go_to_login()}}>
        登录
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTourist: flag => {
      dispatch(setTourist(flag))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Back))
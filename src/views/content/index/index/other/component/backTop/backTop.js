import React from 'react'

import './backTop.css'

class BackTop extends React.Component {
  // 回到顶部
  backTop() {
    let indexWrap = document.getElementsByClassName("indexWrap")[0]
    if(indexWrap.scrollTop > 0) indexWrap.scrollTop = 0
  }

  render() {
    return (
      <span className='other-backTop' onClick={() => { this.backTop() }}>
        顶部
      </span>
    )
  }
}

export default BackTop
import React from 'react'

import './backTop.css'

let indexWrap = document.getElementsByClassName("indexWrap")[0]

class BackTop extends React.Component {

  state = {
    scHeight: 100,
    flag: false
  }

  goToBack(){
    let pos = indexWrap.scrollTop;
    if(pos > 0){
      indexWrap.scrollTop = (pos - 28)
    }else{
      clearInterval(this.goToBackIt)
    }
  }

  componentWillUnmount(){
    clearInterval(this.goToBackIt)
    indexWrap.onscroll = null
  }

  componentDidMount(){
    this.onScoll()
  }

  // 监听定位, 超出显示回到顶部按钮
  onScoll(){
    indexWrap.onscroll = ()=>{
      if(indexWrap.scrollTop > this.state.scHeight){
        this.setState({
          flag: true
        })
      }else{
        this.setState({
          flag: false
        })
      }
    }
  }

  // 回到顶部
  backTop() {
    this.goToBackIt = setInterval(()=>{this.goToBack()}, 16)
  }

  render() {
    return (
      <span style={{transition: "0.5s"}} className={ this.state.flag ? 'other-backTop' : 'other-backTop-none'}  onClick={() => { this.backTop() }}>
        <span className="other-backTop-bg"></span>
      </span>
    )
  }
}

export default BackTop
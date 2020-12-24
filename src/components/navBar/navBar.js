import React from 'react'
import './navBar.css'
import { NavBar, Icon } from 'antd-mobile';

import { withRouter } from 'react-router-dom'

class MyNavBar extends React.Component {

  componentDidMount() {
    this.init()
  }

  // 初始化方法
  init() {
    
  }

  go_back(){
    if(this.props.back){
      if(this.props.url){
        return this.props.history.push(this.props.url)
      }else{
        return this.props.history.goBack()
      }
    }
  }

  render() {
    let RightContent = null
    if(this.props.rightContent){
      RightContent = this.props.rightContent
    }
    return (
      <div className="nav-bar">
        <NavBar
          mode="light"
          icon={this.props.back ? <Icon type="left" size="lg"  /> : null}
          onLeftClick={() => this.go_back()}
          rightContent={RightContent ? <RightContent /> : null}
          leftContent={this.props.back ? <span style={{marginLeft: "-10px"}}>返回</span> : null}
        >{this.props.title}</NavBar>
      </div>
    )
  }
}

export default withRouter(MyNavBar)
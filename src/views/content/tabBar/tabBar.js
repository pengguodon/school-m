import React from 'react'
import { TabBar } from 'antd-mobile';

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import './tabBar.css'

class MyTabBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'index',
      hidden: false,
      fullScreen: false,
      isLogout: false
    };
  }

  // 切换tab方法
  toggleTab(tabName){
    this.setState({
      selectedTab: tabName
    })

    this.props.history.push(tabName)
  }

  init(){
    // 激活图标操作
    let pathname = this.props.location.pathname
    if(pathname.startsWith('/index')){
      this.setState({
        selectedTab: 'index'
      })
    }else if(pathname.startsWith('/course')){
      this.setState({
        selectedTab: 'course'
      })
    }else if(pathname.startsWith('/mine')){
      this.setState({
        selectedTab: 'mine'
      })
    }
  }

  componentDidMount(){
   this.init() 
  }

  render() {
    const { location, tourist } = this.props
    return (
      (location.pathname.startsWith("/course/test/ask") || location.pathname.startsWith("/course/test/score") || tourist )
      ? 
      null 
      :
      <div className="tabBar" style={{width: "100%"}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={
              <div style={{
                width: '22px',
                height: '22px',}}
              ><span className="iconfont">&#xe708;
              </span></div>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',}}
              ><span className="iconfont">&#xe708;
              </span></div>
            }
            selected={ location.pathname.startsWith('/index') }
            onPress={() => {
              this.toggleTab('/index')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',}}
              ><span className="iconfont">&#xe63f;
              </span></div>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',}}
              ><span className="iconfont">&#xe63f;
              </span></div>
            }
            title="课程"
            // badge={1}
            key="course"
            selected={ location.pathname.startsWith('/course') }
            onPress={() => {
              this.toggleTab('/course')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',}}
              ><span className="iconfont">&#xe60b;
              </span></div>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',}}
              ><span className="iconfont">&#xe60b;
              </span></div>
            }
            title="我的"
            key="mine"
            selected={location.pathname.startsWith('/mine')}
            onPress={() => {
              this.toggleTab('/mine')
            }}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    tourist: state.tourist
  }
}

export default withRouter(connect(mapStateToProps)(MyTabBar))
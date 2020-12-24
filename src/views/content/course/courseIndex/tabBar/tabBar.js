import React from 'react'

import './tabBar.css'

import { TabBar } from 'antd-mobile';

import { withRouter } from 'react-router-dom'


class MyTabBar extends React.Component {

  componentDidMount(){
    this.init()
  }

  init(){
 
  }

   // 切换tab方法
  toggleTab(tabName){
    this.props.history.push({
      pathname: "/course/index/" + tabName,
    })
  }

  render() {
    const { location } = this.props
    return (
      <div className='coureTabBar'>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#FCFFFF"
          tabBarPosition="top"
        >
          <TabBar.Item
            title="信息"
            key="info"
            icon={
              <div style={{
                width: '22px',
                height: '22px',
              }}
              ><span className="iconfont">&#xe619;</span></div>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
              }}
              ><span className="iconfont">&#xe619;</span></div>
            }
            selected={location.pathname.startsWith('/course/index/info')}
            onPress={() => {
              this.toggleTab('info')
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
              }}
              ><span className="iconfont">&#xe63c;</span></div>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
              }}
              ><span className="iconfont">&#xe63c;</span></div>
            }
            title="成员"
            key="member"
            selected={location.pathname.startsWith('/course/index/member')}
            onPress={() => {
              this.toggleTab('member')
            }}
            data-seed="logId1"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
              }}
              ><span className="iconfont">&#xe63f;</span></div>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
              }}
              ><span className="iconfont">&#xe63f;</span></div>
            }
            title="活动"
            key="activity"
            selected={location.pathname.startsWith('/course/index/activity')}
            onPress={() => {
              this.toggleTab('activity')
            }}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

export default withRouter(MyTabBar)
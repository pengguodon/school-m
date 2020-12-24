import React from 'react'

import './statistics.css'
import NavBar from 'components/navBar/navBar'
import { connect } from 'react-redux'
import loadable from 'utils/loadable'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'


// 路由
import {
  Route,
} from "react-router-dom";

const Average = loadable(() => import('./average/average'))
const Analyse = loadable(() => import('./analyse/analyse'))

class Statistics extends React.Component {

  toggle(path){
    let newpath = "/course/test/statistics/" + path
    if(newpath === this.props.history.location.pathname) return 
    this.props.history.push(`/course/test/statistics/${path}`)
  }

  render() {
    const path = this.props.history.location.pathname
    return (
      <div className='statistics'>
        <NavBar title={`${this.props.testInfo.tsName}`} back={true} url={"/course/test/score"} />
        <div className="statistics-tab" style={{ height: 60 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#1890FF"
            barTintColor="#FAFAFA"
            tabBarPosition="bottom"
          >
            <TabBar.Item
              title="平均分"
              key="avg"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/tab/%E5%B9%B3%E5%9D%87%E5%88%86.png) center center /  21px 21px no-repeat'
              }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/tab/%E5%B9%B3%E5%9D%87%E5%88%86.png) center center /  21px 21px no-repeat'
              }}
              />
              }
              selected={path === '/course/test/statistics/average'}
              onPress={()=>{this.toggle('average')}}
            />
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/tab/%E5%88%86%E6%9E%90.png) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/tab/%E5%88%86%E6%9E%90.png) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="题分析"
              key="analyse"
              selected={path === '/course/test/statistics/analyse'}
              onPress={()=>{this.toggle('analyse')}}
            />
          </TabBar>
        </div>
        <div className="statistics-content">
          <Route path="/course/test/statistics/average">
            <Average />
          </Route>
          <Route path="/course/test/statistics/analyse">
            <Analyse />
          </Route>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testInfo: state.testInfo
  }
}


export default withRouter(connect(mapStateToProps)(Statistics))
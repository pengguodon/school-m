import React from 'react'

import './courseIndex.css'
import { withRouter } from 'react-router-dom'


import {
  Route,
} from "react-router-dom";

import { connect } from 'react-redux'
import { setCourseINFO } from 'myredux/myRedux'

import loadable from 'utils/loadable'

import TabBar from './tabBar/tabBar'

import NavBar from 'components/navBar/navBar'

const Member = loadable(()=> import('./member/member'))
const Info = loadable(()=> import('./info/info'))
const Activity = loadable(()=> import('./activity/activity'))

class CourseIndex extends React.Component {
  componentWillMount(){
    this.auth()
  }

  // 验证redux是否已有课程信息
  auth(){
    if(!this.props.courseInfo.crId){
      this.props.history.push("/course")
    }
  }

  render() {
    return (
      <div className='courseIndex'>
        <NavBar title="课程主页" url="/course" back={true} />
        <TabBar />
        <div className="courseIndexWrap">
          <Route exact path="/course/index/info">
            <Info />
          </Route>
          <Route exact path="/course/index/member">
            <Member />
          </Route>
          <Route exact path="/course/index/activity">
            <Activity />
          </Route>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courseInfo: state.courseInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCourseInfo: courseData => {
      dispatch(setCourseINFO(courseData))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseIndex))
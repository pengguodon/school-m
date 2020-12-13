import React from 'react'

import './course.css'

import loadable from 'utils/loadable'

import {
  Route
} from "react-router-dom";

// redux
import { connect } from 'react-redux'
import { setCourseINFO } from 'myredux/myRedux'
import courseinfo from 'vo/redux_courseinfo'

const CourseList = loadable(()=> import('./courseList/courseList'))
const CourseAdd = loadable(()=> import('./courseAdd/courseAdd'))
const CourseIndex = loadable(()=> import('./courseIndex/courseIndex'))
const Test = loadable(()=> import('./test/test'))

class Course extends React.Component{

  componentWillUnmount(){
    // 清除课程信息
    this.props.changeCourseInfo({
      ...courseinfo
    })
  }

  render(){
    return(
      <div className="course">
        <Route exact path="/course/">
          <CourseList/>
        </Route>

        <Route path="/course/add">
          <CourseAdd/>
        </Route>

        <Route path="/course/index/">
          <CourseIndex/>
        </Route>

        <Route path="/course/test">
          <Test/>
        </Route>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCourseInfo: courseData => {
      dispatch(setCourseINFO(courseData))
    }
  }
}

export default connect(null, mapDispatchToProps)(Course)
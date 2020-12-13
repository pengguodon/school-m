import userinfo from 'vo/redux_userinfo'
import courseinfo from 'vo/redux_courseinfo'
import testinfo from 'vo/redux_testinfo'

const initState = {
  userInfo:{
    ...userinfo
  },
  courseInfo: {
    ...courseinfo
  },
  testInfo: {
    ...testinfo
  },
  tourist: false
}

const SET_USERINFO = 'SET_USERINFO'
const SET_COURSEINFO = 'SET_COURSEINFO'
const SET_TESTINFO = 'SET_TESTINFO'
const SET_TOURIST = 'SET_TOURIST'

export function setUserINFO(userData){
  return dispatch => {
      dispatch(set_User_Info(userData))
  }
}

export function setCourseINFO(courseData){
  return dispatch => {
      dispatch(set_Course_Info(courseData))
  }
}

export function setTestINFO(testData){
  return dispatch => {
      dispatch(set_Test_Info(testData))
  }
}

export function setTourist(flag){
  return dispatch => {
      dispatch(set_Tourist(flag))
  }
}

function set_User_Info(userData) {
  return { type: SET_USERINFO, userInfo: userData }
}

function set_Course_Info(courseData) {
  return { type: SET_COURSEINFO, courseInfo: courseData }
}

function set_Test_Info(testData) {
  return { type: SET_TESTINFO, testInfo: testData }
}


function set_Tourist(flag) {
  return { type: SET_TOURIST, flag }
}


export function My_redux(state = initState, action){
  switch (action.type){
      case SET_USERINFO:
          return {
              ...state,
              userInfo: action.userInfo
          }
      case SET_COURSEINFO:
        return {
            ...state,
            courseInfo: action.courseInfo
        }
      case SET_TESTINFO:
        return {
            ...state,
            testInfo: action.testInfo
        }
      case SET_TOURIST:
      return {
          ...state,
          tourist: action.flag
      }
      default:
          return state
  }
}
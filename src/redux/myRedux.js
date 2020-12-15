import userinfo from 'vo/redux_userinfo'
import courseinfo from 'vo/redux_courseinfo'
import testinfo from 'vo/redux_testinfo'

const initState = {
  userInfo: {
    ...userinfo
  },
  courseInfo: {
    ...courseinfo
  },
  testInfo: {
    ...testinfo
  },
  tourist: false,
  classRecvmsg: []
}

const SET_USERINFO = 'SET_USERINFO'
const SET_COURSEINFO = 'SET_COURSEINFO'
const SET_TESTINFO = 'SET_TESTINFO'
const SET_TOURIST = 'SET_TOURIST'
const SET_CLASSRECVMSG = 'SET_CLASSRECVMSG'
const SET_CLASSRECVMSGREAD = 'SET_CLASSRECVMSGREAD'


export function setUserINFO(userData) {
  return dispatch => {
    dispatch(set_User_Info(userData))
  }
}

export function setCourseINFO(courseData) {
  return dispatch => {
    dispatch(set_Course_Info(courseData))
  }
}

export function setTestINFO(testData) {
  return dispatch => {
    dispatch(set_Test_Info(testData))
  }
}

export function setTourist(flag) {
  return dispatch => {
    dispatch(set_Tourist(flag))
  }
}

export function setClassRecvmsg(msgObj) {
  return dispatch => {
    dispatch(set_ClassRecvmsg(msgObj))
  }
}

export function setClassRecvmsgRead(msgObj) {
  return dispatch => {
    dispatch(set_ClassRecvmsgRead(msgObj))
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

function set_ClassRecvmsg(msgObj) {
  return { type: SET_CLASSRECVMSG, msgObj }
}

function set_ClassRecvmsgRead(msgObj) {
  return { type: SET_CLASSRECVMSGREAD, msgObj }
}

export function My_redux(state = initState, action) {
  switch (action.type) {
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
    case SET_CLASSRECVMSG:
      return {
        ...state,
        classRecvmsg: [...state.classRecvmsg, action.msgObj]
      }
    case SET_CLASSRECVMSGREAD:
      return {
        ...state,
        classRecvmsg: [...action.msgObj]
      }
    default:
      return state
  }
}
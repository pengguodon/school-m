import React from 'react'

import './classChat.css'
import loadable from 'utils/loadable'

import {
  Route
} from "react-router-dom";

const ClassChatIndex = loadable(()=> import('./classChatIndex/classChatIndex'))
const ClassChatHistory = loadable(()=> import('./classChatHistory/classChatHistory'))

class ClassChat extends React.Component {
  render() {
    return (
      <div className='classChat'>
        <Route exact path="/mine/classChat">
          <ClassChatIndex />
        </Route>
        <Route path="/mine/classChat/history">
          <ClassChatHistory/>
        </Route>
      </div>
    )
  }
}

export default ClassChat
import React from 'react'

import './mine.css'

import {
  Route
} from "react-router-dom";

import loadable from 'utils/loadable'

const MineIndex = loadable(()=> import('./mineIndex/mineIndex'))
const ChangePassword = loadable(()=> import('./changePassword/changePassword'))
const AboutMe = loadable(()=> import('./aboutMe/aboutMe'))
const ChangeAvatar = loadable(()=> import('./changeAvatar/changeAvatar'))

class Mine extends React.Component{
  render(){
    return (
      <div className='mine'>
        <Route exact path="/mine/">
          <MineIndex/>
        </Route>
        <Route exact path="/mine/changePassword">
          <ChangePassword/>
        </Route>
        <Route exact path="/mine/about">
          <AboutMe/>
        </Route>
        <Route exact path="/mine/changeAvatar">
          <ChangeAvatar/>
        </Route>
      </div>
    )
  }
}

export default Mine
import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";

import './content.css'

import Auth from 'components/auth/auth'

import loadable from 'utils/loadable'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

const TabBar = loadable(()=> import('./tabBar/tabBar'))
const Index = loadable(()=> import('./index/index'))
const Mine = loadable(()=> import('./mine/mine'))
const Course = loadable(()=> import('./course/course'))

class Content extends React.Component {
  render() {
    const { location, tourist } = this.props
    return (
      <div className="wrapper">
        {
          tourist ? 
          <Switch >
            <Route path="/index">
              <Index isTourist={true}/>
            </Route>
          </Switch>
          :
          <div className={
            location.pathname.startsWith("/course/test/") 
            || location.pathname.startsWith("/mine/classChat") ? 
            "contentAsk" : 
            "content"}
          >
          <Auth defend={true} />
          <Switch >
            <Route path="/index">
              <Index/>
            </Route>
            <Route path="/course">
              <Course/>
            </Route>
            <Route path="/mine">
              <Mine/>
            </Route>
          </Switch>
        </div>
        }
        <TabBar/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tourist: state.tourist
  }
}

export default withRouter(connect(mapStateToProps)(Content))
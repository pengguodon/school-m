import React from 'react'

import './test.css'

import {
  Route,
  withRouter
} from "react-router-dom";

import loadable from 'utils/loadable'

import { connect } from 'react-redux'

const ScoreList = loadable(()=> import('./scoreList/scoreList'))
const Ask = loadable(()=> import('./ask/ask'))
const Analyse = loadable(()=> import('./analyse/analyse'))

class Test extends React.Component {
  componentWillMount(){
    this.auth()
  }

  auth(){
    if(!this.props.testInfo.tsId){
      return this.props.history.push("/course/index/info/")
    }
  }

  render() {
    return (
      <div className='test'>
        <Route path="/course/test/ask">
          <Ask/>
        </Route>
        <Route path="/course/test/score">
          <ScoreList/>
        </Route>
        <Route path="/course/test/analyse">
          <Analyse/>
        </Route>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testInfo: state.testInfo
  }
}


export default withRouter(connect(mapStateToProps, null)(Test))
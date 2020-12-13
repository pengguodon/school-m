import React from 'react'

import './index.css'

import Header from './header/header'
import Content from './content/content'
import loadable from 'utils/loadable'

import { connect } from 'react-redux'

const Back = loadable(()=> import('./back/back'))

class Index extends React.Component{
  render(){
    return(
        <div className="index">
          {
            this.props.tourist ? <Back/>: null
          }
          <Header/>
          <Content/>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tourist: state.tourist
  }
}

export default connect(mapStateToProps)(Index)
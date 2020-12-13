import React from 'react'

import {
  Route
} from 'react-router-dom'

import loadable from 'utils/loadable'

const Index = loadable(()=> import('./index/index'))
const Other = loadable(()=> import('./index/other/other'))

class IndexCP extends React.Component {
  render() {
    return (
      <div style={{height:"100%",overflowX: "scroll"}}>
        <Route exact path="/index">
          <Index />
        </Route>
        <Route path="/index/other">
          <Other/>
        </Route>
      </div>
    )
  }
}



export default IndexCP
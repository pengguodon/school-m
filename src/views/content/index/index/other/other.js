import React from 'react'

import './other.css'

import NavBar from 'components/navBar/navBar'

import {
  Route
} from 'react-router-dom'

import loadable from 'utils/loadable'

const StIntro = loadable(()=> import('./component/stIntro/stIntro'))
const MjSetup = loadable(()=> import('./component/mjSetup/mjSetup'))
const ApplyGuide = loadable(()=> import('./component/applyGuide/applyGuide'))

class Other extends React.Component{
  render(){
    return (
      <div className='other'>
        <NavBar title="功能页" back={true} url="/index"/>
        <Route path="/index/other/stIntro">
          <StIntro/>
        </Route>
        <Route path="/index/other/mjSetup">
          <MjSetup/>
        </Route>
        <Route path="/index/other/cpCulture">
          <div>校园文化</div>
        </Route>
        <Route path="/index/other/tcAttachments">
          <div>教学设备</div>
        </Route>
        <Route path="/index/other/dgAscension">
          <div>双文凭教育</div>
        </Route>
        <Route path="/index/other/empSecurity">
          <div>就业保障</div>
        </Route>
        <Route path="/index/other/applyGuide">
          <ApplyGuide/>
        </Route>
      </div>
    )
  }
}

export default Other
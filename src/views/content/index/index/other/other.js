import React from 'react'

import './other.css'

import NavBar from 'components/navBar/navBar'

import {
  Route
} from 'react-router-dom'

import loadable from 'utils/loadable'

import BackTop from './component/backTop/backTop'
import Bottom from './component/bottom/bottom'

const StIntro = loadable(()=> import('./component/stIntro/stIntro'))
const MjSetup = loadable(()=> import('./component/mjSetup/mjSetup'))
const ApplyGuide = loadable(()=> import('./component/applyGuide/applyGuide'))
const AcAttachments = loadable(()=> import('./component/tcAttachments/tcAttachments'))
const EmpSecurity = loadable(()=> import('./component/empSecurity/empSecurity'))
const CpCulture = loadable(()=> import('./component/cpCulture/cpCulture'))
const DgAscension = loadable(()=> import('./component/dgAscension/dgAscension'))

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
          <CpCulture/>
        </Route>
        <Route path="/index/other/tcAttachments">
          <AcAttachments/>
        </Route>
        <Route path="/index/other/dgAscension">
          <DgAscension/>
        </Route>
        <Route path="/index/other/empSecurity">
          <EmpSecurity/>
        </Route>
        <Route path="/index/other/applyGuide">
          <ApplyGuide/>
        </Route>
        <BackTop/>
        <Bottom/>
      </div>
    )
  }
}

export default Other
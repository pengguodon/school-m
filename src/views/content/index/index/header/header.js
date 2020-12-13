import React from 'react'

import './header.css'

import Swiper from './swipper/swipper'

class Header extends React.Component{
  render(){
    return (
      <div className='header'>
        <div className="header-title">茂班课</div>
        <div className='header-bg'></div>
        <div className="header-swipper">
          <Swiper/>
        </div>
      </div>
    )
  }
}

export default Header
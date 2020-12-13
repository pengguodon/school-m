import React from 'react'

import './content.css'

import FuncNav from './funcNav/funNav'

class Content extends React.Component{
  render(){
    return (
      <div className='index-content'>
        <FuncNav/>
      </div>
    )
  }
}

export default Content
import React from 'react'
import {  Link } from 'react-router-dom'

class RightContent extends React.Component{
  render(){
    return (
      <span>
          <Link to="/course/test/statistics/average">统计分析&gt;</Link>
      </span>
    )
  }
}

export default RightContent
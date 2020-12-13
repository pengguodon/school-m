import React from 'react'

import './noneCourse.css'

import { Link } from 'react-router-dom'

import { Result } from 'antd-mobile';

class NoneCourse extends React.Component{
  render(){
    return (
      <div className='noneCourse'>
          <div className="sub-title">提示</div>
              <Result
                img={<img alt="" width="50px" className="spe am-icon am-icon-md" src="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E6%9A%82%E6%97%A0%E7%9B%B8%E5%85%B3%E6%95%B0%E6%8D%AE.svg" />}
                title={<div className="title">"暂无课程"</div>}
                message={<Link to="/course/add">点我进行搜索加入</Link>}
          />
      </div>
    )
  }
}

export default NoneCourse
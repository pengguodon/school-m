import React from 'react'

import './info.css'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'


class Info extends React.Component {
  render() {
    let courseInfo = this.props.courseInfo
    return (
      <div className='info'>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header
              title="课程信息"
              thumb={<img width="30px" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/course.png"} />}
              extra={<span>课程id：{courseInfo.crId}</span>}
            />
            <Card.Body>
              <p><span className="mySpan">课程名：</span>{courseInfo.crName}</p>
              <p style={{whiteSpace: 5, lineHeight: "1.2rem"}}><span className="mySpan">课程介绍：</span>
                {courseInfo.crIntro}
              </p>
            </Card.Body>
            <Card.Footer content={`教师: ${courseInfo.tcName}`} extra={<div>{courseInfo.crSemester}</div>} />
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courseInfo: state.courseInfo
  }
}


export default withRouter(connect(mapStateToProps, null)(Info))
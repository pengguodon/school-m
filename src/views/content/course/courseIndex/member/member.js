import React from 'react'

import './member.css'

import { Grid } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import myCourse from 'api/course/course'
import { connect } from 'react-redux'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"

const awesomePlaceholder = (
  <div></div>
);

class Member extends React.Component {
  state = {
    data: [],
    ready: false
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.getData()
  }

  componentWillUnmount() {
    this.setState({
      data: []
    })
  }

  // 获取数据
  getData() {
    myCourse.getCourseStudentList(this.props.courseInfo.crId).then((res) => {
      let arr = res.data.items.map((_val, i) => ({
        ..._val,
        icon: `${_val.stAvatar}`,
        text: `${_val.stName}`,
      }))
      this.setState({
        data: [...arr],
        ready: true
      });
    })
  }

  // 创建数据列表宫格组件
  createData() {
    return <Grid data={this.state.data} columnNum={4} />
  }

  render() {
    return (
      <div className='member'>


        <ReactPlaceholder customPlaceholder={awesomePlaceholder} ready={this.state.ready}>
          {
            this.state.data.length > 0 ?
              <div className="title">"{this.state.data.length}"位同学加入了此课程</div>
              :
              <div className="title mySpan">暂无同学加入此课程</div>
          }
          <div className="memberList" >
            {
              this.state.data.length > 0 ?
                this.createData()
                : null
            }
          </div>

        </ReactPlaceholder>



      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courseInfo: state.courseInfo
  }
}

export default withRouter(connect(mapStateToProps, null)(Member))
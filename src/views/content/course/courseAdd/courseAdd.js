import React from 'react'

import './courseAdd.css'

import Search from './search/search'
import { Result, List, WhiteSpace, Button, Modal, Toast } from 'antd-mobile';

import myCourse from 'api/course/course'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import NavBar from 'components/navBar/navBar'
import HighBox from 'components/highBox/highBox'


const alert = Modal.alert;

const Item = List.Item;

class CourseAdd extends React.Component {

  state = {
    data: [],
    flag: false
  }

  searchCallBack(id) {
    if (id === "") {
      return
    }
    this.getData(id)
  }

  getData(id) {
    myCourse.getCourseInfo(id).then((res) => {
      this.setState({
        data: [res.data.item]
      })
    }).catch(() => {
      this.setState({
        data: []
      })
    })
  }

  bingCourseHandle(){
    alert('提示：', '确定加入此课程么?', [
      { text: '取消', onPress: () => {} },
      { text: '加入', onPress: () => {this.bingCourse()} },
    ])
  }

  bingCourse(){
    if(this.state.flag) return
    myCourse.bindingCourse({
      crId: this.state.data[0].crId,
      stId: this.props.userInfo.userInfo.stId
    }).then((res)=>{
      this.setState({
        flag: true
      })
      Toast.success('加入课程成功 !', 2)
      setTimeout(()=>{
        this.props.history.push("/course")
      }, 1500)
    })
  }

  render() {
    return (
      <div className='courseAdd'>
        <NavBar title="加入课程"  back={true} url="/course"/>
        <Search placeholder="请输入课程id进行搜索加入" callback={this.searchCallBack.bind(this)} />
        {
          this.state.data.length > 0 ?
            <div>
              <WhiteSpace size="xl" />
              <List renderHeader={() => '搜索结果'}>
                <Item>课程号：{this.state.data[0].crId} </Item>
                <Item>课程名称：{this.state.data[0].crName} </Item>
                <Item>所属班级：{this.state.data[0].crClass}  </Item>
                <Item
                  wrap
                >
                  课程介绍：{this.state.data[0].crIntro}
                </Item>
              </List>
              <div className="myBtnWapper">
                <Button type="primary" onClick={() => { this.bingCourseHandle() }}>加入此班课程</Button>
              </div>
              <HighBox/>
              
            </div>
            :
            <Result
              img={<img src="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E6%9A%82%E6%97%A0%E7%9B%B8%E5%85%B3%E6%95%B0%E6%8D%AE.svg" className="spe am-icon am-icon-md" alt="" />}
              title="暂无结果"
              message="(*^_^*)"
            />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state
  }
}

export default withRouter(connect(mapStateToProps, null)(CourseAdd))
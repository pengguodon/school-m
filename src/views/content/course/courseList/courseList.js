import React from 'react'

import { PullToRefresh, ListView, Card } from 'antd-mobile';

import './courseList.css'

import myCourse from 'api/course/course'

import { withRouter } from 'react-router-dom'

import NavBar from 'components/navBar/navBar'
import RightContent from './rightContent/rightContent'

// redux
import { connect } from 'react-redux'
import { setCourseINFO } from 'myredux/myRedux'

import loadable from 'utils/loadable'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"


const NoneCourse = loadable(()=> import('./noneCourse/noneCourse'))

const awesomePlaceholder = (
  <div></div>
);

class CourseList extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      data: [],
      dataSource,
      refreshing: true,
      isLoading: true,
      ready: false
    };
  }

  componentDidMount() {
    this.init()
  }

  init() {
    myCourse.getCourseList().then((res) => {
      if(res.data.items.length === 0) {
        return this.setState({
          ready: true
        })
      }
      this.setState({
        data: [
          res.data.items,
        ],
        dataSource: this.state.dataSource.cloneWithRows(res.data.items),
        refreshing: false,
        isLoading: false,
        ready: true
      })
    })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  // 下拉刷新
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.init()
  };

  // 到达底部
  onEndReached = () => {  }

  // 跳转课程信息主页
  goto_index(crInfo){
    this.props.changeCourseInfo({
      ...crInfo
    })
    this.props.history.push(`/course/index/info/`)
  }

  render() {
    // 分割器
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    // 渲染内容
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID}
          style={{
            padding: '15px 15px',
            backgroundColor: 'white',
          }}
        >
          <Card>
            <Card.Header
              title={rowData.crName}
              thumb={<img width="35px" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/m_course.png"} />}
              extra={<span className="mySpan" onClick={()=>{this.goto_index(rowData)}}>进入</span>}
            />
            <Card.Body>
              <div>{rowData.crIntro}</div>
              <p>所属班级：{rowData.crClass}</p>
              <p>所属学期：{rowData.crSemester}</p>
            </Card.Body>
            <Card.Footer content={`课程号：${rowData.crId}`} extra={"老师：" + rowData.tcName} />
          </Card>
        </div>
      );
    };
    return (
      <div className='courseList'>
        <NavBar title="课程列表"  rightContent={RightContent} />
        <ReactPlaceholder customPlaceholder={awesomePlaceholder} ready={this.state.ready}>
          {
            (this.state.data.length <= 0 )?
              <NoneCourse/>
              :
              <ListView
                renderHeader={() => <span>已加入的课程列表</span>}
                key={'1'}
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}

                renderRow={row}
                renderSeparator={separator}
                style={{
                  height: "calc(100% - 50px)",
                  overflow: "auto"
                }}

                // 下拉刷新
                pullToRefresh={<PullToRefresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />}

                // 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                // onEndReachedThreshold：调用onEndReached之前的临界值，单位是像素
                onEndReached={this.onEndReached}
                pageSize={5}
              />
          }
        </ReactPlaceholder>

      </div >
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCourseInfo: courseData => {
      dispatch(setCourseINFO(courseData))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CourseList))
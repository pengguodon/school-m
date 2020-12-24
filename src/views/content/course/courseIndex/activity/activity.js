import React from 'react'

import { PullToRefresh, ListView, Card, Result } from 'antd-mobile';

import './activity.css'

import myTest from 'api/test/test'

import { withRouter } from 'react-router-dom'
import moment from 'moment'

import { connect } from 'react-redux'
import { setTestINFO } from 'myredux/myRedux'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"

const awesomePlaceholder = (
  <div></div>
);


// import MyTime from 'utils/time'

class Activity extends React.Component {

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

  getData() {
    myTest.getListTest(this.props.courseInfo.crId).then((res) => {
      if (res.data.rows.length === 0) {
        return this.setState({
          ready: true
        })
      }
      this.setState({
        data: [
          res.data.rows,
        ],
        dataSource: this.state.dataSource.cloneWithRows(res.data.rows),
        refreshing: false,
        isLoading: false,
        ready: true
      })
    })
  }

  init() {
    this.getData()
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
  onEndReached = () => { }

  // 跳转到答题页面
  goto_index(testInfo) {
    this.changeReduxTsData(testInfo)
    this.props.history.push("/course/test/ask")
  }

  // 跳转到成绩页面
  goto_score(testInfo) {
    this.changeReduxTsData(testInfo)
    this.props.history.push("/course/test/score")
  }

  changeReduxTsData(testInfo) {
    this.props.changeTestInfo({
      ...testInfo
    })
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
      let old = moment(rowData.tsDate, ["YYYY-MM-DD HH:mm:ss"]).valueOf()
      let now = moment().valueOf()
      let status = (old - now) > 0
      return (
        <div key={rowID}
          style={{
            padding: '15px 15px',
            backgroundColor: 'white',
          }}
        >
          <Card>
            <Card.Header
              title={"测验信息"}
              thumb={<img width="35px" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/m_course.png"} />}
              extra={
                status ?
                  <span className="mySpan" onClick={() => { this.goto_index(rowData) }}>开始答题</span>
                  :
                  <span className="mySpan" onClick={() => { this.goto_score(rowData) }} >查看成绩排名</span>

              }
            />
            <Card.Body>
              <p>测验名称：<span className="mySpan">{rowData.tsName}</span></p>
              <p>发布时间：{rowData.gmtCreate}</p>
              <p>到期时间：{rowData.tsDate}</p>
            </Card.Body>
            <Card.Footer content={
              status ?
                <span className="mySpan" >活动进行中</span>
                :
                <span className="myTips" >活动已结束</span>
            } />
          </Card>
        </div>
      );
    };

    return (
      <div className='activity'>
        <ReactPlaceholder customPlaceholder={awesomePlaceholder} showLoadingAnimation ready={this.state.ready}>


          {
            !(this.state.data.length > 0) ?
              <div>
                <div className="sub-title">提示</div>
                <Result
                  img={<img alt="" className="spe am-icon am-icon-md" src="https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg" />}
                  title="暂无测验(*^_^*)"
                  message={
                    <div onClick={() => { this.init() }}>点击刷新数据</div>
                  }
                />
              </div>
              :
              <ListView
                renderHeader={() => <span>此课程发布的测验：</span>}

                key={'1'}
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}

                renderRow={row}
                renderSeparator={separator}
                style={{
                  height: "100%",
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

const mapStateToProps = state => {
  return {
    courseInfo: state.courseInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTestInfo: testData => {
      dispatch(setTestINFO(testData))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity))
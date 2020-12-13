import React from 'react'

import './scoreList.css'

import { withRouter } from 'react-router-dom'

import myTest from 'api/test/test'
import myTopic from 'api/topic/topic'

import myTime from 'utils/time'

import { PullToRefresh, ListView } from 'antd-mobile';

import { connect } from 'react-redux'

import MyTime from 'utils/time'

import NavBar from 'components/navBar/navBar'

class ScoreList extends React.Component {
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
      myScore: {
        scSc: "无",
        scTime: "无",
        no: "无"
      },
      totalScore: 0
    };
  }

  componentDidMount() {
    this.init()
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
  onEndReached = () => {
  }

  init() {
    this.getData(this.props.testInfo.tsId)

    // 计算总分
    myTopic.getTopicList(this.props.testInfo.qbId).then(res => {
      let count = 0;
      for (let sc in res.data.items) {
        count += res.data.items[sc].tpScore
      }
      this.setState({
        totalScore: count
      })
    })
  }

  // 获取成绩列表数据
  getData(id) {
    myTest.getTestScoreList(id).then(res => {
      // 如果没有数据
      if (res.data.items.length === 0) {
        return this.setState({
          refreshing: false,
          isLoading: false,
        })
      }

      // 设置数据
      this.setState({
        data: [
          res.data.items,
        ],
        dataSource: this.state.dataSource.cloneWithRows(res.data.items),
        refreshing: false,
        isLoading: false,
      })

      // 设置个人数据
      let no = res.data.items.findIndex((v) => v.stId + "" === this.props.userInfo.stId) + 1 // 排名
      let myAskData = res.data.items.filter((v) => v.stId + "" === this.props.userInfo.stId) // 个人答题数据
      // 如果没有个人数据
      if (myAskData.length <= 0) return
      // 如果有个人数据
      this.setState({
        myScore: {
          ...myAskData[0],
          no
        },

      })
    })
  }

  // 跳转个人分析页面
  goto_Analyse() {
    this.props.history.push("analyse")
  }

  render() {
    // 渲染内容
    const row = (rowData, sectionID, rowID) => {
      let No = 1 + parseInt(rowID)
      let time = myTime(rowData.scTime)
      let sort = null
      if (No === 1) {
        sort = <img width="20px" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/%E9%87%91%E7%89%8C.png"} />
      } else
        if (No === 2) {
          sort = <img width="20px" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/%E9%93%B6%E7%89%8C.png"} />
        } else
          if (No === 3) {
            sort = <img width="20px" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/%E9%93%9C%E7%89%8C.png"} />
          } else {
            sort = No
          }

      return (
        <div key={rowID}
          style={{
            padding: '15px 15px',
            backgroundColor: 'white',
            fontSize: '.8rem'
          }}
        >
          <div className="ranking">
            <span>
              {
                sort
              }
            </span><span>{rowData.stName}</span><span>{rowData.scSc}</span><span>{time}</span>
          </div>
        </div>
      );
    };
    return (
        <div className='scoreList'>
          <NavBar title="成绩页面" back={true} url="/course/index/activity"/>
          <div className="topInfo">
            <div className="content_top"><div className="top_center">"{this.props.testInfo.tsName}"</div></div>
            <div className="message">
              <span className="ranking">排名</span>
              <span className="score">{this.state.myScore.no}</span>
            </div>
            <div className="student_score">
              <span>总分：{this.state.totalScore} | 得分: {this.state.myScore.scSc} | 用时: {MyTime(this.state.myScore.scTime)}</span>
            </div>
            {
              this.state.myScore.scSc === "无" ? null : <div className="result" onClick={() => { this.goto_Analyse() }}>查看个人结果解析</div>
            }

          </div>
          <div className="list">
            <ListView
              renderHeader={() => {
                return (
                  <div className="ranking">
                    <span>排名</span><span>个人信息</span><span>得分</span><span>用时</span>
                  </div>
                )
              }}

              key={'1'}
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}

              renderRow={row}
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
          </div>
        </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    testInfo: state.testInfo
  }
}

export default withRouter(connect(mapStateToProps)(ScoreList))
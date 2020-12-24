import React from 'react'

import './average.css'

import ReactEchartsCore from 'echarts-for-react/lib/core';
import myTest from 'api/test/test'
import { connect } from 'react-redux'
import HighBox from 'components/highBox/highBox'
import myTime from 'utils/time'


// 引入echarts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图||饼状图||提示
require('echarts/lib/chart/gauge');
require('echarts/lib/chart/bar');
require('echarts/lib/component/title')



class Average extends React.Component {

  state = {
    avgScore: 0,
    time: "0",
    scoreSortList: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.getData(this.props.testInfo.tsId)
  }

   // 分析分数段
   AnalyzeScoreSegment(score) {
    let scoreSortList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    score.forEach(e => {
      let score = e.scSc
      if (score >= 90) {
        scoreSortList[9] = scoreSortList[9] + 1
      } else if (score >= 80) {
        scoreSortList[8] = scoreSortList[8] + 1
      } else if (score >= 70) {
        scoreSortList[7] = scoreSortList[7] + 1
      } else if (score >= 60) {
        scoreSortList[6] = scoreSortList[6] + 1
      } else if (score >= 50) {
        scoreSortList[5] = scoreSortList[5] + 1
      } else if (score >= 40) {
        scoreSortList[4] = scoreSortList[4] + 1
      } else if (score >= 30) {
        scoreSortList[3] = scoreSortList[3] + 1
      } else if (score >= 20) {
        scoreSortList[2] = scoreSortList[2] + 1
      } else if (score >= 10) {
        scoreSortList[1] = scoreSortList[1] + 1
      } else if (score >= 0) {
        scoreSortList[0] = scoreSortList[0] + 1
      }
    })
    this.setState({
      scoreSortList: [...scoreSortList]
    })
  }

  getData(id) {
    myTest.getTestScoreList(id).then(res => {
      let count = 0 // 总分
      let time = 0 // 总时间
      let items = res.data.items
      items.forEach(v => {
        time = time + v.scTime
        count = count + v.scSc
      })

      time = time / items.length
      this.setState({
        avgScore: (count / items.length).toFixed(2),
        time
      })

      // 分数段处理
      this.AnalyzeScoreSegment([...res.data.items])

    })
  }

  // 创建平均分显示图标
  createAverage_size() {
    let option = {
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '平均分',
          type: 'gauge',
          detail: {
            show: false
          },
          data: [{ value: this.state.avgScore }]
        }
      ]
    };

    return <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      style={{ height: '100%', width: '100%' }} />
  }


  // 创建百分制区间
  createBar() {
    let option = {
      title: {
        text: "百分制区间 - 人数分布图",
        textStyle: {
          fontSize: 16,
          color: "#969696"
        },
        left:"center",
      },
      xAxis: {
        type: 'category',
        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#A0A0A0"
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: this.state.scoreSortList,
        type: 'bar',
        itemStyle: {
          color: "#1890FF"
        },
        label: {
          show: true,
          position: "top",
          formatter: (info) => {
            return `${info.data}人`
          },
          color: '#8C8C8C'
        }
      }]
    };

    return <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      style={{ height: '100%', width: '100%' }} />
  }

  render() {
    return (
      <div className='average'>
        <HighBox />
        <HighBox />
        <div style={{ width: "100%", height: "350px" }}>
          {/* {this.createAverage_size()} */}
          {this.createBar()}
        </div>
        <div className="tips" >每10分一个区间，共10个区间</div>
        <div className="topInfo">
          <div className="message">
            <span className="ranking">百分制平均分</span>
            <span className="score mySpan">{this.state.avgScore}分</span>
            <br />
            <span className="ranking">平均用时</span>
            <span className="score myTips" style={{fontSize: '1.2rem'}}>{myTime(this.state.time)}</span>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testInfo: state.testInfo
  }
}

export default connect(mapStateToProps)(Average)
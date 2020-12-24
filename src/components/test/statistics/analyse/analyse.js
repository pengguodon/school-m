import React from 'react'

import './analyse.css'

//引入此路径，才不会打包失败
import Swiper from 'swiper/js/swiper.js';
//引入样式，还可以加上自己的样式
import 'swiper/css/swiper.min.css';



import myTopic from 'api/topic/topic'
import myTest from 'api/test/test'
import { connect } from 'react-redux'


// import ReactEcharts from "echarts-for-react";
import ReactEchartsCore from 'echarts-for-react/lib/core';

import { List } from 'antd-mobile';

const Item = List.Item;

// 引入echarts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图||饼状图||提示
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip')

class Analyse extends React.Component {

  state = {
    currentPage: 0,
    topicList: [], // 题列表
    answerList: [], // 学生答题列表
    answerTrue: [], // 正确答题列表(二维数组)
    answerFalse: [], // 错误答题列表(二维数组)
  }

  componentDidMount() {
    this.init()
  }



  swiperInit() {
    this.swiper = new Swiper('#swiper-container', {
      init: false,
      on: {
        slideChangeTransitionEnd: () => { this.slideChange() }
      }
    })
  }

  init() {
    this.swiperInit()
    this.getData()
  }

  getData() {
    myTopic.getTopicList2(this.props.testInfo.qbId).then(res => {
      this.setState({
        topicList: [...res.data.items]
      })
      myTest.getTestScoreList(this.props.testInfo.tsId).then(res => {
        this.setState({
          answerList: [...res.data.items]
        })
        this.parseData([...res.data.items])
      })
    })
  }

  parseData(askList) {
    let countScore = 0

    // 学生答题数据转换
    askList = askList.map(info => {
      // 处理其它功能数据
      countScore += info.scSc

      // 返回新生成数据
      return {
        ...info,
        scAnswer: info.scAnswer.split("-") // 生成答案信息列表
      }
    })

    // 设置总分
    this.setState({
      countScore,
      answerList: [...askList]
    })

    let answerTrue = []
    let answerFalse = []

    // 进行数据转换
    for (let i = 0; i < this.state.topicList.length; i++) {
      answerTrue[i] = []
      answerFalse[i] = []

      let tpAnswer = this.state.topicList[i].tpAnswer // 正确答案

      // 遍历每个学生信息
      askList.forEach(info => {
        // 如果学生的答题正确
        if (info.scAnswer[i] === tpAnswer) {
          answerTrue[i].push(info)
        } else { // 回答错误
          answerFalse[i].push(info)
        }
      });
    }

    // 数据准备完毕，准备渲染数据列表
    this.setState({
      answerTrue: [...answerTrue],
      answerFalse: [...answerFalse],
    })


    // 渲染数据:
    this.swiper.init()

  }


  // 创建答题卡片pre图表
  creatEchartPreList(index) {
    // index下标
    // 获取题目的正确答案以设置高亮绿色
    let { tpAnswer } = this.state.topicList[index]

    // 数据统计转换
    // 初始化数据
    let data = []

    let dataObj = {

    }

    this.state.answerList.forEach(element => {
      let key = element.scAnswer[index]
      if (!dataObj[key]) {
        dataObj[key] = 1
      } else {
        dataObj[key] = dataObj[key] + 1
      }
    })

    for (const key in dataObj) {
      data.push({
        value: dataObj[key],
        name: key
      })
    }

    let option = {
      title: {
        left: "center",
        top: "20",
        text: `绿色（${tpAnswer}）为正确答案`
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}人 ({d}%)'
      },
      itemStyle: {
        color: (data) => {
          if (data.data.name === tpAnswer) {
            return '#61CC80'
          }
          return '#ccc'
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            ...data
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b} - {c}人',
            fontSize: 14,
            color: "black"
          },
          labelLine: {
            show: true
          },
        }
      ]
    }

    return (<ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: '100%', width: '100%' }} />
    )
  }


  // 创建答题卡片
  createCard() {
    return this.state.topicList.map((topic, index) => {
      let { tpType, tpAnswer, tpQuestionStem, tpOptionA, tpOptionB, tpOptionC, tpOptionD, tpScore } = topic
      return (
        <div className="swiper-slide" key={topic.tpId} style={{ backgroundColor: "#eee" }} >
          <div className="pre-card-wrap">
            {this.creatEchartPreList(index)}
          </div>
          <div>
            <div className="swiper-wrapper-asCard-title">
              <span className="">{
                tpType === 0 ? "单选题" : (tpType === 1 ? "多选题" : "判断题")
              }</span> - <span className="mySpan">{tpScore}分</span> - <span className="myGreen">正确答案：{tpAnswer}</span>
            </div>
            <List>
              <Item wrap>{index + 1}、{tpQuestionStem}</Item>
              <div style={{ padding: "0px 10px 0px 20px" }}>
                <Item wrap>
                  <span className={tpAnswer === "A" ? "myGreen" : ""}>A: {tpOptionA}</span>
                </Item>
                <Item wrap>
                  <span className={tpAnswer === "B" ? "myGreen" : ""}>B: {tpOptionB}</span>
                </Item>
                <Item wrap>
                  <span className={tpAnswer === "C" ? "myGreen" : ""}>C: {tpOptionC}</span>
                </Item>
                <Item wrap>
                  <span className={tpAnswer === "D" ? "myGreen" : ""}>D: {tpOptionD}</span>
                </Item>
              </div>

            </List>
          </div>

        </div>
      )
    })
  }

  // 轮播图内容切换执行的回调函数
  slideChange() {
    this.setState({
      currentPage: this.swiper.activeIndex
    })
  }

  render() {
    return (
      <div className='analyse'>
        <div className="title">
          <div>第{this.state.currentPage + 1}题</div>
          <div>共{this.state.topicList.length}题</div>
        </div>
        <div className="swiper-container" id="swiper-container">
          <div className="swiper-wrapper">
            {
              this.createCard()
            }
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

export default connect(mapStateToProps)(Analyse)
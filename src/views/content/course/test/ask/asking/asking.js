import React from 'react'

import './asking.css'

import topic from 'api/topic/topic'
import score from 'api/score/score'


import { Progress, Button, Pagination, Card, Badge, Radio, WhiteSpace, Checkbox, List } from 'antd-mobile';

import { Modal } from 'antd-mobile';

import { withRouter } from 'react-router-dom'

import MyTime from 'utils/time'
import ScoreSort from 'utils/scoreSort'
import { connect } from 'react-redux'
import NavBar from 'components/navBar/navBar'

const locale = {
  prevText: '上一题',
  nextText: '下一题',
};

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;

const alert = Modal.alert;

class Asking extends React.Component {

  state = {
    start: false,
    dataList: [],
    answerList: [],
    page: 1,
    countDownNum: "",
    countDownStr: "",
    oldX: 0,
    flag: false,
    distance: 55,
    totalTime: "",
    percent: 100
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.getTopicListData(this.props.testInfo.qbId)
  }

  componentWillUnmount() {
    window.addEventListener('popstate', function () {
    });
    clearInterval(this.countDownInterval)
  }

  // 获取题列表
  getTopicListData(id) {
    topic.getTopicList(id).then(res => {
      this.setState({
        dataList: [...res.data.items],
        answerList: [...res.data.items.map(v => { return null })]
      })
      this.showAlert(this.props.testInfo.tsTime)
    })
  }

  // 开启答题
  start() {
    this.setState({
      start: true,
      countDownNum: this.props.testInfo.tsTime * 60,
      totalTime: this.props.testInfo.tsTime * 60,
    })
    this.setState({
      countDownStr: MyTime(this.props.testInfo.tsTime * 60),
    })
    this.countDown()
  }

  // 超时操作
  timeOut() {
    // TODO
    // 发送零分成绩
    alert('警告!', `时间已到，你还未提交数据。`, [
      {
        text: '好吧/(ㄒoㄒ)/~~', onPress: () => {
          this.props.history.push("/course/index/activity")
        }
      },
    ]);
  }

  // 倒计时函数
  countDown() {
    this.countDownInterval = setInterval(() => {

      if (this.state.countDownNum <= 0) {
        this.timeOut()
        clearInterval(this.countDownInterval)
      }
      this.setState({
        countDownStr: MyTime(this.state.countDownNum),
        countDownNum: this.state.countDownNum - 1,
        percent: (this.state.countDownNum / this.state.totalTime) * 100
      })
    }, 1000);
  }

  // 显示答题提示确认框
  showAlert(time) {
    alert('提示', `请注意！作答时间为${time}分钟！`, [
      {
        text: '开始答题', onPress: () => { this.start() }
      },
    ]);
  }

  // 修改答题答案选择函数
  changeAnswer(index, value) {
    let newAnswerList = [...this.state.answerList]
    newAnswerList[index] = value
    this.setState({
      answerList: [...newAnswerList]
    })
  }

  // 修改答题答案选择函数
  changeAnswers(index, value) {
    let newAnswerList = [...this.state.answerList]
    let val = newAnswerList[index]
    if (!val || val === "") {
      newAnswerList[index] = value
      return this.setState({
        answerList: [...newAnswerList]
      })
    }
    if (val.includes(value)) {
      val = val.replace(value, "")
      newAnswerList[index] = val
      return this.setState({
        answerList: [...newAnswerList]
      })
    }

    val += value
    newAnswerList[index] = val
    return this.setState({
      answerList: [...newAnswerList]
    })
  }

  // 创建答题卡函数
  createTopic() {
    // this.cardTouchhandle()
    return this.state.dataList.map((v, i) => {
      if (v.tpType === 0) {
        return (
          <div key={v.tpId}>
            <Card>
              <Card.Header
                title={<Badge text="单选题" hot style={{ padding: '3px 3px', borderRadius: 2, fontSize: "0.7rem", backgroundColor: '#f19736' }} />}
                extra={<span>分值：{v.tpScore}分</span>}
              />
              <Card.Body>
                <p className="mySpan">题目：</p>
                <div className="topic">
                  {v.tpQuestionStem}
                </div>
                <p className="myTips">选择：</p>
                <div className="answer" >
                  <List renderHeader={() => '单选题哟~'}>
                    <RadioItem checked={this.state.answerList[i] === "A"} onClick={() => this.changeAnswer(i, "A")}>
                      A：{v.tpOptionA ? v.tpOptionA : "无"}
                    </RadioItem>
                    <RadioItem checked={this.state.answerList[i] === "B"} onClick={() => this.changeAnswer(i, "B")}>
                      B：{v.tpOptionB ? v.tpOptionB : "无"}
                    </RadioItem>
                    <RadioItem checked={this.state.answerList[i] === "C"} onClick={() => this.changeAnswer(i, "C")}>
                      C：{v.tpOptionC ? v.tpOptionC : "无"}
                    </RadioItem>
                    <RadioItem checked={this.state.answerList[i] === "D"} onClick={() => this.changeAnswer(i, "D")}>
                      D：{v.tpOptionD ? v.tpOptionD : "无"}
                    </RadioItem>
                  </List>
                </div>
                <WhiteSpace size="xl" />
              </Card.Body>
              <Card.Footer content="(*^_^*)" extra={<div>@冰镇果冻</div>} />
            </Card>
          </div>
        )
      }
      if (v.tpType === 1) {
        return (
          <div key={v.tpId}>
            <Card>
              <Card.Header
                title={<Badge text="多选题" hot style={{ padding: '3px 3px', borderRadius: 2, fontSize: "0.7rem", backgroundColor: '#3F48CC' }} />}
                extra={<span>分值：{v.tpScore}分</span>}
              />
              <Card.Body>
                <p className="mySpan">题目：</p>
                <div className="topic">
                  {v.tpQuestionStem}
                </div>
                <p className="myTips">选择：</p>
                <div className="answer" >
                  <List renderHeader={() => '多选题哟~'}>

                    <CheckboxItem checked={this.state.answerList[i] ? this.state.answerList[i].includes("A") : false} onChange={() => this.changeAnswers(i, "A")}>
                      {v.tpOptionA ? v.tpOptionA : "无"}

                    </CheckboxItem >
                    <CheckboxItem checked={this.state.answerList[i] ? this.state.answerList[i].includes("B") : false} onChange={() => this.changeAnswers(i, "B")}>
                      {v.tpOptionB ? v.tpOptionB : "无"}
                    </CheckboxItem >
                    <CheckboxItem checked={this.state.answerList[i] ? this.state.answerList[i].includes("C") : false} onChange={() => this.changeAnswers(i, "C")}>
                      {v.tpOptionC ? v.tpOptionC : "无"}
                    </CheckboxItem >
                    <CheckboxItem checked={this.state.answerList[i] ? this.state.answerList[i].includes("D") : false} onChange={() => this.changeAnswers(i, "D")}>
                      {v.tpOptionD ? v.tpOptionD : "无"}
                    </CheckboxItem >
                  </List>

                </div>
                <WhiteSpace size="xl" />
              </Card.Body>
              <Card.Footer content="(*^_^*)" extra={<div>@冰镇果冻</div>} />
            </Card>
          </div>
        )
      }
      if (v.tpType === 2) {
        return (
          <div key={v.tpId}>
            <Card>
              <Card.Header
                title={<Badge text="判断题" hot style={{ padding: '3px 3px', borderRadius: 2, fontSize: "0.7rem" }} />}
                extra={<span>分值：{v.tpScore}分</span>}
              />
              <Card.Body>
                <p className="mySpan">题目：</p>
                <div className="topic">
                  {v.tpQuestionStem}
                </div>
                <p className="myTips">选择：</p>
                <div className="answer" >
                  <List renderHeader={() => '判断题哟~'}>
                    <RadioItem checked={this.state.answerList[i] === "A"} onClick={() => this.changeAnswer(i, "A")}>
                      正确
                  </RadioItem>
                    <RadioItem checked={this.state.answerList[i] === "B"} onClick={() => this.changeAnswer(i, "B")}>
                      错误
                  </RadioItem>
                  </List>
                </div>
                <WhiteSpace size="xl" />
              </Card.Body>
              <Card.Footer content="(*^_^*)" extra={<div>@冰镇果冻</div>} />
            </Card>
          </div>
        )
      }
      return null
    })
  }

  // 改变答题卡标识函数
  paginationChange(e) {
    this.setState({
      page: e
    })
  }

  // 提交操作
  subClickHandle() {
    // 判断是否答完所有题
    let len = this.state.answerList.filter((v) => {
      return !v
    }).length

    // 生成判断是否答题数组
    let unfinished = this.state.answerList.map((v, i) => {
      // 如果是null 或者 ""
      if (!v) {
        return i
      }
      return null
    })

    // 题未答完
    if (len !== 0) {
      let tipsStr = `还有${len}道题未完成，请完成！`
      return (alert(
        tipsStr,
        <div style={{ height: 100, overflow: 'scroll' }}>
          <p>如下列表(点击可跳转)</p>
          {
            unfinished.map((v, index) => {
              if (!v && v !== 0) { return null }
              return <p key={index} onClick={() => {
                this.setState({
                  page: index + 1
                })
              }}>第{index + 1}题</p>
            })
          }
        </div>,
        [{ text: '好的', onPress: () => { } },
        ]))
    }

    this.postScore()
  }

  // 提交数据操作
  postScore() {
    // TODO 提交成绩(清除定时器计时)
    clearInterval(this.countDownInterval)

    // 获取用户答题时间
    let scTime = this.props.testInfo.tsTime * 60 - this.state.countDownNum
    // 获取测试id
    let { tsId } = this.props.testInfo
    // 获取答案
    let scAnswer = ScoreSort(this.state.answerList).join("-")

    let scoreQuery = {
      scTime,
      tsId,
      scAnswer
    }

    this.commitData(scoreQuery)
  }

  // 提交答案函数
  commitData(scoreQuery) {
    score.postScore(scoreQuery, this.props.testInfo.qbId).then(res => {
      this.props.history.push("/course/test/score")
    }).catch(err => {
      alert('提交失败！', ``, [
        {
          text: '返回', onPress: () => {
            // 返回活动页面
            this.props.history.push("/course/index/activity")
          }
        },
      ]);
    })
  }

  cardTouchStart(e) {
    this.setState({
      flag: true,
      oldX: e.changedTouches[0].pageX
    })
  }

  cardTouchMove(e) {
    if (this.state.flag) {
      if (e.changedTouches[0].pageX > this.state.oldX && e.changedTouches[0].pageX - this.state.oldX > this.state.distance) {
        if (this.state.page === 1) {
          return this.setState({
            flag: false,
            page: this.state.dataList.length,
            oldX: 0
          })
        }
        return this.setState({
          flag: false,
          oldX: 0,
          page: this.state.page - 1
        })
      }

      if (e.changedTouches[0].pageX < this.state.oldX && this.state.oldX - e.changedTouches[0].pageX > this.state.distance) {
        if (this.state.page === this.state.dataList.length) {
          return this.setState({
            flag: false,
            page: 1,
            oldX: 0
          })
        }
        return this.setState({
          flag: false,
          page: this.state.page + 1,
          oldX: 0
        })
      }
    }
  }

  cardTouchEnd() {
    this.setState({
      flag: false,
      oldX: 0
    })
  }



  render() {
    return (
      <div className='asking'>

        {
          !this.state.start ?
            null :
            <div>
              <NavBar title={"剩余答题时间：" + this.state.countDownStr} />
              <div className="progress" ><Progress position="normal" percent={this.state.percent} /></div>
              <div className="pageHandle">
                <div className="pageHandle-content">
                  <Pagination style={{ marginTop: "3px" }} total={this.state.dataList.length} onChange={(e) => { this.paginationChange(e) }} current={this.state.page} locale={locale} />
                </div>
              </div>
              <div className="askinGcontent" ref="askinGcontent" onTouchStart={(e) => { this.cardTouchStart(e) }} onTouchMove={(e) => { this.cardTouchMove(e) }} onTouchEnd={(e) => { this.cardTouchEnd(e) }} >
                <div className="askin_w" ref="askin_w" >
                  {
                    this.createTopic()[this.state.page - 1]
                  }
                </div>
              </div>
              <div className="subBtn">
                <div><Button size="large" onClick={() => { this.subClickHandle() }}>交卷</Button></div>
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testInfo: state.testInfo
  }
}

export default withRouter(connect(mapStateToProps, null)(Asking))
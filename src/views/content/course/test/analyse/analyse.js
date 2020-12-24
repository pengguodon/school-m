import React from 'react'

import './analyse.css'

import { Accordion, Card, Badge } from 'antd-mobile';

import { withRouter } from 'react-router-dom'

import topic from 'api/topic/topic'
import score from 'api/score/score'

import { connect } from 'react-redux'

import NavBar from 'components/navBar/navBar'


class Analyse extends React.Component {
  state = {
    topicList: [],
    scoreQuery: {
      scAnswer: [],
      scId: "",
      scSc: "",
      scTime: "",
      tsId: ""
    }
  }

  componentWillMount() {
    this.init()
  }

  init() {
    this.getData()
  }

  // 获取数据
  getData() {
    // 获取题列表
    topic.getTopicList2(this.props.testInfo.qbId).then(res => {
      this.setState({
        topicList: [...res.data.items]
      })

      // 获取我的答题成绩信息
      score.getScoreInfoByOne(this.props.userInfo.stId, this.props.testInfo.tsId).then(res => {
        if(!res.data.item.scAnswer){
          return this.props.history.push("/course/index/activity")
        }

        // 设置数据
        this.setState({
          scoreQuery: {
            ...res.data.item,
            scAnswer: res.data.item.scAnswer.split("-")
          }
        })
      })
    })
  }

  createAccordion() {
    return this.state.topicList.map((v, i) => {
      // 用户答案
      let as = this.state.scoreQuery.scAnswer[i]
      // 序号
      let index = i + 1
      // 单选题
      if (v.tpType === 0) {
        // 正确答题
        if (as === v.tpAnswer) {
          return (
            <Accordion.Panel key={v.tpId} header={
              <div><Badge text="回答正确" style={{ marginLeft: 5,marginRight: 5, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} /> {index}. {as}</div>
            }>
              <div style={{ "padding": "1rem" }}>
                <Card>
                  <Card.Header
                    title={<Badge text="单选题" hot style={{ fontSize: "0.7rem" }} />}
                    extra={<span>分值：{v.tpScore}分</span>}
                  />
                  <Card.Body>
                    <p>正确答案：<span className="mySpan">{v.tpAnswer}</span></p>
                    <p>你的答案：<span className="mySpan">{as}</span></p>
                    <p className="mySpan">题目：</p>
                    <div className="topic">
                      {v.tpQuestionStem}
                    </div>
                    <p className="myTips">选择：</p>
                    <div className="answer" >
                      {v.tpOptionA ? <p>A：{v.tpOptionA}</p> : null}
                      {v.tpOptionB ? <p>B：{v.tpOptionB}</p> : null}
                      {v.tpOptionC ? <p>C：{v.tpOptionC}</p> : null}
                      {v.tpOptionD ? <p>D：{v.tpOptionD}</p> : null}
                    </div>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </Accordion.Panel>
          )
        } else {
          return (
            <Accordion.Panel key={v.tpId} header={
              <div><Badge text="回答错误" style={{ marginLeft: 5,marginRight: 5, padding: '0 3px', backgroundColor: '#B21016', borderRadius: 2 }} /> {index}. {as}</div>
            }>
              <div style={{ "padding": "1rem" }}>
                <Card>
                  <Card.Header
                    title={<Badge text="单选题" hot style={{ fontSize: "0.7rem" }} />}
                    extra={<span>分值：{v.tpScore}分</span>}
                  />
                  <Card.Body>
                    <p>正确答案：<span className="mySpan">{v.tpAnswer}</span></p>
                    <p>你的答案：<span className="myTips">{as}</span></p>
                    <p className="mySpan">题目：</p>
                    <div className="topic">
                      {v.tpQuestionStem}
                    </div>
                    <p className="myTips">选择：</p>
                    <div className="answer" >
                      {v.tpOptionA ? <p>A：{v.tpOptionA}</p> : null}
                      {v.tpOptionB ? <p>B：{v.tpOptionB}</p> : null}
                      {v.tpOptionC ? <p>C：{v.tpOptionC}</p> : null}
                      {v.tpOptionD ? <p>D：{v.tpOptionD}</p> : null}
                    </div>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </Accordion.Panel>
          )
        }
      }
      // 多选题
      if (v.tpType === 1) {
        // 正确答题
        if (as === v.tpAnswer) {
          return (
            <Accordion.Panel key={v.tpId} header={
              <div><Badge text="回答正确" style={{ marginLeft: 5,marginRight: 5, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} /> {index}. {as}</div>
            }>
              <div style={{ "padding": "1rem" }}>
                <Card>
                  <Card.Header
                    title={<Badge text="多选题" hot style={{ fontSize: "0.7rem" }} />}
                    extra={<span>分值：{v.tpScore}分</span>}
                  />
                  <Card.Body>
                    <p>正确答案：<span className="mySpan">{v.tpAnswer}</span></p>
                    <p>你的答案：<span className="mySpan">{as}</span></p>
                    <p className="mySpan">题目：</p>
                    <div className="topic">
                      {v.tpQuestionStem}
                    </div>
                    <p className="myTips">选择：</p>
                    <div className="answer" >
                      {v.tpOptionA ? <p>A：{v.tpOptionA}</p> : null}
                      {v.tpOptionB ? <p>B：{v.tpOptionB}</p> : null}
                      {v.tpOptionC ? <p>C：{v.tpOptionC}</p> : null}
                      {v.tpOptionD ? <p>D：{v.tpOptionD}</p> : null}
                    </div>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </Accordion.Panel>
          )
        } else {
          return (
            <Accordion.Panel key={v.tpId} header={
              <div><Badge text="回答错误" style={{ marginLeft: 5,marginRight: 5, padding: '0 3px', backgroundColor: '#B21016', borderRadius: 2 }} /> {index}. {as}</div>
            }>
              <div style={{ "padding": "1rem" }}>
                <Card>
                  <Card.Header
                    title={<Badge text="单选题" hot style={{ fontSize: "0.7rem" }} />}
                    extra={<span>分值：{v.tpScore}分</span>}
                  />
                  <Card.Body>
                    <p>正确答案：<span className="mySpan">{v.tpAnswer}</span></p>
                    <p>你的答案：<span className="myTips">{as}</span></p>
                    <p className="mySpan">题目：</p>
                    <div className="topic">
                      {v.tpQuestionStem}
                    </div>
                    <p className="myTips">选择：</p>
                    <div className="answer" >
                      {v.tpOptionA ? <p>A：{v.tpOptionA}</p> : null}
                      {v.tpOptionB ? <p>B：{v.tpOptionB}</p> : null}
                      {v.tpOptionC ? <p>C：{v.tpOptionC}</p> : null}
                      {v.tpOptionD ? <p>D：{v.tpOptionD}</p> : null}
                    </div>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </Accordion.Panel>
          )
        }
      }
      // 判断题
      if (v.tpType === 2) {
        if (as === v.tpAnswer) {
          return (
            <Accordion.Panel key={v.tpId} header={
              <div><Badge text="回答正确" style={{ marginLeft: 5,marginRight: 5, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} /> {index}. (判断题)</div>
            }>
              <div style={{ "padding": "1rem" }}>
                <Card>
                  <Card.Header
                    title={<Badge text="判断题" hot style={{ fontSize: "0.7rem" }} />}
                    extra={<span>分值：{v.tpScore}分</span>}
                  />
                  <Card.Body>
                    <p>正确答案：<span className="mySpan">{v.tpAnswer}</span></p>
                    <p>你的答案：<span className="mySpan">{as}</span></p>
                    <p className="mySpan">题目：</p>
                    <div className="topic">
                      {v.tpQuestionStem}
                    </div>
                    <p className="myTips">选择：</p>
                    <div className="answer" >
                      <p>A：正确</p>
                      <p>B：错误</p>
                    </div>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </Accordion.Panel>
          )
        } else {
          return (
            <Accordion.Panel key={v.tpId} header={
              <div><Badge text="回答错误" style={{ marginLeft: 5,marginRight: 5, padding: '0 3px', backgroundColor: '#B21016', borderRadius: 2 }} /> {index}. (判断题)</div>
            }>
              <div style={{ "padding": "1rem" }}>
                <Card>
                  <Card.Header
                    title={<Badge text="判断题" hot style={{ fontSize: "0.7rem" }} />}
                    extra={<span>分值：{v.tpScore}分</span>}
                  />
                  <Card.Body>
                    <p>正确答案：<span className="mySpan">{v.tpAnswer}</span></p>
                    <p>你的答案：<span className="myTips">{as}</span></p>
                    <p className="mySpan">题目：</p>
                    <div className="topic">
                      {v.tpQuestionStem}
                    </div>
                    <p className="myTips">选择：</p>
                    <div className="answer" >
                      <p>A：正确</p>
                      <p>B：错误</p>
                    </div>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </Accordion.Panel>
          )
        }
      }
      return null
    })
  }

  render() {
    return (
      <div className='analyse'>
        <NavBar title="答题分析" back={true} url="/course/test/score" />
        <div className="alTitle">答题情况</div>
        <div className="analyse-wrap">
          {
            this.state.scoreQuery.scAnswer.length > 0 ?
              <Accordion>
                {this.createAccordion()}
              </Accordion> :
              null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    testInfo: state.testInfo
  }
}

export default withRouter(connect(mapStateToProps, null)(Analyse))
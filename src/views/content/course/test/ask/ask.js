import React from 'react'

import { Modal } from 'antd-mobile';

import './ask.css'

import { withRouter } from 'react-router-dom'

import MyScore from 'api/score/score'

import Asking from './asking/asking'

import { connect } from 'react-redux'

const alert = Modal.alert;

// 关闭辅助函数
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      listScore: [],
      isAsk: false,
    };
  }

  componentDidMount() {
    this.init()
  }

  goto_score() {
    this.props.history.push("/course/test/score")
  }

  init() {
    this.getScoreListData()
  }

  getScoreListData() {
    // 获取学生成绩列表
    let testInfo = this.props.testInfo

    MyScore.getListScore(testInfo.tsId).then(res => {
      this.setState({
        listScore: [...res.data.items]
      })
      // 显示已答题
      if (res.data.items.length >= testInfo.tsAsk) {
        this.showModal()
      } 
      else { // 显示确认答题框?
        this.showAlert(testInfo.tsAsk - res.data.items.length)
      }
    })
  }

  showModal(e) {
    e && e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      modal1: true,
    });
  }

  // 显示答题确认框
  showAlert(count) {
    alert('提示', `还有${count}次答题机会，确定答题？`, [
      { text: '不了', onPress: () => { this.props.history.push("/course/index/activity") }, style: 'default' },
      {
        text: '确定', onPress: () => {
          this.setState({
            isAsk: true
          })
        }
      },
    ]);
  }

  // 返回上一页
  onBack = key => () => {
    this.props.history.push("/course/index/activity")
  }

  // 显示框辅助函数
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className='ask'>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          title="提示"
          footer={[
            { text: '返回', onPress: () => { this.onBack()() } },
            {
              text: '查看成绩', onPress: () => {
                this.goto_score()
              }
            },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 40, overflow: 'scroll' }}>
            你的次数答题已用尽。<br />
          </div>
        </Modal>
        {
          this.state.isAsk ? 
          <Asking/> 
          : 
          null
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

export default withRouter(connect(mapStateToProps,null)(Ask))
import React from 'react'

import { ActionSheet } from 'antd-mobile';


import { withRouter } from 'react-router-dom'

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


class RightContent extends React.Component {

  showActionSheet = () => {
    const BUTTONS = ['使用课程号加入课程', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.history.push("/course/add")
        }
      })
  }

  render() {
    return (
      <span onClick={() => { this.showActionSheet() }}>添加课程</span>
    )
  }
}

export default withRouter(RightContent)
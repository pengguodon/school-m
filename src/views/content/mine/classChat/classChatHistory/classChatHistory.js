import React from 'react'

import './classChatHistory.css'
import NavBar from 'components/navBar/navBar'
import { DatePicker, List } from 'antd-mobile';
import moment from 'moment'
import clChatApi from 'api/chat/classChat/classChat'
import { connect } from 'react-redux'
import MsgChat from './msgChat/msgChat'
import IconFont from 'utils/iconfont'



const NoMsgIcon = <IconFont style={
  {
    fontSize: 40,
  }
} type="icon-zanwujilu" />


const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp); // 现在的日期

class ClassChatHistory extends React.Component {

  state = {
    date: now,
    data: []
  }

  // 日期变化
  dataChange(date){
    this.setState({
      date,
    })
    this.getHistoryMsg(moment(date).format("YYYY-MM-DD"))
  }

  componentDidMount(){
    this.init()
  }


  init(){
    this.getHistoryMsg()
  }


  getHistoryMsg(selectDate = (moment(now).format("YYYY-MM-DD"))){
    clChatApi.classChatHistoryMsg({
      clId: this.props.userInfo.clId,
      selectDate: selectDate
    }).then(res=>{
      this.setState({
        data: [...res.data.items]
      })
    })
  }

  render() {
    return (
      <div className='classChatHistory'>
        <NavBar title={"班级聊天历史记录"} back={true} url="/mine/classChat" />
        <List >
          <DatePicker
            mode="date"
            maxDate={now}
            value={this.state.date}
            onChange={(date)=>{this.dataChange(date)}}
          >
            <List.Item arrow="horizontal">查询日期</List.Item>
          </DatePicker>
        </List>
        {
          this.state.data.length > 0 ? 
          <MsgChat data={this.state.data} />
          :
          <div style={{marginTop: 60, textAlign: 'center' }}>
            {NoMsgIcon} 
            <span style={{fontSize: '.8rem', paddingLeft:"20px", color: "#666666"}}>这天暂没有记录...</span>
          </div>

        }
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  }
}

export default connect(mapStateToProps, null)(ClassChatHistory)
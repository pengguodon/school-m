import React from 'react'

import './changeStNo.css'
import { connect } from 'react-redux'
import { setUserINFO } from 'myredux/myRedux'
import { Modal , Toast} from 'antd-mobile';

import MyStudent from 'api/student/student'

const alert = Modal.alert;

class ChangeStNo extends React.Component {
  showConfim() {
    alert('更改学号', <input className="inputNo" maxLength="5" placeholder="最大长度5位"></input>, [
      { text: '取消', onPress: () => { } },
      {
        text: '修改',
        onPress: () => {
          return new Promise((resolve) => {
            const value = document.getElementsByClassName("inputNo")[0].value
            if(value === ""){
              Toast.info('输入的内容为空，修改学号失败', 1);
              resolve()
            }
            MyStudent.updateStudentNo(value).then(res=>{
              this.props.changeUserInfo({
                ...this.props.userInfo,
                stNo: value
              })
              Toast.info('修改成功', 1);
              resolve()
            })
          }
          )
        },
      },
    ])
  }

  render() {
    return (
      <span className='changeStNo' onClick={() => { this.showConfim() }}>
        学号_{
          this.props.userInfo.stNo ? this.props.userInfo.stNo + "号" : "暂无"
        }
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userData => {
      dispatch(setUserINFO(userData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStNo)
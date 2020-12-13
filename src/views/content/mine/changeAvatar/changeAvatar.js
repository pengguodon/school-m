import React from 'react'

import './changeAvatar.css'
import NavBar from 'components/navBar/navBar'
import { Grid, Button, Toast } from 'antd-mobile';

import { connect } from 'react-redux'
import { setUserINFO } from 'myredux/myRedux'
import { withRouter } from 'react-router-dom'

import MyStudent from 'api/student/student'


const imgName = [
  "chick",
  "cow",
  "dog",
  "dragon",
  "horse",
  "monkey",
  "mouse",
  "pig",
  "rabbit",
  "sheep",
  "snake",
  "tiger"
]

const data = Array.from(new Array(12)).map((_val, i) => ({
  icon: `https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/avatar/${imgName[i]}.png`,
}));

class ChangeAvatar extends React.Component {

  componentDidMount() {
    this.setState({
      currentImg: this.props.userInfo.stAvatar,
      initialImg: this.props.userInfo.stAvatar
    })
  }

  state = {
    initialImg: "",
    currentImg: ""
  }

  changeImgCb(info) {
    this.setState({
      currentImg: info.icon
    })
  }

  changeBtnCb(){
    if(this.state.currentImg === this.state.initialImg){
      // 新头像与现在头像一样，假修改
      return Toast.info('修改成功😀', 1.2 , ()=>{
        this.props.history.push("/mine")
      })
    }else{
      // 发送请求修改头像
      MyStudent.updateStudentAvatar(this.state.currentImg).then(res=>{
        // 修改成功
        this.props.changeUserInfo({
          ...this.props.userInfo,
          stAvatar: this.state.currentImg
        })
        return Toast.info('修改成功😀', 1.2 , ()=>{
          this.props.history.push("/mine")
        })
      })
    }
  }

  render() {
    return (
      <div className='changeAvatar'>
        <NavBar title="修改头像" back={true} url="/mine" />
        <div className="changeAvatar-current">
          <div className="title mySpan" >当前已选择的头像</div>
          <div className="avatar">
            <img src={this.state.currentImg} alt="" />
          </div>
        </div>
        <Grid data={data}
          columnNum={4}
          renderItem={dataItem => (
            <div className="imgW">
              <img src={dataItem.icon} style={{ width: '50px', height: '50px' }} alt="" />
            </div>
          )}
          onClick={(e) => { this.changeImgCb(e) }}
        />
        <div className="changeAvatar-btn">
          <Button type="primary" onClick={()=>{this.changeBtnCb()}}>确定修改</Button>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar))
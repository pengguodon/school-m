import React from 'react'

import './aboutMe.css'

import NavBar from 'components/navBar/navBar'

class AboutMe extends React.Component {
  render() {
    return (
      <div className='aboutMe'>
        <NavBar title="关于我们" back={true} url="/mine" />
        <div className="aboutMeImgWrap">
          <img width="100%" alt="" src={"https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/aboutMe.png"} />
        </div>

      </div>
    )
  }
}

export default AboutMe
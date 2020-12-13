import React from 'react'
import './funcNav.css'

import { Carousel } from 'antd-mobile';

import { Link } from 'react-router-dom'

const data = [
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E4%BB%8B%E7%BB%8D.png",
    desc: "学校介绍",
    link: "/index/other/stIntro"
  },
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E4%B8%93%E4%B8%9A.png",
    desc: "专业设置",
    link: "/index/other/mjSetup"
  },
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E6%A0%A1%E5%9B%AD%E6%96%87%E5%8C%96.png",
    desc: "校园文化",
    link: "/index/other/cpCulture"
  },
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E8%AE%BE%E5%A4%87.png",
    desc: "教学设备",
    link: "/index/other/tcAttachments"
  },
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E6%96%87%E5%87%AD.png",
    desc: "双文凭教育",
    link: "/index/other/dgAscension"
  },
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E5%B0%B1%E4%B8%9A%E4%BF%9D%E9%9A%9C.png",
    desc: "就业保障",
    link: "/index/other/empSecurity"
  },
  {
    url: "https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/img/%E6%8C%87%E5%8D%97.png",
    desc: "报读指南",
    link: "/index/other/applyGuide"
  }
]

class FuncNav extends React.Component {
  render() {
    return (
      <div className='funcNav'>
        <Carousel
          autoplay={false}
          dotActiveStyle={{
            backgroundColor: "#1890FF"
          }}
        >
          <div className="funcNav-content">
            <div className="funcNav-content-list">
              {
                data.map((v, i) => {
                  return <div key={i}>
                    <Link to={v.link}>
                    <img src={v.url} alt="" />
                    <span>{v.desc}</span>
                    </Link>
                  </div>
                })
              }
            </div>
          </div>
          <div className="funcNav-content">
            <div className="funcNav-content-list">
              更多尚在开发
            </div>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default FuncNav
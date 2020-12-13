import React from 'react'

import './tcAttachments.css'

const data = [
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-1.jpg",
    desc: "奥地利进口数控加工中心实习车间"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-2.jpg",
    desc: "奥地利进口双系统五轴控制数控铣床实"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-3.jpg",
    desc: "车工实训车间"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-4.jpg",
    desc: "钳工实训车间"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-5.jpg",
    desc: "广告制作实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-6.jpg",
    desc: "计算机实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-7.jpg",
    desc: "电子商务实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-8.jpg",
    desc: "多媒体教室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-9.jpg",
    desc: "烹饪实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-10.jpg",
    desc: "电工PLC实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-11.jpg",
    desc: "机床电路维修实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-12.jpg",
    desc: "汽车维修实训车间"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-13.jpg",
    desc: "校企合作“宁武”生产实训车间"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-14.jpg",
    desc: "服装制作实训车间"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-15.jpg",
    desc: "幼师钢琴室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-17.jpg",
    desc: "幼师形体训练室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-18.jpg",
    desc: "工业机器人实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-19.jpg",
    desc: "国家高培基地电气自动化实训室"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-20.jpg",
    desc: "建筑施工实训"
  },
  {
    url: "http://www.mmsjx.com/zhaosheng/images/4-16.jpg",
    desc: "财会模拟实习室"
  }
]

class TcAttachments extends React.Component {

  createCard() {
    return data.map((v,i) => {
      return (
        <div className="tcAttachments-item" key={i}>
          <div className="tcAttachments-card">
            <img width="100%" src={v.url} alt="" />
            <div>
              {v.desc}
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='tcAttachments clearfix'>
        <div className="tcAttachments-title">
          教学设备
          <div className="tcAttachments-title-desc">
            学校教学设备设施完善，所有教室均配备多媒体教学平台，建有"数控加工实训中心"、"电气自动化实训中心"、"电子电工实训中心"、"汽车检测与维修实训中心"、"计算机实训中心"、"服装设计与制作实训中心"、"烹饪实训中心"等各专业实验、实训室共76间，实习实验设备3500多台（套），教学设备总价值4500多万元。
          </div>
          <div className="tcAttachments-title-line"></div>
        </div>
        <div className="tcAttachments-content clearfix">
          {this.createCard()}
        </div>
      </div>
    )
  }
}

export default TcAttachments
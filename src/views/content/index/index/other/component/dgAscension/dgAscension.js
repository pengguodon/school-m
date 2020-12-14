import React from 'react'
import { List } from 'antd-mobile';
import './dgAscension.css'

let data = [{
        icon: 'http://www.mmsjx.com/zhaosheng/images/5-12.jpg'
    },
    {
        icon: 'http://www.mmsjx.com/zhaosheng/images/5-13.jpg'
    },
    {
        icon: 'http://www.mmsjx.com/zhaosheng/images/5-14.jpg'
    }
]

let data1 = [{
  icon: 'http://www.mmsjx.com/zhaosheng/images/5-21.jpg',
  name: '2017级新生开学典礼'
},
{
  icon: 'http://www.mmsjx.com/zhaosheng/images/5-22.jpg',
  name: '2016届毕业典礼'
},
{
  icon: 'http://www.mmsjx.com/zhaosheng/images/5-23.jpg',
  name: '优秀教学点'
},
{
  icon: 'http://www.mmsjx.com/zhaosheng/images/5-24.jpg',
  name: '先进教学点奖'
}
]


class DgAscension extends React.Component{
  render(){ 

    return (
      <div className='dgAscension'>
            <div className="dgAscension-title">- 双文凭教育 -</div>
            <List className="my-list">
                <List.Item wrap={true}>
                我校在2008年9月与广东石油化工学院签订了"联合办学"的协议,联合举办"高技+大专"成人高等院校大专学历教育。
                </List.Item>
                <List.Item wrap={true}>
                自2009年首次招生以来,在广东石油化工学院成教学院的指导下,坚持"教育育人、管理育人、服务育人"的办学指导思想,严格执行质量第一、讲求实效、加强服务的办学理念，以成人大专为起点，主要招生对象为我校的在校生和历届毕业生，也包括部分的社会在职人员,招生人数逐年增长,目前在校大专学生人数突破2200多人,2013年我校均荣获了广东石油化工学院成人学历教育招生组织奖二等奖;2013年 3月参加广东石油化工学院成人教育函授站（点）办学水平检查评估中荣获唯一"优秀"教学点;2015年荣获广东石油化工学院成人教育"先进教学点"。在2015年7月,学校为了满足学生更多的专业性选择,又与广东城建职业学院签订"联合办学"协议,增设了建筑工程技术和艺术设计等专业,目前我校开设了机械设计与制造、电气自动化技术、计算机应用技术、学前教育、会计电算化、工商企业管理、旅游管理（酒店管理方向）、电子商务、建筑工程技术、汽车检测与维修技术、艺术设计共十一个成人大专的专业。
                </List.Item>
            </List>
            <div className='dgAscension-image'>
              <img src={data[0].icon} alt="" />
              <img src={data[1].icon} alt="" />
            </div>
            <div className='dgAscension-list'>
              {data1.map((data,index) => (
                <div className='dgAscension-item' key={index}>
                <img className='dgAscension-item-image' src={data.icon} alt=""></img>
                <span className='dgAscension-item-title'>{data.name}</span>
                </div> 
              ))}
            </div>
      </div>
    )
  }
}

export default DgAscension



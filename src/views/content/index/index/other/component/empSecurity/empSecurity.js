import React from 'react'
import { Grid,List } from 'antd-mobile';
import './empSecurity.css'

let data = [{
        name:"学校与海信集团合作",
        icon: 'http://www.mmsjx.com/zhaosheng/images/7-11.jpg'
    },{
        name:"阿里巴巴集团、广东大中电商公司合作",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-12.jpg'
    },
    {
        name:"学校与香港昌利行集团合作",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-13.jpg'
    },
    {
        name:"学校与珠海九九天香公司合作",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-14.jpg'
    },
    {
        name:"学校与浪漫海岸温德姆酒店合作",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-15.jpg'
    },
    {
        name:"学校与广州宁武汽车技术有限公司合作",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-16.jpg'
    },
    {
        name:"回访广州宁武公司",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-17.jpg'
    },
    {
        name:"回访广州广船国际公司",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-18.jpg'
    },
    {
        name:"回访海信集团",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-19.jpg'
    },
    {
        name:"回访广州广汽集团",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-110.jpg'
    },
    {
        name:"回访深圳希尔电子公司",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-111.jpg'
    },
    {
        name:"回访格力电器集团",
        icon:'http://www.mmsjx.com/zhaosheng/images/7-112.jpg'
    }
    
]

let data1 = [{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-201.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-202.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-203.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-204.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-205.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-206.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-207.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-208.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-209.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-210.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-211.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-212.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-213.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-214.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-215.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-216.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-217.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-218.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-219.jpg'
    } ,{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-220.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-221.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-222.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-223.jpg'
    },{
        icon:'http://www.mmsjx.com/zhaosheng/images/7-224.jpg'
    } 
]

class EmpSecurity extends React.Component{
  render(){ 

    return (
      <div className='empSecurity'>
            <div className="empSecurity-title">- 就业保障 -</div>
            <List className="my-list">
                <List.Item
                wrap={true}
                >
                学校非常重视毕业生就业工作，始终把职业指导和就业服务纳入重要议事日程，成立就业办，具体负责就业工作，并积极组织全体教职工参与毕业生就业工作，确保了毕业生的就业，服务地方经济建设。一是充分发挥《职业道德与职业指导》课程的主渠道作用，加强学生的职业道德教育，把职业指导工作贯穿和渗透到学校各项教育活动中。二是学校还积极拓宽渠道，与企事业单位合作，在本地工业园区、行业协会以及珠三角、长三角等沿海发达地区作为重点就业地区，为毕业生就业提供广阔的途径。三是学校定期或不定期开展就业调查与就业咨询，组织学生参加人才交流见面会，开展社会实践和创业实践活动，实施学生课程间见习，为毕业生稳定就业打好基础。
                </List.Item>
                <List.Item
                wrap={true}
                >
                同时，实施学生就业的多次推荐，为学生就好业尽心尽力。有的学生就业后觉得不满意，回校后学校会为其再次推荐，直至学生满意为止。
                </List.Item>
                <List.Item
                wrap={true}
                >
                学生就业后，学校还注重跟踪管理。学生就业后，学校有相关的措施，对学生进行跟踪管理，尽力为学生排解工作中的各种矛盾。就业工作的努力，使学校就业工作不断步上新台阶，学生就业率多年达97%以上。
                </List.Item>
            </List>
            <Grid 
            hasLine={false}
            data={data}
            columnNum={2}
            renderItem={dataItem => (
                <div style={{ padding: '12.5px' }}>
                <img src={dataItem.icon} style={{ width: '165px', height: '125px'}} alt="" />
                <div style={{ color: '#777', fontSize: '14px', marginTop: '10px'}}>
                <span>{dataItem.name}</span>
                </div>
                </div>
            )}
            />

            <List renderHeader={() => '合作企业'}>
            <Grid 
            hasLine={true}
            data={data1}
            columnNum={3}
            renderItem={dataItem => (
                <div style={{ width: '105px', height: '105px' , padding: '12.5px' }}>
                <img src={dataItem.icon} style={{ width: '100%', height: '100%' }} alt="" />
                </div>
            )}
            />
            </List>
      </div>
    )
  }
}

export default EmpSecurity
import React from 'react'
import { List, Grid } from 'antd-mobile';
import './cpCulture.css'

const Item = List.Item;

let data = [{
    name: "演讲与口才协会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-17.jpg'
}, {
    name: "电脑协会、'绿竹'书画协会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-13.jpg'
}
]
let data1 = [{
    name: "体育协会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-14.jpg'
}, {
    name: "校运会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-22.jpg'
}
]
let data2 = [{
    name: "街舞",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-210.jpg'
}, {
    name: "'八度'音舞协会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-16.jpg'
}
]
let data3 = [{
    name: "纠察队",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-12.jpg'
}, {
    name: "志愿者协会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-11.jpg'
}
]
let data4 = [{
    name: "体育协会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-14.jpg'
}, {
    name: "记者团",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-18.jpg'
}
]
let data5 = [{
    name: "《传统道德教育》名师示范课",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-37.jpg'
}, {
    name: "弘扬传统文化专题晚会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-38.jpg'
}, {
    name: "“孝亲尊师 感恩同行”报告会",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-312.jpg'
}, {
    name: "拜师学艺",
    icon: 'http://www.mmsjx.com/zhaosheng/images/2-34.jpg'
}
]

class CpCulture extends React.Component {
    render() {
        return (
            <div className='cpCulture'>
                <div className="cpCulture-title">- 校园文化 -</div>
                <List renderHeader={() => '社团活动'} className="my-list">
                    <Item
                        wrap={true}
                    >文化类有："红土蓝天"文学社、"绿竹"书画协会、电子商务协会、电脑协会、英语协会、"千秋"动漫、演讲与口才协会、"非凡"广告协会等；</Item>
                </List>
                <Grid
                    hasLine={false}
                    data={data}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '165px', height: '125px' }} alt="" />
                            <div style={{ color: '#777', fontSize: '14px', marginTop: '10px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
                <Item wrap={true}>体育类有：体育协会、"混元"太极协会、武术协会、跆拳道等；</Item>
                <Grid
                    hasLine={false}
                    data={data1}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '165px', height: '125px' }} alt="" />
                            <div style={{ color: '#777', fontSize: '14px', marginTop: '10px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
                <Item wrap={true}>文艺类有："八度"音舞协会、合唱团；</Item>
                <Grid
                    hasLine={false}
                    data={data2}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '165px', height: '125px' }} alt="" />
                            <div style={{ color: '#777', fontSize: '14px', marginTop: '10px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
                <Item wrap={true} >公益类有：志愿者协会、国学协会、纠察队等；</Item>
                <Grid
                    hasLine={false}
                    data={data3}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '165px', height: '125px' }} alt="" />
                            <div style={{ color: '#777', fontSize: '14px', marginTop: '10px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
                <Item wrap={true}>宣传类有："飞越"广播站、记者团、国旗队等。</Item>
                <Grid
                    hasLine={false}
                    data={data4}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '165px', height: '125px' }} alt="" />
                            <div style={{ color: '#777', fontSize: '14px', marginTop: '10px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
                <List>
                    <Item wrap={true}>各社团始终坚持以学校为中心，为校园文化建设、为学生成长成才服务，逐步走"数量建团、质量建团、精品建团"之路，努力形成管理制度规范、引导机制明确、艺术情趣高雅、形式新颖的发展模式，为创建和谐文化校园和培养优秀人才作出了贡献。</Item>
                </List>
                <List renderHeader={() => '传统文化'} className="my-list">
                    <Item wrap={true}>我校积极响应省人社厅提出的"技能+品德"技能人才培养的号召，主动适应产业升级对技能人才的需求，结合实际，在抓好学生基本理论和专业技能学习的基础上，把中华优秀传统文化和现代职业教育理念有机结合，通过把《弟子规》列入日常德育课堂教学，引引导学生谦虚礼貌、尊老爱幼，养成踏实做事、诚实做人的良好道德意识；开设善乐课程，举办各种专题晚会，明确学生传唱爱国、爱党、爱校、爱家歌曲，用好音乐启迪学生的善良心境，陶冶学生的道德情操；将学习太极拳列入体育教学的必修课，引导师生"练太极、提气神、柔心性"；开设早读课，要求学生晨读传统文化经典；开展诵读竞赛，锻炼学生胆量、口才和思维；举办朗诵晚会，让圣贤教诲在学生心中扎根，洗尽浮躁，塑造学生高尚人格。基本形成了"德育为首、教学为主、育人为本、文化给力、德艺双馨"的办学特色，得到了社会各界的普遍认可。</Item>
                </List>
                <Grid
                    hasLine={false}
                    data={data5}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '165px', height: '125px' }} alt="" />
                            <div style={{ color: '#777', fontSize: '14px', marginTop: '10px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default CpCulture
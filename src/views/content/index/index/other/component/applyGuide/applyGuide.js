import React from 'react'
import { List } from 'antd-mobile';


import './applyGuide.css'

const Item = List.Item;

class ApplyGuide extends React.Component{
  render(){
    return (
      <div className='applyGuide'>
          <div className="applyGuide-title">——报读指南——</div>
          <List renderHeader={() => '一、报读方法'} className="my-list">
          <Item
            thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E7%BA%B8%E9%B9%A4.png" 
            wrap="true" 
            onClick={() => {}}
            multipleLine="true"
            >
            报名办法:
            免试入学，即日起直接到我校报名，或微信、QQ、电话报名、汇款报名、网上报名。
            </Item>
            <Item 
            thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E7%BA%B8%E9%A3%8E%E8%BD%A6.png"
            wrap="true"  
            multipleLine="true" 
            onClick={() => {}}
            >
            报名条件:
            凡是应（往）届初中、高中毕业生或同等学历者，均可报读。
            </Item>
            <Item
            thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E7%BA%B8%E9%A3%8E%E8%BD%A6.png"
            onClick={() => {}}
            wrap="true"
            multipleLine="true"
            >
              ▼ 点击报名链接~在线报名
            </Item>
        </List>
          <List renderHeader={() => '二、国家推出资助政策 促进技工教育发展'} className="my-list">
            <Item
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E5%AD%A6%E8%B4%B9.png"
              wrap="true" 
              onClick={() => {}}
              multipleLine="true"
              >
              1、免学费:
              凡报读我校的农村（含县镇）学生和城市家庭经济困难的学生均可申请免学费就读 (具体参照"粤财教〔2013〕54号文件"实行) ；
              </Item>
              <Item 
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E5%AD%A6%E8%B4%B9.png"
              wrap="true"  
              multipleLine="true" 
              onClick={() => {}}
              >
              2、国家助学金:
              根据省教育厅规定，符合条件的农村（含县镇）学生和城市家庭经济困难的学生均可申请国家助学金2000元/人/年，连续资助二年，共4000元。
              </Item>
          </List>
          <List renderHeader={() => '三、报到时间'} className="my-list">
            <Item
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E6%97%A5%E6%9C%9F.png"
              wrap="true" 
              onClick={() => {}}
              multipleLine="true"
              >
              2019年9月7日回校报到，9月9日上课。
              </Item>
              <Item 
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E6%97%A5%E6%9C%9F.png"
              wrap="true"  
              multipleLine="true" 
              onClick={() => {}}
              >
              新生接待站:
              2019年9月7日新生回校报到注册时，我校在茂名东火车站、河东交委汽车总站和河西汽车总站均设有新生接待站接送新生回校报到注册。
              </Item>
          </List>
          <List renderHeader={() => '四、报到手续'} className="my-list">
            <Item
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E6%B5%81%E7%A8%8B%E5%AE%A1%E6%89%B9.png"
              wrap="true" 
              onClick={() => {}}
              multipleLine="true"
              >
              1、凭入学录取通知书或者缴费单据到班主任处报到注册。
              </Item>
              <Item 
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E6%B5%81%E7%A8%8B%E5%AE%A1%E6%89%B9.png"
              wrap="true"  
              multipleLine="true" 
              onClick={() => {}}
              >
              2、自备一寸免冠正面彩色相片8张，身份证及户口簿复印件（复印格式见背后）一式五份，高中（中专、中技）毕业证书（报读高技的学生需提供），入学报到时一并交给班主任。
              </Item>
              <Item 
              thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E6%B5%81%E7%A8%8B%E5%AE%A1%E6%89%B9.png"
              wrap="true"  
              multipleLine="true" 
              onClick={() => {}}
              >
              3、是党（团）员的学生要提交党（团）员组织关系证明。
              </Item>
          </List>
          <List renderHeader={() => '五、交通指南'} className="my-list">
          <Item
            thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E5%9C%B0%E5%9D%80.png"
            wrap="true" 
            onClick={() => {}}
            multipleLine="true"
            >
            官渡校区（校本部）地址:
            茂名市光华北路638号（即广东石油化工学院官渡校区东侧），乘坐出租车或7路、11路、210路公交车即可直达学校门口。
            </Item>
            <Item 
            thumb="https://mmyjschool.oss-cn-guangzhou.aliyuncs.com/school/%E5%9C%B0%E5%9D%80.png"
            wrap="true"  
            multipleLine="true" 
            onClick={() => {}}
            >
            厂前校区地址:
            茂名市红旗北路126号，乘坐出租车或3路、6路、18路、303路公交车即可直达学校门口。
            </Item>
        </List>
      </div>
    )
  }
}

export default ApplyGuide
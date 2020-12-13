import React from 'react'
import { List } from 'antd-mobile';

import './stIntro.css'

const Item = List.Item;

class StIntro extends React.Component {
  render() {
    return (
      <div className='stIntro'>
        <div className="stIntro-title">- 学校介绍 -</div>
        <img src={'http://www.mmsjx.com/zhaosheng/images/1-1.jpg'} alt="" style={{ width: "100%", height: "150px" }}></img>
        <List className="stIntro-list">
          <Item
            wrap="true"
            multipleLine="true"
          >
            茂名市高级技工学校（茂名一技）是1988年经广东省人民政府批准成立，直属茂名市人力资源和社会保障局管理的重点公办技工院校。学校有两个校区，官渡校区（校本部）位于茂名市光华北路638号，厂前校区位于茂名市红旗北路126号。学校办学历史悠久，特色鲜明，先后通过了国家和省市的各级评估，是国家级高技能人才培训基地、全国职工教育培训示范点、广东省扶贫培训基地、广东省农村劳动力技能培训转移就业定点培训机构、广东省创业培训定点机构、茂名市文明单位、茂名市高技能人才公共实训基地、茂名市再就业培训定点机构。
          </Item>
          <Item
            wrap="true"
            multipleLine="true"
          >
            学校坚持以培养的高技能人才为目标，培养了各类技术技能人才8万多人，办学成果显著，为促进我市乃至全省经济发展，加快农村劳动力转移就业和城镇化进程，改善民生、稳定就业作出了积极贡献。近年来，学校不断加强内涵建设，突出学生"品德+技能"双核能力培养，校企联合建立了各类专业的实习工厂（车间）、实训中心等30多间，坚持"真设备、真产品、真环境"的教学原则，实施理论实践一体化教学，致力培养具有"工匠精神"高技能人才。同时，积极开展"招生即招工"、"招工即招生"的校企双制办学，推动校企深度合作，为学生搭建技能人才成长的理想通道。
          </Item>
          <Item
            wrap="true"
            multipleLine="true"
          >
            未来，学校将立足茂名经济发展对高技能人才的需求，辐射粤西地区乃至全省产业转型升级，通过科学化、制度化、规范化管理，把学校建成一所师生高素质、教学高质量、文化高品位、社会高声誉的一流技工院校。
          </Item>
        </List>
      </div>
    )
  }
}

export default StIntro
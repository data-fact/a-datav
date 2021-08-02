/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/19.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Select} from 'antd4'

const regions = [
    {title: '中国', name: 'china'},
    {title: '北京', name: 'beijing'},
    {title: '安徽', name: 'anhui'},
    {title: '澳门', name: 'aomen'},
    {title: '重庆', name: 'chongqing'},
    {title: '福建', name: 'fujian'},
    {title: '甘肃', name: 'gansu'},
    {title: '广东', name: 'guangdong'},
    {title: '广西', name: 'guangxi'},
    {title: '贵州', name: 'guizhou'},
    {title: '海南', name: 'hainan'},
    {title: '河北', name: 'hebei'},
    {title: '黑龙江', name: 'heilongjiang'},
    {title: '河南', name: 'henan'},
    {title: '湖北', name: 'hubei'},
    {title: '湖南', name: 'hunan'},
    {title: '江苏', name: 'jiangsu'},
    {title: '江西', name: 'jiangxi'},
    {title: '吉林', name: 'jilin'},
    {title: '辽宁', name: 'liaoning'},
    {title: '内蒙古', name: 'neimenggu'},
    {title: '宁夏', name: 'ningxia'},
    {title: '青海', name: 'qinghai'},
    {title: '山东', name: 'shandong'},
    {title: '上海', name: 'shanghai'},
    {title: '山西', name: 'shanxi'},
    {title: '陕西', name: 'shanxi1'},
    {title: '四川', name: 'sichuan'},
    {title: '台湾', name: 'taiwan'},
    {title: '天津', name: 'tianjin'},
    {title: '香港', name: 'xianggang'},
    {title: '新疆', name: 'xinjiang'},
    {title: '西藏', name: 'xizang'},
    {title: '云南', name: 'yunnan'},
    {title: '浙江', name: 'zhejiang'},
    {title: '世界', name: 'world'},
]
export default function RegionSelect({region,onChange}){

    return (
        <div className={'datav-region-select'}>
            <Row>
                <Col span={8}>国家或地区</Col>
                <Col span={10}>
                    <Select
                        style={{width: 120}}
                        dropdownMenuStyle={{overflow: 'auto', maxHeight: 200}}
                        value={region}
                        onChange={onChange}
                    >
                        {
                            regions.map(r => (
                                <Select.Option value={r.name}>{r.title}</Select.Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
        </div>
    )
}
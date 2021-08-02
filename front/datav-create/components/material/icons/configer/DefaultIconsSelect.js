/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/31.
 * Description:
 * Modified By:
 */
import React from 'react'
import loadable from '@loadable/component'
import {Select} from 'antd4'
const {Option} = Select

const icons = [
    {name: 'RiseOutlined',value: 'RiseOutlined'},
    {name: 'FallOutlined',value: 'FallOutlined'},
    {name: 'ArrowUpOutlined',value: 'ArrowUpOutlined'},
    {name: 'ArrowDownOutlined',value: 'ArrowDownOutlined'},
    {name: 'CheckCircleOutlined',value: 'CheckCircleOutlined'},
    {name: 'EnterOutlined',value: 'EnterOutlined'},
    {name: 'QuestionCircleOutlined',value: 'QuestionCircleOutlined'},
    {name: 'ExclamationCircleOutlined',value: 'ExclamationCircleOutlined'},
    {name: 'WarningOutlined',value: 'WarningOutlined'},
    {name: 'AreaChartOutlined',value: 'AreaChartOutlined'},
    {name: 'StockOutlined',value: 'StockOutlined'},
    {name: 'GlobalOutlined',value: 'GlobalOutlined'},
    {name: 'HeartOutlined',value: 'HeartOutlined'},
    {name: 'HistoryOutlined',value: 'HistoryOutlined'},
    {name: 'VideoCameraOutlined',value: 'VideoCameraOutlined'},
    {name: 'PhoneOutlined',value: 'PhoneOutlined'},
    {name: 'WhatsAppOutlined',value: 'WhatsAppOutlined'},
    {name: 'WechatOutlined',value: 'WechatOutlined'},
    {name: 'QqOutlined',value: 'QqOutlined'},
    {name: 'WeiboCircleOutlined',value: 'WeiboCircleOutlined'},
]
export default function DefaultIconsSelect({icon,onChange}){

    if(icons.findIndex(ic => ic.value == icon) < 0)
        icon = undefined
    return (
        <Select
            size="small" style={{width: 180}} placeholder="请选择"
            value={icon}
            onChange={onChange}
        >
            {
                icons.map(icon => {
                    let Icon = loadable(() => import(`@ant-design/icons/es/icons/${icon.value}`))
                    return <Option value={icon.value}><Icon/>{icon.name}</Option>
                })
            }
        </Select>
    )
}
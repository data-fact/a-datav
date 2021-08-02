/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/10.
 * Description:
 * Modified By:
 */
import React from 'react'
import update from 'immutability-helper';
import {Row,Col,Switch,Radio,Tooltip} from 'antd4'
import { InfoCircleOutlined } from '@ant-design/icons';

export default function PaginationConfiger({pagination,onChange}){

    let {size,position} = pagination

    function handlePositionChange(index,value) {
        onChange('position',update(position,{[index]: {$set: value}}))
    }

    return (
        <>
            <Row style={{paddingBottom: 16}}>
                <Col span={24}>
                    <InfoCircleOutlined />
                    {'如果启用分页子组件，此配置将失效。\n数据量大于1000建议启用分页子组件。'}
                </Col>
            </Row>
            <Row>
                <Col span={4}>尺寸</Col>
                <Col span={10}>
                    <Radio.Group
                        size="small" value={size}
                        onChange={e => onChange('size',e.target.value)}
                    >
                        <Radio.Button value="default">大</Radio.Button>
                        <Radio.Button value="small">小</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={6}>上分页</Col>
                        <Col span={18}>
                            <Radio.Group
                                size="small" value={position[0]}
                                onChange={e => handlePositionChange(0,e.target.value)}
                            >
                                <Radio.Button value="topLeft">上左</Radio.Button>
                                <Radio.Button value="topCenter">上中</Radio.Button>
                                <Radio.Button value="topRight">上右</Radio.Button>
                                <Radio.Button value="none">不显示</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>下分页</Col>
                        <Col span={18}>
                            <Radio.Group
                                size="small" value={position[1]}
                                onChange={e => handlePositionChange(1,e.target.value)}
                            >
                                <Radio.Button value="bottomLeft">下左</Radio.Button>
                                <Radio.Button value="bottomCenter">下中</Radio.Button>
                                <Radio.Button value="bottomRight">下右</Radio.Button>
                                <Radio.Button value="none">不显示</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
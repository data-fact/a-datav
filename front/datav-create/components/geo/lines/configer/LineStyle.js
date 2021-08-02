/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/24.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Select} from 'antd4'
import Palette from "../../../../../lib/palette/Palette";
import {lineTypes} from "../../../../common/common";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
const {Option} = Select

export default function LineStyle({lineStyle,onChange}){
    
    return (
        <>
            <Row>
                <Col span={8}>颜色</Col>
                <Col span={10}>
                    <Palette color={lineStyle.color} onChange={color => {
                        onChange('color',color)}
                    } onDelete={() => {
                        onChange('color','')}
                    }/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>类型</Col>
                <Col span={10}>
                    <Select
                        style={{width: 120}}
                        value={lineStyle.type}
                        onChange={value => onChange('type',value)}
                    >
                        {
                            lineTypes.map(t => <Option value={t}>{t}</Option>)
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={8}>线宽</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={lineStyle.width}
                        onBlur={value => onChange('width',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>曲直度</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}}
                        value={lineStyle.curveness}
                        onBlur={value => onChange('curveness',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影颜色</Col>
                <Col span={10}>
                    <Palette color={lineStyle.shadowColor} onChange={color => {
                        onChange('shadowColor',color)}
                    }/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影水平偏移</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={lineStyle.shadowOffsetX}
                        onBlur={value => onChange('shadowOffsetX',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影垂直偏移</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={lineStyle.shadowOffsetY}
                        onBlur={value => onChange('shadowOffsetY',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影模糊大小</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={lineStyle.shadowBlur}
                        onBlur={value => onChange('shadowBlur',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
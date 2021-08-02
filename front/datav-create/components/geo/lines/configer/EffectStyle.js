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
import {symbolTypes} from "../../../../common/common";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
const {Option} = Select

export default function EffectStyle({effect,onChange}){

    return (
        <>
            <Row>
                <Col span={8}>颜色</Col>
                <Col span={10}>
                    <Palette color={effect.color} onChange={color => {
                        onChange('color',color)}
                    }/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>指向速度</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}}
                        value={effect.period}
                        onBlur={value => onChange('period',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>尾迹长度</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}}
                        value={effect.trailLength}
                        onBlur={value => onChange('trailLength',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>图标类型</Col>
                <Col span={10}>
                    <Select
                        style={{width: 80}}
                        value={effect.symbol}
                        onChange={value => {onChange('symbol',value)}}
                    >
                        {
                            symbolTypes.map(t => <Option value={t}>{t}</Option>)
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={8}>图标大小</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={effect.symbolSize}
                        onBlur={value => onChange('symbolSize',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
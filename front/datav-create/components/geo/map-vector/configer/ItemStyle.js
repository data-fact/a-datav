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
import {Row,Col} from 'antd4'
import Palette from "../../../../../lib/palette/Palette";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function ItemStyle({itemStyle,onChange}){

    return (
        <>
            <Row>
                <Col span={8}>颜色</Col>
                <Col span={10}>
                    <Palette color={itemStyle.areaColor} onChange={color => {
                        onChange('areaColor',color)}
                    }/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>描边颜色</Col>
                <Col span={10}>
                    <Palette color={itemStyle.borderColor} onChange={color => {
                        onChange('borderColor',color)}
                    }/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>描边线宽</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={itemStyle.borderWidth}
                        onBlur={value => onChange('borderWidth',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影颜色</Col>
                <Col span={10}>
                    <Palette color={itemStyle.shadowColor} onChange={color => {
                        onChange('shadowColor',color)}
                    }/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影水平偏移</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={itemStyle.shadowOffsetX}
                        onBlur={value => onChange('shadowOffsetX',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影垂直偏移</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={itemStyle.shadowOffsetY}
                        onBlur={value => onChange('shadowOffsetY',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>阴影模糊大小</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={itemStyle.shadowBlur}
                        onBlur={value => onChange('shadowBlur',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
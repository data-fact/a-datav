/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/18.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row, Col, Select, Tooltip} from 'antd4'
import {InfoCircleOutlined} from '@ant-design/icons';
import AInputNumber from "../input-number/AInputNumber";
import Palette from "../palette/Palette";
import GradientColor from "../../datav-create/components/common/common-chart-configer/base/GradientColor";

const {Option} = Select

const borderTypes = [
    {name: '实线边框', value: 'solid'},
    {name: '点线边框', value: 'dotted'},
    {name: '虚线边框', value: 'dashed'},
    {name: '双线边框', value: 'double'},
    {name: '3D沟槽边框', value: 'groove'},
    {name: '3D脊边框', value: 'ridge'},
    {name: '3D嵌入边框', value: 'inset'},
    {name: '3D突出边框', value: 'outset'},
]
export default function BorderConfiger({width, color, type, gradient, onChange, radius, showRadius}) {

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>宽度</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small', min: 0}}
                        unit="px" value={width}
                        onBlur={val => onChange('width', val)}
                    />
                </Col>
            </Row>

            {
                showRadius &&
                <Row style={{marginBottom: 4}}>
                    <Col span={6}>圆角
                        {
                            gradient &&
                            <Tooltip placement="top" title="若设置渐变色,该设置无效">
                                <InfoCircleOutlined/>
                            </Tooltip>
                        }
                    </Col>
                    <Col span={18}>
                        <AInputNumber
                            options={{size: 'small', min: 0}}
                            unit="px" value={radius}
                            onBlur={val => onChange('radius', val)}
                        />
                    </Col>
                </Row>
            }


            <Row style={{marginBottom: 4}}>
                <Col span={6}>颜色</Col>
                <Col span={18}>
                    {
                        gradient ?
                            <GradientColor colors={color} onChange={color => onChange('colors', color)}/>
                            :
                            <Palette
                                color={color}
                                onChange={color => onChange('color', color)}
                                onDelete={() => onChange('color', '')}
                            />
                    }
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>
                    类型
                    {
                        gradient &&
                        <Tooltip placement="top" title="若设置渐变色,该设置无效">
                            <InfoCircleOutlined/>
                        </Tooltip>
                    }
                </Col>
                <Col span={18}>
                    <Select
                        placeholder="边框类型" size="small" style={{width: 120}}
                        value={type || undefined}
                        onChange={value => onChange('type', value)}
                    >
                        {
                            borderTypes.map(border => (
                                <Option value={border.value}>{border.name}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
        </>
    )
}
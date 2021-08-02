/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/5.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Select} from 'antd4'
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import Palette from "../../../../../lib/palette/Palette";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
const {Option} = Select

export default function Tooltip({tooltip,onChange}){

    let {textStyle = {},backgroundColor,borderColor,borderWidth,padding,trigger} = tooltip
    let {fontFamily,fontSize,color} = textStyle

    function handleChange(key,value) {
        onChange({tooltip: {[key]: {$set: value}}})
    }
    function handleTextStyleChange(key,value) {
        handleChange('textStyle',{
            ...textStyle,
            [key]: value
        })
    }

    return (
        <>
            <Row>
                <Col span={6}>触发位置</Col>
                <Col span={18}>
                    <Select
                        size="small" style={{width: 120}}
                        value={trigger}
                        onChange={val => handleChange('trigger',val)}
                    >
                        <Option value="item">数据项</Option>
                        <Option value="axis">坐标轴</Option>
                        {/*<Option value="none">不触发</Option>*/}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={6}>文本</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        size={fontSize}
                        color={color}
                        family={fontFamily}
                        onSizeChange={value => handleTextStyleChange('fontSize',value)}
                        onColorChange={color => {
                            handleTextStyleChange('color',color)
                        }}
                        onFontChange={value => handleTextStyleChange('fontFamily',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>背景框</Col>
                <Col span={18}>
                    <Row>
                        <Col span={8}>背景色</Col>
                        <Col span={16}>
                            <Palette
                                color={backgroundColor}
                                onChange={color => {
                                    handleChange('backgroundColor',color)
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>内边距</Col>
                        <Col span={16}>
                            <AInputNumber
                                options={{
                                    size: "small",
                                    min: 0, max: 1000
                                }}
                                unit="px"
                                value={padding}
                                onBlur={value => handleChange('padding',value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>边框粗细</Col>
                        <Col span={16}>
                            <AInputNumber
                                options={{
                                    size: "small",
                                    min: 0, max: 1000
                                }}
                                unit="px"
                                value={borderWidth}
                                onBlur={value => handleChange('borderWidth',value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>边框颜色</Col>
                        <Col span={16}>
                            <Palette
                                color={borderColor}
                                onChange={color => {
                                    handleChange('borderColor',color)
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
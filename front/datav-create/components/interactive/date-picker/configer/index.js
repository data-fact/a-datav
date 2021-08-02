/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React, {useEffect, useState} from 'react'
import update from 'immutability-helper';
import {Row, Col, Select, Input, Checkbox, Collapse} from 'antd4'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";
import Palette from "../../../../../lib/palette/Palette";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import DatePickerConfiger from "./DatePickerConfiger";
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";

const {Panel} = Collapse
const {Option} = Select
const borderKeyMap = {
    "width": "borderWidth",
    "type": "borderType",
    "radius":"borderRadius",
    "colors": "borderColors",
}
export default function Configer({component}) {

    let {
        i: id, size, placeholder: storePlaceholder, defaultValue: storeDefaultValue, defaultFirstValue,
        borderType, borderColors, borderWidth,borderRadius, backgroundColor,
        fontSize, color, family, align, spacing,datePicker
    } = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component, state)

    let [placeholder, setPlaceholder] = useState('')
    let [defaultValue, setDefaultValue] = useState('')

    useEffect(() => setPlaceholder(storePlaceholder), [storePlaceholder])
    useEffect(() => setDefaultValue(storeDefaultValue), [storeDefaultValue])

    if (!ready)
        return null

    function handleSizeChange(size) {
        updateComponent(id, {size})
    }

    function handlePlaceholderBlur() {
        updateComponent(id, {placeholder})
    }

    function handleDefaultValueBlur() {
        updateComponent(id, {defaultValue})
    }

    function handleDefaultFirstValueChange(e) {
        updateComponent(id, {defaultFirstValue: e.target.checked})
    }
    function handleChange(key, value) {
        key = borderKeyMap[key]
        updateComponent(id, {[key]: value})
    }
    function handleBgColorChange(backgroundColor) {
        updateComponent(id, {backgroundColor})
    }

    function handleFontSizeChange(fontSize) {
        updateComponent(id, {fontSize})
    }
    function handleSpacingChange(spacing) {
        updateComponent(id, {spacing})
    }
    function handleFontChange(family) {
        updateComponent(id, {family})
    }
    function handleAlignChange(align) {
        updateComponent(id, {align})
    }
    function handleTextColorChange(color) {
        updateComponent(id, {color})
    }
    function handleDatePickerChange(key,value) {
        updateComponent(id, {datePicker: update(datePicker,{[key]: {$set: value}})})
    }

    return (
        <>
            <Row style={{marginBottom: 8}}>
                <Col span={6}>尺寸</Col>
                <Col span={18}>
                    <Select size="small" style={{width: 100}} value={size} onChange={handleSizeChange}>
                        <Option value="default">中</Option>
                        <Option value="small">小</Option>
                        <Option value="large">大</Option>
                    </Select>
                </Col>
            </Row>
            <Row style={{marginBottom: 8}}>
                <Col span={6}>提示语</Col>
                <Col span={14}>
                    <Input
                        placeholder="提示语" size="small"
                        value={placeholder}
                        onChange={e => setPlaceholder(e.target.value)}
                        onBlur={handlePlaceholderBlur}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 8}}>
                <Col span={6}>默认值
                    <QuestionTooltip title={<>{'支持日期字符串和时间戳'}<br/>{'可输入{current}取当前时间'}</>}/>
                </Col>
                <Col span={10}>
                    <Input
                        placeholder="默认值" size="small"
                        value={defaultValue}
                        onChange={e => setDefaultValue(e.target.value)}
                        onBlur={handleDefaultValueBlur}
                    />
                </Col>
                <Col span={8}>
                    <Checkbox
                        checked={defaultFirstValue}
                        onChange={handleDefaultFirstValueChange}
                    >首条数据</Checkbox>
                </Col>
            </Row>
            <DatePickerConfiger {...datePicker} onChange={handleDatePickerChange}/>
            <Collapse bordered={false} size="small">
                <Panel
                    header="文字" key="1"
                >
                    <FontConfiger
                        hideExt hideSpacing
                        color={color} size={fontSize} spacing={spacing}
                        align={align} family={family}
                        onSizeChange={handleFontSizeChange}
                        onSpacingChange={handleSpacingChange}
                        onFontChange={handleFontChange}
                        onAlignChange={handleAlignChange}
                        onColorChange={handleTextColorChange}
                    />
                </Panel>
                <Panel
                    header="边框" key="2"
                >
                    <BorderConfiger
                        showRadius
                        gradient type={borderType} color={borderColors} width={borderWidth} radius={borderRadius}
                        onChange={handleChange}
                    />
                </Panel>
                <Panel
                    header="背景" key="3"
                >
                    <Row style={{marginBottom: 8}}>
                        <Col span={6}>颜色</Col>
                        <Col span={18}>
                            <Palette color={backgroundColor}
                                 onChange={color => {
                                     handleBgColorChange(color)
                                 }}
                                 onDelete={color => {
                                     color = ''
                                     handleBgColorChange([...color])
                                 }}
                            />
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    )
}
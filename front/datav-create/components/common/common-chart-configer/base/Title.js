/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/24.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input,Select} from 'antd4'
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import {chartPostitions} from "../../../../common/common";
const {Option} = Select

export default function Title({title,guid,onChange}){

    let {text:storeText,top,left,textStyle = {}} = title
    let {fontFamily,fontSize,color} = textStyle

    let [text,setText] = useState('')
    useEffect(() => setText(storeText),[storeText])

    function handleChange(key,value) {
        onChange({title: {[key]: {$set: value}}})
    }
    function handleTextStyleChange(key,value) {
        handleChange('textStyle',{
            ...textStyle,
            [key]: value
        })
    }
    function handlePositionChange(value) {
        let position = value.split('_')
        onChange({title: {
            top: {$set: position[0]},
            left: {$set: position[1]}
        }})
    }

    return (
        <>
            <Row>
                <Col span={6}>标题文案</Col>
                <Col span={18}>
                    <Input
                        placeholder="请输入标题" size="small"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onBlur={e => handleChange('text',e.target.value)}
                    />
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
                <Col span={6}>位置</Col>
                <Col span={18}>
                    <Select
                        style={{width: 120}} size="small" placeholder="请选择"
                        value={chartPostitions[`${top}_${left}`] ? `${top}_${left}` : undefined}
                        onChange={handlePositionChange}
                    >
                        {
                            Object.keys(chartPostitions).map(p => (
                                <Option value={p}>{chartPostitions[p]}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
        </>
    )
}
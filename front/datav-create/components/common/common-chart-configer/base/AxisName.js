/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input} from 'antd4'
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";

export default function AxisName({name:storeName,nameTextStyle,onNameChange,onChange}){

    let {fontSize,color,fontFamily} = nameTextStyle
    let [name,setName] = useState('')

    useEffect(() => {
        setName(storeName)
    },[storeName])

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>名称</Col>
                <Col span={18}>
                    <Input
                        size="small"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={e => onNameChange(e.target.value)}
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
                        onSizeChange={value => onChange('fontSize',value)}
                        onColorChange={rgba => {
                            onChange('color',rgba)
                        }}
                        onFontChange={value => onChange('fontFamily',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
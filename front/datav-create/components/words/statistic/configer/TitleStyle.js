/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/4.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input} from 'antd4'
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";

export default function TitleStyle({titleStyle,onChange}){

    let {title:storeTitle,size,color,family} = titleStyle

    let [title,setTitle] = useState(storeTitle)
    useEffect(() => setTitle(storeTitle),[storeTitle])

    return (
        <>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>标题内容</Col>
                <Col span={18}>
                    <Input
                        placeholder="请输入标题" size="small"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={e => onChange('title',e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>字体</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        color={color}
                        size={size}
                        family={family}
                        onColorChange={value => onChange('color',value)}
                        onSizeChange={value => onChange('size',value)}
                        onFontChange={value => onChange('family',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
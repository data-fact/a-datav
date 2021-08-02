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
import {Row,Col} from 'antd4'
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Palette from "../../../../../lib/palette/Palette";

export default function ItemStyle({itemStyle,onChange}){

    let {borderRadius,borderColor,borderWidth} = itemStyle

    function handleChange(key,value) {
        onChange({itemStyle: {[key]: {$set: value}}})
    }

    return (
        <>
            <Row>
                <Col span={6}>边框圆角</Col>
                <Col span={10}>
                    <AInputNumber
                        unit="px" options={{min:0,max:1000,size:'small'}}
                        value={borderRadius}
                        onBlur={val => handleChange('borderRadius',val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>边框宽度</Col>
                <Col span={10}>
                    <AInputNumber
                        unit="px" options={{min:0,max:1000,size:'small'}}
                        value={borderWidth}
                        onBlur={val => handleChange('borderWidth',val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>边框颜色</Col>
                <Col span={10}>
                    <Palette color={borderColor} onChange={color => handleChange('borderColor',color)}/>
                </Col>
            </Row>
        </>
    )
}
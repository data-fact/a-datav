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
import update from 'immutability-helper';
import {Row,Col,Switch,Radio} from 'antd4'
import Palette from "../../../../../lib/palette/Palette";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function HeaderConfiger({headerHeight,headerColor, headerAlign,headerFont,headerBorderBottom,onChange}){

    function handleHeaderFontChange(key,value) {
        onChange('headerFont',update(headerFont,{[key]: {$set: value}}))
    }
    function handleHeaderBorderBottomChange(key,value) {
        onChange('headerBorderBottom',update(headerBorderBottom,{[key]: {$set: value}}))
    }

    return (
        <>
            <Row>
                <Col span={6}>高度</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{
                            size: "small",
                            min: 0,
                            max: 1000
                        }}
                        unit="px"
                        value={headerHeight}
                        onBlur={height => onChange('headerHeight',height)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>背景色</Col>
                <Col span={10}>
                    <Palette color={headerColor} onChange={color => onChange('headerColor',color)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>文字</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        size={headerFont.fontSize}
                        color={headerFont.color}
                        family={headerFont.fontFamily}
                        onSizeChange={value => handleHeaderFontChange('fontSize',value)}
                        onColorChange={color => {handleHeaderFontChange('color',color)}}
                        onFontChange={value => handleHeaderFontChange('fontFamily',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
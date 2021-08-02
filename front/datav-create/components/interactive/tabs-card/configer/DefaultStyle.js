/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col} from 'antd4'
import Palette from "../../../../../lib/palette/Palette";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";

const borderKeyMap = {color: 'borderColor', width: 'borderWidth', type: 'borderStyle'}
export default function DefaultStyle({style,onChange}){

    let {minWidth,backgroundColor,color,fontSize,fontFamily,letterSpacing,borderWidth,borderColor,borderStyle} = style

    function handleBorderChange(key,value) {
        onChange(borderKeyMap[key],value)
    }
    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>最小宽度</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{min:0}}
                        unit="px"
                        value={minWidth}
                        onBlur={val => onChange('minWidth',val)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>背景色</Col>
                <Col span={18}>
                    <Palette
                        color={backgroundColor}
                        onChange={color => onChange('backgroundColor',color)}
                        onDelete={() => onChange('backgroundColor','')}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={4}>边框</Col>
                <Col span={20}>
                    <BorderConfiger
                        color={borderColor} width={borderWidth} type={borderStyle}
                        onChange={handleBorderChange}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={4}>字体</Col>
                <Col span={20}>
                    <FontConfiger
                        hideExt
                        color={color} size={fontSize} spacing={letterSpacing} family={fontFamily}
                        onSizeChange={val => onChange('fontSize',val)}
                        onSpacingChange={val => onChange('letterSpacing',val)}
                        onFontChange={val => onChange('fontFamily',val)}
                        onColorChange={val => onChange('color',val)}
                    />
                </Col>
            </Row>
        </>
    )
}
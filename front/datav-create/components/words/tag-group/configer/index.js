/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import React from 'react'
import { Row,Col } from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import update from "immutability-helper";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";

export default function Configer({component}){
    //component为组件状态
    let {i: id,font,bgColor,margin,padding,border,minWidth} = component
    //更新组件数据的hooks
    let updateComponent = useUpdateComponent()
    //固定写法，初始化state，执行结束会将组件_ready状态置为true
    let ready = useInitComponent(component,state)
    //固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
    if(!ready)
        return null

    function onChange(key,value){
        updateComponent(id,{[key]:value})
    }
    function handleFontChange(key,value) {
        onChange('font',update(font,{[key]: {$set: value}}))
    }
    function handleBorderChange(key,value) {
        onChange('border',update(border,{[key]: {$set: value}}))
    }
    return (
        <>
            <Row>
                <Col span={6}>背景色</Col>
                <Col span={16}>
                    <Palette color={bgColor} onChange={color => onChange('bgColor',color)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>外边距</Col>
                <Col span={9}>
                    <AInputNumber
                        unit="px" options={{size:'small',min:0}}
                        value={margin}
                        onBlur={val => onChange('margin',val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>内边距</Col>
                <Col span={9}>
                    <AInputNumber
                        unit="px" options={{size:'small',min:0}}
                        value={padding}
                        onBlur={val => onChange('padding',val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>最小宽度</Col>
                <Col span={9}>
                    <AInputNumber
                        unit="px" options={{size:'small',min:0}}
                        value={minWidth}
                        onBlur={val => onChange('minWidth',val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>边框</Col>
                <Col span={16}>
                    <BorderConfiger
                        width={border.width}
                        type={border.type}
                        color={border.color}
                        onChange={handleBorderChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>字体</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        size={font.size}
                        color={font.color}
                        family={font.family}
                        onSizeChange={value => handleFontChange('size',value)}
                        onColorChange={color => {handleFontChange('color',color)}}
                        onFontChange={value => handleFontChange('family',value)}
                    />
                </Col>
            </Row>
        </>
    )
}
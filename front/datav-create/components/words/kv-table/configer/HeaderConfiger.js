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

export default function HeaderConfiger({headerFixed,headerColor, headerAlign,headerFont,headerBorderBottom,onChange}){

    function handleHeaderFontChange(key,value) {
        onChange('headerFont',update(headerFont,{[key]: {$set: value}}))
    }
    function handleHeaderBorderBottomChange(key,value) {
        onChange('headerBorderBottom',update(headerBorderBottom,{[key]: {$set: value}}))
    }

    return (
        <>
            <Row>
                <Col span={6}>固定</Col>
                <Col span={10}>
                    <Switch size="small" checked={headerFixed} onChange={val => onChange('headerFixed',val)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>背景色</Col>
                <Col span={10}>
                    <Palette color={headerColor} onChange={color => onChange('headerColor',color)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>排列</Col>
                <Col span={10}>
                    <Radio.Group
                        size="small" value={headerAlign}
                        onChange={e => onChange('headerAlign',e.target.value)}
                    >
                        <Radio.Button value="left">左</Radio.Button>
                        <Radio.Button value="center">中</Radio.Button>
                        <Radio.Button value="right">右</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col span={6}>字体</Col>
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
            <Row>
                <Col span={6}>下边框</Col>
                <Col span={18}>
                    <BorderConfiger
                        width={headerBorderBottom.width}
                        type={headerBorderBottom.type}
                        color={headerBorderBottom.color}
                        onChange={handleHeaderBorderBottomChange}
                    />
                </Col>
            </Row>
        </>
    )
}
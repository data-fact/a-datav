/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/8.
 * Description:
 * Modified By:
 */
import React from 'react'
import update from 'immutability-helper';
import {Row,Col,Switch,Radio,Collapse} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import Palette from "../../../../../lib/palette/Palette";
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";
import HeaderConfiger from "./HeaderConfiger";
const { Panel } = Collapse

export default function TableConfiger({table,onChange}){

    let {
        size,borderShow,borderBottom = {},headerShow,headerFixed,headerColor,
        headerAlign,headerFont,headerBorderBottom = {},bodyColors,bodyFont,rowNumberShow
    } = table


    function handleBodyFontChange(key,value) {
        onChange('bodyFont',update(bodyFont,{[key]: {$set: value}}))
    }
    function handleBodyColorsChange(index,value) {
        onChange('bodyColors',update(bodyColors,{[index]: {$set: value}}))
    }
    function handleBorderBottomChange(key,value) {
        onChange('borderBottom',update(borderBottom,{[key]: {$set: value}}))
    }
    function handleHeaderShow(e) {
        e.stopPropagation()
        onChange('headerShow',!headerShow)
    }
    function handleBorderBottomShow(e) {
        e.stopPropagation()
        handleBorderBottomChange('show',!borderBottom.show)
    }

    return (
        <>
            <Row>
                <Col span={4}>尺寸</Col>
                <Col span={10}>
                    <Radio.Group size="small" value={size} onChange={e => onChange('size',e.target.value)}>
                        <Radio.Button value="default">大</Radio.Button>
                        <Radio.Button value="middle">中</Radio.Button>
                        <Radio.Button value="small">小</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            {/*<Row>*/}
            {/*    <Col span={4}>行号</Col>*/}
            {/*    <Col span={10}>*/}
            {/*        <Switch size="small" checked={rowNumberShow} onChange={val => onChange('rowNumberShow',val)}/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Row>
                <Col span={4}>外边框</Col>
                <Col span={10}>
                    <Switch size="small" checked={borderShow} onChange={val => onChange('borderShow',val)}/>
                </Col>
            </Row>
            <div style={{marginBottom: 8}}>
                <Collapse bordered={false} size="small">
                    <Panel
                        key="border" header="下边框"
                        disabled={!borderBottom.show}
                        extra={
                            borderBottom.show ?
                                <EyeOutlined onClick={handleBorderBottomShow}/> :
                                <EyeInvisibleOutlined onClick={handleBorderBottomShow}/>
                        }
                    >
                        <BorderConfiger
                            width={borderBottom.width}
                            type={borderBottom.type}
                            color={borderBottom.color}
                            onChange={handleBorderBottomChange}
                        />
                    </Panel>
                    <Panel
                        key="title" header="表头"
                        disabled={!headerShow}
                        extra={
                            headerShow ?
                                <EyeOutlined onClick={handleHeaderShow}/> :
                                <EyeInvisibleOutlined onClick={handleHeaderShow}/>
                        }
                    >
                        <HeaderConfiger
                            headerFixed={headerFixed} headerColor={headerColor} headerAlign={headerAlign}
                            headerFont={headerFont} headerBorderBottom={headerBorderBottom}
                            onChange={onChange}
                        />
                    </Panel>
                    <Panel key="body" header="内容">
                        <Row>
                            <Col span={6}>背景色</Col>
                            <Col span={9}>
                                <Palette color={bodyColors[0]} onChange={color => handleBodyColorsChange(0,color)}/>
                            </Col>
                            <Col span={9}>
                                <Palette color={bodyColors[1]} onChange={color => handleBodyColorsChange(1,color)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>字体</Col>
                            <Col span={18}>
                                <FontConfiger
                                    hideSpacing hideExt
                                    size={bodyFont.fontSize}
                                    color={bodyFont.color}
                                    family={bodyFont.fontFamily}
                                    onSizeChange={value => handleBodyFontChange('fontSize',value)}
                                    onColorChange={color => {handleBodyFontChange('color',color)}}
                                    onFontChange={value => handleBodyFontChange('fontFamily',value)}
                                />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}
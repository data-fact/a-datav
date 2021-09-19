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
import HeaderConfiger from "./HeaderConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
const { Panel } = Collapse

export default function TableConfiger({table,onChange}){

    let {
        size,waitTime,borderBottom = {},headerShow,headerHeight,headerColor,autoWidth,
        headerAlign,headerFont,headerBorderBottom = {},bodyColors,bodyFont,rowNum,hoverPause,carousel
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
    function handleRowNumChange(v) {
        onChange('rowNum',v)
    }

    return (
        <>
            <Row>
                <Col span={8}>轮播时间间隔</Col>
                <Col span={9}>
                    <AInputNumber
                        options={{
                            size: "small",
                            min: 0,
                            max: 1000
                        }}
                        unit="秒"
                        value={waitTime}
                        onBlur={v => onChange('waitTime',v)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>行数</Col>
                <Col span={9}>
                    <AInputNumber
                        options={{
                            size: "small",
                            min: 0,
                            max: 1000
                        }}
                        unit="行"
                        value={rowNum}
                        onBlur={handleRowNumChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>悬浮暂停轮播</Col>
                <Col span={9}>
                    <Switch
                        size="small"
                        checked={hoverPause}
                        onChange={v => onChange('hoverPause',v)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>轮播方式</Col>
                <Col span={16}>
                    <Radio.Group
                        size="small" value={carousel}
                        onChange={e => onChange('carousel',e.target.value)}
                    >
                        <Radio.Button value="single">单条滚动</Radio.Button>
                        <Radio.Button value="page">整页滚动</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <div style={{marginBottom: 8}}>
                <Collapse bordered={false} size="small">
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
                            headerHeight={headerHeight} headerColor={headerColor} headerAlign={headerAlign}
                            headerFont={headerFont} headerBorderBottom={headerBorderBottom}
                            onChange={onChange}
                        />
                    </Panel>
                    <Panel key="body" header="内容">
                        <Row>
                            <Col span={8}>自适应列宽</Col>
                            <Col span={9}>
                                <Switch
                                    size="small"
                                    checked={autoWidth}
                                    onChange={v => onChange('autoWidth',v)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>背景色</Col>
                            <Col span={9}>
                                <Palette
                                    color={bodyColors[0]}
                                    onChange={color => handleBodyColorsChange(0,color)}
                                    onDelete={() => handleBodyColorsChange(0,'')}
                                />
                            </Col>
                            <Col span={9}>
                                <Palette
                                    color={bodyColors[1]}
                                    onChange={color => handleBodyColorsChange(1,color)}
                                    onDelete={() => handleBodyColorsChange(1,'')}
                                />
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
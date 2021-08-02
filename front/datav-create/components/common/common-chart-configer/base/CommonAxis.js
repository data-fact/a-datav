/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Collapse,Row,Col} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import AxisLable from "./AxisLable";
import Palette from "../../../../../lib/palette/Palette";
import AxisName from "./AxisName";

const {Panel} = Collapse

export default function CommonAxis({name,nameTextStyle,axisLabel,axisLine,axisTick,splitLine,onChange}){

    function handleLabelChange(key,value) {
        onChange('axisLabel',{...axisLabel,[key]: value})
    }
    function handleLabelShow(e) {
        e.stopPropagation()
        handleLabelChange('show',!axisLabel.show)
    }
    function handleLineChange(key,value) {
        onChange('axisLine',{...axisLine,[key]: value})
    }
    function handleLineShow(e) {
        e.stopPropagation()
        handleLineChange('show',!axisLine.show)
    }
    function handleTickChange(key,value) {
        onChange('axisTick',{...axisTick,[key]: value})
    }
    function handleNameChange(value) {
        onChange('name',value)
    }
    function handleNameStyleChange(key,value) {
        onChange('nameTextStyle',{...nameTextStyle,[key]: value})
    }
    function handleTickShow(e) {
        e.stopPropagation()
        handleTickChange('show',!axisTick.show)
    }
    function handleSplitLineChange(key,value) {
        onChange('splitLine',{...splitLine,[key]: value})
    }
    function handleSplitLineShow(e) {
        e.stopPropagation()
        handleSplitLineChange('show',!splitLine.show)
    }
    function handleLineColorChange(color) {
        handleLineChange('lineStyle',{...axisLine.lineStyle,color})
    }
    function handleTickColorChange(color) {
        handleTickChange('lineStyle',{...axisTick.lineStyle,color})
    }
    function handleSplitLineColorChange(color) {
        handleSplitLineChange('lineStyle',{...splitLine.lineStyle,color})
    }

    return (
        <Collapse bordered={false} size="small">
            {
                (name && nameTextStyle) &&
                <Panel
                    header="轴名称" key="1"
                >
                    <AxisName
                        name={name} nameTextStyle={nameTextStyle}
                        onNameChange={handleNameChange}
                        onChange={handleNameStyleChange}
                    />
                </Panel>
            }
            <Panel
                header="轴标签" key="2"
                disabled={!axisLabel.show}
                extra={
                    axisLabel.show ?
                        <EyeOutlined onClick={handleLabelShow}/> :
                        <EyeInvisibleOutlined onClick={handleLabelShow}/>
                }
            >
                <AxisLable label={axisLabel} onChange={handleLabelChange}/>
            </Panel>
            <Panel
                header="轴线" key="3"
                disabled={!axisLine.show}
                extra={
                    axisLine.show ?
                        <EyeOutlined onClick={handleLineShow}/> :
                        <EyeInvisibleOutlined onClick={handleLineShow}/>
                }
            >
                <Row>
                    <Col span={6}>颜色</Col>
                    <Col span={18}>
                        <Palette
                            color={axisLine.lineStyle.color}
                            onChange={handleLineColorChange}
                        ></Palette>
                    </Col>
                </Row>
            </Panel>
            <Panel
                header="轴刻度" key="4"
                disabled={!axisTick.show}
                extra={
                    axisTick.show ?
                        <EyeOutlined onClick={handleTickShow}/> :
                        <EyeInvisibleOutlined onClick={handleTickShow}/>
                }
            >
                <Row>
                    <Col span={6}>颜色</Col>
                    <Col span={18}>
                        <Palette
                            color={axisTick.lineStyle.color}
                            onChange={handleTickColorChange}
                        ></Palette>
                    </Col>
                </Row>
            </Panel>
            <Panel
                header="网格线" key="5"
                disabled={!splitLine.show}
                extra={
                    splitLine.show ?
                        <EyeOutlined onClick={handleSplitLineShow}/> :
                        <EyeInvisibleOutlined onClick={handleSplitLineShow}/>
                }
            >
                <Row>
                    <Col span={6}>颜色</Col>
                    <Col span={18}>
                        <Palette
                            color={splitLine.lineStyle.color}
                            onChange={handleSplitLineColorChange}
                        ></Palette>
                    </Col>
                </Row>
            </Panel>
        </Collapse>
    )
}
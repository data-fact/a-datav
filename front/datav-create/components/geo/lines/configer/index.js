/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Collapse,Row,Col,Select} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import LineStyle from "./LineStyle";
import EffectStyle from "./EffectStyle";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import {symbolTypes} from "../../../../common/common";
const { Panel } = Collapse
const {Option} = Select

export default function Configer({component}){

    let {i:id,option} = component

    //初始化state
    let ready = useInitComponent(component,state)

    let updateComponent = useUpdateComponent()

    if(!ready)
        return null

    let {symbol,symbolSize,lineStyle,effect} = option

    function handleChange(key,value) {
        updateComponent(id,{option: update(option,{[key]: {$set: value}})})
    }
    function handleLineStyleChange(key,value) {
        updateComponent(id,{option: update(option,{lineStyle: {[key]: {$set: value}}})})
    }
    function handleEffectChange(key,value) {
        let newOption = update(option,{effect: {[key]: {$set: value}}})
        //克服echarts的bug
        if(key == 'symbol'){
            newOption.effect.show = false
            setTimeout(() => {
                updateComponent(id,{option: update(newOption,{effect: {show: {$set: true}}})})
            },100)
        }
        updateComponent(id,{option: newOption})
    }

    return (
        <>
            <Row>
                <Col span={8}>端点图标类型</Col>
                <Col span={10}>
                    <Select
                        style={{width: 80}}
                        value={symbol}
                        onChange={value => {handleChange('symbol',value)}}
                    >
                        {
                            symbolTypes.map(t => <Option value={t}>{t}</Option>)
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={8}>端点图标大小</Col>
                <Col span={10}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}} unit="px"
                        value={symbolSize}
                        onBlur={value => handleChange('symbolSize',value)}
                    />
                </Col>
            </Row>
            <Collapse bordered={false} size="small" defaultActiveKey={['1']}>
                <Panel header="线样式" key="1">
                    <LineStyle lineStyle={lineStyle} onChange={handleLineStyleChange}/>
                </Panel>
                <Panel
                    header="特效" key="2"
                    disabled={!effect.show}
                    extra={
                        effect.show ?
                            <EyeOutlined onClick={() => handleEffectChange('show',!effect.show)}/> :
                            <EyeInvisibleOutlined onClick={() => handleEffectChange('show',!effect.show)}/>
                    }
                >
                    <EffectStyle effect={effect} onChange={handleEffectChange}/>
                </Panel>
            </Collapse>
        </>
    )
}
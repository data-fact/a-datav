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
import {Row,Col,Switch} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import Label from "./Label";
import Legend from "./Legend";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Padding from "../../../common/common-chart-configer/base/Padding";
import Series from "./Series";

export default function Configer({component}){

    let {i: id,_ready,option,grid,label,legend,xAxis,yAxis} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!_ready)
        return null

    function handleLabelChange(key,value) {
        updateComponent(id,{label: update(label,{[key]: {$set: value}})})
    }
    function handleLegendChange(key,value) {
        updateComponent(id,{legend: update(legend,{[key]: {$set: value}})})
    }
    function handleGridChange(key,value) {
        updateComponent(id,{grid: update(grid,{[key]: {$set: value}})})
    }
    function handleXAxisChange(key,value) {
        updateComponent(id,{xAxis: update(xAxis,{[key]: {$set: value}})})
    }
    function handleYAxisChange(key,value) {
        updateComponent(id,{yAxis: update(yAxis,{[key]: {$set: value}})})
    }

    return (
        <>
            <div style={{paddingBottom: 8}}>
                <Padding showAuto grid={{...grid}} onChange={handleGridChange}/>
            </div>
            <Row style={{paddingBottom: 8}}>
                <Col span={4}>图例</Col>
                <Col span={20}>
                    <Legend {...legend} onChange={handleLegendChange}/>
                </Col>
            </Row>
            <Row style={{paddingBottom: 8}}>
                <Col span={4}>标签</Col>
                <Col span={20}>
                    <Label {...label} onChange={handleLabelChange}/>
                </Col>
            </Row>
            <Row style={{paddingBottom: 8}}>
                <Col span={4}>x轴</Col>
                <Col span={20}>
                    <Row>
                        <Col span={6}>显示</Col>
                        <Col span={18}>
                            <Switch
                                size="small" checked={xAxis.show}
                                onChange={show => handleXAxisChange('show',show)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{paddingBottom: 8}}>
                <Col span={4}>y轴</Col>
                <Col span={20}>
                    <Row>
                        <Col span={6}>显示</Col>
                        <Col span={18}>
                            <Switch
                                size="small" checked={yAxis.show}
                                onChange={show => handleYAxisChange('show',show)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
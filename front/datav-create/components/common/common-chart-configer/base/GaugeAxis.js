/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Switch,Input,Tooltip,InputNumber} from 'antd4'
import CommonAxis from "./CommonAxis";

export default function GaugeAxis({gauge,onChange}){

    let {radius:storeRadius,show,axisLabel,axisLine,axisTick,splitLine,min:storeMin,max:storeMax} = gauge
    let [min,setMin] = useState(undefined)
    let [max,setMax] = useState(undefined)
    let [radius,setRadius] = useState('')

    useEffect(() => setMin(storeMin),[storeMin])
    useEffect(() => setMax(storeMax),[storeMax])
    useEffect(() => setRadius(storeRadius),[storeRadius])

    return (
        <>
            <div style={{marginBottom: 4}}>
                <Row>
                    <Col span={6}>可见</Col>
                    <Col span={6}>
                        <Switch
                            size="small"
                            checked={show}
                            onChange={value => onChange('show',value)}
                        />
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 4}}>
                <Row>
                    <Col span={6}>半径</Col>
                    <Col span={10}>
                        <Tooltip placement="bottom" title="可输入数值或百分比(%)">
                            <Input
                                size="small" placeholder="请输入"
                                value={radius}
                                onChange={e => setRadius(e.target.value)}
                                onBlur={e => onChange('radius',e.target.value)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 4}}>
                <Row>
                    <Col span={6}>数据范围</Col>
                    <Col span={8}>
                        <Tooltip placement="bottom" title="最小值">
                            <InputNumber
                                size="small"
                                value={min}
                                onChange={setMin}
                                onBlur={e => onChange('min',e.target.value || undefined)}
                            />
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Tooltip placement="bottom" title="最大值">
                            <InputNumber
                                size="small"
                                value={max}
                                onChange={setMax}
                                onBlur={e => onChange('max',e.target.value || undefined)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 4}}>
                <CommonAxis
                    axisLabel={axisLabel} axisLine={axisLine}
                    axisTick={axisTick} splitLine={splitLine}
                    onChange={onChange}
                />
            </div>
        </>
    )
}
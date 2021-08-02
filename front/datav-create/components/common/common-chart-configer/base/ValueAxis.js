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
import {Row,Col,Switch,Radio,Tooltip} from 'antd4'
import CommonAxis from "./CommonAxis";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function ValueAxis({axis,onChange}){

    let {name,nameTextStyle,show,axisLabel,axisLine,axisTick,splitLine,min,max,offset} = axis

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>可见</Col>
                <Col span={6}>
                    <Switch
                        size="small"
                        checked={show}
                        onChange={value => onChange('show',value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>数据类型</Col>
                <Col span={18}>
                    <Radio.Group size="small" value="value">
                        <Radio.Button value="value">数值型</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>数据范围</Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="最小值">
                        <AInputNumber
                            value={min}
                            onBlur={val => onChange('min',val)}
                        />
                    </Tooltip>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="最大值">
                        <AInputNumber
                            value={max}
                            onBlur={val => onChange('max',val)}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>位置偏移</Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="偏移像素">
                        <AInputNumber
                            unit="px"
                            value={offset}
                            onBlur={val => onChange('offset',val)}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <div style={{marginBottom: 4}}>
                <CommonAxis
                    name={name} nameTextStyle={nameTextStyle}
                    axisLabel={axisLabel} axisLine={axisLine}
                    axisTick={axisTick} splitLine={splitLine}
                    onChange={onChange}
                />
            </div>
        </>
    )
}
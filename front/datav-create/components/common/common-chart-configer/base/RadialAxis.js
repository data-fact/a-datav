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
import {Row,Col,Input,Tooltip} from 'antd4'
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function RadialAxis({radius:storeRadius,onChange}){

    let [radius,setRadius] = useState([])
    useEffect(() => setRadius(storeRadius || []),[storeRadius])

    function handleChange(i,value) {
        radius = [...radius]
        radius[i] = value
        setRadius(radius)
    }

    return (
        <>
            <Row>
                <Col span={6}>内半径</Col>
                <Col span={10}>
                    <Tooltip placement="bottom" title="可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="请输入"
                            value={radius[0]}
                            onChange={e => handleChange(0,e.target.value)}
                            onBlur={e => onChange(radius)}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col span={6}>半径</Col>
                <Col span={10}>
                    <Tooltip placement="bottom" title="可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="请输入"
                            value={radius[1]}
                            onChange={e => handleChange(1,e.target.value)}
                            onBlur={e => onChange(radius)}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </>
    )
}
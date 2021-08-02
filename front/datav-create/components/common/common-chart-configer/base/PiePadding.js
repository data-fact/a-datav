/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input,Tooltip} from 'antd4'

export default function PiePadding({position:storePosition,onChange}){

    let [position,setPosition] = useState([])
    useEffect(() => setPosition(storePosition || []),[storePosition])

    return (
        <>
            <Row>
                <Col span={4}>
                    <span>位置</span>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="圆心横坐标，可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="横坐标"
                            value={position[0]}
                            onChange={e => setPosition([e.target.value,position[1]])}
                            onBlur={e => onChange(position)}
                        />
                    </Tooltip>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="圆心纵坐标，可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="纵坐标"
                            value={position[1]}
                            onChange={e => setPosition([position[0],e.target.value])}
                            onBlur={e => onChange(position)}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </>
    )
}
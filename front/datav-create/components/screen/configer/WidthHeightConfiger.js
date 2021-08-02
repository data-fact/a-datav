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
import {Row,Col,InputNumber,Tooltip} from 'antd4'

export default function WidthHeightConfiger({width: storeWidth,height: storeHeight,onWidthBlur,onHeightBlur}){

    let [width,setWidth] = useState(0)
    let [height,setHeight] = useState(0)

    useEffect(() => {
        setWidth(storeWidth)
        setHeight(storeHeight)
    },[storeWidth,storeHeight])

    return (
        <Row>
            <Col span={6}>屏幕大小</Col>
            <Col span={9}>
                <Tooltip placement="bottom" title="宽度(px)">
                    <InputNumber
                        size="small" min={100} max={20000}
                        value={width}
                        onChange={value => setWidth(value)}
                        onBlur={() => onWidthBlur(width)}
                    />
                </Tooltip>
            </Col>
            <Col span={9}>
                <Tooltip placement="bottom" title="高度(px)">
                    <InputNumber
                        size="small" min={100} max={20000}
                        value={height}
                        onChange={value => setHeight(value)}
                        onBlur={() => onHeightBlur(height)}
                    />
                </Tooltip>
            </Col>
        </Row>
    )
}
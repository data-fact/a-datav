/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/8.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import {Row,Col,Button} from 'antd4'
import { SlidersOutlined } from '@ant-design/icons';
import AInputNumber from "../../../../lib/input-number/AInputNumber";
import Palette from "../../../../lib/palette/Palette";

export default function Operation({onMoveOrSize,onZIndex,onMarkColor}){

    let [movePx,setMovePx] = useState(10)
    let [heightPx,setHeightPx] = useState(10)
    let [widthPx,setWidthPx] = useState(10)
    let [zIndex,setZIndex] = useState(1)
    let [markColor,setMarkColor] = useState('')


    function handleMarkColorChange(color) {
        setMarkColor(color)
        onMarkColor(color)
    }
    return (
        <>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={4}>
                        标记
                    </Col>
                    <Col span={20}>
                        <Palette
                            color={markColor}
                            onChange={handleMarkColorChange}
                            onDelete={() => handleMarkColorChange('')}
                        />
                    </Col>
                </Row>
            </div>
            <Row style={{paddingBottom: 8}}>
                <Col span={4} style={{alignSelf: 'center'}}>移动</Col>
                <Col span={20}>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('y','-',movePx)}
                    >向上</Button>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('y','+',movePx)}
                    >向下</Button>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('x','-',movePx)}
                    >向左</Button>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('x','+',movePx)}
                    >向右</Button>
                    <AInputNumber
                        options={{size: 'small',min: 0,max: 1000,style: {width: 60}}}
                        unit="px" value={movePx}
                        onBlur={setMovePx}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 8}}>
                <Col span={4} style={{alignSelf: 'center'}}>高度</Col>
                <Col span={20}>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('h','+',heightPx)}
                    >增加</Button>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('h','-',heightPx)}
                    >减少</Button>
                    <AInputNumber
                        options={{size: 'small',min: 0,max: 1000,style: {width: 60}}}
                        unit="px" value={heightPx}
                        onBlur={setHeightPx}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 8}}>
                <Col span={4} style={{alignSelf: 'center'}}>宽度</Col>
                <Col span={20}>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('w','+',widthPx)}
                    >增加</Button>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onMoveOrSize('w','-',widthPx)}
                    >减少</Button>
                    <AInputNumber
                        options={{size: 'small',min: 0,max: 1000,style: {width: 60}}}
                        unit="px" value={widthPx}
                        onBlur={setWidthPx}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 8}}>
                <Col span={4} style={{alignSelf: 'center'}}>层级</Col>
                <Col span={20}>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onZIndex('+',zIndex)}
                    >上移</Button>
                    <Button
                        type="primary" size="small"
                        style={{marginRight: 2}}
                        onClick={() => onZIndex('-',zIndex)}
                    >下移</Button>
                    <AInputNumber
                        options={{size: 'small',min: 0,max: 1000,style: {width: 60}}}
                        unit="层" value={zIndex}
                        onBlur={setZIndex}
                    />
                </Col>
            </Row>
        </>
    )
}
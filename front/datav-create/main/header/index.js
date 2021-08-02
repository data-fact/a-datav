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
import {Row,Col,Typography} from 'antd4'
import HiddenControl from "./HiddenControl";
import useSupportReducer from "../../reducers/useSupportReducer";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import SysControl from "./SysControl";

const { Title } = Typography

export default function Header() {

    let [support,supportDispatch] = useSupportReducer()
    let [canvas] = useCanvasReducer()
    let {layer,componentList,chartEditor,toolbar} = support.layout
    let {name,screen} = canvas

    function handleHiddenControlChange(subType){
        supportDispatch({type: 'CHANGE_LAYOUT', subType})
    }

    return (
        <Row>
            <Col span={1}></Col>
            <Col span={4}>
                <HiddenControl
                    layer={layer}
                    componentList={componentList}
                    chartEditor={chartEditor}
                    toolbar={toolbar}
                    onChange={handleHiddenControlChange}
                />
            </Col>
            <Col span={3}></Col>
            <Col span={8} style={{textAlign: 'center'}}>
                <span>
                    {`${screen.width}x${screen.height} - `}
                </span>
                <Title level={4} style={{textAlign: 'center',display: 'inline'}}>{name}</Title>
            </Col>
            <Col span={4}></Col>
            <Col span={4}>
                <SysControl/>
            </Col>
        </Row>
    )
}
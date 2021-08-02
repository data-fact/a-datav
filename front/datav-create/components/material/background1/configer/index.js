/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import React,{useEffect,useState} from 'react'
import update from 'immutability-helper';
import { Row,Col } from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";

export default function Configer({component}){

    let {i: id,backgroundColor} = component

    //更新组件数据接口
    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleColorChange(color) {
        updateComponent(id,{backgroundColor: color})
    }

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>背景颜色</Col>
                <Col span={18}>
                    <Palette color={backgroundColor} onChange={handleColorChange}/>
                </Col>
            </Row>
        </>
    )
}
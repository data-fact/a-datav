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
import {Row,Col} from 'antd4'
import { DeleteOutlined } from '@ant-design/icons';
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";

export default function Configer({component}){

    let {i: id,_ready,option} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!_ready)
        return null

    function handleColorChange(color) {
        updateComponent(id,{option: update(option,{color: {$set: color}})})
    }

    return (
        <>
            <Row>
                <Col span={6}>颜色</Col>
                <Col span={14}>
                    <Palette color={option.color} onChange={handleColorChange}/>
                </Col>
                <Col span={4}>
                    <DeleteOutlined onClick={() => handleColorChange('')}/>
                </Col>
            </Row>
        </>
    )
}
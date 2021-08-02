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
import {Row,Col,Switch,Button} from 'antd4'
import { PlusOutlined } from '@ant-design/icons';
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import Palette from "../../../../../lib/palette/Palette";

export default function Configer({component}){

    let {i:id,option} = component

    //初始化state
    let ready = useInitComponent(component,state)

    let updateComponent = useUpdateComponent()

    if(!ready)
        return null

    function handleShow(checked) {
        updateComponent(id,{option: update(option,{show: {$set: checked}})})
    }
    function handleAddColor() {
        let colors = [...option.colors,'rgba(138,170,251,1)']
        updateComponent(id,{option: update(option,{colors: {$set: colors}})})
    }
    function handleUpdateGradientColor(i,color) {
        updateComponent(id,{option: update(option,{colors: {[i]: {$set: color}}})})
    }
    function handleDeleteGradientColor(i) {
        let colors = [...option.colors]
        colors.splice(i,1)
        updateComponent(id,{option: update(option,{colors: {$set: colors}})})
    }

    return (
        <>
            <Row style={{paddingBottom: 8}}>
                <Col span={8}>显示范围选择</Col>
                <Col span={10}><Switch size="small" checked={option.show} onChange={handleShow} /></Col>
            </Row>
            <Row>
                <Col span={6}>渐变色</Col>
            </Row>
            <Row>
                <Col span={2}></Col>
                <Col span={22} style={{display: 'flex',flexWrap: 'wrap'}}>
                    {
                        option.colors.map((color,i) => (
                            <Palette
                                color={color}
                                onChange={color => handleUpdateGradientColor(i,color)}
                                onDelete={() => handleDeleteGradientColor(i)}
                            />
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col span={2}></Col>
                <Col span={22}>
                    <Button
                        style={{width: '100%',margin: '10px 0 10px 0'}}
                        size="small" type="dashed" icon={<PlusOutlined/>}
                        onClick={handleAddColor}
                    >添加颜色</Button>
                </Col>
            </Row>
        </>
    )
}
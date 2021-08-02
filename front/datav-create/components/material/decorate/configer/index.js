/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React,{useEffect} from 'react'
import {Button,Row,Col,Select} from 'antd4'
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import state from "../state";
import Palette from "../../../../../lib/palette/Palette";
import decorateTypes from "./decorate_types";
import useInitComponent from "../../../../hooks/useInitComponent";
import GradientColor from "../../../common/common-chart-configer/base/GradientColor";

const {Option} = Select

export default function Configer({component}){

    let {i: id,decorateType,colors} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleTypeChange(type) {
        updateComponent(id,{decorateType:type})
    }
    function handleColorsChange(colors) {
        updateComponent(id,{colors})
    }

    return (
        <>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>装饰类型</Col>
                    <Col span={18}>
                        <Select style={{width: 160}} value={decorateType} onChange={handleTypeChange}>
                            {
                                decorateTypes.map((item,i) => (
                                    <Option value={''+i}>{`装饰类型${'' + (i+1)}`}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>装饰颜色</Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <GradientColor colors={colors} onChange={handleColorsChange}/>
                    </Col>
                </Row>
            </div>
        </>
    )
}
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
import {Row,Col} from 'antd4'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import state from "../state";
import Palette from "../../../../../lib/palette/Palette";
import useInitComponent from "../../../../hooks/useInitComponent";
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";

const borderKeyMap = {
    "width": "borderWidth",
    "type": "borderType",
    "radius":"borderRadius",
    "colors": "borderColors",
}
export default function Configer({component}){

    let {i: id,backgroundColor,borderType, borderColors, borderWidth,borderRadius,} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleChange(key, value) {
        key = borderKeyMap[key]
        updateComponent(id, {[key]: value})
    }
    function handleBgColorChange(backgroundColor) {
        updateComponent(id,{backgroundColor})
    }

    return (
        <>
            <BorderConfiger
                showRadius gradient
                type={borderType} color={borderColors} width={borderWidth} radius={borderRadius}
                onChange={handleChange}
            />
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>背景颜色</Col>
                    <Col span={18}>
                        <Palette
                            title="背景颜色" color={backgroundColor}
                            onChange={handleBgColorChange}
                            onDelete={() => handleBgColorChange('rgba(0,0,0,0)')}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}
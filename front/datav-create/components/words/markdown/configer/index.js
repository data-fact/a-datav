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
import VscodeEditor from "../../../../../lib/vscode-editor/VscodeEditor";
import Palette from "../../../../../lib/palette/Palette";

export default function Configer({component}){

    let {i: id,value,color} = component

    //更新组件数据接口
    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleBlur(value) {
        updateComponent(id,{value})
    }
    function handleColorChange(color) {
        updateComponent(id,{color})
    }

    return (
        <>
            <Row style={{paddingBottom: 8}}>
                <Col span={8}>字体基础色</Col>
                <Col span={16}>
                    <Palette color={color} onChange={handleColorChange}/>
                </Col>
            </Row>
            <VscodeEditor
                id={id}
                height={500}
                options={{language: 'markdown',minimap: {enabled: false}}}
                value={value}
                onBlur={handleBlur}
            />
        </>
    )
}
/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import React from 'react'
import { Row,Col } from 'antd4'
import state from "./state";
import useUpdateComponent from "../../../hooks/useUpdateComponent";
import useInitComponent from "../../../hooks/useInitComponent";
import Palette from "../../../../lib/palette/Palette";

export default function Configer({component}){
    //component为组件状态
    let {i: id,backgroundColor} = component
    //更新组件数据的hooks
    let updateComponent = useUpdateComponent()
    //固定写法，初始化state，执行结束会将组件_ready状态置为true
    let ready = useInitComponent(component,state)
    //固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
    if(!ready)
        return null
    //处理背景色改变事件，调用updateComponent函数提交指定组件的变化
    function handleColorChange(color) {
        //参数1是组件id，组件初始化后，会自动生成唯一id保存到组件状态中
        //参数2是组件状态的改变部分，这些改变会触发渲染器的重新渲染
        updateComponent(id,{backgroundColor: color})
    }
    //页面显示一个调色盘，允许用户修改背景色
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
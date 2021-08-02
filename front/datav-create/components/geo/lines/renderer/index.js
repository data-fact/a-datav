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
import {genOption} from "./util";
import CommonRenderer from "../../../../main/canvas/CommonRenderer";

export default function Renderer({component,onRender}){

    let {i:id,_data,_ready,option} = component

    useEffect(() => {
        //echarts 地图lines 重渲染bug，应该onRender(1,null)
        return () => onRender(1,null)
    },[])
    useEffect(() => {
        if(_data && option)
            onRender(1,genOption(_data,option))
    },[_data,option])

    return (
        <CommonRenderer component={component} />
    )
}
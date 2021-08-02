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
import useCanvasReducer from "../../../../reducers/useCanvasReducer";

export default function Renderer({component,onRender}){

    let {i:id,_data,_ready,option,subIndex} = component
    let [canvas] = useCanvasReducer()

    useEffect(() => {
        return () => onRender(subIndex,null)
    },[])
    useEffect(() => {
        if(_data && option)
            onRender(subIndex,genOption(_data,option,canvas.colors,subIndex))
    },[_data,option,canvas.colors])

    return (
        <CommonRenderer component={component} />
    )
}
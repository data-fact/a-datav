/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/27.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import 'nprogress/nprogress.css'
import { useSize } from 'ahooks';
import useInit, {useRegisterChartTheme} from "../../datav-create/hooks/useInit";
import Canvas from "../../datav-create/main/canvas";
import useCanvasReducer from "../../datav-create/reducers/useCanvasReducer";
import {getScaleStyle, getViewStyle} from "../../utils/util";

export default function Main() {

    useInit()
    //监听窗体大小改变
    const size = useSize(document.getElementById('app'));
    let [style,setStyle] = useState({})
    let [viewStyle,setViewStyle] = useState({})
    //注册echarts主题
    // useRegisterChartTheme()

    let [canvas] = useCanvasReducer()
    let {width,height,scaleType} = canvas.screen

    useEffect(() => {
        setStyle(getScaleStyle(width,height,scaleType))
        setViewStyle(getViewStyle(width,height,scaleType))
    },[width,height,size,scaleType])
    return (
        <div style={viewStyle}>
            <div id="main" style={style}>
                <Canvas view={true}/>
            </div>
        </div>
    )
}
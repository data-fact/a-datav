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
import { Bullet } from '@ant-design/charts';
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {genOption} from "./util";
import CommonAntvRenderer from "../../../common/CommonAntvRenderer";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";
import seriesColors from "../../../../common/style/series_colors";

export default function Renderer({component}){

    let {i:id,_ready,_data,option:storeOption,grid,legend,label,axis,shape} = component
    let [canvas] = useCanvasReducer()
    let color = seriesColors[canvas.colors].value
    let [option,setOption] = useState(null)
    let [clickValue,setClickValue] = useState(null)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickValue)
            handleEvent(id,'click',clickValue)
    },[clickValue])

    useEffect(() => {
        setOption(genOption(_data,storeOption,grid,color,legend,label,axis,shape))
    },[_data,storeOption,grid,canvas.colors,legend,label,axis,shape])

    if(!_ready || !option || !_data || !_data.length)
        return null

    function handleInit(chart) {
        chart.on('element:click', (e) => {
            let {measures,target,title} = e.data.data
            setClickValue({title,measures,target})
        });
    }

    return (
        <CommonAntvRenderer id={id} option={option} clazz={Bullet} getInstance={handleInit}/>
    )
}
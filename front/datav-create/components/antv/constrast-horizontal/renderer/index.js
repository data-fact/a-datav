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
import { BidirectionalBar } from '@ant-design/charts';
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {genOption} from "./util";
import CommonAntvRenderer from "../../../common/CommonAntvRenderer";

export default function Renderer({component}){

    let {i:id,_ready,_data,option:storeOption,grid,legend,label,xAxis,yAxis,color} = component
    let [option,setOption] = useState(null)
    let [clickValue,setClickValue] = useState(null)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickValue)
            handleEvent(id,'click',clickValue)
    },[clickValue])

    useEffect(() => {
        setOption(genOption(_data,storeOption,grid,legend,label,xAxis,yAxis,color))
    },[_data,storeOption,grid,legend,label,xAxis,yAxis,color])

    if(!_ready || !option || !_data || !_data.length)
        return null

    function handleInit(chart) {
        chart.on('element:click', (e) => {
            let {x,type:s} = e.data.data
            let y = e.data.data[s]
            setClickValue({x,y,s})
        });
    }

    return (
        <CommonAntvRenderer id={id} option={option} clazz={BidirectionalBar} getInstance={handleInit}/>
    )
}
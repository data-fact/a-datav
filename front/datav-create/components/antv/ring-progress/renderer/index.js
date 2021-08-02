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
import { RingProgress } from '@ant-design/charts';
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {genOption} from "./util";
import CommonAntvRenderer from "../../../common/CommonAntvRenderer";

export default function Renderer({component}){

    let {i:id,_ready,_data,option:storeOption,title,content} = component
    let [option,setOption] = useState(null)
    let [clickValue,setClickValue] = useState(null)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickValue != null)
            handleEvent(id,'click',null,clickValue)
    },[clickValue])

    useEffect(() => {
        setOption(genOption(_data,storeOption,title,content))
    },[_data,storeOption,title,content])

    if(!_ready || !option || !_data || !_data.length)
        return null

    function handleInit(chart) {
        chart.on('element:click', (e) => {
            setClickValue(0)
        });
    }

    return (
        <CommonAntvRenderer id={id} option={option} clazz={RingProgress} getInstance={handleInit}/>
    )
}
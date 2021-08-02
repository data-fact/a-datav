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
import useHandleEvent from "../../../../hooks/useHandleEvent";
import CommonEchartsRenderer from "../../../common/CommonEchartsRenderer";
import {genOption} from "./util";

export default function Renderer({component}){

    let {i:id,_ready,_data,option:storeOption,symbolSize,scale } = component
    let [option,setOption] = useState(storeOption)
    let [clickValue,setClickValue] = useState(undefined)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickValue != undefined)
            handleEvent(id,'click',null,clickValue)
    },[clickValue])

    useEffect(() => {
        if(storeOption._ready)
            setOption(genOption(_data,storeOption,symbolSize,scale))
    },[_data,storeOption,symbolSize,scale])
    if(!_ready)
        return null

    function handleInit(echart) {
        echart.off()
        echart.on('click',e => {
            let _index = e.data[4]
            setClickValue(_index)
        })
    }

    return (
        <CommonEchartsRenderer id={id} option={option} getInstance={handleInit}/>
    )
}
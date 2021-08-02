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

    let {i:id,_ready,_data,option:storeOption } = component
    let [option,setOption] = useState(storeOption)
    let [clickValue,setClickValue] = useState(null)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickValue)
            handleEvent(id,'click',clickValue)
    },[clickValue])

    useEffect(() => {
        if(storeOption._ready)
            setOption(genOption(_data,storeOption))
    },[_data,storeOption])
    if(!_ready)
        return null

    function handleInit(echart) {
        echart.off()
        echart.on('click',e => {
            let {value:values,name} = e
            setClickValue({name,values})
        })
    }

    return (
        <CommonEchartsRenderer id={id} option={option} getInstance={handleInit}/>
    )
}
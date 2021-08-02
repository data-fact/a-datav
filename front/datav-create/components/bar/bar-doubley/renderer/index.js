import React,{useState,useEffect} from 'react'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import CommonEchartsRenderer from "../../../common/CommonEchartsRenderer";
import {genOption} from "./util";

export default function Renderer({component}){

    let {i:id,_ready,_data,option:storeOption } = component
    let [option,setOption] = useState(storeOption)
    let [clickIndex,setClickIndex] = useState(undefined)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickIndex != undefined)
            handleEvent(id,'click',null,clickIndex)
    },[clickIndex])

    useEffect(() => {
        if(storeOption._ready)
            setOption(genOption(_data,storeOption))
    },[_data,storeOption])
    if(!_ready)
        return null

    function handleInit(echart) {
        echart.off()
        echart.on('click',e => {
            let {_index} = e.data
            setClickIndex(_index)
        })
    }

    return (
        <CommonEchartsRenderer id={id} option={option} getInstance={handleInit}/>
    )
}
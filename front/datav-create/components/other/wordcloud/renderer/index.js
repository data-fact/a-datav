import React, { useEffect, useState } from 'react';
import useGetColors from '../../../../hooks/useGetColors';
import CommonEchartsRenderer from "../../../common/CommonEchartsRenderer";
import { genOption } from "./util";
import useHandleEvent from "../../../../hooks/useHandleEvent";
export default function Renderer({ component }) {
    let { i: id, _data, _ready, option: storeOption } = component
    let [option, setOption] = useState(storeOption)
    let [clickIndex,setClickIndex] = useState(undefined)
    let getColors = useGetColors()
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickIndex != undefined)
            handleEvent(id,'click',null,clickIndex)
    },[clickIndex])

    useEffect(() => {
        setOption(genOption(_data, storeOption, getColors))
    }, [_data, storeOption, getColors])

    if (!_ready)
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
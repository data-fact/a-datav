import React, { useEffect, useState } from 'react';
import useGetColors from '../../../../hooks/useGetColors';
import CommonEchartsRenderer from "../../../common/CommonEchartsRenderer";
import { genOption } from "./util";
import useHandleEvent from "../../../../hooks/useHandleEvent";
export default function Renderer({ component }) {
    let { i: id, _data, _ready, option: storeOption } = component
    let getColors = useGetColors()
    let [option, setOption] = useState(storeOption)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        setOption(genOption(_data, storeOption, getColors))
    }, [_data, storeOption, getColors])

    if (!_ready)
        return null

    function handleInit(echart) {
        echart.off()
        echart.on('click',e => {
            handleEvent(id,'click',null,0)
        })
    }
    return (
        <CommonEchartsRenderer id={id} option={option} getInstance={handleInit}/>
    )
}
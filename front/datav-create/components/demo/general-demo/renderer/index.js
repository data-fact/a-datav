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

    let {i:id,_data,_ready,option:storeOption} = component
    let [option,setOption] = useState(storeOption)

    useEffect(() => {
        if(storeOption._ready)
            setOption(genOption(_data,storeOption))
    },[_data,storeOption])

    if(!_ready)
        return null

    let handleEvent = useHandleEvent()

    function handleInit(echart) {
        console.log(echart)
    }

    return (
        <CommonEchartsRenderer id={id} option={option} getInstance={handleInit}/>
    )
}
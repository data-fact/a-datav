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
import { TinyArea } from '@ant-design/charts';
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {genOption} from "./util";
import CommonAntvRenderer from "../../../common/CommonAntvRenderer";

export default function Renderer({component}){

    let {i:id,_ready,_data,option:storeOption} = component
    let [option,setOption] = useState(null)

    useEffect(() => {
        setOption(genOption(_data,storeOption))
    },[_data,storeOption])

    if(!_ready || !option || !_data || !_data.length)
        return null

    // let handleEvent = useHandleEvent()

    function handleInit(chart) {
        // console.log(chart)
    }

    return (
        <CommonAntvRenderer id={id} option={option} clazz={TinyArea} getInstance={handleInit}/>
    )
}
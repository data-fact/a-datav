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
import CustomEchartsRenderer from "./CustomEchartsRenderer";

export default function Renderer({component}){

    let {i,_ready,option,after,_name:name,_data:data} = component

    if(!_ready)
        return null

    return (
        <CustomEchartsRenderer id={i} name={name} optionExp={option} afterExp={after} data={data}/>
    )
}
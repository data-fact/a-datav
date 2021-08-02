/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
// import { ArrowUpOutlined } from '@ant-design/icons/es/icons/ArrowUpOutlined';
import loadable from '@loadable/component'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {ICON_TYPE} from "../state";
import ErrorBoundary from "../../../../../common/ErrorBoundary";

export default function Renderer({component}){

    let {i:id,_ready,fontSize,color,type,icon,iconText} = component

    let handleEvent = useHandleEvent()

    if(!_ready)
        return null

    function handleClick(){
        handleEvent(id,'click',{event_id: UUID.generate()})
    }

    icon = type == ICON_TYPE.DEFAULT ? icon : iconText
    let Icon = loadable(() => import(`@ant-design/icons/es/icons/${icon}`))

    return (
        <ErrorBoundary>
            <Icon style={{fontSize,color}} onClick={handleClick}/>
        </ErrorBoundary>
    )
}
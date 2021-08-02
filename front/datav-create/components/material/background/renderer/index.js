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
import {BACKGROUND_REPEAT_TYPE} from "../../../../common/constant";
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {getBackgroundImageStyle} from "../../../../utils/util";

export default function Renderer({component}){

    let {i:id,_ready,bgType,gradient,color,image,borderRadius,repeatType = BACKGROUND_REPEAT_TYPE.adapt} = component

    let handleEvent = useHandleEvent()

    if(!_ready)
        return null

    function handleClick(){
        handleEvent(id,'click',{event_id: UUID.generate()})
    }

    let style = getBackgroundImageStyle({bgType,gradient,color,image,borderRadius,repeatType,size: 'contain'})
    return (
        <div
            onClick={handleClick}
            style={style}
        ></div>
    )
}
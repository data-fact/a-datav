/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Typography} from 'antd4'
import useHandleEvent from "../../../../hooks/useHandleEvent";

const { Text } = Typography

export default function Renderer({component}){

    let {i:id,_ready,_data:data,value,size,spacing,colors,family,align,underline,deleteline,italic,strong,text_overflow} = component

    let handleEvent = useHandleEvent()

    if(!_ready)
        return null

    function handleClick(value){
        handleEvent(id,'click',{value})
    }
    let overflowStyle="initial"
    let whiteSpaceStyle="unset"
    if(text_overflow=="unset"){
        overflowStyle= "initial"
        whiteSpaceStyle="unset"
    }else{
        overflowStyle="hidden"
        whiteSpaceStyle="nowrap"
    }
    let style = {
        fontSize: size,
        fontFamily: family,
        letterSpacing: spacing,
        fontStyle: italic ? 'italic' : '',
        display: 'block',
        whiteSpace: whiteSpaceStyle,
        overflow:overflowStyle,
        textOverflow:text_overflow,
        textAlign: align,
        cursor: 'default'
    }
    value = data && data[0] && data[0].value ? data[0].value : value
    if(colors && colors[0]){
        if(colors[1]){
            style.backgroundImage = `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`
            style['WebkitBackgroundClip'] = 'text'
            style.color = 'transparent'
        }else
            style.color = colors[0]
    }
    return (
        <Text
            underline={underline}
            delete={deleteline}
            strong={strong}
            style={style}
            onClick={() => handleClick(value)}
        >
            {
                value
            }
        </Text>
    )
}
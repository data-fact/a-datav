/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Typography} from 'antd4'
import dayjs from 'dayjs'
import state from "../state";
import useHandleEvent from "../../../../hooks/useHandleEvent";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";

const { Text } = Typography

export default function Renderer({component}){

    let {i:id,_ready,formatter,cycle,size,spacing,color,family,align,underline,deleteline,italic,strong} = component
    let [time,setTime] = useState(new Date().getTime())
    let [formatterTime,setFormatterTime] = useState('')
    let [canvas] = useCanvasReducer()
    let handleEvent = useHandleEvent()

    useEffect(() => {
        let count = 0
        let intervalID = setInterval(() => {
            count ++
            if(count >= Number.MAX_SAFE_INTEGER) count = 0
            let t = new Date().getTime()
            let dateStr = dayjs(t).format(formatter || state.formatter)
            if(cycle > 0 && count >= cycle){
                count = 0
                handleEvent(id,'change',{time: t,dateStr})
            }
            setTime(t)
            setFormatterTime(dateStr)
        },1000)
        return () => {
            clearInterval(intervalID)
        }
    },[canvas,cycle])

    if(!_ready)
        return null

    function handleClick(time,dateStr){
        handleEvent(id,'click',{time,dateStr})
    }

    return (
        <Text
            underline={underline}
            delete={deleteline}
            strong={strong}
            onClick={() => handleClick(time,formatterTime)}
            style={{
                fontSize: size,
                fontFamily: family,
                letterSpacing: spacing,
                color,
                fontStyle: italic ? 'italic' : '',
                display: 'block',
                textAlign: align,
                cursor: 'default'
            }}
        >
            {
                formatterTime
            }
        </Text>
    )
}
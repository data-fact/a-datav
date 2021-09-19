/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Tag} from "antd4";

export default function Renderer({component}){

    //component为组件状态，组件状态改变会触发渲染器重新渲染
    let {i: id,_ready,w,h,_data,font,bgColor,margin,padding,border,minWidth} = component
    //固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
    if(!_ready)
        return null

    let {color,size,family} = font
    return <div
        style={{
            display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'flex-start',
            width: w,height: h
        }}
    >
        {
            _data.map(d => (
                <div
                    style={{
                        display:'flex',alignItems:'center',cursor: 'pointer',
                        background: d.color || bgColor, margin, padding, minWidth,
                        borderWidth: border.width,borderStyle: border.type,borderColor: border.color
                    }}
                >
                    <span style={{fontSize:size,color:color,fontFamily:family}}>{d.name}</span>
                </div>
            ))
        }
    </div>
}
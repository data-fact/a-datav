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
import useGetColors from "../../../../hooks/useGetColors";
import {genColorStyle} from "../../../../utils/util";

export default function Renderer({component}){

    let {i:id,_ready,w,h,backgroundColor ,borderColors, borderType, borderWidth, borderRadius,} = component
    let seriesColors = useGetColors()
    let [style,setStyle] = useState({})
    useEffect(() => {
        let borderColorStyle = genColorStyle(borderColors,seriesColors,1)
        let style = {
            borderStyle: borderType,
            borderColor: borderColorStyle.color,
            borderImage: borderColorStyle.gradientColor,
            borderWidth: borderWidth,
            borderRadius:borderRadius,
        }

        setStyle(style)
    }, [borderType,borderRadius, borderColors, borderWidth, seriesColors])


    if(!_ready)
        return null


    return (
        <div
            style={{
                ...style,
                width: w,height: h,
                backgroundColor: backgroundColor
            }}
        ></div>
    )
}
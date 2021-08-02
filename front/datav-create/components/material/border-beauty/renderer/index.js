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
import borderTypes from "../configer/border_types";
import useGetColors from "../../../../hooks/useGetColors";

export default function Renderer({component}){

    let {i:id,_ready,w,h,borderType,backgroundColor,colors:storeColors} = component
    let seriesColors = useGetColors()
    let [colors,setColors] = useState([])
    useEffect(() => {
        let colors = storeColors.filter(c => !!c)
        if(!colors.length && seriesColors.length){
            colors = [seriesColors[0],seriesColors[seriesColors.length - 1]]
        }
        setColors(colors)
    },[storeColors,seriesColors])

    let [key,setKey] = useState(0)

    useEffect(() => {
        setKey(key+1)
    },[w,h])

    if(!_ready)
        return null

    let BorderBox = borderTypes[+borderType]

    return (
        <BorderBox key={''+key} backgroundColor={backgroundColor} color={colors}/>
    )
}
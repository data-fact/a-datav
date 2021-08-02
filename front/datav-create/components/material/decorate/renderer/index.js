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
import decorateTypes from "../configer/decorate_types";
import useGetColors from "../../../../hooks/useGetColors";

export default function Renderer({component}){

    let {i:id,_ready,w,h,decorateType,colors:storeColors} = component
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

    let Decorate = decorateTypes[+decorateType]

    return (
        <Decorate reverse={decorateType == 3} key={''+key} color={colors}>标题名</Decorate>
    )
}
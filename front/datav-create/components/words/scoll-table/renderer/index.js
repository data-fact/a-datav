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
import {Table} from 'antd4'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {genConfig} from "./util";
import './table.css'
import {ScrollBoard} from "@jiaminghi/data-view-react";
import useGetColors from "../../../../hooks/useGetColors";

export default function Renderer({component}){

    let {i:id,w,h,_ready,_data:data,table,columns:storeColumns} = component
    let [config,setConfig] = useState({})

    let handleEvent = useHandleEvent()
    let seriesColors = useGetColors()

    useEffect(() => {
        table = {...table}
        table.bodyColors = [...table.bodyColors]
        if(!table.bodyColors[0])
            table.bodyColors[0] = seriesColors[0]
        if(!table.bodyColors[1])
            table.bodyColors[1] = seriesColors[1]
        setConfig(genConfig(storeColumns,table,data))
    },[storeColumns,table,data,seriesColors])

    if(!_ready)
        return null

    function handleClick({row,ceil,rowIndex,columnIndex}){
        handleEvent(id,'click',{_row: rowIndex},rowIndex)
    }

    return (
        <ScrollBoard config={config} style={{width: w, height: h}} onClick={handleClick}/>
    )
}
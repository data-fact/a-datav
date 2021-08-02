import React,{useState,useEffect} from 'react'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import CommonChartConfiger from "../../../common/common-chart-configer/CommonChartConfiger";
import useInitComponent from "../../../../hooks/useInitComponent";

export default function Configer({component}){

    let {i: id,_ready,option} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!_ready)
        return null

    function handleOptionChange(option) {
        updateComponent(id,{option})
    }

    return (
        <CommonChartConfiger
            baseOption={option}
            onChange={handleOptionChange}
        />
    )
}
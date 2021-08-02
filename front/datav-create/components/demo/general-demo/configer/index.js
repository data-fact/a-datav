/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Button} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import CommonChartConfiger from "../../../common/common-chart-configer/CommonChartConfiger";
import useInitComponent from "../../../../hooks/useInitComponent";
import Custom from "./Custom";

export default function Configer({component}){

    let {i:id,option} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!ready)
        return null

    function handleOptionChange(option) {
        updateComponent(id,{option})
    }

    return (
        <CommonChartConfiger
            baseOption={option}
            custom={
                <Custom option={option} onChange={handleOptionChange}/>
            }
            onChange={handleOptionChange}
        />
    )
}